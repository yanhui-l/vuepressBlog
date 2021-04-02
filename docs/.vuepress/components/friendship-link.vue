<template>
    <div class="msgPanel">
        <p class="s-t">友情链接</p>
        <ul class="link-list clearfix">

            <li class="link-item" :title="i.title+'：'+i.signature" v-for="i in frienShip">
                <a target="_blank" :href="i.address">
                    <div class="link-f">
                        <img class="linkLogo" :src="i.avatar">
                        <span>{{i.title}}</span>
                    </div>
                    <p class="link-s">{{i.signature}}</p>
                </a>
            </li>

        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                frienShip: [
                    {
                        title: "Jun",
                        signature: "秋日的烦恼一定会被冬天的雪埋葬",
                        avatar: "http://junxf.com/images/favicon-32x32-next.png?v=5.1.4",
                        address: "http://junxf.com/"
                    },
                    {
                        title: "Siyuh",
                        signature: "种花家的一个有志青年",
                        avatar: "https://file.siyuh.com/yinan.jpg",
                        address: "https://doc.siyuh.com/"
                    },
                    {
                        title: "moben",
                        signature: "我亦无他，唯手熟尔",
                        avatar: "https://mohen19.github.io/favicon.png",
                        address: "https://mohen19.github.io/"
                    }
                ]
            };
        },
        methods: {
            change() {
                console.log(111);
            }
        },
    }
</script>

<style scoped>
    .msgPanel {
        width: 1100px;
        background-color: #fff;
        margin: auto;
        margin-top: 30px;
        padding: 30px;
        box-sizing: border-box;
    }

    .msgPanel {
        margin: 8px auto;
    }

    .msgPanel {
        padding-bottom: 40px;
    }

    .msgForm textarea {
        font-family: Arial;
        font-size: 13px;
    }

    .s-t {
        font-weight: 700;
        color: #333;
    }

    .sban .s-o span {
        display: inline-block;
        margin-top: 20px;
        color: #6A70EC;
        font-size: 13px;
        margin-right: 10px;
        vertical-align: middle;
    }

    .s-o a i {
        padding-right: 4px;

    }

    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
        color: #aaa;
        font-size: 14px;
        font-family: "arial black";
    }

    .li-r img {
        width: 40px;
        border-radius: 50%;
    }

    .linkLogo {
        display: inline-block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        vertical-align: middle;
    }

    .link-f {
        height: 40px;
    }

    .link-f span {
        vertical-align: middle;
        font-size: 16px;
        color: #333;
        display: inline-block;
        width: 155px;
        padding-left: 6px;
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
    }

    .link-list {
        margin-top: 20px;
    }

    .link-item {
        width: 250px;
        float: left;
        border: 1px solid #f4f4f4;
        padding: 20px;
        box-sizing: border-box;
        border-radius: 2px;
        margin: 10px 10px 10px 0;
    }

    .link-item:hover {
        box-shadow: 0 10px 28px 0 rgba(245, 246, 248, 25);
    }

    .link-s {
        color: #333;
        clear: both;
        /* display: -webkit-box; */
        overflow: hidden;
        margin-top: 5px;
        /* line-height: 21px; */
        height: 18px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 13px;
        /* -webkit-box-orient: vertical;
        -webkit-line-clamp: 3; */
    }

    li {
        list-style: none;
    }

    p {
        display: block;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
    }

    .link-item a {
        text-decoration: none;
    }

    .link-item a:hover {
        text-decoration: none;
    }

    /*鼠标悬浮*/
</style>
