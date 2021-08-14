import Top from "./component/main/top";
import Search from "./component/main/search";
import List from "./component/main/list";
import DetailItem from "./component/detail/detailItem";
import {
  getAxios,
  getCountryByRegion,
  getCountryInfoBySearch,
} from "./service/useAxios";

class App {
  topSection: HTMLElement;
  listSection: HTMLElement;
  mainSection: HTMLElement;
  detail: HTMLElement;
  detailList: HTMLElement;
  detailItem: DetailItem;
  top: Top;
  search: Search;
  list: List;
  exceptIdList: {
    backBtn: string;
    conutryList: string;
    main: string;
  };

  constructor() {
    this.listSection = document.querySelector("#listSection") as HTMLElement;
    this.mainSection = document.querySelector("#main")! as HTMLElement;
    this.detail = document.querySelector("#detail")! as HTMLElement;
    this.topSection = document.querySelector("#top")! as HTMLElement;
    this.detailList = document.querySelector("#detailList")! as HTMLElement;
    this.detailItem = new DetailItem();
    this.list = new List();
    this.top = new Top();
    this.search = new Search();
    this.topSection.innerHTML =
      this.top.makeTop() + this.search.makeSearchArea();
    this.exceptIdList = {
      backBtn: "backBtn",
      conutryList: "conutryList",
      main: "main",
    };
  }
  init() {
    /*Draw Html*/
    this.getAllCountires();
  }
  async getAllCountires() {
    const result = await getAxios("https://restcountries.eu/rest/v2/all");
    /*Main*/
    this.mainSection.innerHTML = this.list.makeList(result);
  }
  async getCountryInfo(name: string | null) {
    const result = await getAxios(
      `https://restcountries.eu/rest/v2/name/${name}`
    );
    const html = await this.detailItem.makeDetailItem(result);
    this.listSection.setAttribute("style", "display:none");
    this.detail.setAttribute("style", "display:block");
    this.detailList.innerHTML = html;
  }
}

const app = new App();
app.init();

window.onload = () => {
  var timer: any;
  const selectBox = document.querySelector("#selectBox")! as HTMLElement;
  const search = document.querySelector("#search")! as HTMLInputElement;
  const backBtn = document.querySelector("#backBtn")! as HTMLElement;
  selectBox.addEventListener("change", (event) => {
    const target = document.querySelector(
      "#selectBox>option:checked"
    )! as HTMLElement;
    const regionName = target.getAttribute("value")! as string;
    getCountryByRegion(regionName).then((resolve) => {
      app.mainSection.innerHTML = app.list.makeList(resolve);
    });
  });
  backBtn.addEventListener("click", () => {
    app.listSection.setAttribute("style", "display:block");
    app.detail.setAttribute("style", "display:none");
  });
  search.addEventListener("input", function (e) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      const name = search.value! as string;
      if (name) {
        getCountryInfoBySearch(name).then((resovle) => {
          app.mainSection.innerHTML = app.list.makeList(resovle);
        });
      } else {
        app.getAllCountires();
      }
    }, 700);
  });
  app.mainSection.addEventListener("click", (event) => {
    event.preventDefault();
    const target: HTMLElement = event.target! as HTMLElement;
    const parentNode: HTMLElement = target.parentNode! as HTMLElement;
    const id = parentNode.getAttribute("id")! as string;
    if (!id || id in app.exceptIdList) {
      return;
    }
    const name = parentNode.getAttribute("id");
    app.getCountryInfo(name);
  });
  app.detail.addEventListener("click", (event) => {
    event.preventDefault();
    const target: HTMLElement = event.target! as HTMLElement;
    const id = target.getAttribute("id")! as string;
    if (!id || id in app.exceptIdList) {
      return;
    }
    const name = target.getAttribute("id");
    app.getCountryInfo(name);
  });
};
