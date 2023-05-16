import { expect, test } from '@playwright/test'
import { readFile } from 'fs/promises'
import { AppHelper } from './appHelper'

test('Participation', async ({ page, baseURL, request }) => {
  page.setDefaultTimeout(3000)

  await AppHelper.resetApp({ page, baseURL, request })

  await page.goto('/')

  // Create Account
  await page.getByRole('link', { name: 'Prisijungti' }).click()

  await expect(page).toHaveURL('/login')

  await page.getByRole('link', { name: 'Sukurti paskyrą' }).click()

  await page.getByLabel('Vardas ir pavardė *').fill('Maksim Kulagin')
  await page.getByLabel('El. paštas *').fill('maksim.kulagin@example.com')
  await page.getByLabel('Slaptažodis *').fill('password')

  await page.getByRole('button', { name: 'Užsiregistruoti' }).click()

  await expect(page).toHaveURL('/')

  // Create Participation request
  await page.getByRole('link', { name: 'Artėjančios konferencijos' }).hover()

  await page.getByRole('menuitem', { name: 'Informacinių technologijų sauga ir Informacinės sistemos 2023' }).click()

  await page.getByRole('link', { name: 'Dalyvauti' }).click()

  await page.getByLabel('Pavadinimas *').fill('Pavadinimas')

  // Upload files
  // See:
  // https://github.com/microsoft/playwright/issues/8850
  // https://github.com/microsoft/playwright/issues/10667#issuecomment-998397241
  const buffer = await readFile('./sampleFiles/sampleDocument.docx')
  const dataTransfer = await page.evaluateHandle((data) => {
    const dt = new DataTransfer()
    const file = new File([data.toString('hex')], 'sampleDocument.docx', {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    })
    dt.items.add(file)
    return dt
  }, buffer)
  await page
    .locator('div')
    .filter({ hasText: /^Įmeskite failus į šį laukelį arba spustelėkite, kad pridėtumėte failus$/ })
    .dispatchEvent('drop', { dataTransfer })

  await page.getByRole('button', { name: 'Siųsti' }).click()

  // Add comment
  await page.getByLabel('Komentaras').fill('Noriu dalyvauti konferencijoje')

  await page.getByRole('button', { name: 'Siųsti' }).click()

  await expect(page.getByText('Noriu dalyvauti konferencijoje')).toBeVisible()

  // Login as manager
  await page.getByRole('button', { name: 'Atsijungti' }).click()

  await page.getByRole('link', { name: 'Prisijungti' }).click()

  await page.getByLabel('El. paštas *').fill('jonas.jonaitis@example.com')
  await page.getByLabel('Slaptažodis *').fill('password')

  await page.getByRole('button', { name: 'Prisijungti' }).click()

  // Go to created participation page
  await page.getByRole('link', { name: 'Artėjančios konferencijos' }).hover()

  await page.getByRole('menuitem', { name: 'Informacinių technologijų sauga ir Informacinės sistemos 2023' }).click()

  await expect(page.getByText('1', { exact: true })).toBeVisible()

  await page.getByRole('link', { name: 'Dalyviai' }).click()

  let participationListItem = page.locator('li').filter({ hasText: 'Maksim Kulagin' })

  await participationListItem.getByRole('link', { name: 'Žiūrėti' }).click()

  // Assign a reviewer
  await page.getByRole('tab', { name: 'Recenzavimas' }).click()

  await page.getByRole('button', { name: 'Atidaryti' }).click()

  await page.getByRole('option', { name: 'Petras Petraitis' }).click()

  await page.getByRole('button', { name: 'Pridėti' }).click()

  await expect(page.getByRole('link', { name: 'Petras Petraitis petras.petraitis@example.com' })).toBeVisible()

  // Login as reviewer
  await page.getByRole('button', { name: 'Atsijungti' }).click()

  await page.getByRole('link', { name: 'Prisijungti' }).click()

  await page.getByLabel('El. paštas *').fill('petras.petraitis@example.com')
  await page.getByLabel('Slaptažodis *').fill('password')

  await page.getByRole('button', { name: 'Prisijungti' }).click()

  // Go to created participation page
  await page.getByRole('link', { name: 'Recenzavimas' }).click()

  participationListItem = page.locator('li').filter({ hasText: 'Maksim Kulagin' })

  await participationListItem.getByRole('link', { name: 'Žiūrėti' }).click()

  // TODO: Download file

  // Approve
  await page.getByRole('button', { name: 'Būsena' }).click()

  await page.getByRole('option', { name: 'Patvirtinta' }).click()

  await page.getByLabel('Komentaras').fill('Patvirtinau')

  await page.getByRole('button', { name: 'Siųsti' }).click()

  await expect(page.getByText('Patvirtinta').nth(1)).toBeVisible()
  await expect(page.locator('[data-test-id="participation-side-bar"]').getByText('Patvirtinta')).toBeVisible()

  // Add comment
  await page.getByRole('tab', { name: 'Komentarai' }).click()

  await page.getByLabel('Komentaras').fill('Patvirtinau')

  await page.getByRole('button', { name: 'Siųsti' }).click()

  await expect(
    page.getByRole('listitem').filter({ hasText: 'Maksim Kulagin' }).getByText('Noriu dalyvauti konferencijoje')
  ).toBeVisible()

  await expect(
    page.getByRole('listitem').filter({ hasText: 'Petras Petraitis' }).getByText('Patvirtinau')
  ).toBeVisible()
})
