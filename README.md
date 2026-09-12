# design

基于纯 HTML + Vue 3（CDN 全局构建版本）的工程代码框架，无需打包工具。

## 快速开始

```bash
python3 -m http.server 5173
# 访问 http://localhost:5173/index.html   —— 旧版单页演示
# 访问 http://localhost:5173/dashboard.html —— 新版组件化管理后台
```

---

## 目录结构

```
design/
├── index.html               # 旧版：单页五项切换演示
├── dashboard.html           # 新版：组件化管理后台入口
├── README.md
└── assets/
    ├── css/
    │   ├── variables.css     # 所有可切换的 CSS 变量（主题色/深浅/密度/圆角）
    │   ├── base.css         # 基础重置、排版、布局工具
    │   ├── components.css   # 组件样式（按钮/卡片/表单/面板/Toast 等）
    │   └── layout.css       # 管理后台布局样式（AppLayout / Sidebar / Header）
    └── js/
        ├── i18n.js          # 中英文语言包（zh-CN / en-US）
        ├── settings.js      # 全局外观设置管理（响应式 + localStorage + system 模式）
        ├── app.js           # 旧版 index.html 的 Vue 入口
        └── components/
            ├── index.js     # 组件统一注册入口
            ├── base/
            │   └── BaseComponents.js       # Icon / BaseButton / SegmentedControl / Badge
            ├── layout/
            │   └── LayoutComponents.js     # AppLayout / AppHeader / AppSidebar / Breadcrumb / SidebarItem / Logo
            ├── panels/
            │   └── PanelComponents.js      # PanelCard / ThemeSwitcher / LanguagePanel / ColorPicker
            └── views/
                └── ViewComponents.js       # HomeView / AboutView
```

---

## 五项切换能力

| 能力 | 触发方式 | 实现 |
| --- | --- | --- |
| 中英文语言切换 | 顶栏分段控件 / 设置面板 | `I18N[locale]` 响应式字典 + `t()` 函数 |
| 主题色彩切换 | 设置面板色板 | `<html data-theme-color="indigo\|emerald\|rose\|amber\|sky">` |
| 浅色 / 深色 / 跟随系统 | 顶栏按钮 / 设置面板 | `<html data-theme="light\|dark">`（system 模式自动解析） |
| 页面宽松度调节 | 设置面板分段控件 | `<html data-density="compact\|comfortable\|loose">` |
| 圆角风格切换 | 设置面板分段控件 | `<html data-radius="sharp\|medium\|round\|pill">` |

所有视觉变化均由 `variables.css` 中的 CSS 变量驱动，切换时无需重新渲染组件，仅在 `<html>` 上设置 `data-*` 属性即可全局生效。

---

## 组件化架构（dashboard.html）

### 依赖方向（无循环）

```
base (基础 UI)
  ↑
layout (布局骨架)
  ↑
panels (业务面板)
  ↑
views (页面视图)
```

### 组件嵌套树

```
AppLayout (整体骨架)
├── AppHeader (顶栏)
│   ├── Logo
│   ├── SidebarControl
│   ├── Breadcrumb
│   └── HeaderActions (slot)
│       ├── SegmentedControl (语言)
│       ├── BaseButton (深浅模式)
│       ├── BaseButton (设置)
│       └── UserAvatar
├── AppSidebar (可折叠侧边栏)
│   └── SidebarItem (递归，支持多级菜单)
│       └── SidebarItem ...
└── AppMain (slot 出口)
    ├── HomeView
    │   ├── ThemeSwitcher → SegmentedControl + Badge
    │   └── LanguagePanel → Badge + BaseButton
    └── AboutView → PanelCard
```

### 关键设计

- **状态单一真相源**：`settings.js` 通过 `Vue.reactive` 管理所有设置，`components/index.js` 只做注册，不持有状态。
- **props 向下传递**：`collapsed`、`activeKey` 等状态通过 `AppLayout → AppSidebar → SidebarItem` 层层 props 传递，避免 spread 对象导致的响应式丢失。
- **事件向上冒泡**：子组件通过 `$emit` 通知父组件，再由父组件更新 settings 状态。
- **CSS 变量驱动**：所有组件样式引用 `variables.css` 的变量，不硬编码颜色/间距/圆角，确保五项切换自动联动。
- **system 模式**：`colorMode: 'system'` 时，`settings.js` 通过 `matchMedia` 实时监听系统主题变化，暴露 `resolvedMode` computed 供 UI 展示实际生效值。

---

## 持久化

用户设置通过 `localStorage`（key: `design.settings.v1`）自动持久化。`dashboard.html` 与 `index.html` 的 `<head>` 内均有轻量脚本在 Vue 挂载前应用存储的设置，避免首屏闪烁。

---

## 扩展指引

- **新增主题色**：`variables.css` 追加 `[data-theme-color="xxx"]` + `settings.js` 的 `ENUMS.themeColor` 注册。
- **新增语言**：`i18n.js` 添加字典 + `ENUMS.locale` 注册。
- **新增菜单**：在 `dashboard.html` 的 `setup()` 里 `menuItems` computed 中追加 `{ key, label, icon, children? }` 项。
- **新增页面**：在 `views/ViewComponents.js` 添加视图组件 → 在 `AppLayout` 的 slot 里加 `v-if="activeKey === 'xxx'"` → 在 `menuItems` 里注册 key。
- **新增组件**：按依赖层放到 `components/` 对应子目录 → `components/index.js` 里 `app.component()` 注册。
