
import ImgBox from 'react-imgbox'

const imageUrl = process.env.NEXT_PUBLIC_IMG_URL + '/quantel.jpg'

const e3Style = `
const markStyle = {
  backgroundColor: 'white',
  opacity: '0.2',
  border: '4px dotted white'
}
`

const e3Tag = `
<a href="README.md" id="quantel_example">
  <ImgBox
    id="quantel" className="img-fluid"
    src="${imageUrl}"

    x="1395" y="246" w="638" h="763" markStyle={markStyle}
  />
</a>
`

const markStyle = {
  backgroundColor: 'white',
  opacity: '0.2',
  border: '4px dotted white'
}

export function Example3(props) {

  return (
    <div className="row">
      <div className="col-sm-4 col-lg-4">
        <div className="panel panel-default">
          <div className="panel-body">Wrap your image in anything like an anchor link.</div>
        </div>
        <pre>{e3Style}</pre>
        <pre>{e3Tag}</pre>
      </div>
      <div className="col-sm-8 col-lg-8">
        <a href="README.md" id="quantel_example" target="_new">
          <ImgBox
            id="quantel" className="img-fluid"
            src={imageUrl}

            x="1395" y="246" w="638" h="763" markStyle={markStyle}
          />
        </a>
      </div>
    </div>
  )
}
