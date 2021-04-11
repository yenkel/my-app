export const MSP_COMPANY_FILTER_CLASS_NAME = 'partner-companyFilter'

export const ALL_COMPANIES_OPTION = { value: '', label: 'All Companies' }

export const generateCompanySelectorObject = (companyId, companies) => {
  const company = companies.find(c => c.id === companyId)
  return { label: company.name, value: company.id }
}

export const statusAndNameSortCallback = isAscending => (c, d) => {
  const accountStatusWeight = {
    Active: 1,
    Trial: 2,
    Inactive: 3,
  }

  const [a, b] = isAscending ? [c, d] : [d, c]

  const aa = accountStatusWeight[a.accountStatus]
  const bb = accountStatusWeight[b.accountStatus]
  const cc = a.name
  const dd = b.name

  if (aa == bb) {
    return (cc < dd) ? -1 : (cc > dd) ? 1 : 0
  } else {
    return (aa < bb) ? -1 : 1
  }
}

export function findAndHighlightFirstInactive(items) {
  const timerId = setInterval(() => {
    const allItems = document.querySelectorAll(`.${MSP_COMPANY_FILTER_CLASS_NAME} .ant-select-item`)
    if (allItems.length) {
      // clearTimeout(timerId)
      for (let i = 0; i < allItems.length; i++) {
        allItems[i].style.borderTop = ''
      }

      for (let i = 0; i < items.length; i++) {
        const element = items[i]
        if (element.accountStatus === 'Inactive') {
          const dropdownItem = document.querySelector(`.${MSP_COMPANY_FILTER_CLASS_NAME} .ant-select-item[label="${element.name}"]`)
          if (dropdownItem) {
            dropdownItem.style.borderTop = '1px solid rgba(0, 0, 0, 1)'
          }
          break
        }
      }
    }
  }, 100)
}
