/*
 * @Author: mayingying 
 * @Date: 2018-03-16 21:25:58 
 * @Last Modified by: mayingying
 * @Last Modified time: 2018-03-17 15:33:01
 */
import React from 'react'
import StackBlur from './stackblur'
import css from './style'

class MPImgReact extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            canvasLoad: false,
            imageLoad: false
        }
        this.scale = 1
        this.height = this.props.height && parseFloat(this.props.height)
        this.width = this.props.width && parseFloat(this.props.width)
        if(this.width && this.height) {
            this.scale = this.height / this.width
        }
        this.width = !this.width ? '100%' : this.width + 'px'
        this.height = !this.height ? '0' : this.width + 'px'
        
    }
    componentDidMount() {
        // console.log('did mount')
        // let style = window.getComputedStyle(this.oImg, null)
        // console.log(style.getPropertyValue('width'))
        // console.log(style.getPropertyValue('height'))
    }
    pImgLoad(e){
        // https://github.com/flozz/StackBlur
        // StackBlur.image(sourceImage, targetCanvas, radius, blurAlphaChannel);
        StackBlur.image(this.pImg, this.canvas)
        this.setState({
            canvasLoad: true
        })
    }
    oImgLoad (e) {
        this.setState({
            imageLoad: true
        })
    }

    render() {
        let str = "medium-image-progressive"
        if(this.state.canvasLoad) {
            str += ' canvas-loaded'
        }
        if(this.state.imageLoad) {
            str += ' image-loaded'
        }
        return (<div>
            <style>
                {css}
            </style>
            <div className="medium-image-progressive-container" style={{ maxWidth: this.width, maxHeight: this.height }}>
                <div className="medium-image-progressive-placeholder" style={{ paddingBottom: (this.scale * 100) + '%' }}></div>
                <div className={str}>
                    <canvas ref={(cvs) => { this.canvas = cvs }}></canvas>
                    <img className="medium-image-progress"
                        src={encodeURI(this.props.src)}
                        style={{ display: 'none' }}
                        ref={(img) => { this.pImg = img }}
                        onLoad={this.pImgLoad.bind(this)}
                        />
                    <img className="medium-image-origin"
                        src={encodeURI(this.props['data-src'])}
                        onLoad={this.oImgLoad.bind(this)}
                        ref={(img) => { this.oImg = img }} />
                </div>
            </div>
        </div>)
    }
}
export default MPImgReact