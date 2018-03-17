/*
 * @Author: mayingying
 * @Date: 2018-03-16 21:25:58
 * @Last Modified by: mayingying
 * @Last Modified time: 2018-03-17 15:33:01
 */
import React from 'react'
import StackBlur from './stackblur'
import css from './style'

export default class MediumProgressive extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      canvasLoad: false,
      imageLoad: false
    }

    this.calculate()
  }

  calculate(props = this.props) {
    this.scale = 1
    this.height = props.height && parseFloat(props.height)
    this.width = props.width && parseFloat(props.width)
    if (this.width && this.height) {
      this.scale = this.height / this.width
    }
    this.width = !this.width ? '100%' : this.width + 'px'
    this.height = !this.height ? '0' : this.width + 'px'
  }

  componentWillReceiveProps(nextProps) {
    this.calculate(nextProps)
    // const newState = {}
    // if (this.props.progressUrl !== nextProps.progressUrl) {
    //   newState.canvasLoad = false
    // }
    // if (this.props.originUrl !== nextProps.originUrl) {
    //   newState.imageLoad = false
    // }
    // this.setState(newState)
  }

  pImgLoad(e) {
    StackBlur.image(this.pImg, this.canvas)
    this.setState({
      canvasLoad: true
    })
  }

  oImgLoad(e) {
    this.setState({
      imageLoad: true
    })
  }

  render() {
    let str = 'medium-image-progressive'
    if (this.state.canvasLoad) {
      str += ' canvas-loaded'
    }
    if (this.state.imageLoad) {
      str += ' image-loaded'
    }

    return (
      <div>
        <style>
          {css}
        </style>
        <div className="medium-image-progressive-container" style={{ maxWidth: this.width, maxHeight: this.height }}>
          <div className="medium-image-progressive-placeholder" style={{ paddingBottom: this.scale * 100 + '%' }}/>
          <div className={str}>
            <canvas ref={cvs => this.canvas = cvs}/>
            <img className="medium-image-progress"
                 src={this.props.progressUrl}
                 style={{ display: 'none' }}
                 ref={(img) => {
                   this.pImg = img
                 }}
                 onLoad={this.pImgLoad.bind(this)}
            />
            <img className="medium-image-origin"
                 src={this.props.originUrl}
                 onLoad={this.oImgLoad.bind(this)}
                 ref={(img) => {
                   this.oImg = img
                 }}/>
            <noscript>
              <img className="medium-image-origin" src={this.props.originUrl} />
            </noscript>
          </div>
        </div>
      </div>
    )
  }
}

MediumProgressive.defaultProps = {
  height: 0,
  width: 0,
  progressUrl: '',
  originUrl: ''
}
