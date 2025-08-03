# Supabase 数据获取方式对比：Next.js vs Expo

## 概述

虽然都使用 Supabase 作为后端，但 Next.js 和 Expo 在数据获取方式上有根本性的差异。本文档详细阐述了两种平台的不同实现方式。

## 架构差异

### Next.js 架构
```
├── 服务端 (Server)
│   ├── API Routes (/api/*)
│   ├── Server Components
│   ├── Server Actions
│   └── Middleware
└── 客户端 (Client)
    ├── Client Components
    └── 浏览器环境
```

### Expo 架构
```
└── 客户端 (Client)
    ├── React Native 环境
    ├── 移动设备
    └── 状态管理 (Context, Redux, Zustand)
```

## 数据获取方式对比

### 1. 认证处理

#### Next.js 认证
```typescript
// 服务端组件
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

async function ServerComponent() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/auth');
  }
  
  return <div>Welcome {session.user.email}</div>;
}

// API Route
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

export async function GET(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // 处理请求...
}
```

#### Expo 认证
```typescript
// 客户端认证
import { createClient } from '@supabase/supabase-js';
import { useAuth } from '../providers/auth-provider';

function ClientComponent() {
  const { session, mounting } = useAuth();
  
  if (mounting) return <Loading />;
  if (!session) return <Redirect href="/auth" />;
  
  return <div>Welcome {session.user.email}</div>;
}
```

### 2. 数据获取

#### Next.js 数据获取

**服务端组件 (推荐)**
```typescript
// app/products/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

async function ProductsPage() {
  const supabase = createServerComponentClient({ cookies });
  
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    throw new Error('Failed to fetch products');
  }
  
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

**API Routes**
```typescript
// app/api/products/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies });
  
  const { data: products, error } = await supabase
    .from('products')
    .select('*');
    
  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
  
  return Response.json(products);
}

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const body = await request.json();
  
  const { data, error } = await supabase
    .from('products')
    .insert([body])
    .select()
    .single();
    
  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
  
  return Response.json(data);
}
```

**Server Actions**
```typescript
// app/actions/products.ts
'use server'

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';

export async function createProduct(formData: FormData) {
  const supabase = createServerActionClient({ cookies });
  
  const { data, error } = await supabase
    .from('products')
    .insert([{
      name: formData.get('name') as string,
      price: parseFloat(formData.get('price') as string),
      description: formData.get('description') as string,
    }])
    .select()
    .single();
    
  if (error) {
    throw new Error(error.message);
  }
  
  revalidatePath('/products');
  return data;
}
```

#### Expo 数据获取

**使用 React Query**
```typescript
// src/api/products.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

// 获取产品列表
export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data;
    },
  });
};

// 获取单个产品
export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
};

// 创建产品
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (product: CreateProductData) => {
      const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select()
        .single();
        
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
    },
  });
};

// 更新产品
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: UpdateProductData) => {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
        
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['products']);
      queryClient.invalidateQueries(['product', data.id]);
    },
  });
};

// 删除产品
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
    },
  });
};
```

**在组件中使用**
```typescript
// src/app/(shop)/products/page.tsx
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from '../../../api/products';

function ProductsPage() {
  const { data: products, isLoading, error } = useProducts();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  
  if (isLoading) return <Loading />;
  if (error) return <Error message={error.message} />;
  
  const handleCreate = async (productData: CreateProductData) => {
    try {
      await createProduct.mutateAsync(productData);
      // 显示成功消息
    } catch (error) {
      // 处理错误
    }
  };
  
  const handleUpdate = async (id: string, updates: Partial<Product>) => {
    try {
      await updateProduct.mutateAsync({ id, ...updates });
      // 显示成功消息
    } catch (error) {
      // 处理错误
    }
  };
  
  const handleDelete = async (id: string) => {
    try {
      await deleteProduct.mutateAsync(id);
      // 显示成功消息
    } catch (error) {
      // 处理错误
    }
  };
  
  return (
    <View>
      {products?.map(product => (
        <ProductCard 
          key={product.id} 
          product={product}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ))}
    </View>
  );
}
```

## CRUD 实现方式对比

### Create (创建)

#### Next.js
```typescript
// Server Action
export async function createProduct(formData: FormData) {
  const supabase = createServerActionClient({ cookies });
  
  const { data, error } = await supabase
    .from('products')
    .insert([{
      name: formData.get('name') as string,
      price: parseFloat(formData.get('price') as string),
    }])
    .select()
    .single();
    
  if (error) throw new Error(error.message);
  
  revalidatePath('/products');
  return data;
}

