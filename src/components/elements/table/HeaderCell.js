import React from 'react'
import styled from 'styled-components'
import classnames from 'classnames'

import Icon from '../../common/Icon'

const oppositeOrder = {
  desc: 'asc',
  asc: 'desc',
}

class HeaderCell extends React.Component {
  handlerClick = () => {
    const { sortName, sortProperty, sortHandlerClick } = this.props
    if (
      !sortName ||
      typeof sortHandlerClick !== 'function'
    ) return

    const [activeName, activeOrder] = sortProperty.split('-')
    if (sortName === activeName) sortHandlerClick(`${sortName}-${oppositeOrder[activeOrder]}`)
    else sortHandlerClick(`${sortName}-asc`)
  }

  getSortIcon = (sortName, activeName, activeOrder) => {
    if (!sortName) return ''
    else if (sortName === activeName) {
      if (activeOrder === 'asc') return <Icon name="sort-up" />
      else return <Icon name="sort-down" />
    } else return <Icon color="#d4d4d4" name="sort" />
  }

  render() {
    const {
      text,
      width,
      sortName, // first_name
      sortProperty, // first_name-desc
      className,
      customClassname,
    } = this.props

    const [activeName, activeOrder] = sortProperty.split('-')

    const sortIcon = this.getSortIcon(sortName, activeName, activeOrder)

    const cnn = classnames(
      className,
      customClassname,
      { cp: sortName },
      { usn: sortName },
    )

    return (
      <th
        width={width}
        className={cnn}
        onClick={this.handlerClick}
      >
        {sortIcon}
        {text}
      </th>
    )
  }
}

export default styled(HeaderCell)`
  white-space: nowrap;
  i {
    margin-right: 5px;
  }
`
