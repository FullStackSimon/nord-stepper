import { test, expect } from '@playwright/test'

test.describe('nord-stepper', () => {

  test('disables Back button on first step', async ({ page }) => {
    await page.goto('/')

    const back = page.locator('nord-button[variant="secondary"]')
    await expect(back).toHaveAttribute('disabled', '')
  })


  test('displays step 1 and navigates forward', async ({ page }) => {
    await page.goto('/')

    await expect(page.locator('nord-button[variant="secondary"]')).toHaveText('Back')
    await expect(page.locator('nord-button[variant="primary"]')).toHaveText('Next')
    await expect(page.locator('nord-badge')).toHaveText('1/3')

    await page.locator('nord-button[variant="primary"]').click()
    await expect(page.locator('nord-badge')).toHaveText('2/3')
  })

  test('navigates backward with Back button', async ({ page }) => {
    await page.goto('/')

    const next = page.locator('nord-button[variant="primary"]')
    const back = page.locator('nord-button[variant="secondary"]')

    await next.click()
    await expect(page.locator('nord-badge')).toHaveText('2/3')

    await back.click()
    await expect(page.locator('nord-badge')).toHaveText('1/3')
  })

  test('responds to ArrowRight and ArrowLeft keys', async ({ page }) => {
    await page.goto('/')

    await page.locator('nord-stepper').focus()
    await page.keyboard.press('ArrowRight')
    await expect(page.locator('nord-badge')).toHaveText('2/3')

    await page.keyboard.press('ArrowLeft')
    await expect(page.locator('nord-badge')).toHaveText('1/3')
  })

  test('shows only progress bar when progress="bar"', async ({ page }) => {
    await page.goto('/')
    await page.setContent(`<nord-stepper total-steps="3" progress="bar"></nord-stepper>`)

    await expect(page.locator('nord-badge')).toHaveCount(0)
    await expect(page.locator('nord-progress-bar')).toHaveCount(1)
  })

  test('shows only step count when progress="steps"', async ({ page }) => {
    await page.goto('/')
    await page.setContent(`<nord-stepper total-steps="3" progress="steps"></nord-stepper>`)

    await expect(page.locator('nord-badge')).toHaveCount(1)
    await expect(page.locator('nord-progress-bar')).toHaveCount(0)
  })

  test('shows both badge and progress bar when progress="both"', async ({ page }) => {
    await page.goto('/')
    await page.setContent(`<nord-stepper total-steps="3" progress="both"></nord-stepper>`)

    await expect(page.locator('nord-badge')).toHaveCount(1)
    await expect(page.locator('nord-progress-bar')).toHaveCount(1)
  })

  test('shows neither badge nor progress bar when progress="none"', async ({ page }) => {
    await page.goto('/')
    await page.setContent(`<nord-stepper total-steps="3" progress="none"></nord-stepper>`)

    await expect(page.locator('nord-badge')).toHaveCount(0)
    await expect(page.locator('nord-progress-bar')).toHaveCount(0)
  })

  test('handles unknown progress value gracefully', async ({ page }) => {
    await page.goto('/')
    await page.setContent(`<nord-stepper total-steps="3" progress="invalid"></nord-stepper>`)

    await expect(page.locator('nord-badge')).toHaveCount(0)
    await expect(page.locator('nord-progress-bar')).toHaveCount(0)
  })

  test('reaches final step and triggers completed', async ({ page }) => {
    await page.goto('/')

    const next = page.locator('nord-button[variant="primary"]')

    await next.click()
    await next.click()

    await expect(next).toHaveText('Finish')

    const [msg] = await Promise.all([
        page.waitForEvent('console'),
        next.click()
    ])

    expect(msg.text()).toContain('stepper:completed')
  })


  test('renders slotted step content', async ({ page }) => {
    await page.goto('/')
    await page.setContent(`
        <nord-stepper total-steps="1">
        <div slot="step-1">Step One Content</div>
        </nord-stepper>
    `)

    await expect(page.locator('nord-stepper')).toContainText('Step One Content')
  })

  test('progress bar reflects current step', async ({ page }) => {
    await page.goto('/')
    await page.setContent(`<nord-stepper total-steps="4" progress="bar"></nord-stepper>`)

    await page.evaluate(() => {
      const el = document.querySelector('nord-stepper') as any
      el.totalSteps = 4
    })

    const next = page.locator('nord-button[variant="primary"]')
    const progress = page.locator('nord-progress-bar')

    await next.click()
    await expect(progress).toHaveAttribute('value', '50')
  })

  test('accepts total-steps as attribute', async ({ page }) => {
    await page.goto('/')
    await page.setContent(`<nord-stepper total-steps="5"></nord-stepper>`)

    await page.evaluate(() => {
      const el = document.querySelector('nord-stepper') as any
      el.totalSteps = 5
    })

    const badge = page.locator('nord-badge')
    await expect(badge).toHaveText('1/5')
  })

})
