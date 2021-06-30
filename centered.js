function getCentered(){
    let view=Window.this
    let [rw,rh]=view.box("dimension")
    let [pw,ph]=view.screenBox("frame","dimension")
  return [(pw-314)/2,(ph-280)/2]
}
export {getCentered}