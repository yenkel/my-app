export default (values) => {
  const { oldPassword, newPassword, newPasswordVerify } = values
  const errors = {}
  if (newPassword !== newPasswordVerify) {
    errors.newPassword = 'Passwords do not match'
    errors.newPasswordVerify = 'Passwords do not match'
  }
  if (!oldPassword || oldPassword.length === 0) { errors.oldPassword = 'Current password cannot be empty' }
  if (!newPassword || newPassword.length === 0) { errors.newPassword = 'New password cannot be empty' }

  return errors
}

const confirmPassword = (password, confPassword) => v =>
  (password === confPassword ? undefined : 'Passwords do not match')

export { confirmPassword }
