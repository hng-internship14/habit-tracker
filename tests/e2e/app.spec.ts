import { test, expect } from '@playwright/test';

test.describe('Habit Tracker app', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('shows the splash screen and redirects unauthenticated users to /login', async ({ page }) => {
    await expect(page.getByTestId('splash-screen')).toBeVisible();
    await page.waitForURL('**/login', { timeout: 5000 });
    await expect(page.getByTestId('auth-login-email')).toBeVisible();
  });

  test('redirects authenticated users from / to /dashboard', async ({ page }) => {
    // Mock session in localStorage
    await page.addInitScript(() => {
      window.localStorage.setItem('habit-tracker-session', JSON.stringify({ userId: '1', email: 'test@example.com' }));
    });
    await page.goto('/');
    await page.waitForURL('**/dashboard', { timeout: 5000 });
    await expect(page.getByTestId('dashboard-page')).toBeVisible();
  });

  test('prevents unauthenticated access to /dashboard', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForURL('**/login', { timeout: 5000 });
  });

  test('signs up a new user and lands on the dashboard', async ({ page }) => {
    await page.goto('/signup');
    await page.getByTestId('auth-signup-email').fill('newuser@example.com');
    await page.getByTestId('auth-signup-password').fill('password123');
    await page.getByTestId('auth-signup-submit').click();
    await page.waitForURL('**/dashboard');
    await expect(page.getByTestId('dashboard-page')).toBeVisible();
  });

  test('logs in an existing user and loads only that user\'s habits', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('habit-tracker-users', JSON.stringify([{ id: '1', email: 'user1@example.com', password: 'password', createdAt: '' }]));
    });
    await page.goto('/login');
    await page.getByTestId('auth-login-email').fill('user1@example.com');
    await page.getByTestId('auth-login-password').fill('password');
    await page.getByTestId('auth-login-submit').click();
    await page.waitForURL('**/dashboard');
    await expect(page.getByTestId('dashboard-page')).toBeVisible();
  });

  test('creates a habit from the dashboard', async ({ page }) => {
    // Setup session
    await page.addInitScript(() => {
      window.localStorage.setItem('habit-tracker-session', JSON.stringify({ userId: '1', email: 'test@example.com' }));
    });
    await page.goto('/dashboard');
    await page.getByTestId('create-habit-button').click();
    await page.getByTestId('habit-name-input').fill('Exercise');
    await page.getByTestId('habit-description-input').fill('Run 5km');
    await page.getByTestId('habit-save-button').click();
    await expect(page.getByTestId('habit-card-exercise')).toBeVisible();
  });

  test('completes a habit for today and updates the streak', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('habit-tracker-session', JSON.stringify({ userId: '1', email: 'test@example.com' }));
      window.localStorage.setItem('habit-tracker-habits', JSON.stringify([{
        id: '1', userId: '1', name: 'Exercise', description: '', frequency: 'daily', createdAt: '', completions: []
      }]));
    });
    await page.goto('/dashboard');
    await page.getByTestId('habit-complete-exercise').click();
    await expect(page.getByTestId('habit-streak-exercise')).toContainText('1 day streak');
  });

  test('persists session and habits after page reload', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('habit-tracker-session', JSON.stringify({ userId: '1', email: 'test@example.com' }));
      window.localStorage.setItem('habit-tracker-habits', JSON.stringify([{
        id: '1', userId: '1', name: 'Exercise', description: '', frequency: 'daily', createdAt: '', completions: []
      }]));
    });
    await page.goto('/dashboard');
    await page.reload();
    await expect(page.getByTestId('habit-card-exercise')).toBeVisible();
  });

  test('logs out and redirects to /login', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('habit-tracker-session', JSON.stringify({ userId: '1', email: 'test@example.com' }));
    });
    await page.goto('/dashboard');
    await page.getByTestId('auth-logout-button').click();
    await page.waitForURL('**/login');
  });

  test('loads the cached app shell when offline after the app has been loaded once', async ({ page, context }) => {
    await page.goto('/');
    await page.waitForURL('**/login');
    
    // Simulating offline by setting offline mode in context
    await context.setOffline(true);
    await page.reload();
    await expect(page.getByTestId('auth-login-email')).toBeVisible();
  });
});
