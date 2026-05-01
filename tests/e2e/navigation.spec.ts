import { test, expect } from '@playwright/test';

/**
 * Navigation E2E Tests
 * 
 * Tests critical navigation paths and user flows
 */

test.describe('Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load home page and display hero section', async ({ page }) => {
    // Check if hero section is visible
    await expect(page.locator('[data-testid="hero-section"]')).toBeVisible();
    
    // Check if main navigation buttons are present
    await expect(page.locator('[aria-label="Navigate to Home section"]')).toBeVisible();
    await expect(page.locator('[aria-label="Navigate to Projects section"]')).toBeVisible();
    await expect(page.locator('[aria-label="Navigate to Services section"]')).toBeVisible();
    await expect(page.locator('[aria-label="Navigate to Tech Stack section"]')).toBeVisible();
  });

  test('should navigate between sections using navbar buttons', async ({ page }) => {
    // Navigate to Projects
    await page.click('[aria-label="Navigate to Projects section"]');
    await expect(page.locator('[data-testid="projects-section"]')).toBeVisible();
    
    // Navigate to Services
    await page.click('[aria-label="Navigate to Services section"]');
    await expect(page.locator('[data-testid="services-section"]')).toBeVisible();
    
    // Navigate to Stack
    await page.click('[aria-label="Navigate to Tech Stack section"]');
    await expect(page.locator('[data-testid="stack-section"]')).toBeVisible();
    
    // Navigate back to Home
    await page.click('[aria-label="Navigate to Home section"]');
    await expect(page.locator('[data-testid="hero-section"]')).toBeVisible();
  });

  test('should navigate using scroll wheel', async ({ page }) => {
    // Start at home
    await expect(page.locator('[data-testid="hero-section"]')).toBeVisible();
    
    // Scroll down to projects
    await page.mouse.wheel(0, 1000);
    await page.waitForTimeout(500);
    await expect(page.locator('[data-testid="projects-section"]')).toBeVisible();
    
    // Scroll down to services
    await page.mouse.wheel(0, 1000);
    await page.waitForTimeout(500);
    await expect(page.locator('[data-testid="services-section"]')).toBeVisible();
    
    // Scroll down to stack
    await page.mouse.wheel(0, 1000);
    await page.waitForTimeout(500);
    await expect(page.locator('[data-testid="stack-section"]')).toBeVisible();
    
    // Scroll up to services
    await page.mouse.wheel(0, -1000);
    await page.waitForTimeout(500);
    await expect(page.locator('[data-testid="services-section"]')).toBeVisible();
  });

  test('should navigate using keyboard arrows', async ({ page }) => {
    // Start at home
    await expect(page.locator('[data-testid="hero-section"]')).toBeVisible();
    
    // Press down arrow to navigate to projects
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(500);
    await expect(page.locator('[data-testid="projects-section"]')).toBeVisible();
    
    // Press down arrow to navigate to services
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(500);
    await expect(page.locator('[data-testid="services-section"]')).toBeVisible();
    
    // Press up arrow to navigate back to projects
    await page.keyboard.press('ArrowUp');
    await page.waitForTimeout(500);
    await expect(page.locator('[data-testid="projects-section"]')).toBeVisible();
  });

  test('should loop navigation correctly', async ({ page }) => {
    // Navigate to stack (last section)
    await page.click('[aria-label="Navigate to Tech Stack section"]');
    await expect(page.locator('[data-testid="stack-section"]')).toBeVisible();
    
    // Scroll down should loop back to home
    await page.mouse.wheel(0, 1000);
    await page.waitForTimeout(500);
    await expect(page.locator('[data-testid="hero-section"]')).toBeVisible();
    
    // Scroll up from home should go to stack
    await page.mouse.wheel(0, -1000);
    await page.waitForTimeout(500);
    await expect(page.locator('[data-testid="stack-section"]')).toBeVisible();
  });
});
