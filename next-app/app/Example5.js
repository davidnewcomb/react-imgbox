'use client'

import { useState } from 'react'
import ImgBox from 'react-imgbox'
import TextBoxRow from './ex5/TextBoxRow'

const imageUrl = process.env.NEXT_PUBLIC_IMG_URL + '/jack_pub.jpg'

const e5Code = `
const [myCoords, setMyCoords] =
  useState({x:1050, y:688, x2:1732, y2:1563, w:682, h:875})
const [myCoordString, setMyCoordString] =
  useState('')

const saveMyCoords = (coords) => {
  setMyCoords(coords)
  setMyCoordString(JSON.stringify(myCoords))
}
`

const e5Style = `.jack_pub_style {
  background-color: black;
  opacity: 0.4;
  border: 4px solid yellow;
}
`

const e5Tag1 = `
<ImgBox
  id="jack_pub_big" {...myCoords} className="img-fluid"
  src="${imageUrl}"
  defaultSettings={{
    edit: true,
    saveBox: saveMyCoords,
    markClass: 'jack_pub_style'
  }}
/>
`

const e5Tag2 = `
<ImgBox
  id="jack_pub_small" {...myCoords} className="img-fluid"
  edit={true} saveBox={saveMyCoords}
  markStyle={{ 'border': '2px solid blue' }}
  src="${imageUrl}"
/>
`

const e5Box = `
<input
  id="jack_pub_out" type="text" placeholder="Redraw the box around the barman in both pictures"
  readOnly={true} style={{ width: '100%' }}
  value={myCoordString}
/>
`

export function Example5() {

  const [myCoords, setMyCoords] = useState({ x: 1050, y: 688, x2: 1732, y2: 1563, w: 682, h: 875 })

  const saveMyCoords = (coords) => {
    setMyCoords(coords)
  }

  return (
    <div className="row">
      <div className="col-sm-6 col-lg-6">
        <div className="panel panel-default">
          <div className="panel-body">
            Adjust either of the boxes.
            Click once to start drawing, click again to save.
            <br />
            If your initial point is wrong, you can move the pointer up and right to move the inital point.
          </div>
        </div>
        <pre>{e5Style}</pre>
        <pre>{e5Code}</pre>
        <pre>{e5Tag1}</pre>
        <pre>{e5Tag2}</pre>
        <pre>{e5Box}</pre>
      </div>

      <div className="col-sm-6 col-lg-6">
        <div className="row">
          <div className="col-sm-8 col-lg-8">
            <ImgBox id="jack_pub_big" {...myCoords} className="img-fluid"
              src={imageUrl}
              defaultSettings={{
                edit: true,
                saveBox: saveMyCoords,
                markClass: 'jack_pub_style'
              }} />
          </div>
          <div className="col-sm-4 col-lg-4">
            <ImgBox id="jack_pub_small" {...myCoords} className="img-fluid"
              edit={true} saveBox={saveMyCoords}
              markStyle={{ 'border': '2px solid blue' }}
              src={imageUrl} />
          </div>
        </div>
        <TextBoxRow myCoords={myCoords} />
      </div>
    </div>
  )
}
