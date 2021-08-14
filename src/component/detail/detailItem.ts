import { getAxios } from "../../service/useAxios";

type CurrencyType = {
  name: string;
};
type LanguageType = {
  name: string;
};

type DetailCountryInfo = {
  name: string;
  nativeName: string;
  population: string;
  region: string;
  subregion: string;
  capital: string;
  topLevelDomain: Array<string>;
  currencies: Array<CurrencyType>;
  languages: Array<LanguageType>;
  flag: string;
  borders: Array<string>;
};

class DetailItem {
  async makeDetailItem(result: Array<DetailCountryInfo>) {
    let html = "";
    html += this.makeCountryImg(result[0]);
    html += this.makeCountryInfo(result[0]);
    html += await this.makeBorderCountries(result[0]);
    return html;
  }
  private makeCountryImg(result: DetailCountryInfo) {
    return `<div>
    <img src=${result.flag}>
    </div>
    `;
  }
  private makeCountryInfo(result: DetailCountryInfo) {
    return `  
    <div>
      <h2>${result.name}</h2>
      <div>
        <div>
          <p>Native Name : ${result.nativeName}</p>
          <p>Population : ${result.population}</p>
          <p>Region : ${result.region}</p>
          <p>Sub Region : ${result.subregion}</p>
          <p>Capital : ${result.capital}</p>
        </div>
        <div>
          <p>Top Level Domain : ${result.topLevelDomain[0]}</p>
          <p>Currencies : ${result.currencies[0].name}</p>
          <p>Languages : ${result.languages[0].name}</p>
        </div>
      </div>
    </div>`;
  }
  private async makeBorderCountries({ borders }: DetailCountryInfo) {
    let html = "";
    if (borders.length > 0) {
      html = "<p>Border Countries : </p>";
      html += await this.makeBorderButton(borders);
    }
    return html;
  }
  private async makeBorderButton(borders: Array<string>) {
    let code = borders.join(";");
    const result = await getAxios(
      `https://restcountries.eu/rest/v2/alpha?codes=${code}`
    );
    let html: Array<DetailCountryInfo> = result.map(
      (item: DetailCountryInfo) => {
        return `<button type="button" id="${item.name}">${item.name}</button>`;
      }
    );
    return html.join("");
  }
}
export default DetailItem;
