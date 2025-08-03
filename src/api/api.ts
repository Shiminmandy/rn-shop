import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";


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
        }
    });
}