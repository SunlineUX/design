/* ============================================================
 * base/XCarousel.js — 轮播图（X 前缀基础组件）
 *   自注册到 window.XComponents，模板中使用 <x-carousel>
 *
 *   用法：
 *     <x-carousel :interval="3000">
 *       <x-carousel-item><img src="..."/></x-carousel-item>
 *       <x-carousel-item>...</x-carousel-item>
 *     </x-carousel>
 * ============================================================ */
(function (global) {
  'use strict';

  global.XComponents = global.XComponents || {};

  global.XComponents.XCarousel = {
    props: {
      interval: { type: Number, default: 3000 }, // 0 = 不自动播放
      height: { type: [String, Number], default: 240 },
    },
    setup(props, { slots }) {
      const { ref, computed, onMounted, onUnmounted, useSlots } = global.Vue;
      const current = ref(0);
      let timer = null;

      const count = computed(() => {
        const items = slots.default ? slots.default() : [];
        return items.filter(v => v.type && v.type.name === 'XCarouselItem').length;
      });

      function go(i) {
        const n = count.value;
        if (n === 0) return;
        current.value = (i + n) % n;
      }
      function next() { go(current.value + 1); }
      function prev() { go(current.value - 1); }

      function start() {
        stop();
        if (props.interval > 0) timer = setInterval(next, props.interval);
      }
      function stop() { if (timer) { clearInterval(timer); timer = null; } }

      onMounted(start);
      onUnmounted(stop);

      return { current, count, go, next, prev, start, stop };
    },
    template: `
      <div class="x-carousel" :style="{ height: (typeof height === 'number' ? height : parseInt(height) || 240) + 'px' }" @mouseenter="stop" @mouseleave="start">
        <div class="x-carousel__track" :style="{ transform: 'translateX(-' + (current * 100) + '%)' }">
          <slot />
        </div>
        <button v-if="count > 1" class="x-carousel__arrow x-carousel__arrow--prev" @click="prev" aria-label="上一张">‹</button>
        <button v-if="count > 1" class="x-carousel__arrow x-carousel__arrow--next" @click="next" aria-label="下一张">›</button>
        <div v-if="count > 1" class="x-carousel__dots">
          <span v-for="i in count" :key="i" class="x-carousel__dot" :class="{ active: current === i - 1 }" @click="go(i - 1)"></span>
        </div>
      </div>
    `,
  };

  global.XComponents.XCarouselItem = {
    name: 'XCarouselItem',
    template: `<div class="x-carousel__item"><slot /></div>`,
  };
})(window);
