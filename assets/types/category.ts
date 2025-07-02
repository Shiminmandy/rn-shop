import { Product } from "./product";

export type Category = {
    name: string;
    slug: string;
    imageUrl: string;
    products: Product[];
    }