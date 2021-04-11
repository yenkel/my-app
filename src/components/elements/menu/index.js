import React from 'react'
import cls from 'classnames'
import queryString from 'query-string'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Dropdown from '../../inputs/Dropdown'
import { ALL_COMPANIES_OPTION, MSP_COMPANY_FILTER_CLASS_NAME } from '../../../utils/partnerUtils'
import { findInNestedObject } from '../../../utils/helpers'
import { removeQueryStringProperty } from '../../../utils/historyManager'

import { applyCompanyFilter, companyFilterChange } from '../../../containers/PartnerOptions/actions'
import {
  selectPartner,
  selectCompanySelectorObject,
  selectSortedCompaniesOptions,
  selectSelfCompanyId,
} from '../../../containers/App/selectors'
import { selectCompanyFilter } from '../../../containers/PartnerOptions/selectors'

import CategoryLayout from './CategoryLayout'

class Menu extends React.Component {
  state = {
    isOpen: false,
  }

  partnerCompanies = []

  componentDidMount() {
    const {
      partner,
      location,
      history,
      companyFilter,
      applyCompanyFilter,
      allCompaniesOption,
      companySelectorObject,
    } = this.props

    if (location.pathname.indexOf('attackdetails') !== -1) {
      const splitted = location.pathname.split('/')
      const reportId = splitted.filter(elem => Number(elem))[0]
      this.state.activeName = `IS-${reportId}`
    }

    let qsCompanyFilter = null
    const companyFilterKey = 'companyFilter'
    const qs = queryString.parse(location.search)

    if (qs[companyFilterKey]) {
      qsCompanyFilter = partner?.companies.find(c => c.id === Number(qs.companyFilter))
      removeQueryStringProperty(history, qs, companyFilterKey)
    }

    if (partner) {
      this.initiatePartnerCompanies()

      if (allCompaniesOption) {
        this.partnerCompanies.unshift(ALL_COMPANIES_OPTION)
      }

      if (qsCompanyFilter) {
        applyCompanyFilter({ value: qsCompanyFilter.id, label: qsCompanyFilter.name })
      } else if (location.state?.selectedCompany) {
        applyCompanyFilter(location.state?.selectedCompany)
      } else if (!allCompaniesOption && companyFilter?.value === ALL_COMPANIES_OPTION.value) {
        applyCompanyFilter(companySelectorObject)
      } else if (!companyFilter) {
        applyCompanyFilter(companySelectorObject)
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.partner) {
      const onlySelfCompanyItems = []
      findInNestedObject(nextProps.menuItems, 'selfCompanyOnly', true, onlySelfCompanyItems)
      const mapOnlySelfCompanyLinks = onlySelfCompanyItems
        .reduce((prev, curr) => ({ ...prev, [curr.link]: true }), {})

      if (
        nextProps.companyFilter.value !== nextProps.selfCompanyId &&
        mapOnlySelfCompanyLinks[nextProps.location.pathname]
      ) {
        nextProps.history.push('/settings/account/general')
      }

      if (nextProps.allCompaniesOption !== this.props.allCompaniesOption) {
        if (nextProps.allCompaniesOption) this.partnerCompanies.unshift(ALL_COMPANIES_OPTION)
        else this.partnerCompanies.shift(ALL_COMPANIES_OPTION)
      }

      if (nextProps.partner.companies.length !== this.props.partner.companies.length) {
        this.initiatePartnerCompanies()
      }
    }
  }

  componentWillUnmount() {
    this.closeCommunicationWidgetIfOpen()
  }

  handlerMenuItemClick = (menuItem) => {
    if (this.props.match.path === '/irontraps') {
      this.closeCommunicationWidgetIfOpen()
    }
    if (menuItem.isRegularLink) {
      window.open(menuItem.link, '_self')
    } else if (!menuItem.disabled) {
      this.props.history.push(menuItem.link)
    }
  }

  getMenuLayout = () => {
    return CategoryLayout
  }

  initiatePartnerCompanies = () => {
    const { sortedCompaniesOptions } = this.props

    this.partnerCompanies = [...sortedCompaniesOptions]
  }

  closeCommunicationWidgetIfOpen = () => {
    if (this.props.isOpenCommunicationWidget) {
      this.props.toggleCommunicationWidget()
    }
  }

  checkSelected = (menuItem) => {
    let selected = false
    if (menuItem.wizardStep) {
      selected = this.props.location.pathname.includes(menuItem.link)
    } else {
      selected = this.props.location.pathname === menuItem.link ||
        `${this.props.location.pathname}/` === menuItem.link ||
        this.props.location.pathname === `${menuItem.link}/`
    }

    if (selected && this.state.activeName !== menuItem.name) {
      this.setState({ activeName: menuItem.name, isOpen: false })
    }

    return selected
  }

  handlerHeaderClick = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }))
  }

  changeCompanyFilter = (v) => {
    this.props.companyFilterChange(v)
  }

  render() {
    const { activeName, isOpen } = this.state
    const {
      partner,
      customItems,
      companyFilter,
      noCompanyFilter,
    } = this.props

    this.Layout = this.getMenuLayout()
    return (
      <div className="menu">
        <div
          className="menu-header"
          onClick={this.handlerHeaderClick}
        >
          <i className="icon-angle-down" />
          <span>{activeName}</span>
        </div>
        <div className={cls('menu-content', { open: isOpen })}>
          {
            partner &&
            !noCompanyFilter &&
            <Dropdown
              enableSearch
              clearable={false}
              customTextColor="#FFFFFF"
              id="companies_select"
              value={companyFilter}
              options={this.partnerCompanies}
              className={MSP_COMPANY_FILTER_CLASS_NAME}
              onChange={this.changeCompanyFilter}
            />
          }
          {
            <this.Layout
              {...this.props}
              checkSelected={this.checkSelected}
              handlerMenuItemClick={this.handlerMenuItemClick}
              closeCommunicationWidgetIfOpen={this.closeCommunicationWidgetIfOpen}
            />
          }
          {
            customItems?.length &&
            customItems.map(Component => <Component />)
          }
        </div>
      </div>
    )
  }
}

const render = connect(
  state => ({
    partner: selectPartner(state),
    selfCompanyId: selectSelfCompanyId(state),
    companyFilter: selectCompanyFilter(state),
    companySelectorObject: selectCompanySelectorObject(state),
    sortedCompaniesOptions: selectSortedCompaniesOptions(state),
  }),
  dispatch => bindActionCreators({ applyCompanyFilter, companyFilterChange }, dispatch),
)(Menu)

export default render
