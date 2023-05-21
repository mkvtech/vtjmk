import { Page } from '@playwright/test'
import { readFile } from 'fs/promises'
import pdf, { Result as PdfResult } from 'pdf-parse'

export async function readPdf(filePath: string): Promise<PdfResult> {
  const file = await readFile(filePath)
  return pdf(file)
}

// From:
// https://github.com/microsoft/playwright/issues/13855#issuecomment-1144645091
// Changed to be TypeScript-compatible and added some waits for RBD
export const dragAndDrop = async (page: Page, subjectSelector: string, targetSelector: string) => {
  const subjectElement = await page.waitForSelector(subjectSelector)
  const targetElement = await page.waitForSelector(targetSelector)

  const subjectElementBound = await subjectElement.boundingBox()
  const targetElementBound = await targetElement.boundingBox()

  if (subjectElementBound === null) {
    throw new Error('subjectElementBound is null')
  }

  if (targetElementBound === null) {
    throw new Error('targetElementBound is null')
  }

  await page.mouse.move(
    subjectElementBound.x,
    subjectElementBound.y,
    { steps: 10 } // this is the most important part!
  )

  await page.dispatchEvent(subjectSelector, 'mousedown', {
    button: 0,
    force: true,
  })

  // the x and y below is up to you to determine, in my case it was a checkers game so I needed to calculate a bit
  // if you are using with lists, you might try and consider the numbers below..

  const x = targetElementBound.x + targetElementBound.width / 2
  const y = targetElementBound.y + targetElementBound.height / 2

  // steps are needed here as well
  await page.mouse.move(x, y, { steps: 10 })

  // Wait for RBD to scroll the page while holding a subject
  await page.waitForTimeout(1000)

  await page.dispatchEvent(targetSelector, 'mouseup', {
    button: 0,
  })
}
