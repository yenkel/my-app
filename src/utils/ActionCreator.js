/**
 * Creator for async types
 * @param {string} name - Type name in format <noun>_<verb> (for example: "DATA_REQUEST")
 * @param {string} identifier - Full path to reducer inside data layer (for example: "Dashboard/Home/ActivityLog")
 */
export const createAsyncTypes = (name, identifier) => ({
  INITIATE: `${identifier}/${name}`,
  SUCCESS: `${identifier}/${name}_SUCCESS`,
  ERROR: `${identifier}/${name}_CATCH_ERROR`,
  CANCEL: `${identifier}/${name}_CANCEL`,
})
