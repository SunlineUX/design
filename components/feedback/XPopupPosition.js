/* ============================================================
 * base/XPopupPosition.js — Teleport 浮层的视口定位助手
 * ============================================================ */
(function (global) {
  'use strict';

  global.XPopupPosition = {
    update(trigger, panel, placement, gap) {
      const triggerRect = trigger.getBoundingClientRect();
      const panelRect = panel.getBoundingClientRect();
      const viewportWidth = document.documentElement.clientWidth;
      const viewportHeight = document.documentElement.clientHeight;
      const candidates = [placement, this.opposite(placement), 'bottom', 'top', 'right', 'left'];
      const actualPlacement = candidates.find(candidate => this.fits(
        candidate,
        triggerRect,
        panelRect,
        viewportWidth,
        viewportHeight,
        gap,
      )) || placement;
      const point = this.point(actualPlacement, triggerRect, panelRect, gap);
      const left = Math.max(8, Math.min(point.left, viewportWidth - panelRect.width - 8));
      const top = Math.max(8, Math.min(point.top, viewportHeight - panelRect.height - 8));

      return {
        placement: actualPlacement,
        style: {
          position: 'fixed',
          left: left + 'px',
          top: top + 'px',
        },
      };
    },

    point(placement, trigger, panel, gap) {
      if (placement === 'bottom-start') {
        return { left: trigger.left, top: trigger.bottom + gap };
      }
      if (placement === 'bottom-end') {
        return { left: trigger.right - panel.width, top: trigger.bottom + gap };
      }
      if (placement === 'top-start') {
        return { left: trigger.left, top: trigger.top - panel.height - gap };
      }
      if (placement === 'top-end') {
        return { left: trigger.right - panel.width, top: trigger.top - panel.height - gap };
      }
      if (placement === 'bottom') {
        return { left: trigger.left + (trigger.width - panel.width) / 2, top: trigger.bottom + gap };
      }
      if (placement === 'left') {
        return { left: trigger.left - panel.width - gap, top: trigger.top + (trigger.height - panel.height) / 2 };
      }
      if (placement === 'right') {
        return { left: trigger.right + gap, top: trigger.top + (trigger.height - panel.height) / 2 };
      }
      return { left: trigger.left + (trigger.width - panel.width) / 2, top: trigger.top - panel.height - gap };
    },

    fits(placement, trigger, panel, viewportWidth, viewportHeight, gap) {
      const point = this.point(placement, trigger, panel, gap);
      return point.left >= 8
        && point.top >= 8
        && point.left + panel.width <= viewportWidth - 8
        && point.top + panel.height <= viewportHeight - 8;
    },

    opposite(placement) {
      return {
        top: 'bottom', bottom: 'top', left: 'right', right: 'left',
        'bottom-start': 'top-start', 'bottom-end': 'top-end',
        'top-start': 'bottom-start', 'top-end': 'bottom-end',
      }[placement] || 'top';
    },
  };
})(window);
