import React from 'react'
import { Select, ConfigProvider } from 'antd'
import styled from 'styled-components'
import { CaretDownOutlined } from '@ant-design/icons'
import cls from 'classnames'

import Popup from '../elements/Popup'

import withValidation from './withValidation'

const StyledDropdown = styled(Select)`
  .ant-select-selector {
    color:${props => (props.customTextColor || '#09314D')};
    height: 34px !important;
    padding: 0 4px !important;
    background: transparent !important;
    border: none !important;
    border-radius: 0 !important;
    border-bottom: 1px solid ${props => (props.customTextColor || '#09314D')} !important;
  }
  .ant-select-arrow {
    right:0 !important;
  }
  .ant-select-arrow .anticon {
    //as a workaround for a known bug in the library -> https://github.com/ant-design/ant-design/pull/23448
    pointer-events: none !important;
  }
  .ant-select-clear {
    opacity:100 !important;
    right:25px !important;
  }
  .anticon-close-circle {
    color:#4B4B4B !important;
  }
  .ant-select-selection-search {
    left:4px !important;
  }
`

const Dropdown = (props) => {
  const {
    id,
    name,
    popup,
    loading,
    disabled,
    className,
    clearable,
    simpleValue,
    customStyle,
    enableSearch,
    customTextColor,
  } = props
  const changeHandler = (val, obj) => {
    if (simpleValue) {
      if (enableSearch) {
        props.onChange(val.value)
      } else {
        props.onChange(val)
      }
    } else {
      props.onChange(obj)
    }
  }
  const isLabelInValue = typeof props.value === 'object' || enableSearch

  let currentValue = (props.value === null || props.value === '') ? undefined : props.value
  if (isLabelInValue && typeof props.value !== 'object' && props.options) {
    for (let i = 0; i < props.options.length; i++) {
      const currentOption = props.options[i]
      if (currentOption.value == props.value) {
        currentValue = currentOption
        break
      }
    }
  }

  let Component = (
    <div id={`${id}-container`} className={cls('is-antd', 'is-antd-select-container', className)}>
      <ConfigProvider
        getPopupContainer={triggerNode => triggerNode.parentElement}
      >
        <StyledDropdown
          id={id}
          name={name}
          loading={loading}
          disabled={disabled}
          value={currentValue}
          allowClear={clearable}
          options={props.options}
          optionFilterProp="label"
          onChange={changeHandler}
          showSearch={enableSearch}
          className="is-antd-select"
          labelInValue={isLabelInValue}
          placeholder={props.placeholder}
          customTextColor={customTextColor}
          style={customStyle}
          suffixIcon={<CaretDownOutlined style={{ color: customTextColor || '#4B4B4B' }} />}
        />
      </ConfigProvider>
    </div>
  )

  if (popup) {
    Component = <Popup
      position={popup?.position || 'top center'}
      ContentComponent={popup ? <>{popup.text}</> : null}
      TriggerComponent={Component}
    />
  }

  return Component
}

class DropdownField extends React.Component {
  onBlur = () => {
    const { onBlur, value } = this.props
    onBlur(value)
  }

  onChange = (value) => {
    if (this.props.selectProps?.noNull && value === null) return
    this.props.onChange(value)
  }

  render() {
    return (
      <Dropdown
        {...this.props}
        {...this.props.selectProps}
        id={this.props.id}
        onBlur={this.onBlur}
        onChange={this.onChange}
        className={this.props.className}
      />
    )
  }
}

Dropdown.Field = withValidation(DropdownField)

export default Dropdown
