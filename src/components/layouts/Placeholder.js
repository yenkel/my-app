import React from 'react'
import cls from 'classnames'
import styled, { withTheme } from 'styled-components'

import CenteredLoader from '../elements/CenteredLoader'

class Placeholder extends React.Component {
  render() {
    const {
      className,
    } = this.props

    return (
      <div
        id="module-placeholder"
        className={cls(className, 'root global-placeholder')}
      >
        <div className="menu as-placeholder">
          {/* { Array(3).fill().map(() => <div className="placeholder-block small" />) } */}
        </div>
        <div className="content-container-with-menu">
          <div className="card">
            <CenteredLoader />
            {/* { Array(10).fill().map(() => <div className="placeholder-block" />) } */}
          </div>
        </div>
      </div>
    )
  }
}

export default styled(withTheme(Placeholder))`
  @keyframes gradientBG {
    0% {
      background-position: 0% 0%;
    }
    50% {
      background-position: 200% 200%;
    }
    100% {
      background-position: 0% 0%;
    }
  }
  .menu.as-placeholder {
    background-color: white;
  }
  .card {
    overflow: hidden;
  }
  .placeholder-block {
    width: 100%;
    height: 60px;
    margin-bottom: 60px;
    border-radius: 10px;
    background: linear-gradient(-90deg, #f4f4f4, #e8e8e8, #f4f4f4);
    background-size: 200% 200%;
    animation: gradientBG 2s linear infinite;
    &.small {
      width: auto;
      margin: 35px 25px;
      height: 30px;
    }
  }
  .loader-container {
    position: absolute;
    top: 0%;
    left: 50%;
  }
`
