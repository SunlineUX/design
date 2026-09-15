/* ============================================================
 * pages/UserCenterView.js — 个人中心
 *   自注册到 window.ViewComponents，供 routes.js 按 key 引用
 *   展示用户基本信息表单（姓名/邮箱/手机号/角色）
 * ============================================================ */
(function (global) {
  'use strict';

  global.ViewComponents = global.ViewComponents || {};

  global.ViewComponents.UserCenterView = {
    setup() {
      const { inject, reactive, ref } = global.Vue;
      const t = inject('t');

      /* 本地表单状态（实际项目可对接接口） */
      const form = reactive({
        name: '',
        email: '',
        phone: '',
        role: '',
      });

      /* Toast 提示（成功提示用绿色） */
      const toast = ref('');
      let toastTimer = null;
      const showToast = (msg) => {
        toast.value = msg;
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => { toast.value = ''; }, 1800);
      };

      const onSave = () => {
        /* 实际项目可在此提交 form 到后端 */
        showToast(t('user.savedTip'));
      };

      return { t, form, toast, onSave };
    },
    template: `
      <div class="view-user-center">
        <h1 class="view-title">{{ t('nav.userCenter') }}</h1>

        <panel-card :title="t('user.sectionProfile')">
          <div class="form-grid">
            <div class="form-field">
              <label class="form-label">{{ t('user.name') }}</label>
              <input class="form-input" v-model="form.name" :placeholder="t('user.namePlaceholder')" />
            </div>
            <div class="form-field">
              <label class="form-label">{{ t('user.email') }}</label>
              <input class="form-input" v-model="form.email" :placeholder="t('user.emailPlaceholder')" />
            </div>
            <div class="form-field">
              <label class="form-label">{{ t('user.phone') }}</label>
              <input class="form-input" v-model="form.phone" :placeholder="t('user.phonePlaceholder')" />
            </div>
            <div class="form-field">
              <label class="form-label">{{ t('user.role') }}</label>
              <input class="form-input" v-model="form.role" :placeholder="t('user.rolePlaceholder')" />
            </div>
          </div>
        </panel-card>

        <!-- 操作按钮 -->
        <div class="panel-actions">
          <x-button variant="primary" @click="onSave">{{ t('user.save') }}</x-button>
        </div>

        <!-- Toast 成功提示 -->
        <transition name="toast">
          <div v-if="toast" class="toast">{{ toast }}</div>
        </transition>
      </div>
    `,
  };
})(window);
