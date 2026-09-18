/* ============================================================
 * InputView.js — 输入框展示
 * ============================================================ */
(function (global) {
  'use strict';

  global.ViewComponents = global.ViewComponents || {};

  global.ViewComponents.InputView = {
    setup() {
      const { inject, ref } = global.Vue;
      const t = inject('t');
      const text = ref('');
      const textarea = ref('');
      const cInput = `<input class="input" v-model="text" placeholder="请输入" />
<input class="input" type="password" placeholder="密码" />
<input class="input" disabled placeholder="禁用" />`;
      const cTextarea = `<textarea class="textarea" v-model="textarea"
  placeholder="请输入..."></textarea>`;
      return { t, text, textarea, cInput, cTextarea };
    },
    template: `
      <div class="view-page">
        <h1 class="view-title">{{ t('nav.input') }}</h1>
        <p class="text-secondary">输入框组件，支持基础输入、文本域、禁用等状态。</p>

        <x-waterfall :columns="2" :gap="16">
          <x-demo-block title="基础输入框" :code="cInput">
            <div style="display:flex;flex-direction:column;gap:16px">
              <div class="field">
                <label class="label">用户名</label>
                <input class="input" v-model="text" placeholder="请输入用户名" />
              </div>
              <div class="field">
                <label class="label">密码</label>
                <input class="input" type="password" placeholder="请输入密码" />
              </div>
              <div class="field">
                <label class="label">禁用状态</label>
                <input class="input" disabled placeholder="不可输入" />
              </div>
            </div>
          </x-demo-block>

          <x-demo-block title="文本域 Textarea" :code="cTextarea">
            <div class="field">
              <label class="label">个人简介</label>
              <textarea class="textarea" v-model="textarea" placeholder="请输入个人简介..."></textarea>
            </div>
            <div style="text-align:right;color:var(--text-tertiary);font-size:12px">{{ textarea.length }} / 200</div>
          </x-demo-block>
        </x-waterfall>
      </div>
    `,
  };
})(window);