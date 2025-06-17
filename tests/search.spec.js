import {test, expect} from "@playwright/test";
import {MainPage} from "../pages/mainPage";

test.describe("UI tests for search input ", () => {
    let mainPage
    test.beforeEach(async ({page}) => {
        mainPage = new MainPage(page);
        await mainPage.goto();
    });

    test("P: Search input should work correctly with valid data", async () => {
        await mainPage.searchTrack("breeze");

        const results = await mainPage.getFilteredTrackTitles();
        expect(results.length).toBeGreaterThan(0);

        for (const title of results) {
            expect(title.toLowerCase()).toContain("breeze");
        }
    });

    test("N: Error should be shown when there is no match", async ({page}) => {
        await mainPage.searchTrack("!@#qwerty");
        const count = await mainPage.getFilteredTrackTitles();

        expect(count.length).toBe(0);
        await expect(page.locator("text=Not found")).toBeVisible();
    });
});