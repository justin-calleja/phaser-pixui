import { test, expect } from '@playwright/test'

test('example app renders correctly', async ({ page }) => {
    await page.goto('http://localhost:8080')

    const canvas = page.locator('#game-container canvas')
    await canvas.waitFor({ state: 'visible', timeout: 15000 })

    // Wait for assets to load and scenes to render.
    await page.waitForTimeout(100)
    await expect(canvas).toHaveScreenshot('game.png')

    // Wait for a bit and check that game renders the same
    await page.waitForTimeout(1000)
    await expect(canvas).toHaveScreenshot('game.png')
})
