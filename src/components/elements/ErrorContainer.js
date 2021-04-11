import React from 'react'
import PropTypes from 'prop-types'
import styled, { withTheme } from 'styled-components'

import Icon from '../common/Icon'

class ErrorContainer extends React.Component {
  render() {
    const { error } = this.props

    return (
      <Container>
        <Title>{error.title}</Title>
        <Detail>{error.detail}</Detail>
        {
          (error && error.refreshAction) &&
          <Action><Icon title="Refresh" name="refresh" onClick={error.refreshAction} /></Action>
        }
      </Container>
    )
  }
}

ErrorContainer.propTypes = {
  error: PropTypes.shape({
    title: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    detail: PropTypes.string.isRequired,
    refreshAction: PropTypes.func,
  }).isRequired,
}

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Title = styled.div`
  color: ${props => props.theme.red};
  font-size: 44px;
`

const Detail = styled.div`
  color: ${props => props.theme.red};
  font-size: 14px;
`

const Action = styled.div`
  margin-top: 15px;
  i {
    font-size: 20px;
  }
`

export default withTheme(ErrorContainer)
