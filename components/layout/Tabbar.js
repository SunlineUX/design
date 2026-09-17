(function (global) {
	'use strict';

	global.LayoutComponents = global.LayoutComponents || {};

	const { useRouter, useRoute } = global.VueRouter;

	global.LayoutComponents.Tabbar = {
		props: {
			t: { type: Function, required: true },
		},
		setup(props) {
			const { ref, computed, watch, nextTick, onMounted, onUnmounted } = global.Vue;
			const router = useRouter();
			const route = useRoute();
			const tabs = ref([]);
			const strip = ref(null);
			const tabNodes = ref([]);
			const canScrollLeft = ref(false);
			const canScrollRight = ref(false);
			const contextMenu = ref(null);
			let resizeObserver = null;

			const currentPath = computed(() => route.path);
			const currentTab = computed(() => tabs.value.find(tab => tab.path === currentPath.value));

			function ensureHomeTab() {
				const homeTab = tabs.value.find(tab => tab.path === '/home') || {
					path: '/home',
					title: props.t('nav.home') || '首页',
					icon: 'Home',
					closable: false,
				};
				tabs.value = [homeTab, ...tabs.value.filter(tab => tab.path !== '/home')];
			}

			function titleForRoute(routeValue) {
				const matched = routeValue.matched && routeValue.matched[routeValue.matched.length - 1];
				return props.t(matched?.meta?.title || 'nav.home') || '未命名页面';
			}

			function iconForRoute(routeValue) {
				const matched = routeValue.matched && routeValue.matched[routeValue.matched.length - 1];
				return matched?.meta?.icon || '';
			}

			function updateScrollState() {
				if (!strip.value) return;
				canScrollLeft.value = strip.value.scrollLeft > 1;
				canScrollRight.value = strip.value.scrollLeft + strip.value.clientWidth < strip.value.scrollWidth - 1;
			}

			function scrollBy(distance) {
				if (strip.value) strip.value.scrollBy({ left: distance, behavior: 'smooth' });
			}

			function scrollActiveIntoView() {
				nextTick(() => {
					const index = tabs.value.findIndex(tab => tab.path === currentPath.value);
					const node = tabNodes.value[index];
					if (node && node.scrollIntoView) node.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
					updateScrollState();
				});
			}

			function addRouteTab(routeValue) {
				ensureHomeTab();
				const path = routeValue.path;
				if (!path || path === '/') return;
				if (!tabs.value.some(tab => tab.path === path)) {
					tabs.value.push({ path, title: titleForRoute(routeValue), icon: iconForRoute(routeValue), closable: path !== '/home' });
				}
				scrollActiveIntoView();
			}

			function activate(path) {
				closeContextMenu();
				router.push(path);
			}

			function closeTab(tab) {
				if (!tab.closable) return;
				const index = tabs.value.findIndex(item => item.path === tab.path);
				const wasActive = tab.path === currentPath.value;
				tabs.value = tabs.value.filter(item => item.path !== tab.path);
				if (wasActive) {
					const fallback = tabs.value[index] || tabs.value[index - 1] || tabs.value[0];
					if (fallback) router.push(fallback.path);
				}
				closeContextMenu();
				nextTick(updateScrollState);
			}

			function closeOthers(tab) {
				tabs.value = tabs.value.filter(item => !item.closable || item.path === tab.path);
				if (tab.path !== currentPath.value) router.push(tab.path);
				closeContextMenu();
				nextTick(updateScrollState);
			}

			function closeAll() {
				tabs.value = tabs.value.filter(item => !item.closable);
				router.push('/home');
				closeContextMenu();
				nextTick(updateScrollState);
			}

			function openContextMenu(event, tab) {
				contextMenu.value = {
					tab,
					left: Math.min(event.clientX, window.innerWidth - 158),
					top: Math.min(event.clientY, window.innerHeight - 92),
				};
			}

			function closeContextMenu() { contextMenu.value = null; }

			watch(() => route.fullPath, () => addRouteTab(route));
			watch(() => props.t, () => {
				tabs.value = tabs.value.map(tab => ({ ...tab, title: tab.title }));
			});

			onMounted(() => {
				ensureHomeTab();
				addRouteTab(route);
				document.addEventListener('click', closeContextMenu);
				document.addEventListener('scroll', closeContextMenu, true);
				resizeObserver = new ResizeObserver(updateScrollState);
				if (strip.value) resizeObserver.observe(strip.value);
			});
			onUnmounted(() => {
				document.removeEventListener('click', closeContextMenu);
				document.removeEventListener('scroll', closeContextMenu, true);
				if (resizeObserver) resizeObserver.disconnect();
			});

			return {
				tabs, strip, tabNodes, currentPath, canScrollLeft, canScrollRight, contextMenu,
				activate, closeTab, closeOthers, closeAll, openContextMenu, closeContextMenu, scrollBy,
				updateScrollState,
			};
		},
		template: `
			<div class="app-tabbar" @click.stop>
				<button class="app-tabbar-arrow" type="button" v-if="canScrollLeft" aria-label="向左滚动" @click="scrollBy(-220)">‹</button>
				<div ref="strip" class="app-tabbar-strip" @scroll="updateScrollState" @wheel="updateScrollState">
					<button
						v-for="(tab, index) in tabs"
						:key="tab.path"
						:ref="el => { if (el) tabNodes[index] = el; }"
						class="app-tab"
						:class="{ active: tab.path === currentPath }"
						type="button"
						@click="activate(tab.path)"
						@contextmenu.prevent.stop="openContextMenu($event, tab)"
					>
						<x-icon v-if="tab.icon && !tab.closable" :name="tab.icon" :size="14" />
						<span>{{ tab.title }}</span>
						<span v-if="tab.closable" class="app-tab-close" role="button" aria-label="关闭页签" @click.stop="closeTab(tab)">×</span>
					</button>
				</div>
				<button class="app-tabbar-arrow" type="button" v-if="canScrollRight" aria-label="向右滚动" @click="scrollBy(220)">›</button>
				<div v-if="contextMenu" class="app-tabbar-context" :style="{ left: contextMenu.left + 'px', top: contextMenu.top + 'px' }" @click.stop>
					<button type="button" :disabled="!contextMenu.tab.closable" @click="closeTab(contextMenu.tab)">关闭当前</button>
					<button type="button" @click="closeOthers(contextMenu.tab)">关闭其他</button>
					<button type="button" @click="closeAll">关闭全部</button>
				</div>
			</div>
		`,
	};
})(window);
