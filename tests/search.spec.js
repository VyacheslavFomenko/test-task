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

        const filteredTracks = mainPage.getFilteredTrackTitles();
        const count = await filteredTracks.count();

        expect(count).toBeGreaterThan(0);

        const titles = filteredTracks.locator(".MuiGrid-grid-xs-4 p");

        for (let i = 0; i < count; i++) {
            const title = await titles.nth(i).innerText();
            expect(title.toLowerCase()).toContain("breeze");
        }
    });

    test("N: Error should be shown when there is no match", async ({page}) => {
        await mainPage.searchTrack("!@#qwerty");
        const trackItems = mainPage.getFilteredTrackTitles();
        const count = await trackItems.count();

        expect(count).toBe(0);
        await expect(page.locator("text=Not found")).toBeVisible();
    });
});