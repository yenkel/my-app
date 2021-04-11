/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable new-cap, no-param-reassign, no-mixed-operators */
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import moment from 'moment'
import {
  formatDate,
} from '../dateUtils'

import Header from '../../components/elements/pdf/Header'
// import Footer from '../../components/elements/pdf/Footer'

import Komorebi from './fonts/Komorebi.txt'

html2canvas.logging = false
window.html2canvas = html2canvas.bind(this,)

const createElemFromStr = (str) => {
  const div = document.createElement('div')
  div.innerHTML = str
  return div
}

const createDataURLFromElem = async (elem) => {
  const canvas = await html2canvas(elem, { scale: 3 })
  return canvas.toDataURL('image/jpeg')
}

const createElemFromStrAndMount = (str, parent) => parent.appendChild(createElemFromStr(str))

const generateImageAndAppendToPDF = async (pdf, elem, marginX, marginY, elemWidth, elemHeight) => {
  const dataURL = await createDataURLFromElem(elem)
  pdf.addImage(dataURL, 'jpeg', marginX, marginY, elemWidth, elemHeight)
}

const generateTableHTML = (arr) => {
  let table = '<table class="is-table-pdf"><tbody>'
  const end = '</tbody></table>'
  arr.forEach((row) => {
    table += '<tr>'
    table += row.reduce((prev, item) => `${prev}<td>${item}</td>`, '')
    table += '</tr>'
  })
  return table + end
}

function isDOMElement(element) {
  return element instanceof window.Element || element instanceof window.HTMLDocument
}

function isJapanese(text) {
  return /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/.test(text)
}

function textJapanese(pdf, text, x, y) { // なに テクソル
  let charWidth
  let horizontalOffset = x
  text.split(' ').forEach((chunk) => {
    if (isJapanese(chunk)) {
      charWidth = 10
      pdf.setFont('Komorebi', '')
    } else {
      charWidth = 5
      pdf.setFont('Helvetica', '')
    }
    pdf.text(chunk, horizontalOffset, y)
    horizontalOffset += chunk.length * charWidth
  })

  pdf.setFont('Helvetica', '')
}

// TODO: add chain interface pdf.text().table().image()

export default async function generatePDF({
  title,
  subTitle,
  companyName,
  chunks,
  fileName,
}) {
  const pdf = new jsPDF({ unit: 'px' }) // width: 446.46 height: 631.4175

  const margin = 15
  const pdfWidth = pdf.internal.pageSize.width - margin * 2
  const pdfHeight = pdf.internal.pageSize.height - margin * 2

  const htmlContainer = document.createElement('div')
  htmlContainer.setAttribute('style', `width: ${pdfWidth}px;`)
  htmlContainer.classList.add('dn-pdf')
  document.body.appendChild(htmlContainer)

  const HeaderHeight = 90
  const generatedHeader = Header({ title, subTitle, companyName })
  const mountedHeader = createElemFromStrAndMount(generatedHeader, htmlContainer)
  await generateImageAndAppendToPDF(pdf, mountedHeader, margin, margin, pdfWidth, HeaderHeight)

  let offset = HeaderHeight + margin
  const liMargin = '' // '     '

  pdf.setFontSize(12)
  pdf.addFileToVFS('Komorebi.ttf', Komorebi)
  pdf.addFont('Komorebi.ttf', 'Komorebi', '')

  for (const chunk in chunks) {
    if (!chunks[chunk].type) throw new Error('chunk must have a type')
    offset += margin
    if (chunks[chunk].modifyTopOffset) offset += chunks[chunk].modifyTopOffset
    switch (chunks[chunk].type) {
      case 'text':
        if (isJapanese(chunks[chunk].value)) textJapanese(pdf, chunks[chunk].value, margin, offset)
        else pdf.text(chunks[chunk].value, margin, offset)
        break
      case 'text-li':
        pdf.text(`${liMargin}${chunks[chunk].value}`, margin, offset)
        break
      case 'title':
        pdf.setFontType('bold')
        pdf.text(chunks[chunk].value, margin, offset)
        pdf.setFontType('normal')
        break
      case 'generateTable': {
        let generatedTable = generateTableHTML(chunks[chunk].value)
        const elementHeight = chunks[chunk].value.length * 30 // 30 height of row
        generatedTable = createElemFromStrAndMount(generatedTable, htmlContainer)
        await generateImageAndAppendToPDF(pdf, generatedTable, margin, offset, chunks[chunk].size?.width || pdfWidth, elementHeight)
        offset += elementHeight
        break
      }
      case 'html': {
        let element = chunks[chunk].value
        const elementWidth = chunks[chunk].size.width || pdfWidth
        const elementHeight = chunks[chunk].size.height || pdfHeight
        let leftOffset = margin
        if (chunks[chunk].alignment === 'center') leftOffset = pdfWidth / 2 - elementWidth / 2 + margin

        if (!isDOMElement(element)) {
          element = createElemFromStrAndMount(element, htmlContainer)
        }
        // else element = element.cloneNode(true)
        // const mounted = htmlContainer.appendChild(element)
        // element.setAttribute('style', 'border: 1px solid red;')
        await generateImageAndAppendToPDF(pdf, element, leftOffset, offset, elementWidth, elementHeight)
        offset += elementHeight
        break
      }
      case 'margin':
        break
      case 'addPage':
        offset = margin
        pdf.addPage('a4', chunks[chunk].landscape ? 'landscape' : 'portrait')
        break
      default:
        throw new Error('Not supported type')
    }
  }

  // offset += margin
  // const FooterHeight = 40
  // const generetedFooter = Footer()
  // const mountedFooter = createElemFromStrAndMount(generetedFooter, htmlContainer)
  // await generateImageAndAppendToPDF(pdf, mountedFooter, margin, offset, pdfWidth, FooterHeight)

  document.body.removeChild(htmlContainer)
  await pdf.save(`${fileName} (${formatDate(moment())}).pdf`, { returnPromise: true })
}
