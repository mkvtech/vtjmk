import { expect, test } from '@playwright/test'
import { AppHelper } from './appHelper'

test('Conference Description', async ({ page, baseURL, request, browserName }) => {
  page.setDefaultTimeout(5000)

  const appHelper = await AppHelper.resetApp({ page, baseURL, request })

  await page.goto('/')

  // Login as conference manager
  await appHelper.login({ email: 'jonas.jonaitis@example.com' })

  // Go to conference description edit page
  await page.getByRole('link', { name: 'Konferencijos', exact: true }).hover()
  await page.getByRole('menuitem', { name: 'Informacinių technologijų sauga ir Informacinės sistemos' }).click()
  await page.getByRole('link', { name: 'Redaguoti' }).click()
  await page.getByRole('tab', { name: 'Aprašymas' }).click()

  // Edit description
  await page.getByText('Apžvalga').click()
  await page.keyboard.press('Control+Home')
  await page.keyboard.press('Control+ArrowRight')
  await page.keyboard.press('Enter')

  await page.getByRole('checkbox', { name: 'Bold' }).check()
  await page.getByRole('checkbox', { name: 'Italic' }).check()

  await page.keyboard.type('Svarbus pranešimas')

  // Save
  await page.getByRole('button', { name: 'Saugoti' }).click()
  await expect(page.getByText('Aprašymas buvo išsaugotas')).toBeVisible()

  await page.locator('[contenteditable="true"]').blur()

  // Ensure text is bold and italic
  await expect(page.getByText('Svarbus pranešimas')).toHaveCSS('font-weight', '700')
  await expect(page.getByText('Svarbus pranešimas')).toHaveCSS('font-style', 'italic')

  // See public page
  await page.getByRole('button', { name: 'Atsijungti' }).click()
  await page.locator('[contenteditable="true"]').blur()
  await page.getByRole('link', { name: 'Konferencijos', exact: true }).hover()
  await page.getByRole('menuitem', { name: 'Informacinių technologijų sauga ir Informacinės sistemos' }).click()

  // Ensure text is bold and italic
  await expect(page.getByText('Svarbus pranešimas')).toHaveCSS('font-weight', '700')
  await expect(page.getByText('Svarbus pranešimas')).toHaveCSS('font-style', 'italic')

  if (browserName === 'firefox') {
    // Note: Playwright has general issues with Accept-Language header.
    // Playwright's firefox overwrites Accept-Language header, so requests are always sent with playwright's
    // configuration locale, ignoring what was set by the application with axios (or fetch?).
    // Might be related: https://github.com/microsoft/playwright/issues/18609

    return
  }

  // Login as conference manager
  await appHelper.login({ email: 'jonas.jonaitis@example.com' })
  await expect(page).toHaveURL('/')

  // Change language to English
  await page.getByRole('button', { name: 'Kalba' }).click()
  await page.getByRole('menuitem', { name: 'English' }).click()

  await page.reload()

  // Go to event edit page
  await page.waitForTimeout(1000)
  await page.getByRole('link', { name: 'Upcoming Conferences', exact: true }).hover()
  await page
    .getByRole('menuitem', { name: 'Security of Information Technologies and Information Systems 2023' })
    .click()
  await page.getByRole('link', { name: 'Edit' }).click()
  await page.getByRole('tab', { name: 'Description' }).click()

  // Edit description
  await page.locator('[data-test-id="page-content"]').getByText('About').click()
  await page.keyboard.press('Control+Home')
  await page.keyboard.press('Control+ArrowRight')
  await page.keyboard.press('Enter')

  await page.getByRole('checkbox', { name: 'Bold' }).check()
  await page.getByRole('checkbox', { name: 'Italic' }).check()

  await page.keyboard.type('Important update')

  // Save
  await page.getByRole('button', { name: 'Save' }).click()
  await expect(page.getByText('Description was updated successfully')).toBeVisible()

  // Ensure text is bold and italic
  await expect(page.getByText('Important update')).toHaveCSS('font-weight', '700')
  await expect(page.getByText('Important update')).toHaveCSS('font-style', 'italic')

  // See public page
  await page.locator('[contenteditable="true"]').blur()
  await page.getByRole('button', { name: 'Logout' }).click()

  await page.waitForTimeout(500)
  await page.getByRole('link', { name: 'Upcoming Conferences', exact: true }).hover()
  await page
    .getByRole('menuitem', { name: 'Security of Information Technologies and Information Systems 2023' })
    .click()

  // Ensure text is bold and italic
  await expect(page.getByText('Important update')).toHaveCSS('font-weight', '700')
  await expect(page.getByText('Important update')).toHaveCSS('font-style', 'italic')
})
