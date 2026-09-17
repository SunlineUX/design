/* ============================================================
 * i18n.js - 中英文语言包
 *   使用：window.I18N[lang].key 即可拿到对应文案
 *   app.js 内部通过响应式 settings.locale 切换
 * ============================================================ */
window.I18N = {
  'zh-CN': {
    app: {
      title: '设计工程框架',
      subtitle: '基于纯 HTML + Vue 的多主题切换示例工程',
    },
    common: {
      system: '跟随系统',
      toggleSidebar: '切换侧边栏',
      collapseSidebar: '折叠侧边栏',
      expandSidebar: '展开侧边栏',
    },
    nav: {
      design: '设计',
      principle: '原则',
      base: '基础 Base',
      color: '颜色 Color',
      font: '字体 Font',
      normal: '通用 Normal',
      components: '组件 Components',
      button: '按钮 Button',
      icon: '图标 Icon',
      shadow: '阴影 Shadow',
      feedback: '反馈 Feedback',
      
    },
    settings: {
      title: '外观设置',
      sectionAppearance: '外观',
      sectionLanguage: '语言',
      language: '界面语言',
      languageDesc: '切换中英文显示',
      themeColor: '主题色彩',
      themeColorDesc: '影响按钮、链接等强调元素',
      colorMode: '深色 / 浅色',
      colorModeDesc: '切换整体明暗基调',
      density: '页面宽松度',
      densityDesc: '调节间距与留白',
      radius: '圆角风格',
      radiusDesc: '调节组件圆角大小',
      options: {
        light: '浅色',
        dark: '深色',
        compact: '紧凑',
        comfortable: '舒适',
        loose: '宽松',
        sharp: '锐利',
        medium: '中等',
        round: '圆润',
        pill: '药丸',
      },
      save: '保存设置',
      reset: '恢复默认',
      savedTip: '设置已保存',
      resetTip: '已恢复默认设置',
    },
    
  },

  'en-US': {
    app: {
      title: 'Design Skeleton',
      subtitle: 'A pure HTML + Vue scaffold with multi-theme switching',
    },
    common: {
      system: 'Follow system',
      toggleSidebar: 'Toggle sidebar',
      collapseSidebar: 'Collapse sidebar',
      expandSidebar: 'Expand sidebar',
    },
    nav: {
      design: 'Design',
      principle: 'Principles',
      base: 'Base',
      normal: 'Normal',
      components: 'Components',
      button: 'Button',
      color: 'Color',
      font: 'Font',
      icon: 'Icon',
      shadow: 'Shadow',
      feedback: 'Feedback',
    },
    settings: {
      title: 'Appearance',
      sectionAppearance: 'Appearance',
      sectionLanguage: 'Language',
      language: 'Interface language',
      languageDesc: 'Switch between Chinese and English',
      themeColor: 'Theme color',
      themeColorDesc: 'Affects buttons, links and other accents',
      colorMode: 'Light / Dark',
      colorModeDesc: 'Toggle overall brightness',
      density: 'Page density',
      densityDesc: 'Adjust spacing and whitespace',
      radius: 'Corner radius',
      radiusDesc: 'Adjust component roundness',
      options: {
        light: 'Light',
        dark: 'Dark',
        compact: 'Compact',
        comfortable: 'Comfortable',
        loose: 'Loose',
        sharp: 'Sharp',
        medium: 'Medium',
        round: 'Round',
        pill: 'Pill',
      },
      save: 'Save',
      reset: 'Reset',
      savedTip: 'Settings saved',
      resetTip: 'Settings reset to defaults',
    },
  },
};

/* 可用语言列表（用于设置面板渲染） */
window.I18N_LIST = [
  { value: 'zh-CN', label: '中文' },
  { value: 'en-US', label: 'English' },
];
