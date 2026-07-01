import { expect, test } from "@playwright/test";

test("selects plans, randomizes, completes a workout, and updates metrics", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /choose your workout plans/i }),
  ).toBeVisible();
  await page.locator(".plan-card").first().click();
  await page.getByRole("button", { name: /randomize/i }).click();
  await expect(
    page.getByRole("heading", { name: /your three workout choices/i }),
  ).toBeVisible();
  await expect(page.locator(".workout-card")).toHaveCount(3);
  await page
    .getByRole("button", { name: /start this workout/i })
    .first()
    .click();
  await page
    .getByPlaceholder(/weights, reps/i)
    .fill("Felt good. Increase reps next time.");
  await page.getByRole("button", { name: /complete workout/i }).click();
  await expect(
    page.getByRole("heading", { name: /workout metrics/i }),
  ).toBeVisible();
  await expect(page.locator(".metric-grid")).toContainText("1");
});

test("exports settings backup from the settings page", async ({ page }) => {
  await page.goto("/settings");
  await page.getByLabel(/accent/i).selectOption("cyan");
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: /export backup/i }).click();
  await expect((await download).suggestedFilename()).toContain(
    "five-minute-workout-backup",
  );
});
