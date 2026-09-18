/* ============================================================
 * display/XDemoBlock.js — 演示卡片（带代码展开）
 *   自注册到 window.XComponents，模板中使用 <x-demo-block>
 *
 *   用法：
 *     <x-demo-block title="基础用法" :code="`<x-button>按钮</x-button>`">
 *       <x-button>按钮</x-button>
 *     </x-demo-block>
 * ============================================================ */
(function (global) {
  'use strict';

  global.XComponents = global.XComponents || {};

  global.XComponents.XDemoBlock = {
    props: {
      title: { type: String, default: '' },
      code: { type: String, default: '' },
    },
    setup() {
      const { ref } = global.Vue;
      const showCode = ref(false);
      return { showCode };
    },
    template: `
      <div class="x-demo-block">
        <div class="x-demo-block__header">
          <span class="x-demo-block__title">{{ title }}</span>
          <button v-if="code" class="x-demo-block__code-btn" type="button" @click="showCode = !showCode">
            <x-icon :name="showCode ? 'EyeClose' : 'EyeOpen'" :size="14" />
            <span>{{ showCode ? '隐藏代码' : '查看代码' }}</span>
          </button>
        </div>
        <div class="x-demo-block__body"><slot /></div>
        <div v-if="showCode" class="x-demo-block__code">
          <pre><code>{{ code }}</code></pre>
        </div>
      </div>
    `,
  };
})(window);
