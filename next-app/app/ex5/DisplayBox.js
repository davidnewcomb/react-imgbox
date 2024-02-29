
export default function DisplayBox(props) {
  const { val } = props

  return (
    <input type="text" placeholder="Redraw the box around the barman in both pictures" value={val} readOnly={true} style={{ width: '100%' }} />
  )
}
