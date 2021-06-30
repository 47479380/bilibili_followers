import {shadows} from "icon/shadow";

export class Component extends Element{

    _elevation=0
    _ready;
    componentDidMount() {
        // 初始化属性
        this.initProperty()

        //渲染
        this.render();
        if (this._ready !==undefined){
            this._ready(this)
        }
    }

    render(){

    }


    //
    set ready(value) {
        value(this)
    }
    set elevation(elevation){
        this.setAttribute("elevation",elevation)
        //因为要删除原来的海拔所以在改变之前更新
        this.updateElevation(elevation)
        this._elevation=elevation

    }
    get elevation(){
        return this._elevation
    }
    updateElevation(elevation){
        let shadow=shadows[elevation]
        if (shadow===undefined)return
        this.classList.remove(shadows[this.elevation])
        this.classList.add(shadow)
    }
    isAttributeExists(name){
        return this.getAttribute(name)!==null;
    }
    initProperty() {
        let index= Number.parseInt(this.getAttribute("elevation"))
        if (Number.isInteger(index)) {
            this.elevation=index;
        }
    }
}

//最大化按钮切换
// Window.this.on("statechange", function (evt) {
//
//     let view=Window.this;
//     let maximizes = document.querySelectorAll("[role=window-maximize]")
//     console.log(maximizes);
//       let icon=view.state===Window.WINDOW_MAXIMIZED?`maximized`:`maximize`;
//     maximizes.forEach(el => {
//         el.innerHTML=`<i component="icon">${icon}</i>`
//     })
// })