import React from 'react'
import styled from 'styled-components'

import Button from '../common/Button'

const RefreshErrorScreen = ({ className }) => (
  <div className={className}>
    <div className="is-modal-refresh">
      <img className="logo" src="/static/webapp/img/signin-logo.svg" />
      <img src="/static/webapp/images/refresh-page.svg" />
      <h3>Something went wrong</h3>
      <h5>Please refresh the page to continue</h5>
      <Button
        secondary
        text="Refresh"
        onClick={() => window.location.reload()}
      />
    </div>
  </div>
)

export default styled(RefreshErrorScreen)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #2F354A;
  .is-modal-refresh {
    padding: 60px 120px;
    text-align: center;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 0 1px 3px rgba(0,0,0,0.05);
    position: relative;
    img {
      width: 100px;
      &.logo {
        width: 230px;
        position: absolute;
        top: -110px;
        left: calc(50% - 115px);
      }
    }
    .is-button {
      margin-top: 20px;
    }
  }
`
