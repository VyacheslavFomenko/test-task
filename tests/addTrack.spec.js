import {test, expect} from "@playwright/test";
import {MainPage} from "../pages/MainPage";

test.describe("UI tests for add tracks to playlist", () => {
    let mainPage
    test.beforeEach(async ({page}) => {
        mainPage = new MainPage(page);
        await mainPage.goto();
    });

    test("P: Clicking \"+\" should adds track to playlist", async ({page}) => {
        const [title] = await mainPage.getFilteredTrackTitles();
        await mainPage.addTrackByIndex(0);

        const playlist = await mainPage.getPlaylistTitles();
        expect(playlist).toContain(title);
    });

    test("N: Same track shouldn't be added twice", async ({ page }) => {
        const [title] = await mainPage.getFilteredTrackTitles();
        await mainPage.addTrackByIndex(0);
        await mainPage.addTrackByIndex(0); // second attempt

        const playlist = await mainPage.getPlaylistTitles();
        const count = playlist.filter(t => t === title).length;

        expect(count).toBe(1);
    });
});