
import ImgBox from 'react-imgbox'

const imageUrl = process.env.NEXT_PUBLIC_IMG_URL + '/family.jpg'

export function Example1(props) {

  const e1Tag = `
<ImgBox
  id="family" className="img-fluid" name="family"
  src="${imageUrl}"

  x="47" y="288" w="380" h="523"
  markStyle={{ 'border': '4px solid red' }}
/>
`

  return (
    <div className="row">
      <div className="col-sm-6 col-lg-6">
        <div className="panel panel-default">
          <div className="panel-body">Use x and y co-ordinates with width and height.</div>
        </div>
        <pre>{e1Tag}</pre>
      </div>
      <div className="col-sm-6 col-lg-6">
        <ImgBox
          id="family" className="img-fluid" name="family"
          src={imageUrl}

          x="47" y="288" w="380" h="523"
          markStyle={{ 'border': '4px solid red' }}
        />
      </div>
    </div>
  )
}
