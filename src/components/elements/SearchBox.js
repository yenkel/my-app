import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

class SearchBox extends React.Component {
  onChange = (event) => {
    const value = event.target.value
    this.props.onChange(value)
  }

  render() {
    return (
      <div className={this.props.className}>
        <div className="magnif-positioner">
          <i className="icon-search" />
        </div>

        <input
          ref={el => this.input = el}
          type="search"
          onChange={this.onChange}
          className="form-control input"
          value={this.props.value}
        />
      </div>)
  }
}

SearchBox.propTypes = {
  debounce: PropTypes.number,
}

SearchBox.defaultProps = {
  debounce: 500,
  magnifPosition: 'left',
  height: 25,
}

export default styled(SearchBox)`
  position: relative;
  .magnif-positioner {
    display: inline-block;
    position: absolute;
    ${props => props.magnifPosition}: 5px;
    line-height: 25px;
    font-size: 16px;
    height: 100%;
    color: #CBCBCB;
  }

  .input {
    padding-${props => props.magnifPosition}: 32px;

    border-radius: 15px;
    height: 25px;
  }
`
