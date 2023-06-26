import css from './Currency.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  EURBuyRate,
  EURSellRate,
  USDBuyRate,
  USDSellRate,
  currencyQueryTime,
} from 'redux/currency/selectors';
import { IconRateGraph } from 'components/Icons/IconRateGraph';
import { useEffect } from 'react';
import { getCurrencyThunk } from 'redux/currency/operations';
// import { IconRateGraphOutline } from 'components/Icons/IconRateGraphOutline';

export const Currency = () => {
  const usdPurchaseValue = useSelector(USDBuyRate);
  const usdSellValue = useSelector(USDSellRate);
  const eurPurchaseValue = useSelector(EURBuyRate);
  const eurSellValue = useSelector(EURSellRate);
  const lastCurrencyQueryTime = useSelector(currencyQueryTime);
  const dispatch = useDispatch();

  useEffect(() => {
    const timeNow = Date.now();
    if (timeNow - lastCurrencyQueryTime > 600000) {
      dispatch(getCurrencyThunk());
    } else return;
  }, [dispatch, lastCurrencyQueryTime]);

  const values = {
    usdBuy: usdPurchaseValue ? usdPurchaseValue.toFixed(2) : 'N/A',
    usdSell: usdSellValue ? usdSellValue.toFixed(2) : 'N/A',
    eurBuy: eurPurchaseValue ? eurPurchaseValue.toFixed(2) : 'N/A',
    eurSell: eurSellValue ? eurSellValue.toFixed(2) : 'N/A',
  };

  return (
    <div className={css.currency}>
      <table className={css.currencytable} cellSpacing="0" cellPadding="0">
        <thead>
          <tr>
            <th className={css.left}>Currency</th>
            <th>Purchase</th>
            <th className={css.right}>Sell</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={css.left}>USD</td>
            <td>{values.usdBuy}</td>
            <td className={css.right}>{values.usdSell}</td>
          </tr>
          <tr>
            <td className={css.left}>EUR</td>
            <td>{values.eurBuy}</td>
            <td className={css.right}>{values.eurSell}</td>
          </tr>
        </tbody>
      </table>

      <IconRateGraph className={css.iconRateGraph} />
      {/* <IconRateGraphOutline className={css.iconRateGraphOutline} /> */}
    </div>
  );
};

export default Currency;
