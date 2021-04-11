export default function (props) {
  return (
    <div className="header">
      {props.name}
      { props.subContent ? props.subContent : null }
    </div>
  )
}
