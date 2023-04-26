import { expect, test } from '@playwright/test'

test('Login', async ({ page }) => {
  page.setDefaultTimeout(10000)

  await page.goto('/')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/VTJMK/)

  // Go to login page
  await page.getByRole('link', { name: 'Login' }).click()

  await expect(page).toHaveURL('/login')

  // Login with invalid credentials
  await page.getByLabel('Email').fill('admin@example.com')
  await page.getByLabel('Password').fill('invalid password')

  await page.getByRole('button', { name: 'Login' }).click()

  await expect(page).toHaveURL('/login')

  // Login with valid credentials
  await page.getByLabel('Email').fill('admin@example.com')
  await page.getByLabel('Password').fill('password')

  await page.getByRole('button', { name: 'Login' }).click()

  await expect(page).toHaveURL('/')

  // Expect to see authorized content
  expect(page.getByText('John Doe')).toBeDefined()
})
