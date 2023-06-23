import axios from 'axios';

const publicAPI = axios.create({
  baseURL: 'https://api.monobank.ua/bank/currency',
});

const params = {
  USDcurrencyCode: 840,
  EURcurrencyCode: 978,
  UAHcurrencyCode: 980,
};

export const getCurrencyRates = async () => {
  const { data } = await publicAPI.get('');
  const filteredData = data.filter(
    element =>
      (element.currencyCodeA === params.USDcurrencyCode &&
        element.currencyCodeB === params.UAHcurrencyCode) ||
      (element.currencyCodeA === params.EURcurrencyCode &&
        element.currencyCodeB === params.UAHcurrencyCode)
  );
  return filteredData;
};
