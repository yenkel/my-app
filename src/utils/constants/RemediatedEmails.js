export const ACTION_CONST = {
  DELETE: 1,
  INLINE: 2,
  SPAM: 3,
  REVERT: 4,
  NOT_TAKEN: 5,
}

export const MAP_LABEL_BY_ACTION = {
  [ACTION_CONST.DELETE]: 'Quarantined',
  [ACTION_CONST.INLINE]: 'Inline message displayed',
  [ACTION_CONST.SPAM]: 'Moved to Spam',
  [ACTION_CONST.REVERT]: 'System reverted',
  [ACTION_CONST.NOT_TAKEN]: 'No action taken',
}
