
import DisplayBox from './DisplayBox'
import { niceHtml, niceString } from './utils'

export default function TextBoxRow(props) {
  const { myCoords } = props

  const coordText = JSON.stringify(myCoords)
  const coordObj = niceString(myCoords)

  let c = {}

  c = { ...myCoords }
  delete c['x2']
  delete c['y2']
  const coordObjWh = niceString(c)
  const coordObjWhHtml = niceHtml(c)

  c = { ...myCoords }
  delete c['w']
  delete c['h']
  const coordObjX2 = niceString(c)
  const coordObjX2Html = niceHtml(c)

  return (
    <div className="row">
      <DisplayBox val={coordText} />
      <br />
      <DisplayBox val={coordObj} />
      <div>&nbsp;</div>
      <DisplayBox val={coordObjWh} />
      <br />
      <DisplayBox val={coordObjWhHtml} />
      <div>&nbsp;</div>
      <DisplayBox val={coordObjX2} />
      <br />
      <DisplayBox val={coordObjX2Html} />
    </div>
  )
}
