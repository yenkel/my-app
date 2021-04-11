import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import classnames from 'classnames'

import { debounce } from '../../utils/helpers'

class SearchField extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    customClassName: PropTypes.string,
    placeholder: PropTypes.string,
    onChangeAction: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.cbDebounce = debounce(this.props.onChangeAction, 1000)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.silentFlush) {
      this.silentFlush()
    }
  }

  componentWillUnmount() {
    if (typeof this.props.reset === 'function') {
      this.props.reset()
    }
  }

  setInputRef = (node) => {
    this.inputNode = node
  }

  flush = () => {
    this.inputNode.value = ''
    this.props.onChangeAction('')
  }

  silentFlush = () => {
    this.inputNode.value = ''
  }

  handleOnChange = (e) => {
    const value = e.target.value
    if (typeof this.props.onChangeAction === 'function') {
      this.cbDebounce(value)
    }
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.cbDebounce.cancel()
      this.props.onChangeAction(this.inputNode.value)
    }
  }

  render() {
    const {
      className,
      customClassName,
      id,
      placeholder,
    } = this.props

    const ccn = classnames(
      'is-search-field',
      className,
      customClassName,
    )

    return (
      <div className={ccn}>
        <input
          id={id}
          ref={this.setInputRef}
          type="search"
          onChange={this.handleOnChange}
          onKeyPress={this.handleKeyPress}
          placeholder={placeholder || 'Search'}
          autoCorrect="off"
          autoCapitalize="off"
        />
      </div>
    )
  }
}

export default styled(SearchField)`
  position: relative;

  & > input {
    width: 100%;
    height: 32px;
    padding: 6px 30px;
    border: 1px solid #999;
    background: #f7f7f7 url(/static/webapp/images/searchicon.svg) no-repeat scroll 7px 7px;
    border-radius: 15px;
    transition: box-shadow ease-in-out .15s;
    &:focus {
      outline: 0;
      box-shadow: inset 0 0 0 rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6);
    }
  }

  & > i {
    color: #999;
    position: absolute;
    top: 8px;
    right: 8px;
    &:hover {
      color: gray;
    }
  }
`
