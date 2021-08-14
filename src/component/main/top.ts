class Top {
  makeTop() {
    return `<header>${this.makeTitle()}${this.makeDarkBtn()}</header>`;
  }
  private makeTitle() {
    return `<h2>Where in the world?</h2>`;
  }
  private makeDarkBtn() {
    return `<button>Dark Mode</button>`;
  }
}
export default Top;
