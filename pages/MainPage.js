class MainPage {
    constructor(page) {
        this.page = page;
    }

    get searchInput() {
        return this.page.getByRole("textbox", {name: "Search"});
    }

    trackCheckBox(trackName) {
        return this.page.locator("div").filter({hasText: `/^${trackName}\+$/`}).locator("input[type='checkbox']");
    }

    get trackTitle() {
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

    get playlistDuration() {
        return this.page.locator('p.MuiTypography-body1', {hasText: ':'});
    }

    get removeButton() {
        return this.page.locator("button:has-text('-')");
    }

    removeButtonAt(index) {
        return this.addButton.nth(index);
    }

    get totalDuration() {
        return this.page.locator("#playlist-duration");
    }
}