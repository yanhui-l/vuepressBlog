module.exports = {
    title: '多放香菜',
     // base: '/vuepress/',//部署在github的仓库
    head: [
        [
            'link', // 设置 favicon.ico，注意图片放在 public 文件夹下
            { rel: 'icon', href: '/img/me.jpg' }
        ]
    ],
    description: '记录知识',
    themeConfig: {
        logo: '/img/me.jpg',//图标
        search: true,//搜索
        searchMaxSuggestions: 10,
        // 导航栏
        nav: [
            {text: '首页', link: '/'},
            {text: '开发笔记', link: '/dev_note/'},
            {text: '资源下载', link: '/share/'},
            {text: '碎碎念', link: '/sui_sui_nian/'},
            {text: '友链', link: '/friendship/'},
            {
                text: '个人', items: [
                    {text: 'github', link: 'https://github.com/yanhui-l/vuepressBlog'},
                    {text: 'CSDN', link: 'https://blog.csdn.net/weixin_42182713?spm=1010.2135.3001.5421'},
                    {text: '有道云', link: 'http://note.youdao.com/noteshare?id=5f83f7f3b1f5c5fc807217d6dc080b31'},
                    {text: 'QQ', link: 'http://wpa.qq.com/msgrd?v=3&uin=2762722103&site=qq&menu=yes'},
                ]
            }
        ],
        //侧边栏
        sidebar: {
            '/dev_note/':[
                '',
                'JWT+Rides处理登录超时',
                'RESTful架构',
            ],
            '/sui_sui_nian/':[
                ''
            ],
            '/share/':[
                '',
                'FEBS权限框架',
                '蘑菇博客'
            ]
        },

    },

}

// npm run docs:dev


