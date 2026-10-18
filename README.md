# 邱彦岚 · 交互式作品集

React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion + React Router。

## 运行

需要 Node.js 18+（推荐 22 LTS）。

```bash
cd web
npm install
npm run dev        # 本地开发 http://localhost:5173
npm run build      # 类型检查 + 生产构建到 dist/
npm run preview    # 本地预览生产构建
```

## 路由

| 路径 | 页面 |
| --- | --- |
| `/` | 首页 |
| `/about` | 个人介绍 |
| `/projects` | 作品集（`?c=yy|game|uxui|art` 分类筛选，可分享） |
| `/projects/:slug` | 项目详情（slug 见 `src/data/projects.ts`） |
| `/motion` | 动态影像 |
| `/experience` | 经历与技能 |
| `/contact` | 联系方式 |
| 其他 | 自定义 404 |

项目 slug：`rose-upgrade`、`live-ui`、`face-sculpting`、`kora-404`、`light-within`、`poems-of-the-sea`。

## 目录结构

```
web/
  public/
    work/<id>/NN.jpg   由长图切出的版面分段
    kora/              KORA 404 精选图
    images/            头像、直播间效果图
    videos/            （放置视频文件）
    _redirects         Netlify SPA 回退
  scripts/slice-images.ps1   把 ../assets/work 的长图切片到 public/work
  src/
    data/site.ts       个人信息、导航、经历、技能、荣誉
    data/projects.ts   所有作品：文案、图片、视频、设计过程
    components/        Layout、Nav、Footer、Cursor、Lightbox、VideoSlot、ProjectCard、ui
    pages/             各路由页面
  vercel.json / netlify.toml   部署回退配置
```

## 替换素材

- 文案：改 `src/data/site.ts`。
- 作品图片与介绍：改 `src/data/projects.ts` 中对应项目的 `cover`、`sheets`、`extras`、`process`。
- 新长图：把文件放入 `../assets/work`，在 `scripts/slice-images.ps1` 的映射里加一行并运行脚本（Windows PowerShell），再在 `projects.ts` 里引用。
- 视频：把 mp4 放进 `public/videos/`，然后在 `projects.ts` 里把对应项目 `video.src` 填成 `/videos/xxx.mp4`；`poster` 为封面。`src` 为空时，页面显示 “VIDEO SLOT” 占位。新增视频项目只需给项目加 `video` 字段，`/motion` 页会自动收录。

## 部署

构建产物为静态文件，SPA 回退已配置，刷新子页面和直接访问 `/projects/kora-404` 不会 404。

Vercel：
1. 把仓库推到 GitHub。
2. Vercel 中 Import 仓库，Root Directory 设为 `web`。
3. Framework 选 Vite，Build Command `npm run build`，Output `dist`。`vercel.json` 已含回退规则。

Netlify：
1. Import 仓库，Base directory 设为 `web`。
2. Build command `npm run build`，Publish directory `dist`。`netlify.toml` 和 `public/_redirects` 已含回退规则。

或命令行：`npx vercel --prod` / `npx netlify deploy --prod --dir=dist`。
