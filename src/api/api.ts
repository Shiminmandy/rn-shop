/**
 * API 数据获取函数集合
 * 
 * 函数说明：
 * 1. getProductsAndCategories(): 获取所有产品和分类数据
 *    - 用途：用于首页或产品列表页面
 *    - 返回：{ products: 产品数组, categories: 分类数组 }
 *    - 缓存键：['products', 'categories']
 * 
 * 2. getProduct(slug: string): 根据 slug 获取单个产品详情
 *    - 用途：用于产品详情页面
 *    - 参数：slug - 产品的唯一标识符
 *    - 返回：单个产品对象
 *    - 缓存键：['product', slug]
 * 
 * 3. getCategoryAndProducts(categorySlug: string): 获取指定分类及其下的所有产品
 *    - 用途：用于分类页面，显示某个分类下的所有产品
 *    - 参数：categorySlug - 分类的唯一标识符
 *    - 返回：{ category: 分类对象, products: 产品数组 }
 *    - 缓存键：['categoryAndProducts', categorySlug]
 * 
 * 技术特点：
 * - 使用 React Query 进行数据获取和缓存管理
 * - 支持错误处理和加载状态
 * - 自动缓存和后台更新
 * - 类型安全的 Supabase 查询
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { useAuth } from "../providers/auth-provider";
import { generateOrderSlug } from "../utils/utils";
import { Database } from '../types/database.types';

export const getProductsAndCategories = () => {
    return useQuery({
        queryKey: ['products', 'categories'], // check if cache is valid

        // if cache is not invalid, fetch data from supabase
        queryFn: async() => {
            const [products,categories] = await Promise.all([
                supabase.from('product').select('*'),
                supabase.from('category').select('*')
            ]);

            if(products.error || categories.error) {
                throw new Error('An Error occured while fetching data');
            }

            return {products: products.data, categories: categories.data};
            // while returing data, the data is will be stored in the cache, with the key ['products', 'categories']
        }
    });
}

export const getProduct = (slug: string) => {
    return useQuery({
        queryKey: ['product', slug],  // slug is dynamic parameter
        queryFn: async () => {
            const {data,error} = await supabase
            .from('product')
            .select('*')
            .eq('slug', slug)
            .single();

            if(error || !data) {
                throw new Error('An Error occured while fetching data');
            }

            return data;
        }
    })
}

export const getCategoryAndProducts = (categorySlug: string) => {
    return useQuery({
        queryKey: ['categoryAndProducts', categorySlug],
        queryFn: async () => {
            const {data:category, error:categoryError} = await supabase
            .from('category')
            .select('*')
            .eq('slug', categorySlug)
            .single(); // 不使用single就会返回一个数组，哪怕只会返回单行数据

            if(categoryError || !category) {
                throw new Error('An Error occured while fetching data');
            }

            const {data:products, error:productsError} = await supabase
            .from('product')
            .select('*')
            .eq('category', category.id);

            if(productsError) {
                throw new Error('An Error occured while fetching data');
            }

            return {category, products};
        }
    })
}

export const getMyOrders = () => {
    // get the user id from the auth provider
    // 嵌套解构赋值 nested destructuring
    // 等价于：
    // const authData = useAuth();
    // const user = authData.user;
    // const id = user.id;
    // 可以直接使用id，同时解构: const { user: userData, user: {id} } = useAuth();
    const { user: {id},} = useAuth();

    return useQuery({
        queryKey: ['orders', id],
        queryFn: async () => {
            const {data, error} = await supabase
            .from('order')
            .select('*')
            .order('created_at', {ascending: false})
            .eq('user', id);

            if(error || !data) {
                throw new Error('An Error occured while fetching orders: ' + error.message);
            }

            return data;
        }
    })
}

export const createOrder = () => {
    const {
        user:{id},
    } = useAuth();

    const slug = generateOrderSlug();
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn({ totalPrice}: {totalPrice: number}){
            const {data, error} = await supabase
            .from('order')
            .insert({
                slug,
                user: id,
                totalPrice,
                status: 'pending',
            })
            .select('*')
            .single();

            if(error) {
                throw new Error('An Error occured while creating order: ' + error.message);
            }

            return data;
        },

        async onSuccess() {
            await queryClient.invalidateQueries({queryKey: ['orders', id]});
        }
    })

}

export const createOrderItem = () => {
    return useMutation({
        async mutationFn(
            insertData: {
                orderId: number;
                productId: number;
                quantity: number;
            }[]
        ){
            const {data, error} = await supabase
            .from('order_item')
            .insert(
                insertData.map(({orderId,quantity, productId}) => ({
                    order: orderId,
                    product: productId,
                    quantity,
                }))
            )
            .select('*');

            const productQuantities = insertData.reduce(
                (acc, {productId, quantity}) => {
                    if (!acc[productId]){
                        acc[productId] = 0;
                    }
                    acc[productId] += quantity;
                    return acc;
                },
                {} as Record<number, number>
            );

            await Promise.all(Object.entries(productQuantities).map(
                async ([productId, totalQuantity]) => {
                    supabase.rpc('decrement_product_quantity', {
                        product_id: Number(productId),
                        quantity: totalQuantity,
                    });
                }
            ));

            if(error) {
                throw new Error('An Error occured while creating order items: ' + error.message);
            }
        }
    })
}

export const getMyOrder = (slug: string) => {
    const {
        user: {id},
    } = useAuth();

    return useQuery({
        queryKey: ['orders', slug],
        queryFn: async () => {
            const {data, error} = await supabase
            .from('order')
            .select('*, order_itms: order_item(*, products:product(*))')
            .eq('slug', slug)
            .eq('user', id)
            .single();

            if(error || !data) {
                throw new Error('An Error occured while fetching order: ' + error?.message);
            }

            return data;
        }
    })
}

/**
 * createOrderItem 函数详细说明
 * 
 * 功能：创建订单项（订单中的具体商品）
 * 
 * 参数说明：
 * insertData: {
 *   orderId: number;    // 订单ID - 关联到哪个订单
 *   productId: number;  // 产品ID - 哪个产品
 *   quantity: number;   // 数量 - 购买多少个
 * }[]
 * 
 * 实现流程：
 * 1. 数据插入：将订单项数据插入到 order_item 表
 * 2. 数量统计：计算每个产品的总购买数量
 * 3. 库存更新：调用数据库函数减少产品库存
 * 
 * 详细步骤：
 * 
 * 步骤1：插入订单项
 * - 接收订单项数组（可能包含多个产品）
 * - 将数据插入 order_item 表
 * - 每个订单项包含：订单ID、产品ID、数量
 * 
 * 步骤2：统计产品数量
 * - 使用 reduce 方法统计每个产品的总购买数量
 * - 例如：用户买了2个iPhone和3个MacBook
 * - 结果：{ 1: 2, 2: 3 } (产品ID: 数量)
 * 
 * 步骤3：更新库存
 * - 调用 Supabase 的 RPC 函数 decrement_product_quantity
 * - 为每个产品减少相应的库存数量
 * - 确保库存数据的准确性
 * 
 * 使用场景：
 * - 用户完成购物车结算时
 * - 需要创建订单项并更新库存
 * - 支持一次购买多个不同产品
 * 
 * 示例：
 * insertData = [
 *   { orderId: 1, productId: 1, quantity: 2 }, // 订单1，产品1，数量2
 *   { orderId: 1, productId: 2, quantity: 1 }, // 订单1，产品2，数量1
 * ]
 * 
 * 结果：
 * - 创建2个订单项记录
 * - 产品1库存减少2个
 * - 产品2库存减少1个
 */