/**
 * @file index
 * @author Cuttle Cong
 * @date 2018/3/11
 * @description
 */
import StackBlur from './stackblur'
import css from './style'

let style = null
function injectStyle(text) {
  style = style || document.createElement('style')
  style.type = 'text/css'
  style.textContent = text
  ;(document.head || document.getElementsByTagName('head')[0]).appendChild(style)
}

let uId = 0
/**
 *
 * @param elems {Array|String|NodeList}
 */
export default function progress(elems, options = {}) {
  if (typeof document === 'undefined') {
    console.error('medium-image-progress only works on browser.')
    return
  }

  if (typeof elems === 'string') {
    elems = [...document.querySelectorAll(elems)]
  }
  if (elems instanceof window.NodeList) {
    elems = [...elems]
  }
  if (!Array.isArray(elems)) {
    elems = [elems]
  }

  const {
    progressImageUrlGetter = (elem) => {
      return elem.getAttribute('src')
    },
    originImageUrlGetter = (elem) => {
      return elem.getAttribute('data-src')
    },
    widthGetter = elem => elem.getAttribute('width'),
    heightGetter = elem => elem.getAttribute('height'),
    blurEnable = true
  } = options

  if (!style) {
    injectStyle(css)
  }

  elems.forEach(function (ele) {
    if (!ele.tagName || ele.tagName.toLowerCase() !== 'img') {
      throw new Error('medium-image-progress requires <img/> element, but ' + ele.tagName)
    }

    // const wrapper = createElement('div', {
    //   'class': 'medium-image-progressive-container'
    // })
    const pImageUrl = encodeURI(progressImageUrlGetter(ele))
    const oImageUrl = encodeURI(originImageUrlGetter(ele))
    let width = widthGetter(ele)
    let height = heightGetter(ele)
    width = width && parseFloat(width)
    height = height && parseFloat(height)
    let scale = 1
    if (width && height) {
       scale = height / width
    }
    width = !width ? '100%' : width + 'px'
    height = !height ? '0' : height + 'px'
    const parent = ele.parentElement

    const id = 'medium-progress-' + uId++
    ele.outerHTML = `
<div id=${id} class="medium-image-progressive-container" style="max-width: ${width}; max-height: ${height}">
<div class="medium-image-progressive-placeholder" style="padding-bottom: ${(scale * 100) + '%'}"></div>
<div class="medium-image-progressive">
  <img class="medium-image-progress" src="${pImageUrl}" style="${blurEnable ? 'display: none;' : ''}"/>
  ${blurEnable ? '<canvas></canvas>' : ''}
  <img class="medium-image-origin" src="${oImageUrl}"/>
</div>
</div>`

    ele = parent.querySelector('#' + id)
    const progressive = ele.querySelector('.medium-image-progressive')
    const pImg = progressive.querySelector('.medium-image-progress')
    const oImg = progressive.querySelector('.medium-image-origin')
    const canvas = blurEnable && progressive.querySelector('canvas')
    oImg.addEventListener('load', () => {
      progressive.classList.add('image-loaded')
    })
    pImg.addEventListener('load', () => {
      if (blurEnable) {
        // https://github.com/flozz/StackBlur
        // StackBlur.image(sourceImage, targetCanvas, radius, blurAlphaChannel);
        StackBlur.image(pImg, canvas)
        progressive.classList.add('canvas-loaded')
      }
    })
  })
}
