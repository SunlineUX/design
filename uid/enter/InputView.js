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
      return { t, text, textarea };
    },
    template: `
      <div class="view-page">
        <h1 class="view-title">{{ t('nav.input') }}</h1>
        <p class="text-secondary">输入框组件，支持基础输入、文本域、带图标、禁用等状态。</p>

        <panel-card title="基础输入框">
          <div style="display:flex;flex-direction:column;gap:16px;max-width:360px">
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
        </panel-card>

        <panel-card title="文本域 Textarea">
          <div style="max-width:560px">
            <div class="field">
              <label class="label">个人简介</label>
              <textarea class="textarea" v-model="textarea" placeholder="请输入个人简介..."></textarea>
            </div>
            <div style="text-align:right;color:var(--text-tertiary);font-size:12px">{{ textarea.length }} / 200</div>
          </div>
        </panel-card>
      </div>
    `,
  };
})(window);