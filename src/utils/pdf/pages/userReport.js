import generatePDF from '../index'
import {
  formatDateShort,
} from '../../dateUtils'
import { formatSecondsToDuration, timeStringToSeconds, sum } from '../../helpers'

export default async function generateUserReportPDF({
  data,
  graph,
}) {
  const items = data.campaignsList || []
  const itemsIsExist = !!items.length

  let avgReportTimeText = 'N/A'
  if (data && data.firstReport) {
    const filteredReportTimes = data.firstReport.map(t => (t === 'No Reports' ? 0 : timeStringToSeconds(t))).filter(t => !!t)
    if (filteredReportTimes.length) {
      const avgReportTime = Math.floor(filteredReportTimes.reduce(sum, 0) / filteredReportTimes.length)
      avgReportTimeText = formatSecondsToDuration(avgReportTime)
    }
  }

  const chunks = [
    {
      type: 'text',
      value: `Risk Level: ${['Low', 'Medium', 'High'][data.riskLevel]}`,
    },
    {
      type: 'text',
      value: `Easy Clicker: ${data.easyClicker ? 'Yes' : 'No'}`,
    },
    { type: 'margin' },
    {
      type: 'title',
      value: 'Mailbox Details:',
    },
    {
      type: 'text',
      value: `Title: ${data.title}`,
    },
    {
      type: 'text',
      value: `Department: ${data.department}`,
    },
    {
      type: 'text',
      value: `Email: ${data.email}`,
    },
    {
      type: 'text',
      value: `Language: ${data.language}`,
    },
    {
      type: 'text',
      value: `Last Campaign Activity: ${itemsIsExist && formatDateShort(items[0].scheduleTime)}`,
    },
    {
      type: 'text',
      value: `Campaigns Received: ${data.campaignsReceived}`,
    },
    {
      type: 'text',
      value: `Training Completed: ${data.campaignsReceived}`,
    },
    {
      type: 'text',
      value: `Average Time to first report: ${avgReportTimeText}`,
    },

  ]

  chunks.push(
    { type: 'margin' },
    {
      type: 'title',
      value: 'Aggregated results:',
    }
  )
  data.aggregatedResults.map(elem => chunks.push({
    type: 'text',
    value: `${elem.name}: ${elem.value}`,
  }))

  chunks.push(
    { type: 'margin' },
    {
      type: 'title',
      value: 'Training Score:',
    },
    {
      type: 'text',
      value: `${data.fullName || 'This user'}: ${data.userScores && data.userScores.toFixed()}`,
    },
    {
      type: 'text',
      value: `Company Average: ${data.avgScore && data.avgScore.toFixed()}`,
    },
  )

  chunks.push(
    { type: 'margin' },
    {
      type: 'title',
      value: 'Campaigns\' scenario type:',
    },
    {
      type: 'text',
      value: `Drive By: ${data.driveByCount} / ${data.driveByLuredCount}`,
    },
    {
      type: 'text',
      value: `Attachment: ${data.attachmentCount} / ${data.attachmentLuredCount}`,
    },
    {
      type: 'text',
      value: `Call For Action: ${data.callForActionCount} / ${data.callForActionLuredCount}`,
    },
    {
      type: 'text',
      value: `Smishing: ${data.smishingCount} / ${data.smishingLuredCount}`,
    },
  )

  if (graph) {
    chunks.push(
      { type: 'addPage' },
      { type: 'html', value: graph, size: { height: 140 } }
    )
  }

  await generatePDF({
    fileName: 'user-report',
    title: 'User Report',
    subTitle: data.fullName,
    companyName: data.companyName,
    chunks,
  })
}
