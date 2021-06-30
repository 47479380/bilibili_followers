import {Component} from "./component";

export class Main extends Component{

    _ready;

    render() {

        this.querySelector(".btn-group .btn:first-child").state.current=true
        this.input=document.querySelector(".up-id-input input")

    }
    initProperty() {
        super.initProperty();
        this.winConfig= {
            type  : Window.TOOL_WINDOW,
            url: document.url("widget.html"),
            alignment:-8,
            width:770,
            height:352,
            state : Window.WINDOW_SHOWN
        }
    }

    async ["on click at .submit-btn .btn"](evt, btn) {
        let current_btn = document.querySelector(".btn-group .btn:current")
        if (current_btn.getAttribute("value") === "name") {
            let uid = await this.findIdByName()

            this.winConfig.parameters = {
                ID: uid
            }

        } else {
            this.winConfig.parameters = {
                ID: this.input.value
            }

        }
        new Window(this.winConfig)
    }
    ["on click at .btn-group .btn"](evt, button){
        button.state.current=true
        let input=this.querySelector(".up-id-input input")

        if (button.getAttribute("value")==="name"){

            input.setAttribute("placeholder","输入昵称")
        }else {
            input.setAttribute("placeholder","输入ID")
        }

    }

    async findIdByName() {
     let res=  await fetch(`https://search.bilibili.com/upuser?keyword=${encodeURI(this.input.value)}`)
        if (res.ok){
          let div= document.createElement("div");
          div.innerHTML=await res.text()
            let a=div.querySelector("#user-list > div.flow-loader.user-wrap > ul > li > div.up-face > a")
            if (a===null){
                Window.this.modal(<alert>没有找到该用户</alert>)
                return
            }
            let href=a.getAttribute("href")
            let id=href.split("/")[3].split("?")[0]

            return id
        }
        Window.this.modal(<error>api访问失败</error>)
    }
}