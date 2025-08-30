export default function Footer({ left, center, right }){
  return (
    <div className="footer">
      <div className="footer-inner">
        <div>{left}</div>
        <div>{center}</div>
        <div>{right}</div>
      </div>
    </div>
  )
}
