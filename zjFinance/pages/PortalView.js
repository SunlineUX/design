/* ============================================================
 * zjFinance/pages/PortalView.js — 数据门户业务页
 *   统一承载数据超市、工单、分析、系统管理等菜单页。
 * ============================================================ */
(function (global) {
  'use strict';

  global.ViewComponents = global.ViewComponents || {};

  const PAGE_CONFIG = {
    '/data/catalog': { title: '数据目录', type: 'table', description: '统一浏览和检索企业数据资产。', columns: ['资产名称', '所属主题', '更新频率', '数据负责人'], rows: [['客户主数据', '基础数据', '每日', '数据管理部'], ['航班运行数据', '生产运营', '实时', '运行控制部'], ['合同履约数据', '经营管理', '每日', '财务管理部']] },
    '/data/assets': { title: '数据资产', type: 'metric', description: '掌握数据资产规模、质量和使用情况。', metrics: [['数据资产总量', '2,846', '较上月 +12.6%'], ['已认证资产', '1,238', '认证率 43.5%'], ['本月调用次数', '86,420', '较上月 +8.2%']] },
    '/data/apply': { title: '数据申请', type: 'table', description: '提交数据访问申请并跟踪审批进度。', columns: ['申请单号', '申请内容', '申请时间', '当前状态'], rows: [['DA-20260316-001', '客户标签数据', '2026-03-16', '审批中'], ['DA-20260315-018', '航班运行明细', '2026-03-15', '已通过'], ['DA-20260314-006', '供应商主数据', '2026-03-14', '待补充']] },
    '/tool/reports': { title: '报表中心', type: 'apps', description: '集中管理经营报表和分析结果。', apps: ['经营日报', '财务月报', '客户运营分析', '供应链分析'] },
    '/tool/dashboards': { title: '数据看板', type: 'apps', description: '查看常用经营驾驶舱和实时指标。', apps: ['经营管理驾驶舱', '航班运行看板', '客户服务看板', '资金风险看板'] },
    '/tool/self-analysis': { title: '自助分析', type: 'metric', description: '拖拽数据资产，快速完成临时分析。', metrics: [['可用数据集', '438', '覆盖 12 个主题域'], ['个人分析任务', '26', '本月新增 8 个'], ['共享分析结果', '74', '团队可见']] },
    '/tickets/my': { title: '我的工单', type: 'table', description: '查看我提交的申请和处理进展。', columns: ['工单标题', '类型', '提交时间', '状态'], rows: [['业务规则新增申请单', '业务规则', '2026-03-16', '审批中'], ['基础数据标准修改申请单', '数据标准', '2026-03-12', '已完成'], ['客户标签数据申请单', '数据申请', '2026-03-08', '已完成']] },
    '/tickets/pending': { title: '待办工单', type: 'table', description: '处理当前需要您审批或协同的事项。', columns: ['工单标题', '申请人', '提交时间', '优先级'], rows: [['业务规则新增申请单', '信息技术部 / admin', '2026-03-16', '高'], ['基础数据标准修改申请单', '信息技术部 / admin', '2026-03-15', '中'], ['营销活动数据申请单', '市场部 / 王XX', '2026-03-14', '普通']] },
    '/tickets/done': { title: '已办工单', type: 'table', description: '查看已经处理完成的工单记录。', columns: ['工单标题', '处理结果', '完成时间', '处理人'], rows: [['航班准点率数据申请', '已通过', '2026-03-12', '王XX'], ['供应商主数据修改', '已驳回', '2026-03-10', '王XX'], ['报表订阅申请', '已通过', '2026-03-08', '王XX']] },
    '/applications/management': { title: '管理驾驶舱', type: 'metric', description: '从经营、财务、运营多个维度掌握整体运行状态。', metrics: [['本月经营收入', '¥ 8,642 万', '较同期 +14.2%'], ['活跃客户数', '12,486', '较上月 +6.8%'], ['业务完成率', '96.4%', '较同期 +2.1%']] },
    '/applications/decision': { title: '决策信息门户', type: 'apps', description: '面向管理层的综合决策信息入口。', apps: ['经营分析总览', '重点项目跟踪', '风险预警中心', '组织绩效分析'] },
    '/applications/operations': { title: '运营管理系统', type: 'apps', description: '统一进入各运营业务系统。', apps: ['客户运营平台', '航班运营平台', '服务质量平台', '供应链协同平台'] },
    '/analysis/overview': { title: '运营总览', type: 'metric', description: '查看业务运行趋势和关键运营指标。', metrics: [['今日业务量', '18,426', '较昨日 +5.7%'], ['服务及时率', '98.2%', '目标 97%'], ['异常事项', '23', '较昨日 -12.4%']] },
    '/analysis/reports': { title: '运营分析报表', type: 'table', description: '按主题查看运营分析报表。', columns: ['报表名称', '所属主题', '更新时间', '订阅状态'], rows: [['客户服务质量月报', '客户服务', '今天 09:20', '已订阅'], ['航班运行效率分析', '生产运营', '昨天 18:30', '未订阅'], ['资金周转效率分析', '财务管理', '2026-03-14', '已订阅']] },
    '/system/users': { title: '用户管理', type: 'table', description: '维护门户用户、组织和岗位信息。', columns: ['用户姓名', '所属部门', '角色', '状态'], rows: [['王XX', '业务管理部', '业务员', '启用'], ['李XX', '信息技术部', '数据管理员', '启用'], ['赵XX', '财务管理部', '审批人', '启用']] },
    '/system/roles': { title: '角色管理', type: 'table', description: '配置角色权限范围和数据访问边界。', columns: ['角色名称', '成员数量', '权限范围', '状态'], rows: [['业务员', '128', '业务数据查询', '启用'], ['数据管理员', '12', '数据资产管理', '启用'], ['系统管理员', '6', '全量管理权限', '启用']] },
    '/system/permissions': { title: '权限管理', type: 'apps', description: '管理菜单、操作和数据权限。', apps: ['菜单权限', '操作权限', '数据权限', '接口权限'] },
    '/system/logs': { title: '操作日志', type: 'table', description: '查询门户操作记录和安全审计信息。', columns: ['操作时间', '操作用户', '操作内容', '结果'], rows: [['2026-03-16 10:32', '王XX', '查看客户主数据', '成功'], ['2026-03-16 10:18', '李XX', '修改数据标准', '成功'], ['2026-03-16 09:46', '赵XX', '审批数据申请', '成功']] },
    '/user-center': { title: '个人中心', type: 'profile', description: '管理个人资料、消息通知和常用设置。' },
  };

  global.ViewComponents.PortalView = {
    setup() {
      const { computed, inject } = global.Vue;
      const route = global.VueRouter.useRoute();
      const t = inject('t');
      const page = computed(() => PAGE_CONFIG[route.path] || { title: '页面建设中', type: 'apps', description: '该目录正在接入更多数据服务。', apps: [] });
      return { t, page };
    },
    template: `
      <div class="view-portal">
        <div class="portal-page-heading">
          <div>
            <p class="portal-eyebrow">数据管理门户</p>
            <h1 class="view-title">{{ page.title }}</h1>
            <p class="portal-description">{{ page.description }}</p>
          </div>
          <button class="x-button x-button--primary">新建申请</button>
        </div>

        <div v-if="page.type === 'metric'" class="portal-metric-grid">
          <div v-for="metric in page.metrics" :key="metric[0]" class="card portal-metric-card">
            <span class="portal-card-label">{{ metric[0] }}</span>
            <strong>{{ metric[1] }}</strong>
            <small>{{ metric[2] }}</small>
          </div>
        </div>

        <div v-else-if="page.type === 'apps'" class="portal-app-grid">
          <div v-for="(app, index) in page.apps" :key="app" class="card portal-app-card">
            <span class="portal-app-icon">{{ ['◈', '▦', '◌', '✦'][index % 4] }}</span>
            <div><h3>{{ app }}</h3><p>进入查看相关内容</p></div>
            <span class="portal-app-arrow">→</span>
          </div>
        </div>

        <div v-else-if="page.type === 'profile'" class="card portal-profile-card">
          <div class="portal-avatar">王</div>
          <div><h2>王XX</h2><p>业务员 · 业务管理部</p><p>负责业务数据申请、报表订阅和运营信息跟踪。</p></div>
        </div>

        <div v-else class="card portal-table-card">
          <div class="portal-table-toolbar"><strong>{{ page.title }}列表</strong><input placeholder="搜索关键词" /><button class="x-button">筛选</button></div>
          <div class="portal-table-wrap"><table><thead><tr><th v-for="column in page.columns" :key="column">{{ column }}</th></tr></thead><tbody><tr v-for="row in page.rows" :key="row[0]"><td v-for="cell in row" :key="cell">{{ cell }}</td></tr></tbody></table></div>
        </div>
      </div>
    `,
  };
})(window);
