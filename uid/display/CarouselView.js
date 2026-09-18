/* ============================================================
 * CarouselView.js — 轮播展示
 * ============================================================ */
(function (global) {
  'use strict';

  global.ViewComponents = global.ViewComponents || {};

  global.ViewComponents.CarouselView = {
    setup() {
      const { inject } = global.Vue;
      const t = inject('t');
      const slides = [
        { bg: 'linear-gradient(135deg,#667eea,#764ba2)', title: 'Slide 1', desc: '这是第一张轮播图' },
        { bg: 'linear-gradient(135deg,#f093fb,#f5576c)', title: 'Slide 2', desc: '这是第二张轮播图' },
        { bg: 'linear-gradient(135deg,#4facfe,#00f2fe)', title: 'Slide 3', desc: '这是第三张轮播图' },
      ];
      return { t, slides };
    },
    template: `
      <div class="view-page">
        <h1 class="view-title">{{ t('nav.carousel') }}</h1>
        <p class="text-secondary">轮播图组件，支持自动播放、左右切换、指示点。</p>

        <panel-card title="基础轮播">
          <x-carousel :interval="3000" :height="260">
            <x-carousel-item v-for="(s, i) in slides" :key="i">
              <div :style="{ background: s.bg, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff' }">
                <div style="font-size:28px;font-weight:700;margin-bottom:8px">{{ s.title }}</div>
                <div style="opacity:.85">{{ s.desc }}</div>
              </div>
            </x-carousel-item>
          </x-carousel>
        </panel-card>

        <panel-card title="不自动播放">
          <x-carousel :interval="0" :height="180">
            <x-carousel-item v-for="(s, i) in slides" :key="i">
              <div :style="{ background: s.bg, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 600 }">{{ s.title }}</div>
            </x-carousel-item>
          </x-carousel>
        </panel-card>
      </div>
    `,
  };
})(window);