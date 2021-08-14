import axios from "axios";

export const getAxios = async (url: string) => {
  const result = await axios.get(url);
  return result.data;
};

export const getCountryByRegion = async (regionName: string) => {
  const result = await axios.get(
    `https://restcountries.eu/rest/v2/region/${regionName}`
  );
  return result.data;
};

export const getCountryInfoBySearch = async (name: string) => {
  const result = await axios.get(
    `https://restcountries.eu/rest/v2/name/${name}`
  );
  return result.data;
};
