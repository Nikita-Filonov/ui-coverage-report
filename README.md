# UI Coverage Report

[![CI](https://github.com/Nikita-Filonov/ui-coverage-report/actions/workflows/workflow-test.yml/badge.svg)](https://github.com/Nikita-Filonov/ui-coverage-report/actions/workflows/workflow-test.yml)
[![codecov](https://codecov.io/gh/Nikita-Filonov/ui-coverage-report/branch/main/graph/badge.svg)](https://codecov.io/gh/Nikita-Filonov/ui-coverage-report)
[![GitHub stars](https://img.shields.io/github/stars/Nikita-Filonov/ui-coverage-report?style=social)](https://github.com/Nikita-Filonov/ui-coverage-report/stargazers)

You can see a report example [here](https://nikita-filonov.github.io/ui-coverage-tool/).

## Development

Use Node.js 24.15 or newer and npm. To override the public `VITE_` settings, copy `.env.example` to `.env` and edit it.

```shell
npm ci
npm run dev
```

The UI reads report data from the `<script id="state">` element in `index.html`. To load a local `state/state.json` into
the development page, run `npm run load-state` before starting Vite.

Run the same checks as CI with:

```shell
npm run lint
npm run typecheck
npm run test:coverage
npm run build
npm run build:agent
```

`npm run build` writes `build/index.html` with its JavaScript and CSS inlined
for `ui-coverage-tool`. `npm run build:agent` writes `public/agent.global.js`. To update the published agent copy
in `docs`, run:

```shell
npm run deploy:agent
```

If you have any questions, you can ask [@Nikita Filonov](https://t.me/sound_right).
