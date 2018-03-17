/*
 * @Author: mayingying
 * @Date: 2018-03-17 13:17:49
 * @Last Modified by: mayingying
 * @Last Modified time: 2018-03-17 15:56:28
 */
import MPImg from '../src/react'
import React from 'react'
import ReactDOM from 'react-dom'


class DemoView extends React.Component {
  constructor(p) {
    super(p)
    this.state = {
      index: 0
    }
  }
  change(index) {
    this.setState({
      index
    })
  }

  render() {
    const props = this.props.imgList[this.state.index]
    return (
      <div>
        <div style={{ textAlign: 'center' }}>
          {this.props.imgList.map((props, i) =>
            <button key={i} onClick={this.change.bind(this, i)}>No.{i}</button>
          )}
        </div>
        <MPImg {...props}/>
      </div>
    )
  }
}
DemoView.defaultProps = {
  imgList: [
    {
      progressUrl: 'https://cdn-images-1.medium.com/freeze/max/30/1*LyAN2qcxGdVXXQBiV7IuGQ.jpeg?q=20',
      originUrl: 'https://cdn-images-1.medium.com/max/800/1*LyAN2qcxGdVXXQBiV7IuGQ.jpeg',
      width: 700,
      height: 480
    },
    {
      progressUrl: 'https://cdn-images-1.medium.com/freeze/max/60/1*P6v26TyciYcKhcEy5GjX4w.gif?q=20',
      originUrl: 'https://cdn-images-1.medium.com/max/1600/1*P6v26TyciYcKhcEy5GjX4w.gif',
      width: 1050,
      height: 591
    }
  ]
}

ReactDOM.render(
  <DemoView/>,
  window.root
)
