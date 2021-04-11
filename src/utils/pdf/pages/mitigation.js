import moment from 'moment'

import generatePDF from '../index'
import MitigationBlocks from '../../../components/elements/pdf/MitigationBlocks'
import {
  DATE_FILTERS,
  formatDateShort,
  mapDateFilterToFormattedDate,
} from '../../dateUtils'

export default async function generateMitigationPDF({
  data,
  KPIsData,
  companyName,
  timeFilter,
  irontrapsCategories,
  federationCategories,
  pdfUsersPerformanceCount,
  _incidentsCount,
}) {
  const chunks = [
    {
      type: 'text',
      value: `Incidents: ${_incidentsCount}`,
    },
    {
      type: 'text',
      value: `Marked as Phishing: ${data.phishing_attack}`,
    },
    {
      type: 'text',
      value: `Remediated Emails: ${data.remediated} out of ${data.total_mailboxes} Affected Mailboxes`,
    },
    {
      type: 'html',
      value: MitigationBlocks({ data, irontrapsCategories, federationCategories }),
      size: { height: 400 },
    },
  ]

  if (KPIsData.exist) {
    chunks.push({ type: 'addPage' })
    chunks.push({
      type: 'title',
      value: 'Most Targeted Employees:',
    })
    KPIsData.emails_count.map(elem => chunks.push({
      type: 'text',
      value: `${elem.employee__email}: ${elem.count}`,
    }))

    chunks.push(
      { type: 'margin' },
      {
        type: 'title',
        value: 'Top Reporters:',
      }
    )
    KPIsData.top_reporters.map(elem => chunks.push({
      type: 'text',
      value: `${elem.employee__email}: ${elem.count}`,
    }))

    chunks.push(
      { type: 'margin' },
      {
        type: 'title',
        value: 'Most Targeted Departments:',
      },
    )
    if (!KPIsData.department_count) {
      chunks.push({
        type: 'text',
        value: 'Departments have not been assigned',
      })
    } else {
      KPIsData.department_count.map(elem => chunks.push({
        type: 'text',
        value: `${elem.employee__department}: ${elem.count}`,
      }))
    }

    chunks.push(
      { type: 'margin' },
      {
        type: 'title',
        value: 'Incident Resolution Time (median):',
      },
      {
        type: 'text',
        value: `${KPIsData.global_median[0]} ${KPIsData.global_median[1]}`,
      }
    )

    if (KPIsData.department_count) chunks.push({ type: 'addPage' })
    else chunks.push({ type: 'margin' })

    const performanceExist = Array.isArray(KPIsData.per_user_performance)
    chunks.push(
      {
        type: 'title',
        value: `Analysts Performance (top ${pdfUsersPerformanceCount})`,
      },
      {
        type: 'generateTable',
        value: [
          ['<b>Analyst</b>', '<b>Incidents Resolved</b>', '<b>Incident Time (Median)</b>'],
          ...!performanceExist ? [Array(3).fill('N/A')] :
            KPIsData.per_user_performance.slice(0, pdfUsersPerformanceCount).map(row => ([row.name, row.count, `${row.median.value} ${row.median.label}`])),
        ],
      }
    )
  }

  await generatePDF({
    fileName: 'mitigation-report',
    title: 'Phishing Mitigation Report',
    subTitle: Array.isArray(timeFilter) ?
      `${formatDateShort(timeFilter[0])} - ${formatDateShort(timeFilter[1])}` :
      `${mapDateFilterToFormattedDate[DATE_FILTERS[timeFilter]]} - ${formatDateShort(moment())}`,
    companyName,
    chunks,
  })
}
