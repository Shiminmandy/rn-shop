/*
 * File Description:
 * This file defines mock data sources for order (Order) data, used for frontend project development and testing.
 *
 * Main Content:
 * - Imports the order type definition (Order).
 * - Exports a constant ORDERS array, containing multiple order objects. Each order includes basic order info and item details (items).
 * - Each item includes id, title, slug, image URL array, price, and hero image.
 *
 * Notes:
 * - The heroImage field uses require to import local image resources, suitable for React Native projects.
 * - The imagesUrl field is an array of image URLs, which can be used for product carousels, etc.
 * - This file provides mock data and can be replaced with backend API data in actual development.
 */

/*
 * 文件说明：
 * 本文件定义了订单（Order）数据的模拟数据源，供前端项目开发和测试使用。
 *
 * 主要内容：
 * - 导入了订单类型定义（Order）。
 * - 导出了一个 ORDERS 常量数组，包含多个订单对象，每个订单包含订单基本信息和商品明细（items）。
 * - 每个商品明细包含 id、标题、slug、图片地址数组、价格和主图。
 *
 * 注意事项：
 * - heroImage 字段通过 require 方式引入本地图片资源，适用于 React Native 项目。
 * - imagesUrl 字段为图片地址数组，可用于展示商品轮播图等。
 * - 本文件为模拟数据，实际开发中可替换为后端接口数据。
 */
import { Order } from './types/order';

export const ORDERS: Order[] = [
  {
    id: '1',
    item: 'Order 1',
    details: 'Details about order 1',
    status: 'Pending',
    slug: 'order-1',
    date: '2024-07-01',
    items: [
      {
        id: 1,
        title: 'Product 1',
        slug: 'product-1',
        imagesUrl: ['url1'],
        price: 10.0,
        heroImage: require('../assets/images/i-phone-1.jpg'),
      },
      {
        id: 2,
        title: 'Product 2',
        slug: 'product-2',
        imagesUrl: ['url2'],
        price: 20.0,
        heroImage: require('../assets/images/head-set-1.jpg'),
      },
    ],
  },
  {
    id: '2',
    item: 'Order 2',
    details: 'Details about order 2',
    status: 'Completed',
    slug: 'order-2',
    date: '2024-07-02',
    items: [
      {
        id: 3,
        title: 'Product 3',
        slug: 'product-3',
        imagesUrl: ['url3'],
        price: 30.0,
        heroImage: require('../assets/images/head-set-1.jpg'),
      },
      {
        id: 4,
        title: 'Product 4',
        slug: 'product-4',
        imagesUrl: ['url4'],
        price: 40.0,
        heroImage: require('../assets/images/head-set-1.jpg'),
      },
    ],
  },
  {
    id: '3',
    item: 'Order 3',
    details: 'Details about order 3',
    status: 'Shipped',
    slug: 'order-3',
    date: '2024-07-03',
    items: [
      {
        id: 5,
        title: 'Product 5',
        slug: 'product-5',
        imagesUrl: ['url5'],
        price: 50.0,
        heroImage: require('../assets/images/head-set-1.jpg'),
      },
      {
        id: 6,
        title: 'Product 6',
        slug: 'product-6',
        imagesUrl: ['url6'],
        price: 60.0,
        heroImage: require('../assets/images/head-set-1.jpg'),
      },
    ],
  },
  {
    id: '4',
    item: 'Order 4',
    details: 'Details about order 4',
    status: 'InTransit',
    slug: 'order-4',
    date: '2024-07-04',
    items: [
      {
        id: 7,
        title: 'Product 7',
        slug: 'product-7',
        imagesUrl: ['url7'],
        price: 70.0,
        heroImage: require('../assets/images/head-set-1.jpg'),
      },
      {
        id: 8,
        title: 'Product 8',
        slug: 'product-8',
        imagesUrl: ['url8'],
        price: 80.0,
        heroImage: require('../assets/images/head-set-1.jpg'),
      },
    ],
  },
];