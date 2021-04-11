const scenarioTypes = {
  driveby: 0,
  attachment: 1,
  callforaction: 2,
  smishing: 3,
}

const scenarioCodeToType = {
  0: 'driveby',
  1: 'attachment',
  2: 'callforaction',
  3: 'smishing',
}

const campaignTypes = {
  multilevel: 0,
  singlelevel: 1,
  benchmark: 2,
}

const campaignCodeToType = {
  0: 'multilevel',
  1: 'singlelevel',
  2: 'benchmark',
}

export {
  campaignTypes, scenarioTypes, campaignCodeToType, scenarioCodeToType,
}
