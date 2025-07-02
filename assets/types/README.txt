Product, Order, and Category Type Definitions - Explanation
===========================================================

This directory contains the core type definitions for the shopping app. Below is a detailed explanation of each file, their purpose, importance, and how they relate to each other.

1. product.ts
--------------
Defines the Product type, which represents a product in the shop. It includes fields such as id, title, slug, imagesUrl, price, heroImage, category, and maxQuantity. The category field references the Category type, but uses Omit<Category, "products"> to avoid infinite nesting (circular reference).

2. order.ts
------------
Defines the Order type, representing an order placed by a user. It includes fields like id, slug, item, details, status, date, and items. The items field is an array of Product, meaning each order can contain multiple products. The file also defines the OrderStatus type.

3. category.ts
---------------
Defines the Category type, representing a product category. It includes name, slug, imageUrl, and products (an array of Product). This means each category contains multiple products.

Purpose and Importance
----------------------
- These files provide a unified definition of the core data structures (Product, Order, Category) used throughout the project.
- They ensure consistency, type safety, and better maintainability across the codebase.
- Centralizing type definitions makes it easier to update and extend data models.

Why are they in the assets/types directory?
-------------------------------------------
- This is a convention to keep all type definitions in one place, separate from business logic and UI code. It improves project organization and clarity.

Where are these types used?
---------------------------
- Anywhere the app deals with products, orders, or categories: component props, API requests/responses, state management, forms, lists, detail pages, etc.

Why do these files reference each other?
----------------------------------------
- The data models are naturally related: a Category contains Products, an Order contains Products, and a Product belongs to a Category.
- This mutual referencing models real-world relationships in an e-commerce system.
- To avoid infinite recursion, Omit<Category, "products"> is used in the Product type.

Summary
-------
These type definition files are essential for maintaining a robust, type-safe, and scalable codebase. They model the core relationships in the shopping app and are referenced throughout the project wherever product, order, or category data is handled.

------------------------------

【中文说明】

本目录包含了购物应用的核心类型定义。以下是每个文件的详细解释、用途、重要性、为什么放在这里、以及它们之间的关系。

1. product.ts
--------------
定义了商品（Product）的类型，包括 id、title、slug、imagesUrl、price、heroImage、category、maxQuantity 等字段。category 字段引用了 Category 类型，但用 Omit<Category, "products">，避免类型无限嵌套（循环引用）。

2. order.ts
------------
定义了订单（Order）的类型，包括 id、slug、item、details、status、date、items 等字段。items 字段是 Product[]，表示一个订单可以包含多个商品。还定义了订单状态类型 OrderStatus。

3. category.ts
---------------
定义了商品分类（Category）的类型，包括 name、slug、imageUrl、products（Product[]）。表示一个分类下有多个商品。

【这些文件的用意和重要性】
- 统一定义项目中"商品"、"订单"、"分类"的数据结构，方便在整个项目中复用和类型检查。
- 保证数据结构一致，减少出错。
- 利于类型推断和智能提示，提高开发效率。
- 便于维护和扩展。

【为什么放在 assets/types 目录？】
- 集中管理所有类型定义，让类型文件和业务逻辑、UI 代码分离，结构更清晰。
- 放在 assets/types 目录下是为了统一管理，也可以放在 src/types，只要统一即可。

【这些类型会在什么地方用到？】
- 在所有涉及"商品"、"订单"、"分类"数据的地方都会用到，比如：页面组件的 props 类型、API 请求/响应、状态管理、表单、列表、详情页等。

【为什么这三个文件互相引用？】
- 因为它们的数据结构本身就是相互关联的：一个分类下有多个商品（Category → Product[]），一个订单包含多个商品（Order → Product[]），商品属于某个分类（Product → Category）。
- 这种引用是电商类项目常见的数据建模方式。
- 为了避免无限递归，Product 里的 category 字段用 Omit<Category, "products">。

【总结】
这三个类型定义文件是保证项目类型安全、结构清晰、易于维护和扩展的基础。它们描述了购物应用的核心数据关系，在涉及商品、订单、分类的所有地方都会被引用。 