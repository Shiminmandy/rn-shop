# Stripe Checkout Function

这是一个 Supabase Edge Function，用于处理 Stripe 支付。

## 解决 Deno 类型错误

如果你在 VS Code 中看到 Deno 相关的类型错误，请按照以下步骤操作：

### 1. 安装 Deno 扩展
- 按 `Cmd+Shift+X` 打开扩展面板
- 搜索 "Deno" 
- 安装官方的 "Deno" 扩展 (denoland.vscode-deno)

### 2. 重启 VS Code
安装扩展后，重启 VS Code 以确保扩展正确加载。

### 3. 验证配置
确保项目根目录的 `.vscode/settings.json` 文件包含正确的 Deno 配置。

## 本地测试

```bash
# 启动 Supabase
supabase start

# 测试函数
curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/stripe-checkout' \
  --header 'Authorization: Bearer YOUR_ANON_KEY' \
  --header 'Content-Type: application/json' \
  --data '{"totalAmount": 4000}'
```

## 环境变量

确保设置以下环境变量：
- `STRIPE_SECRET_KEY`: Stripe 私钥
- `STRIPE_PUBLISHABLE_KEY`: Stripe 公钥
