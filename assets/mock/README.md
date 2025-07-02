# Mock Data Directory Documentation

This directory contains mock data files used for development and testing purposes. Below is a detailed explanation of each file:

## 1. categories.tsx
This file provides a mock dataset representing product categories. Each category typically includes properties such as an identifier (id), a display name, an image or icon, and possibly a description. The mock categories are used to simulate the category structure of the shop, allowing developers to build and test category-related features without needing a backend or real data source.

**Typical use cases:**
- Displaying a list of product categories on the shop homepage or navigation menu.
- Testing category filtering and navigation.

## 2. orders.ts
This file contains mock data for customer orders. Each order object usually includes details such as order id, customer information, list of purchased products, quantities, prices, order status, and timestamps (e.g., order date, delivery date). This mock data helps developers test order management features, such as viewing order history, order details, and simulating order status changes.

**Typical use cases:**
- Displaying a user's order history.
- Testing order detail pages and order status updates.
- Simulating order-related workflows in the app.

## 3. products.ts
This file provides a mock dataset of products available in the shop. Each product entry generally includes properties like product id, name, description, price, images, category, stock status, and other relevant attributes. The mock products are used to populate product listings, detail pages, and to test search and filter functionalities.

**Typical use cases:**
- Displaying product lists and product detail pages.
- Testing product search, filtering, and sorting features.
- Simulating shopping cart and checkout flows.

---

# 中文翻译

本目录包含用于开发和测试的模拟数据文件。以下是每个文件的详细说明：

## 1. categories.tsx
该文件提供了商品类别的模拟数据集。每个类别通常包含标识符（id）、显示名称、图片或图标，以及可能的描述。模拟类别用于模拟商店的类别结构，便于开发者在没有后端或真实数据源的情况下构建和测试与类别相关的功能。

**典型用途：**
- 在商店首页或导航菜单中显示商品类别列表。
- 测试类别筛选和导航功能。

## 2. orders.ts
该文件包含客户订单的模拟数据。每个订单对象通常包括订单编号、客户信息、购买商品列表、数量、价格、订单状态和时间戳（如下单日期、送达日期）等详细信息。该模拟数据帮助开发者测试订单管理功能，如查看订单历史、订单详情以及模拟订单状态变更。

**典型用途：**
- 显示用户的订单历史。
- 测试订单详情页和订单状态更新。
- 模拟应用中的订单相关流程。

## 3. products.ts
该文件提供了商店可用商品的模拟数据集。每个商品条目通常包含商品编号、名称、描述、价格、图片、类别、库存状态及其他相关属性。模拟商品用于填充商品列表、详情页，并测试搜索和筛选功能。

**典型用途：**
- 显示商品列表和商品详情页。
- 测试商品搜索、筛选和排序功能。
- 模拟购物车和结算流程。 