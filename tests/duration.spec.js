import {test, expect} from "@playwright/test";
import {MainPage} from "../pages/MainPage";
import {timeToSeconds} from "../helpers/timeToSeconds"

test.describe("UI tests for add tracks to playlist", () => {
    let mainPage
    test.beforeEach(async ({page}) => {
        mainPage = new MainPage(page);
        await mainPage.goto();
    });

    test("P: Total duration should be calculated correctly", async ({page}) => {
        const durations = [];
        for (let i = 0; i < 2; i++) {
            durations.push(await mainPage.getTrackDurationByIndex(i));
            await mainPage.addTrackByIndex(i);
        }

        const expected = durations.map(timeToSeconds).reduce((a, b) => a + b, 0);
        const actual = await mainPage.getTotalDurationInSeconds();
        expect(actual).toBe(expected);
    });
});