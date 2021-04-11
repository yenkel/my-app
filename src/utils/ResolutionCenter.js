export const getFirstReportedBy = report => (
  <>
    {report.reporterName || report.reporterEmail}
    {' '}
    {report.is911Report && '(911 mailbox)'}
    {report.isSights && '(Threat Protection Dashboard)'}
  </>
)
