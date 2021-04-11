import generatePDF from '../index'
import { formatDate } from '../../dateUtils'

export default async function generateCampaignReportPDF({
  data,
  companyName,
  segmentsFilter,
  chart1,
  chart2,
  chart3,
}) {
  const statusIsSending = data.status === 'Sending'
  const chunks = [
    {
      type: 'text',
      value: `Name: ${data.name}`,
    },
    {
      type: 'text',
      value: `Time Zone: ${data.timezone}`,
    },
    {
      type: 'text',
      value: `Segment: ${segmentsFilter || 'All'}`,
    },
    { type: 'margin' },
    {
      type: 'text',
      value: `Campaign Status: ${data.status}`,
    },
    {
      type: 'text',
      value: `Distribution End Date: ${formatDate(data.endDate)}`,
    },
    {
      type: 'text',
      value: `Language: ${data.language}`,
    },
    {
      type: 'text',
      value: `Max Emails Per Day: ${data.maxEmailPerDay}`,
    },
    { type: 'margin' },
  ]

  if (statusIsSending) {
    chunks.push({
      type: 'text',
      value: `Emails Remaining: ${data.emailsRemaining}`,
    })
  }

  chunks.push(
    {
      type: 'text',
      value: `Participants: ${data.participants} (${data.bounced} emails bounced)`,
    },
    {
      type: 'text',
      value: `Number Of Clicks${data.campaignType === 2 ? '/Actions' : ''}: ${data.clicks}${data.campaignType === 2 ? `/${data.actions}` : ''}`,
    },
    {
      type: 'text',
      value: `Number of Trained: ${data.trained} ${data.systemTraining > 0 ? `Mandatory (${data.systemTraining} Voluntary)` : ''}`,
    },
    {
      type: 'text',
      value: `Number of Reported: ${data.reported}`,
    },
    { type: 'margin' },
    {
      type: 'text',
      value: `First Report: ${data.firstReport}`,
    },
    {
      type: 'text',
      value: `Mitigation Time: ${data.mitigationTime}`,
    },
    {
      type: 'text',
      value: `Lured Before Mitigation: ${data.luredBeforeMitigation}`,
    },
    {
      type: 'text',
      value: `Reports To Mitigate: ${data.reportsToMitigate}`,
    },
    { type: 'margin' },
    {
      type: 'title',
      value: 'Statistics',
    },
    { type: 'html', value: chart1, size: { height: 160 } },
    { type: 'addPage' },
  )

  if (data.totalPlugins) {
    chunks.push(
      {
        type: 'title',
        value: 'Plugins',
      },
      { type: 'html', value: chart2, size: { height: 160 } },
    )
  }

  chunks.push(
    {
      type: 'title',
      value: 'Clicks & Reports',
    },
    { type: 'html', value: chart3, size: { height: 160 } },
  )
  await generatePDF({
    fileName: 'campaign-report',
    title: 'Campaign Report',
    companyName,
    chunks,
  })
}
