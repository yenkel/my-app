// admin
// edit_campaigns
// irontraps_action
// manage_irontraps
// irontraps_viewer

/**
 * If section has 'self' rules each children
 * has to have same rules (+ children rules) as well.
 */
const pages = {
  home: {
    dashboards: {
      mitigation: (l, p, i) => checkPerm(p, ['admin', 'irontraps_action', 'manage_irontraps', 'irontraps_viewer']),
    },
  },
  awarenesscenter: {
    phishing_simulator: {
      self: (l, p, i) => checkPerm(p, ['admin', 'edit_campaigns']) && l.ironschool,
    },
    attack_emulator: {
      self: (l, p, i) => checkPerm(p, ['admin']) && i.o365,
    },
    wizard_campaign: { // FIXME: TBD
      self: (l, p, i) => checkPerm(p, ['admin']) && i.o365,
    },
  },
  settings: {
    account_settings: {
      general: (l, p, i) => checkPerm(p, ['admin']),
      system_users: (l, p, i) => checkPerm(p, ['admin']),
      whitelist: (l, p, i) => checkPerm(p, ['admin', 'manage_irontraps']),
      languages: (l, p, i) => checkPerm(p, ['admin']),
    },
    threats_protection: {
      self: (l, p, i) => checkPerm(p, ['admin', 'manage_irontraps']),
      incident_response: (l, p, i) => checkPerm(p, ['admin', 'manage_irontraps']) && l.irontraps,
      intelligence: (l, p, i) => checkPerm(p, ['admin', 'manage_irontraps']) && l.federation,
      business_email_compromise: (l, p, i) => checkPerm(p, ['admin', 'manage_irontraps']) && l.ironsights,
      customization: (l, p, i) => checkPerm(p, ['admin', 'manage_irontraps']) && l.irontraps && (i.exchange || !isIntegrated(i)),
      customizationO365: (l, p, i) => checkPerm(p, ['admin', 'manage_irontraps']) && l.irontraps && i.o365,
    },
    simulator: {
      self: (l, p, i) => checkPerm(p, ['admin', 'edit_campaigns']),
    },
    integrations: {
      self: (l, p, i) => checkPerm(p, ['admin', 'manage_irontraps']),
    },
    notifications: {
      self: (l, p, i) => checkPerm(p, ['admin', 'manage_irontraps']),
      collaboration_apps_alerts: (l, p, i) => checkPerm(p, ['admin', 'manage_irontraps']) && l.irontraps,
      system_alerts: (l, p, i) => checkPerm(p, ['admin', 'manage_irontraps']),
      end_user_alerts: (l, p, i) => checkPerm(p, ['admin', 'manage_irontraps']),
    },
  },
  resolutionCenter: (l, p, i) => checkPerm(p, ['admin', 'irontraps_action', 'manage_irontraps', 'irontraps_viewer']) && l.irontraps,
}

/**
 * Valid if at least one of requested
 * permission is true.
 */
function checkPerm(currentPerm, askingPermArray) {
  return !!askingPermArray.filter(perm => currentPerm[perm]).length
}

function isIntegrated(i) {
  return !!Object.keys(i).filter(key => i[key]).length
}

/**
 * For partner case we're checking if
 * there is at least one company with
 * requested permissions. Then inside
 * each Component exist additional check
 * for selected company.
 */
function getItemsVisibility(props, sectionName) {
  const {
    partner, licenses, permissions, integrations,
  } = props

  // TODO: add check that partner connected to component

  const l = partner ? getCommon(props, 'licenses') : licenses
  const p = partner ? getCommon(props, 'permissions') : permissions
  const i = partner ? getCommon(props, 'integrations') : integrations

  const itemsVisibility = {}

  const visibility = pages[sectionName]

  /**
   * Taking all pages[sectionName]
   * rules and execute them with (l, p, i)
   */
  Object.keys(visibility).map((topKey) => {
    itemsVisibility[topKey] = {}
    Object.keys(visibility[topKey]).map((lowKey) => {
      itemsVisibility[topKey][lowKey] = visibility[topKey][lowKey](l, p, i)
    })
  })

  return itemsVisibility
}

function getCommon(props, entity) {
  const res = {}
  if (!props[entity]) throw new Error(`${entity} not in props`)
  Object.keys(props[entity]).map((key) => {
    res[key] = !!props.partner.companies.filter(c => c[entity][key]).length
  })
  return res
}

function epicCheck(store, checkPartnerAccess) {
  checkPartnerAccess()
}

export default {
  pages,
  epicCheck,
  getItemsVisibility,
  check: checkPerm,
}
