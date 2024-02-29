'use client'

import { Example1 } from './Example1'
import { Example2 } from './Example2'
import { Example3 } from './Example3'
import { Example4 } from './Example4'
import { Example5 } from './Example5'


export default function Main(props) {
  return (
    <div style={{ width: '75%', margin: 'auto' }}>
      <div>
        <h1>React-ImgBox</h1>
        <small>React version of <a href="https://github.com/davidnewcomb/jquery-imgbox">jQuery-Imgbox</a></small>
      </div>
      <a href="https://github.com/davidnewcomb/react-imgbox">Project page.</a>

      <hr />
      <Example1 />
      <hr />
      <Example2 />
      <hr />
      <Example3 />
      <hr />
      <Example4 />
      <hr />
      <Example5 />
      <hr />
    </div>
  )
}
