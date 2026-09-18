/* ============================================================
 * TableView.js — 表格展示
 * ============================================================ */
(function (global) {
  'use strict';

  global.ViewComponents = global.ViewComponents || {};

  global.ViewComponents.TableView = {
    setup() {
      const { inject } = global.Vue;
      const t = inject('t');
      const columns = [
        { key: 'id', title: 'ID', width: '60px' },
        { key: 'name', title: '名称' },
        { key: 'status', title: '状态', render: (r) => r.status },
        { key: 'owner', title: '负责人' },
        { key: 'date', title: '日期' },
      ];
      const data = [
        { id: 1, name: '项目 Alpha', status: '进行中', owner: '张三', date: '2026-09-15' },
        { id: 2, name: '项目 Beta', status: '已完成', owner: '李四', date: '2026-09-12' },
        { id: 3, name: '项目 Gamma', status: '待开始', owner: '王五', date: '2026-09-18' },
      ];
      const statusColor = (s) => s === '已完成' ? 'success' : s === '进行中' ? 'primary' : 'default';
      return { t, columns, data, statusColor };
    },
    template: `
      <div class="view-page">
        <h1 class="view-title">{{ t('nav.table') }}</h1>
        <p class="text-secondary">表格组件，支持自定义列、斑马纹、边框。</p>

        <panel-card title="基础表格">
          <x-table :columns="columns" :data="data" stripe>
            <template #col-status="{ row }">
              <x-badge :variant="statusColor(row.status)">{{ row.status }}</x-badge>
            </template>
          </x-table>
        </panel-card>

        <panel-card title="空数据">
          <x-table :columns="columns" :data="[]" />
        </panel-card>
      </div>
    `,
  };
})(window);