import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import * as appActions from './actions'

import {
  selectError,
  selectStatusOfDataIsLoaded,
  selectSelfCompanyId,
  selectUserId,
  selectUserEmail,
  selectActualChurnZeroKey,
} from './selectors'
import { selectCompanyFilter } from '../PartnerOptions/selectors'

import App from '../../components/layouts/App'

const mapDispatchToProps = dispatch => bindActionCreators(appActions, dispatch)
const mapStateToProps = state => ({
  error: selectError(state),
  dataIsLoaded: selectStatusOfDataIsLoaded(state),
  selfCompanyId: selectSelfCompanyId(state),
  userId: selectUserId(state),
  userEmail: selectUserEmail(state),
  churnZeroKey: selectActualChurnZeroKey(state),
  companyFilter: selectCompanyFilter(state),
})

const render = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)

export default withRouter(render)
