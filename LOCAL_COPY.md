# Room to Share — 本地副本

从 Sites 原始源码仓库复制，未修改应用源码、样式、资源或依赖版本。

- Sites：Room to Share，第 3 版
- 原站：https://room-to-share-gentle-practice-zyx.growngiraffe2.chatgpt.site
- Project ID：`appgprj_6af149aa739c8191ae9071d36cc5e50e`
- 源码提交：`ac6f0c5275b45e17853f15c44a1b24ca227bf807`
- 全部 121 个原始跟踪文件均通过 SHA-256 一致性校验。

## 本地运行

需要 Node.js >= 22.13.0。首次运行：

```sh
npm run install:ci
npm run build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_amusing_ben_urich.sql
npm run dev
```

打开终端打印的本地地址（通常为 http://localhost:5173）。本地数据库初始化命令只需对新数据库执行一次。

当前副本已经安装依赖、完成构建并初始化本地数据库，直接运行 `npm run dev` 即可。已验证首页、模拟登录、会话提示分类筛选，以及笔记的新增、读取、编辑和删除；临时测试笔记已清理。

项目自带本地模拟登录：通过页面的登录入口，或访问 `/signin-with-chatgpt?return_to=/`。本地身份为 `local_seedy`，笔记保存在本项目的 `.wrangler/state/` 中。

## 副本范围

此副本包含完整应用源码、资源、数据库结构与迁移文件。Sites 的现有云端笔记、登录会话和平台托管服务不属于 Git 源码，未复制；本地使用独立数据库与模拟登录。原站没有重新发布或修改。本地 Git 保留 RoomToShare 项目的原有历史与 GitHub remote。

原始开发说明保留在 `README.md`。
