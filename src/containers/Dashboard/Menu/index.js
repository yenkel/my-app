import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import { selectMenuItems } from './selectors'
import { selectPartner } from '../../App/selectors'

import Menu from '../../../components/elements/menu'

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)
const mapStateToProps = state => ({
  menuItems: selectMenuItems(state),
  partner: selectPartner(state),
})

const render = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu)

export default withRouter(render)
