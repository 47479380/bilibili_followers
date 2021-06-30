import {Component} from "./component";

export class Widget extends Component {

    _timeout = 6000
    _uid = ""
    _bv = ""

    _up_info = {
        total: 0,
        name: ''
    }

    _video_info

    componentDidMount() {
        this._uid=Window.this.parameters.ID
        super.componentDidMount();
        this.updateData()
        this.startSyncing()
    }

    initProperty() {
        super.initProperty();
        this._video_info = {
            title: "123",
            view: 0,
            danmaku: 0,
            reply: 0,
            favorite: 0,
            coin: 0,
            share: 0,
            like: 0,
        }
    }

    render() {

        this.follow_number = this.querySelector(".follow .follow-number");
        this.up_name = this.querySelector(`.up-name`)
        this.video_title = this.querySelector(".video-info .video-title");
        this.play_volume = this.querySelector(".video-info .play-volume span");
        this.like = this.querySelector(".video-toolbar .like span");
        this.coin = this.querySelector(".video-toolbar .coin span");
        this.collect = this.querySelector(".video-toolbar .collect span");
        this.comment = this.querySelector(".video-toolbar .comment span");
        this.barrage = this.querySelector(".video-toolbar .barrage span");
        this.share = this.querySelector(".video-toolbar .share span");

    }

    updateWidget() {
        this.follow_number.innerHTML = this.up_info.total
        this.up_name.innerHTML = this.up_info.name
        this.video_title.innerHTML = this.video_info.title
        this.like.innerHTML = this.video_info.like
        this.coin.innerHTML = this.video_info.coin
        this.collect.innerHTML = this.video_info.favorite
        this.comment.innerHTML = this.video_info.reply
        this.barrage.innerHTML = this.video_info.danmaku
        this.share.innerHTML = this.video_info.share
        this.play_volume.innerHTML = this.video_info.view

    }

    async getData() {
        let result = []
        result[0] = await fetch(`https://api.bilibili.com/x/relation/stat?vmid=${this._uid}`).then(resp => resp.json())
        result[1] = await fetch(`https://api.bilibili.com/x/space/arc/search?mid=${this._uid}&pn=1&ps=1&index=1`).then(resp => resp.json())
            .then(resp => {
                this._bv = resp.data.list.vlist[0].bvid
                return resp
            })
        result[2] = await fetch(`https://api.bilibili.com/x/web-interface/archive/stat?bvid=${this._bv}`).then(resp => resp.json())
        result[3] = await fetch(`https://api.bilibili.com/x/space/acc/info?mid=${this._uid}`).then(resp => resp.json())

        return Promise.all(result)
    }

    synchronousData() {
        setTimeout(() => {
            this.updateData()
            this.synchronousData()
        }, this._timeout)
    }

    get timeout() {
        return this._timeout;
    }

    set timeout(value) {
        this._timeout = value;
    }

    get uid() {
        return this._uid;
    }

    set uid(value) {
        this._uid = value;
    }

    get total() {
        return this._total;
    }

    set total(value) {
        this._total = value;
    }

    get video_info() {
        return this._video_info;
    }

    set video_info(value) {
        this._video_info = value;
    }


    updateData() {

        this.getData().then(([fans, bv, videoInfos, Up]) => {

            this.up_info.total = fans.data.follower
            this.video_info = videoInfos.data
            this.up_info.name = Up.data.name
            this.video_info.title = bv.data.list.vlist[0].title
            this.updateWidget()
        });
    }

    startSyncing() {
        this.synchronousData()
    }

    get bv() {
        return this._bv;
    }

    set bv(value) {
        this._bv = value;
    }

    get up_info() {
        return this._up_info;
    }

    set up_info(value) {
        this._up_info = value;
    }

    ["on click at .win-btn-group .locking"](evt, that) {
        //一开始没有active类 窗口可以移动 图标是锁定
        //第一次点击添加active类 窗口不可以移动 图标是开锁
        if (that.classList.contains("active")) {
            that.icon = "locking"
            this.setAttribute("role", "window-caption")

        } else {
            this.removeAttribute("role")
            that.icon = "unlock"
        }
        that.classList.toggle("active")
    }

    ["on click at .win-btn-group .top"](evt, that) {
        //一开始没有active 窗口不置顶
        //第一次点击 添加active 窗口置顶
        let topmost = Window.this.isTopmost
        Window.this.isTopmost = !topmost
        that.classList.toggle("active")
    }
}