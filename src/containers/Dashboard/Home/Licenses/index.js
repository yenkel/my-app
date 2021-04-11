import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import actions from './actions'

import {
  selectLoader,
  selectError,
  selectExpiery,
  selectLicenseInfo,
} from './selectors'

import Licenses from '../../../../components/layouts/dashboard/home/Licenses'

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

const mapStateToProps = state => ({
  loader: selectLoader(state),
  error: selectError(state),
  expiery: selectExpiery(state),
  license: selectLicenseInfo(state),
})

const render = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Licenses)

export default render
