export const roles = [
  { id: 1, name: 'Admins' },
  { id: 3, name: 'Campaigns Editors' },
  { id: 2, name: 'Resolution Center Manager' },
  { id: 4, name: 'Resolution Center Viewer' },
  { id: 5, name: 'Resolution Center Operator' },
]

export const NONE_ROLE_OPTION = { value: 0, name: 'None' }

export const rolesOptions = roles.map(r => ({ value: r.id, label: r.name }))

export const OWNER_ROLE = { id: 99999, name: 'Owner' }
export const rolesAndOwner = [
  OWNER_ROLE,
  ...roles,
]

export const getRoleNameById = (relevantRoles, id) => relevantRoles.find(r => r.id === id).name
