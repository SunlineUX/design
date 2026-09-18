/* ============================================================
 * base/XTable.js — 表格（X 前缀基础组件）
 *   columns: [{ key, title, width, render(row) }]
 *   data: 数组
 *   自注册到 window.XComponents，模板中使用 <x-table>
 * ============================================================ */
(function (global) {
  'use strict';

  global.XComponents = global.XComponents || {};

  global.XComponents.XTable = {
    props: {
      columns: { type: Array, required: true },
      data: { type: Array, default: () => [] },
      rowKey: { type: String, default: 'id' },
      bordered: { type: Boolean, default: true },
      stripe: { type: Boolean, default: false },
    },
    template: `
      <div class="x-table-wrap" :class="{ 'x-table--bordered': bordered }">
        <table class="x-table">
          <thead>
            <tr>
              <th v-for="col in columns" :key="col.key" :style="col.width ? { width: col.width } : {}">{{ col.title }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, i) in data" :key="row[rowKey] || i" :class="{ 'x-table__row--stripe': stripe && i % 2 === 1 }">
              <td v-for="col in columns" :key="col.key">
                <slot :name="'col-' + col.key" :row="row" :index="i">
                  {{ col.render ? col.render(row) : row[col.key] }}
                </slot>
              </td>
            </tr>
            <tr v-if="!data.length">
              <td :colspan="columns.length" class="x-table__empty">暂无数据</td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
  };
})(window);
