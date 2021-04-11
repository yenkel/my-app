export const awarenessLevelMap = ['FishScales', 'WoodScales', 'SilverScales', 'BronzeScales', 'IronScales']

export const getSegmentsFromTargets = array => array?.filter(e => !awarenessLevelMap.includes(e.label))
export const getLevelsFromTargets = array => array?.filter(e => awarenessLevelMap.includes(e.label))
