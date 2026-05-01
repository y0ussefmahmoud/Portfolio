import { test, expect } from '@playwright/test';

/**
 * Projects Section E2E Tests
 * 
 * Tests projects section functionality and modal interactions
 */

test.describe('Projects Section Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Navigate to projects section
    await page.click('[aria-label="Navigate to Projects section"]');
    await page.waitForTimeout(500);
  });

  test('should display projects grid', async ({ page }) => {
    await expect(page.locator('[data-testid="projects-section"]')).toBeVisible();
    
    // Check if project cards are displayed
    const projectCards = page.locator('[data-testid="project-card"]');
    await expect(projectCards.first()).toBeVisible();
    
    // Check for project titles
    await expect(page.locator('text=My Portfolio V2')).toBeVisible();
  });

  test('should open project modal when View Details is clicked', async ({ page }) => {
    const firstProjectCard = page.locator('[data-testid="project-card"]').first();
    const viewButton = firstProjectCard.locator('button:has-text("View")');
    
    await viewButton.click();
    await page.waitForTimeout(500);
    
    // Check if modal is opened
    await expect(page.locator('[data-testid="project-modal"]')).toBeVisible();
    await expect(page.locator('text=Project Details')).toBeVisible();
    
    // Close modal
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    
    // Modal should be closed
    await expect(page.locator('[data-testid="project-modal"]')).not.toBeVisible();
  });

  test('should display project images correctly', async ({ page }) => {
    const firstProjectCard = page.locator('[data-testid="project-card"]').first();
    const projectImage = firstProjectCard.locator('img');
    
    // Check if image is loaded
    await expect(projectImage).toBeVisible();
    
    // Check image src attribute
    const imageSrc = await projectImage.getAttribute('src');
    expect(imageSrc).toMatch(/\.webp$|\.jpg$|\.png$|\.jpeg$/);
  });

  test('should show project tech stack tags', async ({ page }) => {
    const firstProjectCard = page.locator('[data-testid="project-card"]').first();
    const techTags = firstProjectCard.locator('[data-testid="tech-tag"]');
    
    // Check if tech tags are present
    await expect(techTags.first()).toBeVisible();
    
    // Check for common tech stack items
    await expect(page.locator('text=React')).toBeVisible();
  });

  test('should handle project status badges correctly', async ({ page }) => {
    const projectCards = page.locator('[data-testid="project-card"]');
    
    // Check for completed projects
    const completedProjects = page.locator('[data-testid="status-completed"]');
    if (await completedProjects.count() > 0) {
      await expect(completedProjects.first()).toBeVisible();
    }
    
    // Check for in-progress projects
    const inProgressProjects = page.locator('[data-testid="status-in-progress"]');
    if (await inProgressProjects.count() > 0) {
      await expect(inProgressProjects.first()).toBeVisible();
    }
  });

  test('should open code link when Code button is clicked', async ({ page }) => {
    const firstProjectCard = page.locator('[data-testid="project-card"]').first();
    const codeButton = firstProjectCard.locator('button:has-text("Code")');
    
    // Store current page count
    const pagesBefore = page.context().pages().length;
    
    await codeButton.click();
    await page.waitForTimeout(1000);
    
    // Check if new tab opened with GitHub
    const pagesAfter = page.context().pages();
    const newPage = pagesAfter.find(p => !p.url().includes('localhost'));
    
    if (newPage) {
      expect(newPage.url()).toContain('github.com');
    }
  });

  test('should be responsive on mobile devices', async ({ page }) => {
    // Emulate mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check if projects section is still visible
    await expect(page.locator('[data-testid="projects-section"]')).toBeVisible();
    
    // Check if project cards adapt to mobile layout
    const projectCards = page.locator('[data-testid="project-card"]');
    await expect(projectCards.first()).toBeVisible();
    
    // Check if buttons are properly sized on mobile
    const actionButtons = projectCards.first().locator('button');
    await expect(actionButtons.first()).toBeVisible();
  });

  test('should handle keyboard navigation in modal', async ({ page }) => {
    const firstProjectCard = page.locator('[data-testid="project-card"]').first();
    const viewButton = firstProjectCard.locator('button:has-text("View")');
    
    await viewButton.click();
    await page.waitForTimeout(500);
    
    // Check if modal can be closed with Escape
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    
    await expect(page.locator('[data-testid="project-modal"]')).not.toBeVisible();
    
    // Check if focus returns to the trigger button
    await expect(viewButton).toBeFocused();
  });

  test('should handle project image slideshow on hover', async ({ page }) => {
    const firstProjectCard = page.locator('[data-testid="project-card"]').first();
    
    // Hover over project card
    await firstProjectCard.hover();
    await page.waitForTimeout(500);
    
    // Check if image container is still visible
    const projectImage = firstProjectCard.locator('img');
    await expect(projectImage).toBeVisible();
    
    // Move mouse away
    await page.mouse.move(0, 0);
    await page.waitForTimeout(300);
    
    // Image should still be visible
    await expect(projectImage).toBeVisible();
  });
});
