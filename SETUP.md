# 个人学术主页

基于 Minimal Light，已根据 resume.pdf 填充英文主页，保留中文姓名。

## 内容维护

- `_config.yml`：姓名、机构、邮箱、Google Scholar、GitHub、CV 与头像。
- `index.md`：简介、研究方向、教育、研究经历。
- `_data/publications.yml`：全部 5 篇论文，按 published / preprint 分组。
- `assets/img/profile.jpg`：用户提供的个人主页形象照。
- `resume.pdf`：保留原简历；主页的 CV 入口目前隐藏，重新填写 `_config.yml` 中的 `cv_link` 可显示。
- `CONTENT_SOURCES.md`：内容依据与状态说明（不进入生成站点）。

## 本地自动预览

在项目根目录打开终端，运行：

```sh
python3 scripts/preview.py
```

打开 http://127.0.0.1:4173/ 。保存 `index.md`、`_includes/`、`_data/`、`_config.yml`、模板、图片或样式后，页面会自动生成，浏览器自动刷新。启动脚本运行期间保持终端打开；按 Ctrl+C 停止。

脚本使用本机 Python 3 和 Ruby，通过 Liquid、Kramdown 和 Sass 渲染当前站点。输出与依赖分别位于 `.preview/` 和 `.preview-gems/`，均不提交到 Git。它用于这个主页的本地预览，发布仍由 Jekyll 构建。

若依赖缓存丢失，在项目根目录重新安装：

```sh
gem install liquid -v 4.0.4 --install-dir .preview-gems --no-document
gem install kramdown -v 1.17.0 --install-dir .preview-gems --no-document
gem install sass -v 3.4.25 --install-dir .preview-gems --no-document
```

若端口被占用，先关闭旧预览服务，或运行 `python3 scripts/preview.py --port 4174`，再访问对应端口。仅生成一次可运行 `python3 scripts/preview.py --build-only`。

发生 Markdown、数据或样式解析错误时，终端会显示原因；预览保留上一次成功页面，修正并保存后自动恢复。

## 部署

发布仓库：https://github.com/brucelmy02/brucelmy02.github.io 。主页地址：https://brucelmy02.github.io/ 。新主页使用 main 分支根目录，通过 GitHub Pages 的 Deploy from a branch 构建。

旧网站保存于 backup-old-site 分支（原提交 0b051ac）。旧站采用 GitHub Actions 构建；如需恢复，应恢复旧代码和旧工作流，并将 Pages 的 Source 切回 GitHub Actions 后重新运行旧工作流。

resume.pdf 仅作为本地资料保留，已加入 .gitignore，不上传公开仓库。主页内容、头像和论文配图来自本项目源码；.preview/ 与 .preview-gems/ 仅供本地预览。

GitHub Pages 可从 main 分支根目录构建 Jekyll。头像、论文配图可在后续替换；全部 5 篇论文已配图，点击缩略图可查看完整图片；FrameFold 使用用户提供 PDF 中的 Figure 3，并提供 Website 按钮。

## 本次验证

可在项目根目录运行预览脚本的回归检查：

```sh
python3 -m unittest discover -s scripts/tests -v
```

检查在临时副本中运行，不修改主页内容。覆盖空链接与空 Analytics、删除文件后的预览清理、刷新版本号一致性，以及构建失败时保留旧页面。

已通过上述 5 项检查、5 篇论文分组检查、生成 HTML 的 52 处资源和链接引用检查（仅核对本地路径与菜单锚点）、JavaScript 与 Ruby 语法检查。

本机系统 Ruby 2.6 的完整 Jekyll 原生扩展构建尚未通过。现有本地预览采用相同的 Liquid + Kramdown 内容渲染组件，并直接编译 Sass；浏览器视觉检查此前被自动审批拦截，尚未完成。
