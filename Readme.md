# medium-image-progressive
Medium's progressive image style.

[![build status](https://img.shields.io/travis/imcuttle/medium-image-progressive/master.svg?style=flat-square)](https://travis-ci.org/imcuttle/medium-image-progressive)
[![NPM version](https://img.shields.io/npm/v/medium-image-progressive.svg?style=flat-square)](https://www.npmjs.com/package/medium-image-progressive)
[![NPM Downloads](https://img.shields.io/npm/dm/medium-image-progressive.svg?style=flat-square&maxAge=43200)](https://www.npmjs.com/package/medium-image-progressive)

[Demo](https://imcuttle.github.io/medium-image-progressive/)  
![](./snapshot.gif)

## Installation
### NPM
```bash
npm i medium-image-progressive
```
### UMD

name: mediumImageProgressive  
[unpkg](https://unpkg.com/medium-image-progressive)

## Usage

```javascript
import mediumImageProgressive from 'medium-image-progressive'
mediumImageProgressive('img selector', {
  // options
})
```

### Options
- `progressImageUrlGetter` <function>  
  the thumb image url getter  
  default: `(elem) => elem.getAttribute('src')`
- `originImageUrlGetter` <function>  
  default: `(elem) => elem.getAttribute('data-src')`
- `widthGetter`  <function>    
  image's width getter  
  default `elem => elem.getAttribute('width')`
- `heightGetter`  <function>  
  default: `elem => elem.getAttribute('height')`

### React Component

```javascript
import MPImg from 'medium-image-progressive/dist/react'

// render
<MPImg
  progressUrl="https://cdn-images-1.medium.com/freeze/max/30/1*LyAN2qcxGdVXXQBiV7IuGQ.jpeg?q=20"
  originUrl="https://cdn-images-1.medium.com/max/800/1*LyAN2qcxGdVXXQBiV7IuGQ.jpeg"
  width="700"
  height="480"
/>

```
