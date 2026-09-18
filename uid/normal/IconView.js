/* ============================================================
 * IconView.js — 图标展示
 * ============================================================ */
(function (global) {
  'use strict';

  global.ViewComponents = global.ViewComponents || {};

  global.ViewComponents.IconView = {
    setup() {
      const { inject, ref } = global.Vue;
      const t = inject('t');

      const icons = [
        'HomeFilled','Compass','Crown','Atom03','Bezier01','Component','Transform',
        'StarFilled','HeartFilled','DiamondFilled','MagicFilled','TrophyFilled','Award01','Award02',
        'SettingFilled','SettingNutFilled','UserInfoFilled','CustomerServiceFilled','ProtectFilled','WalletFilled',
        'Search','Filter','EyeOpen','EyeClose','Edit','Delete','Copy','Close','Clean','Choose','Save',
        'ArrowLeft','ArrowRight','ArrowUp','ArrowDown','DoubleLeft','DoubleRight',
        'PointLeft','PointRight','PointUp','PointDown','CircleAdd','CircleRemove',
        'ClockFilled','CalendarFilled','CameraFilled','ScreenFilled','PhoneFilled','DeviceMonitor1','DeviceLaptop1',
        'Database01','DatabaseCloud','Cpu','Server01','CodeBrowser','Terminal','GitBranch','Bug',
        'LayoutLeft','LayoutRight','LayoutTop','LayoutDashboard','LayoutPanelTop','SidebarLeftExpand','SidebarLeftCollapse',
        'BubbleChart','DataHistogram','LayersThree','LayersTwo','Grid01','Waterfall',
        'Book','Books','Notebook','Newspaper','QrCode','Map','Rocket','Sparkle','AiRobot02','AiGenerate',
        'Bold','Italic','UnderLine','TextStrikeThrough','Quote','Table','Code','ClearFormat',
      ];
      const sizes = [14, 16, 20, 24, 32, 48];

      return { t, icons, sizes };
    },
    template: `
      <div class="view-page">
        <h1 class="view-title">{{ t('nav.icon') }}</h1>
        <p class="text-secondary">基于 iconfont 字体图标，通过 <code>name</code> 指定图标名，<code>size</code> 控制大小。</p>

        <panel-card title="图标列表 Icon List">
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(90px,1fr));gap:12px">
            <div v-for="icon in icons" :key="icon" style="display:flex;flex-direction:column;align-items:center;gap:6px;padding:12px;border:1px solid var(--border-color);border-radius:var(--radius-md);cursor:pointer;transition:all var(--transition-base)" :title="icon">
              <x-icon :name="icon" :size="22" />
              <span style="font-size:11px;color:var(--text-tertiary);text-align:center;word-break:break-all">{{ icon }}</span>
            </div>
          </div>
        </panel-card>

        <panel-card title="图标尺寸 Icon Sizes">
          <div style="display:flex;align-items:flex-end;gap:24px">
            <div v-for="s in sizes" :key="s" style="display:flex;flex-direction:column;align-items:center;gap:8px">
              <x-icon name="HomeFilled" :size="s" />
              <span style="font-size:12px;color:var(--text-tertiary)">{{ s }}px</span>
            </div>
          </div>
        </panel-card>
      </div>
    `,
  };
})(window);
