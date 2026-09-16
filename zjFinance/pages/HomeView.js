/* ============================================================
 * zjFinance/pages/HomeView.js — 数据门户首页
 *   自注册到 window.ViewComponents，供 routes.js 按 key 引用
 * ============================================================ */
(function (global) {
  'use strict';

  global.ViewComponents = global.ViewComponents || {};

  global.ViewComponents.HomeView = {
    setup() { return {}; },
    template: `
      <div class="view-portal-home">
        <section class="portal-welcome">
          <p class="portal-eyebrow">中集金融 · 数据管理门户</p>
          <h1>数据赋能业务，智慧驱动未来</h1>
          <p>统一数据管理门户，让数据价值触手可及</p>
        </section>
        <div class="portal-home-grid">
          <section class="card portal-home-card">
            <div class="portal-section-heading"><h2>我的工单</h2><a href="#/tickets/my">更多 →</a></div>
            <div class="portal-tabs"><span class="is-active">待办事项 <b>16</b></span><span>已办事项 <b>108</b></span><span>我的申请 <b>65</b></span></div>
            <ul class="portal-list"><li><strong>业务规则新增申请单</strong><small>信息技术部 · 2026-03-16</small></li><li><strong>基础数据标准修改申请单</strong><small>信息技术部 · 2026-03-15</small></li><li><strong>客户标签数据申请单</strong><small>业务管理部 · 2026-03-14</small></li></ul>
          </section>
          <section class="card portal-home-card">
            <div class="portal-section-heading"><h2>消息提醒</h2><a href="#/tickets/my">更多 →</a></div>
            <ul class="portal-list portal-message-list"><li>【业务规则】有新的审批事项需要处理</li><li>【数据标准】基础数据标准已完成更新</li><li>【系统通知】本周六进行系统维护</li><li>【运营分析】新的月度报表已经发布</li></ul>
          </section>
          <section class="card portal-home-card portal-home-wide">
            <div class="portal-section-heading"><h2>常看内容</h2><a href="#/tool/dashboards">更多 →</a></div>
            <div class="portal-tabs"><span class="is-active">看板</span><span>报表</span><span>数据资产目录</span></div>
            <div class="portal-mini-table"><div><span>看板名称</span><span>看板分类</span></div><div><span>经营管理驾驶舱</span><span>经营分析</span></div><div><span>航班运行看板</span><span>生产运营</span></div><div><span>客户服务看板</span><span>客户运营</span></div></div>
          </section>
          <section class="card portal-home-card">
            <div class="portal-section-heading"><h2>数字化应用</h2><a href="#/applications">更多 →</a></div>
            <div class="portal-quick-apps"><a href="#/applications/management"><span>◈</span>管理驾驶舱</a><a href="#/applications/decision"><span>▦</span>决策信息门户</a><a href="#/applications/operations"><span>✦</span>运营管理系统</a></div>
          </section>
        </div>
        <section class="portal-assistant"><span class="portal-assistant-icon">✦</span><div><strong>智能助手</strong><p>试试输入“查询本月经营数据”，快速获取分析结果</p></div><a href="#/tool/self-analysis">开始问数 →</a></section>
      </div>
    `,
  };
})(window);
