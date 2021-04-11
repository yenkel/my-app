import React from 'react'
import styled from 'styled-components'
import download from 'downloadjs'
import classnames from 'classnames'

import { xhrExtractFileName } from '../../utils/helpers'

import CenteredLoader from '../elements/CenteredLoader'

class Button extends React.Component {
  handleClick = (e) => {
    if (typeof this.props.handleClick === 'function') {
      this.props.handleClick(e)
    }
  }

  render() {
    const {
      text,
      href,
      type,
      className,
      customClassName,
      id,
      icon,
      disabled,
      loader,
      onClick,
      downloadIt,
      downloadObj,
      style,
      goBack,
      toggleMode,
    } = this.props

    const ccn = classnames(
      'is-button',
      className,
      customClassName,
      { disabled },
      { loader },
    )

    return (
      <button
        id={id}
        type={type || 'button'}
        className={ccn}
        style={style}
        onClick={(e) => {
          if (!disabled && !loader) {
            if (downloadIt) {
              e.preventDefault()
              download(href, typeof downloadIt === 'string' ? downloadIt : undefined)
            } else if (downloadObj) {
              e.preventDefault()
              const x = new XMLHttpRequest()
              x.open('GET', downloadObj.url, true)
              x.responseType = 'blob'
              x.onload = function (e) {
                download(e.target.response, xhrExtractFileName(x), e.target.response.type)
              }
              x.send()
            }
            if (onClick) {
              onClick(e)
            } else {
              this.handleClick(e)
            }
          }
        }}
      >
        {
          icon &&
          <img src={`/static/webapp/images/button-icons/${icon}.svg`} />
        }
        {
          goBack &&
          <i className="icon-arrow-left mr" />
        }
        {text}
        {
          loader &&
          <React.Fragment>
            <div className="loader-background" />
            <CenteredLoader type="ball-clip-rotate" />
          </React.Fragment>
        }
      </button>
    )
  }
}

export default styled(Button)`
  ${props => props.hide === true && 'display: none'};

  height: 36px;
  padding: 8px 16px;
  position: relative;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  outline: none;
  user-select: none;
  cursor: pointer;
  white-space: nowrap;
  text-transform: ${props => (props.uppercase ? 'uppercase' : 'none')};

  color: white;
  background-color: ${props => props.theme.secondaryColor};
  border: 1px solid ${props => props.theme.secondaryColor};
  &:hover {
    background-color: #3475d6;
    border: 1px solid #3475d6;
  }
  &:disabled {
    background-color: #C9C6C5;
    border: 1px solid #C9C6C5;
    cursor: default;
    pointer-events: none;
  }

  ${props => props.secondary && `
    color: #0152CC;
    background-color: white;
    border: 1px solid #0152CC;
    &:hover {
      background-color: #f7faff;
    }
    &:disabled {
      color: #E1E1E1;
      border: 1px solid #E1E1E1;
      background-color: white;
      cursor: default;
      pointer-events: none;
    }
  `}

  ${props => props.red && `
    color: #F83A32;
    background-color: white;
    border: 1px solid #F83A32;
    &:hover {
      color: #C4423C;
      border: 1px solid #C4423C;
      background-color: white;
    }
    &:disabled {
      color: #E1E1E1;
      border: 1px solid #E1E1E1;
      background-color: white;
      cursor: default;
      pointer-events: none;
    }
  `}

  &.loader {
    cursor: progress;
    .loader-background {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgba(255,255,255,.8);
      border-radius: 4px;
    }
    .loader-container {
      height: auto;
      transform: translateY(-23px);
      & > .loader {
        position: static;
      }
    }
  }

  &:focus {
    text-decoration: none !important;
  }

  img {
    margin-right: 10px;
    width: auto !important;
    height: auto !important;
    padding-bottom: 2px;
    opacity: ${props => (props.disabled ? 0.2 : 1)};
  }
`
