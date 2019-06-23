module.exports = {
  title:'Hello 伊人笑桃花酒',
  description:'用文字记录路过的风景',
  base: '/',
  dest: './docs/.vuepress/dist',
  themeConfig: {
    sidebarDepth: 2,   // 设置嵌套的标题链接深度\
    // displayAllHeaders: true, // 默认值：false  设置所有页面的标题链接
    lastUpdated: 'Last Updated',   // 最后更新时间  --基于git
    repo: 'TianQianTQ/accumulation',  // 自定义仓库地址
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为 "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    repoLabel: '查看源码',
    nav:[
      { text: 'GitHub', link:'https://github.com/TianQianTQ'},
      { text: '博客', link:'https://blog.csdn.net/t_tq_bnsg_bs_ll'}
    ],
    // sidebar: 'auto',    // 自动匹配当前侧边栏---
    // sidebar: [
    //   ['/home/', '介绍'],
    //   ['/d3v5/', 'd3.jsV5版本入门'],
    //   ['/MarkDown/', 'MarkDown基本语法'],
    //   ['/audition/', '前端面试'],
    //   ['/native/', 'js原生方法'],
    // ],    // 后续重新配置多个文件的侧边栏
    sidebar: [
      {
        title:'home',
        collapsable: false,
        children: [
          '/home/',
        ]
      },
      {
        title:'MarkDown',
        collapsable: false,
        children: [
          '/MarkDown/',
        ]
      },
      {
        title:'js相关',
        collapsable: false,
        children:[
          ['js/', '内容简介'],
          'js/attribute',
          'js/concept'
        ]
      },
      {
        title:'Vue相关',
        collapsable: false,
        children:[
          ['vue/', '内容简介'],
          'vue/drag',
          'vue/methods'
        ]
      },
      {
        title:'D3.js基础',
        collapsable: false,
        children:[
          '/d3v5/',
        ]
      },
      {
        title:'ECMAScript',
        collapsable: false,
        children:[
          ['ECMAScript/', '内容简介'],
          'ECMAScript/ES7',
          'ECMAScript/ES8'
        ]
      },
      {
        title:'Node.js',
        collapsable: false,
        children:[
          ['Node/', '内容简介'],
          'Node/filesupdown'
        ]
      },
      {
        title:'总结',
        collapsable: false,
        children:[
          '/summary/2018年终总结/'
        ]
      }
    ]
  },
  markdown: { // 为每个代码块显示行号
    lineNumbers: true
  },
}
