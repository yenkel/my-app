import { arrayOfObjectsToObject, checkAllObjectValuesMatchExpectations } from '../helpers'

import PartnerCompanyStep from '../../components/elements/wizard/steps/PartnerCompanyStep'
import SetupStep from '../../containers/AwarenessCenter/WizardCampaign/SetupStep'
import ScenariosStep from '../../containers/AwarenessCenter/WizardCampaign/ScenariosStep'
import LandingPageStep from '../../containers/AwarenessCenter/WizardCampaign/LandingPageStep'
import TrainingModuleStep from '../../containers/AwarenessCenter/WizardCampaign/TrainingModuleStep'
import ReviewAndLaunchStep from '../../containers/AwarenessCenter/WizardCampaign/ReviewAndLaunchStep'

import {
  SENDING_VALUES,
} from '../../containers/AwarenessCenter/WizardCampaign/constants'

import {
  selectValidation,
  selectName,
  selectParticipants,
  selectSendingDays,
  selectSendingType,
  selectSelectedScenarios,
  selectSelectedLandingPage,
  selectSelectedTrainingVideo,
} from '../../containers/AwarenessCenter/WizardCampaign/selectors'
import { selectSelectedScenariosByLevels } from '../../containers/AwarenessCenter/WizardCampaign/ScenariosStep/selectors'
import { selectCompanyFilter } from '../../containers/PartnerOptions/selectors'

const partnerCompanyStep = {
  name: 'Company',
  path: 'company',
  Component: PartnerCompanyStep,
  isValid: state => true,
}

const campaignSetupStep = {
  name: 'Campaign Setup',
  path: 'campaign-setup',
  Component: SetupStep,
  isValid: (state) => {
    const campaignName = selectName(state)
    const participants = selectParticipants(state)
    const sendingDays = selectSendingDays(state)

    const validation = selectValidation(state)
    const setupFields = ['name', 'launchDate', 'launchTime', 'endDate']
    return (
      !!campaignName &&
      !!participants.total &&
      !!sendingDays &&
      !Object
        .keys(validation)
        .filter(key => setupFields.includes(key))
        .filter(key => validation[key])
        .length
    )
  },
}

const scenariosStep = {
  name: 'Scenarios',
  path: 'scenarios',
  Component: ScenariosStep,
  isValid: (state) => {
    const sendingType = selectSendingType(state)
    const participants = selectParticipants(state)
    const selectedScenarios = selectSelectedScenarios(state)

    if (sendingType === SENDING_VALUES.RANDOMIZED) {
      return !!participants.total &&
        !!selectedScenarios.length &&
        participants.total >= selectedScenarios.length
    } else if (sendingType === SENDING_VALUES.LEVELED) {
      const participantLevelsFilledMap = Object
        .keys(participants.levels)
        .filter(level => participants.levels[level])
        .reduce((prev, curr) => ({ ...prev, [curr]: false }), {})

      const selectedScenariosByLevels = arrayOfObjectsToObject(selectSelectedScenariosByLevels(state), 'level')
      const notValidLevels = Object
        .keys(selectedScenariosByLevels)
        .filter((level) => {
          participantLevelsFilledMap[level] = !!selectedScenariosByLevels[level].scenarios.length
          return !participantLevelsFilledMap[level] ||
            !selectedScenariosByLevels[level].participants ||
            selectedScenariosByLevels[level].scenarios.length > selectedScenariosByLevels[level].participants
        })

      return !notValidLevels.length && checkAllObjectValuesMatchExpectations(participantLevelsFilledMap, true)
    } else throw new Error('sendingType is not supported')
  },
}

const landingPageStep = {
  name: 'Landing page',
  path: 'landing-page',
  showSelectedLabelIfValid: true,
  Component: LandingPageStep,
  isValid: state => !!selectSelectedLandingPage(state)?.id,
}

const trainingModuleStep = {
  name: 'Training Module',
  path: 'training-module',
  showSelectedLabelIfValid: true,
  Component: TrainingModuleStep,
  isValid: state => !!selectSelectedTrainingVideo(state)?.id,
}

const reviewAndLaunchStep = {
  name: 'Review & Launch',
  path: 'review-launch',
  Component: ReviewAndLaunchStep,
  isValid: state => (
    partnerCompanyStep.isValid(state) &&
    campaignSetupStep.isValid(state) &&
    scenariosStep.isValid(state) &&
    landingPageStep.isValid(state) &&
    trainingModuleStep.isValid(state)
  ),
}

export default {
  partnerCompanyStep,
  campaignSetupStep,
  scenariosStep,
  landingPageStep,
  trainingModuleStep,
  reviewAndLaunchStep,
}
