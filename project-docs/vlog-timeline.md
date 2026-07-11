# Vlog Timeline - IELTS Topic Collocation

这个文档用于之后制作项目 vlog。它不是完整技术日志，而是把可讲述的产品演进、画面素材和关键转折整理成一条时间线。

## 一句话故事线

从一个 IELTS Writing Task 2 话题搭配离线工具开始，逐步加入记忆复习、Topic Reel 动画、Recent Topic 直达练习、Anki/Notion 同步，再整理成一个普通用户能直接打开、素材和工程文件分开的学习项目。

## 时间线

| 日期 | 节点 | Vlog 讲法 | 可展示素材 |
| --- | --- | --- | --- |
| 2026-06-10 | 初版离线学习工具 | 项目从一个可直接打开的 IELTS 话题搭配训练页开始，目标是把 Task 2 常见话题里的英文搭配做成可复习、可回忆的学习工具。 | `open-here/ielts-topic-collocation.html`、`project-docs/docs/images/study-page.png` |
| 2026-06-10 | README 图文说明 | 开始把项目从“自己能用”整理成“别人一看就知道怎么用”，加入截图和学习流程说明。 | `README.md`、`project-docs/docs/images/readme-study-grid.png`、`project-docs/docs/images/zen-mode.png` |
| 2026-06-12 | Native Android 方向探索 | 尝试把学习体验迁移到 Android 原生应用，做过数据仓库、复习调度、页面导航和记忆导入导出。这个阶段可以作为“曾经想做 App”的分支故事。 | Git 历史中的 Android commits、`project-artifacts/apk/debug-builds/IELTS-Topic-Collocation-debug.apk` |
| 2026-06-15 至 2026-06-30 | Anki 和表达库扩展 | 重点从页面体验扩展到学习资料本身，包括 Anki 导出、同义替换面板、表达模板审核和备份。 | `project-artifacts/exports/anki/full-export/`、`project-artifacts/synonym-curation/` |
| 2026-06-26 | Topic Reel 动画升级 | 首页从静态入口变成更有记忆点的 topic reel，强调话题卡片之间的连续移动，而不是简单切换。 | `project-artifacts/visual-previews/workbench/screenshots/topic-reel-landing-desktop.png`、`project-artifacts/visual-previews/workbench/screenshots/topic-reel-animation-mid-desktop.png` |
| 2026-06-26 | README 最终截图刷新 | 项目展示材料更新为真实最终界面截图，让 README 更像产品介绍页。 | `project-docs/docs/images/readme-topic-reel-home.png`、`project-docs/docs/images/readme-topic-reel-transition.png`、Git commit `8a4493c` |
| 2026-07-04 | Recent Topic / Focus Deck 入口 | 把学习入口改得更直接：最近热题不再让学生多绕一层选择，而是从 focus card 直接进入搭配练习。 | `project-artifacts/visual-previews/workbench/screenshots/recent-topic-focus-deck-desktop.png`、`project-artifacts/visual-previews/workbench/screenshots/recent-topic-focus-deck-mobile.png` |
| 2026-07-07 | 项目结构整理 | 当前整理把用户打开的内容、网页源代码、项目文档、导出和 QA 素材分开，方便以后教学、展示、归档和继续开发。 | `open-here/`、`web-source/`、`project-docs/`、`project-artifacts/` |

## Git 版本节点

| Commit | 日期 | 含义 |
| --- | --- | --- |
| `8cc9a94` | 2026-06-10 | 初始 IELTS topic collocation tool |
| `3042212` | 2026-06-10 | 加入图文 README |
| `ee61f29` | 2026-06-12 | 导出 native Android 学习数据 |
| `3fc5d1e` | 2026-06-12 | 启用 Kotlin Compose Android app |
| `5d2de22` | 2026-06-12 | 构建 native study screens |
| `e69b96b` | 2026-06-12 | 加入 native memory import/export |
| `899339b` | 2026-06-26 | 改进 topic reel morph animation |
| `8a4493c` | 2026-06-26 | 刷新 README 最终截图 |

## Vlog 拍摄结构

1. 开场：展示 `open-here/ielts-topic-collocation.html`，说明它是给 IELTS Task 2 话题搭配做的离线学习工具。
2. 问题：学生知道中文意思，但写作时想不起自然英文搭配。
3. 第一版：卡片式回忆和话题分类。
4. 学习闭环：Mark、Memory bank、Zen mode、导入导出学习记录。
5. 设计升级：Topic Reel 让首页更像一个可以探索的话题入口。
6. 热题入口：Recent Topic / Focus Deck 让最近题目直接进入练习。
7. 学习资料扩展：Anki、Notion、同义表达和模板审核。
8. 收尾：整理项目结构，保留 `open-here/` 给普通用户，保留 `project-artifacts/` 给以后复盘和剪辑。

## 可用画面素材清单

- 最终可打开页面：`open-here/ielts-topic-collocation.html`
- README 展示截图：`project-docs/docs/images/`
- Topic Reel 和 Recent Topic 预览：`project-artifacts/visual-previews/workbench/screenshots/`
- QA 截图：`project-artifacts/screenshots/qa/`
- Anki 导出素材：`project-artifacts/exports/anki/full-export/`
- Android 探索产物：`project-artifacts/apk/debug-builds/IELTS-Topic-Collocation-debug.apk`

## 后续记录规则

- 每完成一个可讲述的阶段，先提交 Git，再在这里加一行时间线。
- 如果只是改错字或小修，不需要写进 vlog 时间线。
- 如果新增了截图、演示视频或导出包，把路径写到“可展示素材”列。
- 重要节点尽量保留一个 commit hash，方便以后回到当时的版本录屏。
