export const genId = length => '-'.repeat(length || 8).replace(/-/g, () => (Math.random() * 16 | 0).toString(16).toUpperCase())
