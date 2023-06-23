import css from './Currency.module.css';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getCurrencyThunk } from 'redux/currency/operations';
// import {
//   EURBuyRate,
//   EURSellRate,
//   USDBuyRate,
//   USDSellRate,
// } from 'redux/currency/selectors';

export const Currency = () => {
  // const usdPurchaseValue = useSelector(USDBuyRate);
  // const usdSellValue = useSelector(USDSellRate);
  // const eurPurchaseValue = useSelector(EURBuyRate);
  // const eurSellValue = useSelector(EURSellRate);

  const usdPurchaseValue = '27.00';
  const usdSellValue = '27.00';
  const eurPurchaseValue = '27.00';
  const eurSellValue = '27.00';

  return (
    <div className={css.currency}>
      <div className="container">
        <table className={css.currencytable} cellSpacing="0" cellPadding="0">
          <thead>
            <tr>
              <th className={css.left}>Currency</th>
              <th>Purchase</th>
              <th className={css.right}>Sell</th>
            </tr>
          </thead>
          <tbody className={css.currencybody}>
            <tr>
              <td className={css.left}>USD</td>
              <td>{usdPurchaseValue}</td>
              <td className={css.right}>{usdSellValue}</td>
            </tr>
            <tr>
              <td className={css.left}>EUR</td>
              <td>{eurPurchaseValue}</td>
              <td className={css.right}>{eurSellValue}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div></div>
    </div>
  );
};

export default Currency;
