/* ============================================================
 * ListView.js — 列表页模板展示
 * ============================================================ */
(function (global) {
  'use strict';

  global.ViewComponents = global.ViewComponents || {};

  global.ViewComponents.ListView = {
    setup() {
      const { inject, ref } = global.Vue;
      const t = inject('t');
      const keyword = ref('');
      const data = [
        { id: 1, name: '项目 Alpha', status: '进行中', owner: '张三', date: '2026-09-15' },
        { id: 2, name: '项目 Beta', status: '已完成', owner: '李四', date: '2026-09-12' },
        { id: 3, name: '项目 Gamma', status: '待开始', owner: '王五', date: '2026-09-18' },
        { id: 4, name: '项目 Delta', status: '进行中', owner: '赵六', date: '2026-09-10' },
      ];
      const statusColor = (s) => s === '已完成' ? 'success' : s === '进行中' ? 'primary' : 'default';
      const cList = `<div style="display:flex;justify-content:space-between;margin-bottom:16px">
  <input class="input" v-model="keyword" placeholder="搜索" />
  <x-button variant="primary">新建</x-button>
</div>
<x-table :columns="columns" :data="data" stripe />`;
      return { t, keyword, data, statusColor, cList };
    },
    template: `
      <div class="view-page">
        <h1 class="view-title">{{ t('nav.list') }}</h1>
        <p class="text-secondary">典型列表页模板：搜索栏 + 表格 + 操作。</p>

        <x-waterfall :columns="1" :gap="16">
          <x-demo-block title="列表页模板" :code="cList">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
              <input class="input" v-model="keyword" placeholder="搜索项目名称" style="max-width:240px" />
              <x-button variant="primary"><x-icon name="CircleAdd" :size="14" /> 新建</x-button>
            </div>
            <div style="overflow-x:auto">
              <table style="width:100%;border-collapse:collapse;font-size:14px">
                <thead>
                  <tr style="border-bottom:1px solid var(--border-color)">
                    <th style="text-align:left;padding:12px 8px;color:var(--text-tertiary);font-weight:500">ID</th>
                    <th style="text-align:left;padding:12px 8px;color:var(--text-tertiary);font-weight:500">名称</th>
                    <th style="text-align:left;padding:12px 8px;color:var(--text-tertiary);font-weight:500">状态</th>
                    <th style="text-align:left;padding:12px 8px;color:var(--text-tertiary);font-weight:500">负责人</th>
                    <th style="text-align:left;padding:12px 8px;color:var(--text-tertiary);font-weight:500">日期</th>
                    <th style="text-align:left;padding:12px 8px;color:var(--text-tertiary);font-weight:500">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in data" :key="row.id" style="border-bottom:1px solid var(--border-color)">
                    <td style="padding:12px 8px;color:var(--text-secondary)">{{ row.id }}</td>
                    <td style="padding:12px 8px;font-weight:500">{{ row.name }}</td>
                    <td style="padding:12px 8px"><x-badge :variant="statusColor(row.status)">{{ row.status }}</x-badge></td>
                    <td style="padding:12px 8px;color:var(--text-secondary)">{{ row.owner }}</td>
                    <td style="padding:12px 8px;color:var(--text-tertiary)">{{ row.date }}</td>
                    <td style="padding:12px 8px">
                      <x-space size="sm">
                        <x-button variant="link" size="sm">编辑</x-button>
                        <x-button variant="link" size="sm" style="color:var(--color-danger)">删除</x-button>
                      </x-space>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </x-demo-block>
        </x-waterfall>
      </div>
    `,
  };
})(window);
