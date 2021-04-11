import React from 'react'

import MenuItem from './MenuItem'
import { MenuBadge, MenuProgressBadge } from '../Badge'

class CategoryLayout extends React.Component {
  filterCb = (item) => {
    const { companyId, companyFilter } = this.props
    return (item.visible === undefined || item.visible) &&
      (!companyFilter || (!item.selfCompanyOnly || companyFilter?.value === companyId))
  }

  render() {
    const {
      menuItems,
      checkSelected,
      handlerMenuItemClick,
    } = this.props

    return (
      <React.Fragment>
        {
          Object
            .keys(menuItems)
            .filter(elem => this.filterCb(menuItems[elem]))
            .map(elem => (
              <React.Fragment key={menuItems[elem].name}>
                <MenuItem
                  category={menuItems[elem].category}
                  selected={checkSelected(menuItems[elem])}
                  showValidationIcon={menuItems[elem].showValidationIcon}
                  id={`${menuItems[elem].name.replace(/ /g, '_')}_button`}
                  onClick={() => handlerMenuItemClick(menuItems[elem])}
                >
                  {menuItems[elem].name}
                  {
                    typeof menuItems[elem].counter === 'number' &&
                    <MenuBadge selected={checkSelected(menuItems[elem])}>
                      {menuItems[elem].counter}
                    </MenuBadge>
                  }
                </MenuItem>
                {
                  menuItems[elem].sub && Object.keys(menuItems[elem].sub).length &&
                  Object
                    .keys(menuItems[elem].sub)
                    .filter(subElemKey => this.filterCb(menuItems[elem].sub[subElemKey]))
                    .map((subElemKey) => {
                      const subElement = menuItems[elem].sub[subElemKey]
                      return (
                        <MenuItem
                          subitem
                          key={subElement.link}
                          link={subElement.link}
                          valid={subElement.isValid}
                          selected={checkSelected(subElement)}
                          showValidationIcon={subElement.showValidationIcon}
                          id={`${subElement.name.replace(/ /g, '_')}_button`}
                          onClick={() => handlerMenuItemClick(subElement)}
                        >
                          {subElement.name}
                          {
                            typeof subElement.counter === 'number' &&
                            <MenuBadge selected={checkSelected(subElement)}>
                              {subElement.counter}
                            </MenuBadge>
                          }
                          {
                            subElement.hasOwnProperty('progress') &&
                              <MenuProgressBadge progress={subElement.progress}>
                                {subElement.progress ? 'IN PROGRESS' : 'COMPLETED'}
                              </MenuProgressBadge>
                          }
                        </MenuItem>
                      )
                    })
                }
              </React.Fragment>
            ))
        }
      </React.Fragment>
    )
  }
}

export default CategoryLayout
