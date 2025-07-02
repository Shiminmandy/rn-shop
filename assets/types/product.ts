import { ImageSourcePropType } from "react-native";
import { Category } from "./category";


export type Product = {
    id: number;
    title: string;
    slug: string; // prrduct unique identifier, used for routing and display ex: "macbook-pro-2024"
    imagesUrl: string[]; // array of image URLs, used for product carousel
    price: number;
    heroImage: ImageSourcePropType;
    category?: Omit<Category, "products">; // category of the product, used for filtering and display. Omit "products" to avoid circular dependency
    maxQuantity?:number; // max quantity of the product, used for inventory management
}

