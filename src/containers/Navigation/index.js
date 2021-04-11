import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

// import * as navigationActions from './actions'

import {
  selectData,
} from '../App/selectors'

import Navigation from '../../components/layouts/Navigation'

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)
const mapStateToProps = state => ({
  app: selectData(state),
})

const render = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Navigation)

export default withRouter(render)
