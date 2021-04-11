import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Home from '../../../components/layouts/dashboard/home'
import { selectActualScanBackStatus } from '../../App/selectors'

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)
const mapStateToProps = state => ({
  scanBackStatus: selectActualScanBackStatus(state),
})

const render = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home)

export default render
