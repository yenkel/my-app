import React from 'react'
import Loader from 'react-loaders'
import styled, { withTheme } from 'styled-components'

const L = props => (
  <div style={props.style || {}} className="loader-container">
    <Loader type={props.type || 'ball-spin-fade-loader'} active />
  </div>
)

const OverlapContainer = styled.div`
  position: absolute;
  top: ${props => props.margin}px;
  left: ${props => props.margin}px;
  right: ${props => props.margin}px;
  bottom: ${props => props.margin}px;
  background-color: white;
`

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .8);
  z-index: ${props => props.theme.zIndexModal};
  .loader-modal {
    width: 150px;
    height: 150px;
    position: absolute;
    left: calc(50% - 75px);
    top: calc(50% - 75px);
    padding: 50px;
    background-color: white;
    border-radius: 6px;
  }
`

function CenteredLoader(props) {
  if (props.overlap) {
    return (
      <OverlapContainer
        margin={props.overlapMargin || 0}
        className="loader-overlap-container"
      >
        <L {...props} />
      </OverlapContainer>
    )
  } else if (props.modal) {
    return (
      <ModalContainer
        className="loader-modal-container"
      >
        <div className="loader-modal">
          <L {...props} />
        </div>
      </ModalContainer>
    )
  } else return <L {...props} />
}

export default withTheme(CenteredLoader)
