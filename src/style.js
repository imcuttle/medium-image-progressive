/**
 * @file style
 * @author Cuttle Cong
 * @date 2018/3/11
 * @description
 */
export default `
.medium-image-progressive-container {
  position: relative;
  width: 100%;
  margin: 0 auto;
  margin-top: 43px;
  display: block;
}
.image-loaded.medium-image-progressive canvas {
  visibility: hidden;
  opacity: 0;
  -webkit-transition: visibility 0s linear .5s,opacity .1s .4s;
  transition: visibility 0s linear .5s,opacity .1s .4s;
}
.image-loaded.medium-image-progressive .medium-image-origin {
  visibility: visible;
  opacity: 1;
  -webkit-transition: visibility 0s linear 0s,opacity .4s 0s;
  transition: visibility 0s linear 0s,opacity .4s 0s;
}
.medium-image-progressive {
  position: absolute;
  top:0;left:0;width:100%;height:100%;
  max-width: 100%;
  background-color: rgba(0, 0, 0, 0.05);
}
.medium-image-origin, .medium-image-progressive canvas {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: auto;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.canvas-loaded.medium-image-progressive:not(.image-loaded) canvas {
  visibility: visible;
  opacity: 1;
  -webkit-transition: visibility 0s linear 0s,opacity .4s 0s;
  transition: visibility 0s linear 0s,opacity .4s 0s;
}
.medium-image-origin, .medium-image-progressive canvas {
  visibility: hidden;
  opacity: 0;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
`