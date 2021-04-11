import styled from 'styled-components'

const Badge = styled.span`
  display: inline-block;
  text-align: center;
  border: 1px solid;
  border-radius: 10000px;
  height: 1.5em;
  line-height: 1.5em;
  padding: 0 10px;
`

export default Badge

export const TabBadge = styled.span`
  border: none;
  display: inline-block;
  text-align: center;
  border-radius: 10000px;
  line-height: 1.5em;
  background-color: ${props => props.theme.primaryColor};
  color: white;
  margin-left: 10px;
  height: 17px;
  font-size: 10px;
  padding: 1px 8px;
  font-weight: normal !important;
`

const miniBadgeSize = 13
export const MiniBadge = styled(Badge)`
  position: absolute;
  top: -${miniBadgeSize / 3}px;
  right: 0;
  font-size: 10px;
  color: white;
  background-color: ${props => props.theme.primaryColor};
  min-width: ${miniBadgeSize}px;
  height: ${miniBadgeSize}px;
  line-height: ${miniBadgeSize}px;
  padding: 0 3px;
  transform: translateX(50%);
  border: none;
`

export const PriorityBadge = styled.span`
  color: white;
  font-size: 9px;
  text-align: center;
  font-weight: normal;
  padding: 5px 0;
  display: ${props => (!props.priority ? 'none' : 'inline-block')};
  min-width: 60px;
  border-radius: 10000px;
  background-color: ${(props) => {
    if (props.priority === 3) { return props.theme.priorityLow }
    if (props.priority === 1) { return props.theme.priorityHigh }
    return props.theme.priorityMedium
  }};
  text-transform: uppercase;
`

export const MenuBadge = styled(Badge)`
  float: right;
  margin: -3px 23px 0 0;
  min-width: 25px;
  height: 25px;
  line-height: 23px;
  padding: 0 7px;
  font-size: 12px;
  font-weight: bold;

  border-color: ${props => props.theme.contrastColor};

  color: ${props => (props.selected ? props.theme.blackish : props.theme.contrastColor)};
  background-color: ${props => (props.selected ? props.theme.contrastColor : 'transparent')};
`

export const MenuProgressBadge = styled(Badge)`
  float: right;
  margin: -3px 23px 0 0;
  min-width: 25px;
  height: 22px;
  line-height: 23px;
  padding: 0 7px;
  font-size: 12px;
  font-weight: bold;
  border: none;
  color: #fff;
  display: ${props => (props.progress === undefined && 'none')};
  background: ${props => (props.progress ? '#0152CC' : '#33B200')};
`

const miniIconSize = 13
export const MiniIcon = styled(Badge)`
  color: white;
  font-size: 10px;
  line-height: ${miniIconSize}px;
  min-width: ${miniIconSize}px;
  height: ${miniIconSize}px;
  padding: ${props => props.padding || '0 3px'};
  position: absolute;
  top: -${miniIconSize / 4}px;
  left: ${props => props.left || '3px'};
  z-index: 1;
  border: none;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.8);
  background-color: ${props => props.backgroundColor || props.theme.red};
  transform: translateX(25%);
`

