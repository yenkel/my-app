import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { addItems } from './Menu/actions'

import {
  selectPartner,
  selectSelfFeatureFlags,
  selectSelfIntegrations,
  selectSelfLicenses,
  selectSelfPermissions,
} from '../App/selectors'

import Dashboard from '../../components/layouts/dashboard'

const mapDispatchToProps = dispatch => bindActionCreators({ addItems }, dispatch)
const mapStateToProps = state => ({
  ff: selectSelfFeatureFlags(state),
  partner: selectPartner(state),
  licenses: selectSelfLicenses(state),
  permissions: selectSelfPermissions(state),
  integrations: selectSelfIntegrations(state),
})

const render = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard)

export default render
