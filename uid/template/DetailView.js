/* ============================================================
 * DetailView.js — 详情页模板展示
 * ============================================================ */
(function (global) {
  'use strict';

  global.ViewComponents = global.ViewComponents || {};

  global.ViewComponents.DetailView = {
    setup() {
      const { inject } = global.Vue;
      const t = inject('t');
      const info = [
        { label: '项目名称', value: '设计工程框架' },
        { label: '负责人', value: '张三' },
        { label: '创建时间', value: '2026-09-01 10:00' },
        { label: '状态', value: '进行中' },
        { label: '优先级', value: '高' },
        { label: '所属团队', value: '设计团队' },
      ];
      return { t, info };
    },
    template: `
      <div class="view-page">
        <h1 class="view-title">{{ t('nav.detail') }}</h1>
        <p class="text-secondary">典型详情页模板：标题区 + 信息网格 + 描述。</p>

        <panel-card>
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px">
            <div>
              <h2 style="margin:0 0 8px">设计工程框架</h2>
              <x-space size="md">
                <x-badge variant="primary">进行中</x-badge>
                <span style="color:var(--text-tertiary);font-size:13px">ID: #202609001</span>
              </x-space>
            </div>
            <x-space size="sm">
              <x-button variant="ghost">返回</x-button>
              <x-button variant="primary"><x-icon name="Edit" :size="14" /> 编辑</x-button>
            </x-space>
          </div>

          <x-divider />

          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px;margin:20px 0">
            <div v-for="item in info" :key="item.label" style="display:flex;flex-direction:column;gap:4px">
              <span style="color:var(--text-tertiary);font-size:13px">{{ item.label }}</span>
              <span style="font-weight:500">{{ item.value }}</span>
            </div>
          </div>

          <x-divider />

          <div style="margin-top:20px">
            <h3 style="margin:0 0 12px">项目描述</h3>
            <p style="color:var(--text-secondary);line-height:1.8;margin:0">
              本项目旨在构建一套基于纯 HTML + Vue 的设计工程框架，支持多主题切换、国际化、响应式布局等能力，
              通过 CSS 变量驱动视觉系统，无需重新编译即可切换主题色、深浅模式、页面宽松度与圆角风格。
            </p>
          </div>
        </panel-card>
      </div>
    `,
  };
})(window);
