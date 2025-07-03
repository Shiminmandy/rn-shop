/*
 * File Description:
 * This file defines mock data sources for product (Product) data, used for frontend project development and testing.
 *
 * Main Content:
 * - Imports the product type definition (Product).
 * - Exports a constant PRODUCTS array, containing multiple product objects. Each product includes id, title, slug, hero image, image URLs, price, category, and max quantity.
 * - The category field contains the product's category information.
 *
 * Notes:
 * - The heroImage and imagesUrl fields use require to import local image resources, suitable for React Native projects.
 * - This file provides mock data and can be replaced with backend API data in actual development.
 */

/*
 * 文件说明：
 * 本文件定义了商品（Product）数据的模拟数据源，供前端项目开发和测试使用。
 *
 * 主要内容：
 * - 导入了商品类型定义（Product）。
 * - 导出了一个 PRODUCTS 常量数组，包含多个商品对象。每个商品包含 id、标题、slug、主图、图片地址、价格、分类信息和最大数量。
 * - category 字段包含商品的分类信息。
 *
 * 注意事项：
 * - heroImage 和 imagesUrl 字段通过 require 方式引入本地图片资源，适用于 React Native 项目。
 * - 本文件为模拟数据，实际开发中可替换为后端接口数据。
 */

import { Product } from "../types/product";

export const PRODUCTS: Product[] = [
    {
        id: 1,
        title: 'Macbook Pro (2024)',
        slug: "macboo-pro-2024",
        heroImage: require('../images/mac-book-1.jpg'),
        imagesUrl: [
            require('../images/mac-book-1.jpg'),
            require('../images/mac-book-2.jpg'),
            require('../images/mac-book-3.jpg'),
        ],
        price: 899.99,
        category: {
            name: "Laptops",
            slug: "laptops",
            imageUrl: require('../images/mac-book-1.jpg'),
        },
        maxQuantity: 5,
    },
    {
        id: 5,
        title: 'Dell XPS 13',
        slug: 'dell-xps-13',
        heroImage: require('../images/dell-1.jpg'),
        imagesUrl: [
            require('../images/dell-1.jpg'),
            require('../images/dell-2.jpg'),
        ],
        price: 1099.99,
        category: {
            imageUrl: require('../images/mac-book-1.jpg'),
            name: 'Laptops',
            slug: 'laptops',
        },
        maxQuantity: 7,
    },
    {
        id: 2,
        title: 'IPhone 15',
        slug: 'i-phone-15',
        heroImage: require('../images/i-phone-1.jpg'),
        imagesUrl: [
          require('../images/i-phone-2.jpg'),
          require('../images/i-phone-3.jpg'),
        ],
        price: 999.99,
        category: {
          imageUrl: require('../images/i-phone-1.jpg'),
          name: 'Phones',
          slug: 'phones',
        },
        maxQuantity: 10,
      },
      {
        id: 6,
        title: 'Samsung Galaxy S21',
        slug: 'samsung-galaxy-s21',
        heroImage: require('../images/samsung-1.jpg'),
        imagesUrl: [
          require('../images/samsung-1.jpg'),
          require('../images/samsung-2.jpg'),
        ],
        price: 799.99,
        category: {
          imageUrl: require('../images/i-phone-1.jpg'),
          name: 'Phones',
          slug: 'phones',
        },
        maxQuantity: 12,
      },
      {
        id: 3,
        title: 'Headset',
        slug: 'headset',
        heroImage: require('../images/head-set-1.jpg'),
        imagesUrl: [
          require('../images/head-set-1.jpg'),
          require('../images/head-set-2.jpg'),
        ],
        price: 499.99,
        category: {
          imageUrl: require('../images/head-set-1.jpg'),
          name: 'Accessories',
          slug: 'accessories',
        },
        maxQuantity: 15,
      },
      {
        id: 4,
        title: 'PlayStation 5',
        slug: 'playstation-5',
        heroImage: require('../images/ps-5-1.jpg'),
        imagesUrl: [
          require('../images/ps-5-1.jpg'),
          require('../images/ps-5-2.jpg'),
          require('../images/ps-5-3.jpg'),
        ],
        price: 699.99,
        category: {
          imageUrl: require('../images/ps-5-1.jpg'),
          name: 'Gaming',
          slug: 'gaming',
        },
        maxQuantity: 3,
      },
      {
        id: 7,
        title: 'Nintendo Switch',
        slug: 'nintendo-switch',
        heroImage: require('../images/nintendo-switch-1.jpg'),
        imagesUrl: [
          require('../images/nintendo-switch-1.jpg'),
          require('../images/nintendo-switch-2.jpg'),
        ],
        price: 299.99,
        category: {
          imageUrl: require('../images/ps-5-1.jpg'),
          name: 'Gaming',
          slug: 'gaming',
        },
        maxQuantity: 8,
      },
];