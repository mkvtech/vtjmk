import { expect, test } from '@playwright/test'
import { AppHelper } from './appHelper'

test('Create Conference Event', async ({ page, baseURL, request }) => {
  page.setDefaultTimeout(3000)

  const appHelper = await AppHelper.resetApp({ page, baseURL, request })

  await page.goto('/')

  // Login with manager account
  await appHelper.login({ email: 'jonas.jonaitis@example.com' })

  // Create event
  await page.getByRole('link', { name: 'Konferencijos', exact: true }).hover()
  await page.getByRole('menuitem', { name: 'Informacinių technologijų sauga ir Informacinės sistemos' }).click()

  await page.getByRole('link', { name: 'Redaguoti' }).click()
  await page.getByRole('tab', { name: 'Įvykiai' }).click()

  await page.getByRole('button', { name: 'Sukūrti naują įvykį' }).click()
  await page.getByRole('button', { name: 'Atšaukti' }).click()
  await page.getByRole('button', { name: 'Sukūrti naują įvykį' }).click()

  await appHelper.fillMuiDatePickerLt({ label: 'Data', date: '2025-08-01' })
  await appHelper.fillMuiDatePickerLt({ label: 'Nuo', date: '2025-01-04' })
  await appHelper.fillMuiDatePickerLt({ label: 'Iki', date: '2025-07-01' })

  await page.getByLabel('Pavadinimas').fill('Informacinių technologijų sauga ir Informacinės sistemos')
  await page.getByRole('button', { name: 'Siųsti' }).click()

  // Ensure some data was copied from conference data
  await expect(page.getByLabel('Pavadinimas').inputValue()).resolves.toBe(
    'Informacinių technologijų sauga ir Informacinės sistemos'
  )
  await expect(page.getByLabel('Data').inputValue()).resolves.toBe('2025-08-01')
  await expect(page.getByLabel('Nuo').inputValue()).resolves.toBe('2025-01-04')
  await expect(page.getByLabel('Iki').inputValue()).resolves.toBe('2025-07-01')

  // Ensure Event has status 'Hidden' by default
  await expect(page.getByLabel('Būsena').textContent()).resolves.toBe('Paslėpta')
})
