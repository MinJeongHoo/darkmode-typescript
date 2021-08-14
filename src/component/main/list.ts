type ItemInfo = {
  name: string;
  region: string;
  capital: string;
  population: string;
  flag: string;
};
class List {
  makeList(data: Array<ItemInfo>) {
    let itemHtml = "";
    data.map((item: ItemInfo) => {
      itemHtml += this.makeItem(item);
    });
    return `<main id="countryList">${itemHtml}</main>`;
  }
  private makeItem({ name, region, capital, population, flag }: ItemInfo) {
    return `
      <a href="#" id=${name}>
        <img src=${flag} style="width:200px;height:150px">
      </a>
      <h3>${name}</h3>
      <p>${region}</p>
      <p>${capital}</p>
      <p>${population}</p>
      `;
  }
}
export default List;