// 在组件中使用
function ProductForm() {
  return (
    <form action={createProduct}>
      <input name="name" required />
      <input name="price" type="number" required />
      <button type="submit">Create Product</button>
    </form>
  );
}
```

#### Expo
```typescript
// 使用 React Query
const createProduct = useCreateProduct();

const handleSubmit = async (productData: CreateProductData) => {
  try {
    await createProduct.mutateAsync(productData);
    // 自动更新缓存
  } catch (error) {
    // 处理错误
  }
};
```

### Read (读取)

#### Next.js
```typescript
// 服务端组件
async function ProductsPage() {
  const supabase = createServerComponentClient({ cookies });
  
  const { data: products } = await supabase
    .from('products')
    .select('*');
    
  return <ProductList products={products} />;
}
```

#### Expo
```typescript
// 使用 React Query
const { data: products, isLoading } = useProducts();

if (isLoading) return <Loading />;
return <ProductList products={products} />;
```

### Update (更新)

#### Next.js
```typescript
// Server Action
export async function updateProduct(id: string, formData: FormData) {
  const supabase = createServerActionClient({ cookies });
  
  const { data, error } = await supabase
    .from('products')
    .update({
      name: formData.get('name') as string,
      price: parseFloat(formData.get('price') as string),
    })
    .eq('id', id)
    .select()
    .single();
    
  if (error) throw new Error(error.message);
  
  revalidatePath('/products');
  revalidatePath(`/products/${id}`);
  return data;
}
```

#### Expo
```typescript
// 使用 React Query
const updateProduct = useUpdateProduct();

const handleUpdate = async (id: string, updates: Partial<Product>) => {
  try {
    await updateProduct.mutateAsync({ id, ...updates });
    // 自动更新缓存
  } catch (error) {
    // 处理错误
  }
};
```

### Delete (删除)

#### Next.js
```typescript
// Server Action
export async function deleteProduct(id: string) {
  const supabase = createServerActionClient({ cookies });
  
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);
    
  if (error) throw new Error(error.message);
  
  revalidatePath('/products');
}
```

#### Expo
```typescript
// 使用 React Query
const deleteProduct = useDeleteProduct();

const handleDelete = async (id: string) => {
  try {
    await deleteProduct.mutateAsync(id);
    // 自动更新缓存
  } catch (error) {
    // 处理错误
  }
};
```

## 关键差异总结

### 1. 执行环境
- **Next.js**: 服务端执行，更安全
- **Expo**: 客户端执行，需要 RLS 保护

### 2. 性能特点
- **Next.js**: 服务端渲染，首屏加载快
- **Expo**: 客户端渲染，需要加载状态

### 3. 状态管理
- **Next.js**: 服务端状态，客户端状态分离
- **Expo**: 统一客户端状态管理

### 4. 缓存策略
- **Next.js**: 服务端缓存 + 客户端缓存
- **Expo**: 客户端缓存 (React Query)

### 5. 错误处理
- **Next.js**: 服务端错误边界 + 客户端错误处理
- **Expo**: 客户端错误处理

## 最佳实践

### Next.js 最佳实践
1. 优先使用服务端组件
2. 使用 Server Actions 处理表单
3. 利用 Next.js 的缓存机制
4. 使用 API Routes 处理复杂逻辑

### Expo 最佳实践
1. 使用 React Query 管理数据
2. 实现适当的加载和错误状态
3. 利用乐观更新提升用户体验
4. 合理使用缓存策略

## 总结

虽然都使用 Supabase，但 Next.js 和 Expo 的数据获取方式反映了各自平台的特性和优势：

- **Next.js**: 利用服务端能力，提供更好的性能和安全性
- **Expo**: 纯客户端架构，提供更灵活的状态管理和用户体验

选择哪种方式取决于项目需求和平台特性。 