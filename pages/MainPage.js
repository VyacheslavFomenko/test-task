export class MainPage {
    constructor(page) {
        this.page = page;
    }

    get searchInput() {
        return this.page.locator("input[id=\":r0:\"]");
    }

    get trackList() {
        return this.page.locator("#tracklist .MuiGrid-container");
    }

    get playlist() {
        return this.page.locator("#playlist .MuiGrid-container");
    }

    get totalDuration() {
        return this.page.locator("#playlist-duration");
    }

    async goto() {
        await this.page.goto("/");
    }

    async searchTrack(query) {
        await this.searchInput.fill(query);
    }

    async getFilteredTrackTitles() {
        const titles = this.trackList.locator(".MuiGrid-grid-xs-4 p");
        const count = await titles.count();
        const list = [];
        for (let i = 0; i < count; i++) {
            list.push(await titles.nth(i).innerText());
        }
        return list;
    }

    async addTrackByIndex(index) {
        const track = this.trackList.nth(index);
        await track.locator("button:has-text(\"+\")").click();
    }

    async getPlaylistTitles() {
        const titles = this.playlist.locator(".MuiGrid-grid-xs-4 p");
        const count = await titles.count();
        const list = [];
        for (let i = 0; i < count; i++) {
            list.push(await titles.nth(i).innerText());
        }
        return list;
    }

    async getTrackDurationByIndex(index) {
        return await this.trackList.nth(index).locator(".MuiGrid-grid-xs-2 p").innerText();
    }

    async getTotalDurationInSeconds() {
        return Number(await this.totalDuration.innerText());
    }

    async isAddButtonVisible(index) {
        return await this.trackList.nth(index).locator("button:has-text(\"+\")").isVisible();
    }
}