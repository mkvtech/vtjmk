import { expect, test } from '@playwright/test'
import { AppHelper } from './appHelper'
import { readPdf } from './share'

test('Generate Participation Certificate', async ({ page, baseURL, request }) => {
  page.setDefaultTimeout(3000)

  const appHelper = await AppHelper.resetApp({ page, baseURL, request })

  await page.goto('/')

  // Create Account
  await page.getByRole('link', { name: 'Prisijungti' }).click()

  await expect(page).toHaveURL('/login')

  await page.getByRole('link', { name: 'Sukurti paskyrą' }).click()

  await page.getByLabel('Vardas ir pavardė').fill('Maksim Kulagin')
  await page.getByLabel('El. paštas').fill('maksim.kulagin@example.com')
  await page.getByLabel('Slaptažodis').fill('password')
  await page.getByRole('button', { name: 'Užsiregistruoti' }).click()

  await expect(page).toHaveURL('/')

  // Create participation request
  await page.getByRole('link', { name: 'Artėjančios konferencijos' }).hover()
  await page.getByRole('menuitem', { name: 'Informacinių technologijų sauga ir Informacinės sistemos 2023' }).click()
  await page.getByRole('link', { name: 'Dalyvauti' }).click()
  await page.getByLabel('Pavadinimas').fill('Analysis of long paper titles and its impact on GUI')
  await page.getByRole('button', { name: 'Siųsti' }).click()

  // Login as reviewer
  await page.getByRole('button', { name: 'Atsijungti' }).click()
  await appHelper.login({ email: 'petras.petraitis@example.com' })

  // Open participation page
  await page.getByRole('link', { name: 'Recenzavimas' }).click()
  const participationListItem = page.locator('li').filter({ hasText: 'Maksim Kulagin' })
  await participationListItem.getByRole('link', { name: 'Žiūrėti' }).click()

  // Approve
  await page.getByRole('button', { name: 'Būsena' }).click()
  await page.getByRole('option', { name: 'Patvirtinta' }).click()
  await page.getByLabel('Komentaras').fill('Patvirtinau')
  await page.getByRole('button', { name: 'Siųsti' }).click()

  await expect(page.locator('[data-test-id="participation-side-bar"]').getByText('Patvirtinta')).toBeVisible()

  // Login as conference manager
  await page.getByRole('button', { name: 'Atsijungti' }).click()
  await appHelper.login({ email: 'jonas.jonaitis@example.com' })

  // Go to conference document templates page
  await page.getByRole('link', { name: 'Konferencijos', exact: true }).hover()
  await page.getByRole('menuitem', { name: 'Informacinių technologijų sauga ir Informacinės sistemos' }).click()
  await page.getByRole('link', { name: 'Redaguoti' }).click()
  await page.getByRole('tab', { name: 'Dokumentų šablonai' }).click()

  // Create document template
  await page.getByRole('link', { name: 'Pridėti naują dokumentų šabloną' }).click()
  await page.getByLabel('Pavadinimas').fill('Dalyvavimo Sertifikatas')
  await page.getByLabel('Prefiksas').fill('[')
  await page.getByLabel('Postfiksas').fill(']')

  // Upload file
  const fileChooserPromise = page.waitForEvent('filechooser')
  await page.getByRole('button', { name: 'Įkelti' }).click()
  const fileChooser = await fileChooserPromise
  await fileChooser.setFiles('sampleFiles/Participation_Certificate_LT_1.docx')

  await page.getByRole('button', { name: 'Pridėti' }).click()

  // Ensure template created
  await expect(page.getByRole('heading', { name: 'Dalyvavimo Sertifikatas' })).toBeVisible()

  // Login as participant
  await page.getByRole('button', { name: 'Atsijungti' }).click()
  await appHelper.login({ email: 'maksim.kulagin@example.com' })

  // Open participation page
  await page.getByRole('link', { name: 'Dalyvavimai' }).click()
  await page.getByRole('link', { name: 'Žiūrėti' }).click()

  // Go to document generation page
  await page.getByRole('button', { name: 'Veiksmai' }).click()
  await page.getByRole('menuitem', { name: 'Gauti sertifikatą' }).click()

  // Form should be automatically filled

  // Generate & download document
  const downloadPromise = page.waitForEvent('download', { timeout: 10000 })
  await page.getByRole('button', { name: 'Generuoti' }).click()
  const download = await downloadPromise
  await download.saveAs('downloads/participation_certificate.pdf')
  await expect(page.getByText('Dokumentas sėkmingai sugeneruotas')).toBeVisible()

  // Validate generated PDF file
  const pdf = await readPdf('./downloads/participation_certificate.pdf')
  expect(pdf.numpages).toEqual(1)
  expect(pdf.text).toContain('„Informacinių technologijų sauga ir Informacinės sistemos 2023“')
  expect(pdf.text).toContain('Maksim Kulagin')
})
