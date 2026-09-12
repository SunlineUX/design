
 window.config ={
    system:{
        logo: 'assets/logo/datamind.png',
        name: 'DataMind',
        version: '0.0.1',
        description: 'DataMind 是一个基于 Vue.js 的数据可视化工具',
    },
    layout:{
        layout: 'sideLayout',
        header: {
            mode: 'inherit',// dark, light, inherit
            size: 'medium',// small, medium, large, 48px
            showLogo: true,
            actions: true,
            flexBox: 'breadcrumb' // breadcrumb, menu, tabbar
        },
        sidebar: {
            mode: 'inherit',// dark, light, inherit
            size: 'medium',// small, medium, large, 48px
            showLogo: true,
            actions: true,
            guide: 'menu' // menu, tabbar
        },
        pages:{
            breadcrumb: false,
            tabbar: false,
            title: true,
        }
    }
 }