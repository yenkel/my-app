import { SOURCE_VALUES } from '../../containers/AwarenessCenter/WizardCampaign/TrainingModuleStep/constants'

const getVideoThumbnail = (v) => {
  switch (v.category) {
    case 'NINJIO':
      return `NINJIO/${v.videoFile.split('_')[0]}`
    case 'InfoSequre':
      return `INFOSEQURE/${v.name}`
    case 'IRONSCALES':
      return `IS/${v.name?.replace('?', '')}`
    case 'Habitu8':
      return `HABITU8/${v.videoFile}`
    default:
      return 'DEFAULT/video-mask'
  }
}

const getVideoFile = (v) => {
  switch (v.category) {
    case 'NINJIO':
      return `premium/${v.videoFile}.mp4`
    case 'InfoSequre':
      return `infosequre/${v.videoFile}.mp4`
    case 'Habitu8':
      return `habitu8/${v.videoFile}.mp4`
    case 'Cybermaniacs Videos':
      return `cybermaniacs/${v.videoFile}.mp4`
    default:
      return `${v.videoFile}.mp4`
  }
}

const videoVendorDetails = {
  [SOURCE_VALUES.HABITU8]: {
    title: 'Habitu8',
    description: 'Habitu8’s Hashtag Awareness® live-action & animated series. Funny, short videos highlighting a single topic. Filmed in Hollywood, California - this series established the “Netflix-style” genre of training videos. You may recognize many of the actors on some of today’s hottest shows!(Parks & Rec, Marvel’s The Punisher, Brooklyn 99, Good Trouble, Rosewood, Gossip Girl, Grace & Frankie...just to name a few).',
    logo: '/static/webapp/images/training-videos-vendors/HABITU8-logo.png',
  },
  [SOURCE_VALUES.NINJIO]: {
    description: 'NINJIO AWARE™ Anime uses American anime cartoon characters to educate users about cybersecurity awareness. This video format uses NINJIO’s signature Hollywood-style storytelling that shapes the behavior of employees, staff, and team members to raise the security bar in the office and at home.',
    logo: '/static/webapp/images/training-videos-vendors/ninjio_logo_svg.svg',
    title: 'NINJIO AWARE™ Anime',
  },
  [SOURCE_VALUES.INFOSEQURE]: {
    description: 'Infosequre security awareness training is designed to engage employees and reduce the risk of human behavior. Infosequre awareness training positively shifts culture. \n' + '\n' + 'The memorable messages trigger your people’s core drives and put them at the front line of the fight against cyber threats.',
    logo: '/static/webapp/images/training-videos-vendors/infosequre-logo.svg',
    title: 'Infosequre awareness training ',
  },
  [SOURCE_VALUES.IRONSCALES]: {
    description: 'We take a multi-layered, employee-tailored approach to training, with the goal of reducing phishing clicks rates while improving the rate and speed of detection.',
    logo: '/static/webapp/images/training-videos-vendors/ironscales-logo.svg',
    title: 'IRONSCALES TRAINING ',
  },
  [SOURCE_VALUES.CYBERMANIACS]: {
    description: 'A cyber security awareness solution for organisations both large and small. Our cloud based platform is an interactive and engaging learning experience.',
    logo: '/static/webapp/images/training-videos-vendors/cyberManiacs-logo.png',
    title: 'CYBERMANIACS SECURITY AWARENESS',
  },
}

export default {
  getVideoThumbnail,
  getVideoFile,
  videoVendorDetails,
}
