# CWM Frontend Developer Manual

本目录是 CWM 前端完整开发说明书。文档源码、API 生成工具和唯一的 Windows 构建入口都位于 `docs/` 内。

在前端项目根目录可以直接执行：

```bat
docs\make.bat
```

也可以进入文档目录后执行：

```bat
cd docs
make.bat
```

首次构建若缺少 Sphinx：

```bat
python -m pip install -r docs\requirements.txt
```

或在 `docs` 目录中执行：

```bat
python -m pip install -r requirements.txt
```

清理 HTML 构建产物：

```bat
docs\make.bat clean
```

HTML 输出位于 `docs/_build/html/index.html`。

> JavaScript API 参考只扫描正式前端源码 `src/`；测试、构建产物和项目外脚本不参与函数参考生成。

## TypeScript API regeneration

`docs\make.bat` does not require TypeScript merely to render the bundled documentation. If TypeScript is unavailable, the pre-generated JavaScript API pages are kept. Install `typescript` (or set `CWM_TYPESCRIPT_PATH`) when you want the build to regenerate the API from the current `src/` tree and perform AST freshness validation.
