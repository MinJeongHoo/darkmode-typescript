type FilterObj = {
  value: string;
  optionTitle: string;
};
class Search {
  private filterList: Array<FilterObj>;
  constructor() {
    this.filterList = [
      { value: "", optionTitle: "Filter by Region" },
      { value: "Africa", optionTitle: "Africa" },
      { value: "Americas", optionTitle: "Americas" },
      { value: "Asia", optionTitle: "Asia" },
      { value: "Europe", optionTitle: "Europe" },
      { value: "Oceania", optionTitle: "Oceania" },
    ];
  }
  makeSearchArea() {
    return `
    <nav>
        <form>
            ${this.makeSearch()}
            ${this.makeFilter()}
        </form>
    </nav>`;
  }
  private makeSearch() {
    return `<input id="search" type="text" placeholder="Search for a country..." />`;
  }
  private makeFilter() {
    let html = "";
    this.filterList.map((item, idx) => {
      html += this.makeFilterOption(item, idx);
    });
    return `<select id="selectBox">${html}</select>`;
  }
  private makeFilterOption(item: FilterObj, idx: number) {
    return `
    <option ${idx !== 0 ? `value=${item.value}` : ""}>
    ${item.optionTitle}
    </option>`;
  }
}
export default Search;
