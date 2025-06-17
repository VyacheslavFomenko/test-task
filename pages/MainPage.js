export class MainPage {
    constructor(page) {
        this.page = page;
    }

    get searchInput() {
        return this.page.getByRole("textbox", {name: "Search"}).click();
    }

    trackCheckBox(trackName) {
        return this.page.locator("div").filter({hasText: `/^${trackName}\+$/`}).locator("input[type='checkbox']");
    }

    get trackTitles() {
        return this.page.locator("#traklist");
    }

    get trackDuration() {
        return this.page.locator('p.MuiTypography-body1', {hasText: ':'});
    }

    get addButton() {
        return this.page.locator("button:has-text('+')");
    }

    addButtonAt(index) {
        return this.addButton.nth(index);
    }

    playlistCheckBox(trackName) {
        return this.page.locator("div").filter({hasText: `/^${trackName}\+$/`}).locator("input[type='checkbox']");
    }

    get playlistTracksTitles() {
        return this.page.locator("#playlist");
    }

    get playlistDuration() {
        return this.page.locator('p.MuiTypography-body1', {hasText: ':'});
    }

    get removeButton() {
        return this.page.locator("button:has-text('-')");
    }

    removeButtonAt(index) {
        return this.removeButton.nth(index);
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
        await this.page.locator("div.MuiGrid-container").allTextContents();
    }

    async getAllTracksTitles() {
        await this.trackTitles.allTextContents();
    }

    async addTrackByIndex(index) {
        await this.addButtonAt(index).click();
    }

    async getAllPlaylistTracksTitles() {
        await this.playlistTracksTitles.allTextContents();
    }

    async removeTrackByIndex(index) {
        await this.removeButtonAt(index).click();
    }

    getTotalDuration() {
        return Number(this.totalDuration);
    }
}