import { expect, test } from '@playwright/test'
import { AppHelper } from './appHelper'
import { dragAndDrop } from './share'

test('Participants list file generation', async ({ page, baseURL, request, browserName }) => {
  if (browserName === 'firefox') {
    // Inconsistent results in firefox because of RBD usage
    return
  }

  page.setDefaultTimeout(5000)
  const appHelper = await AppHelper.resetApp({ page, baseURL, request })
  await page.goto('/')

  // Login as conference manager
  await appHelper.login({ email: 'jonas.jonaitis@example.com' })

  // Go to participants list
  await page.getByRole('link', { name: 'Artėjančios konferencijos' }).hover()
  await page.getByRole('menuitem', { name: 'Informacinių technologijų sauga ir Informacinės sistemos 2023' }).click()
  await page.getByRole('link', { name: 'Redaguoti' }).click()
  await page.getByRole('tab', { name: 'Dalyviai' }).click()

  // Add 1st participant
  await page.locator('[data-rbd-draggable-id="1"]').scrollIntoViewIfNeeded()
  await dragAndDrop(page, '[data-rbd-draggable-id="1"]', '[data-rbd-droppable-id="include"]')

  // Wait for RBD animation to finish
  await page.waitForTimeout(1000)

  // Add 2nd participant
  await page.locator('[data-rbd-draggable-id="3"]').scrollIntoViewIfNeeded()
  await dragAndDrop(page, '[data-rbd-draggable-id="3"]', '[data-rbd-droppable-id="include"]')

  // Wait for RBD animation to finish
  await page.waitForTimeout(1000)

  // Save
  await page.getByRole('button', { name: 'Saugoti' }).click()

  // Add Participants List Document Template

  // Go to conference document templates page
  await page.getByRole('link', { name: 'Konferencijos', exact: true }).hover()
  await page.getByRole('menuitem', { name: 'Informacinių technologijų sauga ir Informacinės sistemos' }).click()
  await page.getByRole('link', { name: 'Redaguoti' }).click()
  await page.getByRole('tab', { name: 'Dokumentų šablonai' }).click()

  // Create document template
  await page.getByRole('link', { name: 'Pridėti naują dokumentų šabloną' }).click()
  await page.getByLabel('Pavadinimas').fill('Dalyvių sąrašas')
  await page.getByLabel('Prefiksas').fill('[')
  await page.getByLabel('Postfiksas').fill(']')

  await page.getByRole('button', { name: 'Tipas' }).click()
  await page.getByRole('option', { name: 'Dalyvių sąrašas' }).click()

  // Upload file
  const fileChooserPromise = page.waitForEvent('filechooser')
  await page.getByRole('button', { name: 'Įkelti' }).click()
  const fileChooser = await fileChooserPromise
  await fileChooser.setFiles('sampleFiles/Participants_List_LT_1.docx')

  await page.getByRole('button', { name: 'Pridėti' }).click()

  // Ensure template created
  await expect(page.getByRole('heading', { name: 'Dalyvių sąrašas' })).toBeVisible()

  // Go back to participants page
  await page.getByRole('link', { name: 'Artėjančios konferencijos' }).hover()
  await page.getByRole('menuitem', { name: 'Informacinių technologijų sauga ir Informacinės sistemos 2023' }).click()
  await page.getByRole('link', { name: 'Redaguoti' }).click()
  await page.getByRole('tab', { name: 'Dalyviai' }).click()

  // Fill form
  await page.getByRole('button', { name: 'Atidaryti' }).click()
  await page.getByRole('option', { name: 'Dalyvių sąrašas' }).click()

  // Generate & download document
  const downloadPromise = page.waitForEvent('download', { timeout: 10000 })
  await page.getByRole('button', { name: 'Sugeneruoti' }).click()
  const download = await downloadPromise
  await download.saveAs('downloads/participants_list.pdf')
  await expect(page.getByText('Dokumentas sėkmingai sugeneruotas')).toBeVisible()

  // TODO: Validate generated PDF file
})
