import { expect, test } from '@playwright/test'
import { AppHelper } from './appHelper'

test('Permissions', async ({ page, baseURL, request }) => {
  page.setDefaultTimeout(3000)

  const appHelper = AppHelper.resetApp({ page, baseURL, request })

  await page.goto('/')

  // Create test account
  await page.getByRole('link', { name: 'Prisijungti' }).click()

  await expect(page).toHaveURL('/login')

  await page.getByRole('link', { name: 'Sukurti paskyrą' }).click()

  await page.getByLabel('Vardas ir pavardė').fill('Bob Ross')
  await page.getByLabel('El. paštas').fill('bob.ross@example.com')
  await page.getByLabel('Slaptažodis').fill('password')

  await page.getByRole('button', { name: 'Užsiregistruoti' }).click()

  await expect(page).toHaveURL('/')

  // Ensure account has no permission to read authorized data
  await page.getByRole('link', { name: 'Artėjančios konferencijos' }).hover()

  await page.getByRole('menuitem', { name: 'Informacinių technologijų sauga ir Informacinės sistemos 2023' }).click()

  await expect(page.getByRole('link', { name: 'Redaguoti' })).toBeHidden()

  // Login with admin account
  await page.getByRole('button', { name: 'Atsijungti' }).click()
  await appHelper.login({ email: 'admin@example.com' })

  // Create permission
  await page.getByRole('link', { name: 'Leidimai' }).click()

  await page.getByRole('link', { name: 'Sukurti leidimą' }).click()

  await page.getByRole('button', { name: 'Vartotojas' }).click()

  await page.getByRole('option', { name: 'Bob Ross (bob.ross@example.com)' }).click()

  await page.getByRole('button', { name: 'Objekto tipas' }).click()
  await page.getByRole('option', { name: 'Konferencija' }).click()

  await page.getByRole('button', { name: 'Objektas' }).click()
  await page.getByRole('option', { name: 'Informacinių technologijų sauga ir Informacinės sistemos' }).click()

  await page.getByRole('button', { name: 'Veiksmas' }).click()
  await page.getByRole('option', { name: 'Valdyti' }).click()

  await page.getByRole('button', { name: 'Sukurti' }).click()

  await expect(page.getByText('Bob Ross bob.ross@example.com')).toBeVisible()

  // Login with user account
  await page.getByRole('button', { name: 'Atsijungti' }).click()
  await appHelper.login({ email: 'bob.ross@example.com' })

  // Ensure user can edit conference data
  await page.getByRole('link', { name: 'Artėjančios konferencijos' }).hover()

  await page.getByRole('menuitem', { name: 'Informacinių technologijų sauga ir Informacinės sistemos 2023' }).click()

  await expect(page.getByRole('link', { name: 'Redaguoti' })).toBeVisible()

  await page.getByRole('link', { name: 'Redaguoti' }).click()

  await page.getByLabel('Pavadinimas').click()
  await page.getByLabel('Pavadinimas').fill('Informacinių technologijų sauga 2023')

  await page.getByRole('button', { name: 'Atnaujinti' }).click()

  await expect(page.getByText('Duomenys buvo atnaujinti')).toBeVisible()

  // Reload
  await page.goto('http://localhost:5173/events/2/edit/general')

  // Ensure data was updated
  await expect(page.getByRole('heading', { name: 'Redaguoti „Informacinių technologijų sauga 2023' })).toBeVisible()

  await page.getByRole('link', { name: 'Artėjančios konferencijos' }).hover()

  await page.getByRole('menuitem', { name: 'Informacinių technologijų sauga 2023' }).click()

  await expect(page.getByRole('heading', { name: 'Informacinių technologijų sauga 2023' })).toBeVisible()

  // Login with administrator account
  await page.getByRole('button', { name: 'Atsijungti' }).click()
  await appHelper.login({ email: 'admin@example.com' })

  // Withdraw permission
  await page.getByRole('link', { name: 'Leidimai' }).click()

  await page
    .locator('li')
    .filter({ hasText: /Bob Ross/ })
    .getByRole('button', { name: 'Panaikinti' })
    .click()

  // Login with user account
  await page.getByRole('button', { name: 'Atsijungti' }).click()
  await appHelper.login({ email: 'bob.ross@example.com' })

  // Ensure user has no access to modify data
  await page.getByRole('link', { name: 'Artėjančios konferencijos' }).hover()

  await page.getByRole('menuitem', { name: 'Informacinių technologijų sauga 2023' }).click()

  await expect(page.getByRole('link', { name: 'Redaguoti' })).toBeHidden()
})
