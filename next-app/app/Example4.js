
import ImgBox from 'react-imgbox'

const imageUrl = process.env.NEXT_PUBLIC_IMG_URL + '/youth_hosteling.jpg'

const e4Style = `
const markStyle = {
  border: '5px dashed cyan'
}
`

const e4Click = `
const doClick = (e) => {
  alert('David is Ace!')
}
`

const e4Tag = `
<ImgBox
  id="youth_hosteling" className="img-fluid"
  src="${imageUrl}"

  x="298" y="455" x2="682" y2="900" markStyle={markStyle}
  onClick={doClick}
/>
`

const markStyle = {
  border: '5px dashed cyan'
}

const doClick = (e) => {
  alert('David is Ace!')
}

export function Example4(props) {

  return (
    <div className="row">
      <div className="col-sm-6 col-lg-6">
        <div className="panel panel-default">
          <div className="panel-body">Use with clickables, like alerts, to your <code>IMG</code> in the normal way.</div>
        </div>
        <pre>{e4Style}</pre>
        <pre>{e4Click}</pre>
        <pre>{e4Tag}</pre>
      </div>
      <div className="col-sm-6 col-lg-6">
        <ImgBox
          id="youth_hosteling" className="img-fluid"
          src={imageUrl}

          x="298" y="455" x2="682" y2="900" markStyle={markStyle}
          onClick={doClick}
        />
      </div>
    </div>
  )
}
