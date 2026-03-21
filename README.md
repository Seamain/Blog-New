# Seamain's Blog

> S09指挥官Seamain的个人纪录 · 记录技术、产品与生活的灵感

一个基于 [Astro](https://astro.build) 构建的静态个人博客，后端接入 [Strapi](https://strapi.io) CMS，支持 AI 摘要生成、全文搜索、动态 OG 图、RSS 订阅等功能。

**线上地址：** [seamain.org](https://seamain.org)

---

## 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | [Astro v5](https://astro.build)（静态站点生成） |
| 样式 | [Tailwind CSS v4](https://tailwindcss.com) |
| CMS | [Strapi](https://strapi.io)（私有部署） |
| 搜索 | [Pagefind](https://pagefind.app)（本地全文检索） |
| OG 图 | [Satori](https://github.com/vercel/satori) + [@resvg/resvg-js](https://github.com/yisibl/resvg-js) |
| AI 摘要 | [DeepSeek API](https://platform.deepseek.com) |
| 认证 | [Cloudflare Access](https://www.cloudflare.com/zero-trust/products/access/)（Service Token） |
| 图标 | [astro-icon](https://github.com/natemoo-re/astro-icon) |
| 订阅 | RSS Feed（[@astrojs/rss](https://docs.astro.build/en/guides/rss/)） |
| Sitemap | [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) |

---

## 特性

- **毛玻璃 ACG 风格 UI** — 背景图 + `backdrop-filter` 磨砂效果，粉紫渐变色调
- **响应式布局** — 手机、平板、桌面全端适配
- **文章 OG 图自动生成** — 每篇文章构建时自动生成 1200×630 专属预览图，支持中文
- **AI 智能摘要** — 接入 DeepSeek，为每篇文章自动生成摘要
- **全文搜索** — 基于 Pagefind 的本地离线搜索，无需后端
- **暗色模式** — 系统跟随 + 手动切换，无闪烁
- **RSS 订阅 & Sitemap** — 开箱即用
- **SEO 完整** — Open Graph、Twitter Card、canonical URL、article 结构化数据

---

## 本地开发

### 前置要求

- Node.js ≥ 18
- npm ≥ 9
- 一个运行中的 Strapi 实例（或向 [@Seamain](https://github.com/Seamain) 申请只读 API Token）

### 安装

```bash
git clone https://github.com/Seamain/Blog-New.git
cd Blog-New
npm install
```

### 环境变量

在项目根目录创建 `.env` 文件，填入以下变量：

```env
# Strapi API
API_URL=https://your-strapi-instance.example.com
API_TOKEN=your_strapi_api_token

# Cloudflare Access（如果 Strapi 部署在 Cloudflare Access 后方）
CF_ACCESS_ID=your_cf_access_client_id
CF_ACCESS_SECRET=your_cf_access_client_secret

# DeepSeek API（用于 AI 摘要生成）
DEEPSEEK_API_KEY=your_deepseek_api_key
```

### 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:4321](http://localhost:4321)

### 构建

```bash
# 标准构建
npm run build

# 构建并生成 Pagefind 搜索索引
npm run build:pagefind
```

构建产物输出至 `dist/` 目录。

### 预览构建结果

```bash
npm run preview
```

---

## 项目结构

```
src/
├── api/            # Strapi API 封装（文章、分类、导航等）
├── components/     # 可复用 Astro 组件（Navbar、PostCard、AISummary 等）
├── interfaces/     # TypeScript 类型定义
├── layouts/        # 页面布局（BasicStyle）
├── libs/           # 工具函数（fetchAvatar、generateOgImages、strapi 等）
├── pages/          # 路由页面
│   ├── index.astro         # 首页
│   ├── posts/
│   │   ├── [slug].astro    # 文章详情页
│   │   └── [slug].png.ts   # 文章 OG 图生成
│   ├── categories/         # 分类页
│   ├── og.png.ts           # 首页 OG 图生成
│   ├── feed.xml.js         # RSS Feed
│   └── ...
├── styles/
│   └── global.css          # 全局样式（Tailwind + 自定义 ACG 样式）
└── templates/
    └── og-templates/       # OG 图 JSX 模板（Satori）
        ├── post.tsx        # 文章 OG 图模板
        └── site.tsx        # 首页 OG 图模板
```

---

## 贡献

欢迎提交 Issue 和 Pull Request。

1. Fork 本仓库
2. 创建你的特性分支：`git checkout -b feat/your-feature`
3. 提交修改：`git commit -m 'feat: add some feature'`
4. 推送分支：`git push origin feat/your-feature`
5. 发起 Pull Request

---

## License

[MIT](LICENSE) © Seamain
