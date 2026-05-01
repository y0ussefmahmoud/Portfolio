import { test, expect } from '@playwright/test';

/**
 * Services Section E2E Tests
 * 
 * Tests services section functionality and interactions
 */

test.describe('Services Section Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Navigate to services section
    await page.click('[aria-label="Navigate to Services section"]');
    await page.waitForTimeout(500);
  });

  test('should display all 6 service cards', async ({ page }) => {
    const serviceCards = page.locator('[data-testid="service-card"]');
    await expect(serviceCards).toHaveCount(6);
    
    // Check specific services are present
    await expect(page.locator('text=Web Development')).toBeVisible();
    await expect(page.locator('text=Mobile Apps')).toBeVisible();
    await expect(page.locator('text=UI/UX Design')).toBeVisible();
    await expect(page.locator('text=Backend Development')).toBeVisible();
    await expect(page.locator('text=Cloud Services')).toBeVisible();
    await expect(page.locator('text=Tech Consulting')).toBeVisible();
  });

  test('should show service card hover effects', async ({ page }) => {
    const firstCard = page.locator('[data-testid="service-card"]').first();
    
    // Check initial state
    await expect(firstCard).toBeVisible();
    
    // Hover over card
    await firstCard.hover();
    await page.waitForTimeout(300);
    
    // Check if hover effect is applied (transform scale)
    const cardStyle = await firstCard.evaluate((el) => {
      return window.getComputedStyle(el).transform;
    });
    expect(cardStyle).not.toBe('none');
  });

  test('should open WhatsApp when Get Quote is clicked', async ({ page }) => {
    const getQuoteButton = page.locator('[data-testid="service-card"]').first().locator('button:has-text("Get Quote")');
    
    // Click Get Quote button
    await getQuoteButton.click();
    
    // Check if WhatsApp link is opened (new window or navigation)
    await page.waitForTimeout(1000);
    
    // Verify WhatsApp URL pattern in navigation or new page
    const pages = page.context().pages();
    const whatsappPage = pages.find(p => p.url().includes('wa.me') || p.url().includes('whatsapp.com'));
    
    if (whatsappPage) {
      expect(whatsappPage.url()).toContain('wa.me');
    } else {
      // If no new page, check if current page navigated to WhatsApp
      expect(page.url()).toMatch(/wa\.me|whatsapp\.com/);
    }
  });

  test('should display service features correctly', async ({ page }) => {
    const firstCard = page.locator('[data-testid="service-card"]').first();
    
    // Check if features are displayed
    const features = firstCard.locator('[data-testid="service-feature"]');
    await expect(features.first()).toBeVisible();
    
    // Check if check icons are present
    const checkIcons = firstCard.locator('svg[data-testid="check-icon"]');
    await expect(checkIcons.first()).toBeVisible();
  });

  test('should be responsive on mobile devices', async ({ page }) => {
    // Emulate mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check if services section is still visible
    await expect(page.locator('[data-testid="services-section"]')).toBeVisible();
    
    // Check if service cards stack vertically on mobile
    const serviceCards = page.locator('[data-testid="service-card"]');
    await expect(serviceCards).toHaveCount(6);
    
    // Verify grid layout changes to single column on mobile
    const firstCard = serviceCards.first();
    const firstCardBox = await firstCard.boundingBox();
    const secondCard = serviceCards.nth(1);
    const secondCardBox = await secondCard.boundingBox();
    
    // Cards should be stacked vertically (second card below first)
    expect(secondCardBox!.y).toBeGreaterThan(firstCardBox!.y + firstCardBox!.height - 50);
  });

  test('should animate service cards on section entry', async ({ page }) => {
    // Navigate away from services then back to trigger animation
    await page.click('[aria-label="Navigate to Home section"]');
    await page.waitForTimeout(500);
    
    await page.click('[aria-label="Navigate to Services section"]');
    await page.waitForTimeout(300);
    
    // Check if service cards have animation classes or styles
    const serviceCards = page.locator('[data-testid="service-card"]');
    
    // Cards should be visible after animation
    await expect(serviceCards.first()).toBeVisible();
    
    // Check for animation-related styles or classes
    const firstCard = serviceCards.first();
    const cardClasses = await firstCard.getAttribute('class');
    expect(cardClasses).toMatch(/animate|transition|motion/);
  });
});
