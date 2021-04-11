import React from 'react'
import ReactPopup from 'reactjs-popup'
import cls from 'classnames'

class Popup extends React.Component {
  defaultContentType = {
    color: 'initial',
    padding: '1em',
    fontWeight: 'normal',
    fontSize: '14px',
    borderRadius: '5px',
    whiteSpace: 'initial',
    textAlign: 'initial',
    opacity: 'initial',
  }

  mapContentStyle = {
    basic: {
      width: '250px',
      background: '#eef4f7',
    },
    white: {
      width: '150px',
      background: 'white',
    },
  }

  mapArrowStyle = {
    basic: {
      background: '#eef4f7',
    },
    white: {
      background: 'white',
    },
  }

  render() {
    const {
      on,
      position,
      className,
      styleType = 'basic',
      customClassName,

      ContentComponent,
      TriggerComponent,
    } = this.props

    const ccn = cls(
      'is-popup',
      className,
      customClassName,
    )

    if (!ContentComponent) return TriggerComponent
    return (
      <ReactPopup
        customClassName={ccn}
        on={on || 'hover'}
        position={position || 'bottom right'}
        contentStyle={{
          ...this.defaultContentType,
          ...this.mapContentStyle[styleType],
        }}
        arrowStyle={this.mapArrowStyle[styleType]}
        trigger={TriggerComponent}
      >
        {ContentComponent}
      </ReactPopup>
    )
  }
}

export default Popup
