
import ImgBox from 'react-imgbox'

const imageUrl = process.env.NEXT_PUBLIC_IMG_URL + '/frightfest.jpg'

const e2Tag = `
<ImgBox
  id="frightfest" className="img-fluid"
  src="${imageUrl}"

  x="483" y="405" x2="932" y2="1038" markClass="frightfest_style"
/>
`

export function Example2(props) {

  return (
    <div className="row">
      <div className="col-sm-6 col-lg-6">
        <div className="panel panel-default">
          <div className="panel-body">Use coordinates x,y and x2,y2 with a css class to define the marker&aposs look.</div>
        </div>
        <pre>{e2Tag}</pre>
      </div>
      <div className="col-sm-6 col-lg-6">
        <ImgBox
          id="frightfest" className="img-fluid"
          src={imageUrl}

          x="483" y="405" x2="932" y2="1038" markClass="frightfest_style"
        />
      </div>
    </div>
  )
}
