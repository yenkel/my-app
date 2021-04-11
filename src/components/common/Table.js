import styled from 'styled-components'

export const TableHeader = styled.tr`
  color: white;
  font-weight: bold;
  background-color: ${props => props.theme.primaryColor};
`

export const FixedTable = styled.table`
  table-layout: fixed;
`
