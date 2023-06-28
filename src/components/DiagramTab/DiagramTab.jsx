import Chart from 'components/Chart/Chart';
import TableBlock from 'components/Table/Table';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { summaryThunk } from 'redux/transactions/operation';
import {
  selectCategories,
  selectCategoriesSummary,
  selectExpenseSummary,
  selectIncomeSummary,
} from 'redux/transactions/selectors';
import Select from 'react-select';
import css from './DiagramTab.module.css';
import { formatMoney } from 'utils/formatMoney';
import { colors, current, customStyles, months, years } from './constants';

export default function DiagramTab() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories).filter(
    e => e.type === 'EXPENSE'
  );
  const sum = useSelector(selectCategoriesSummary).filter(
    e => e.type === 'EXPENSE'
  );
  const totalExpenses = 0 - useSelector(selectExpenseSummary);
  const totalIncome = useSelector(selectIncomeSummary);
  const sumData = categories
    .map((c, i) => ({
      color: colors[i],
      name: c.name,
      total: 0 - sum.find(e => e.name === c.name)?.total || 0,
    }))
    .filter(e => e.total > 0);

  useEffect(() => {
    dispatch(summaryThunk(current));
  }, [dispatch]);

  return (
    <div className={css.diagram}>
      <div>
        <h2 className={css.statistics}>Statistics</h2>
        <div className={css.totalWrapper}>
          <Chart sumData={sumData} />
          <span className={css.total}>
            &#8372; {formatMoney(totalExpenses)}
          </span>
        </div>
      </div>
      <div>
        <div className={css.selectWrapper}>
          <Select
            className={css.select}
            options={months}
            styles={customStyles}
            defaultValue={months[current.month - 1]}
            onChange={e => {
              if (e.value !== current.month) {
                current.month = e.value;
                dispatch(summaryThunk(current));
              }
            }}
          />
          <Select
            className={css.select}
            styles={customStyles}
            defaultValue={years[2028 - current.year]}
            options={years}
            onChange={e => {
              if (e.value !== current.year) {
                current.year = e.value;
                dispatch(summaryThunk(current));
              }
            }}
          />
        </div>
        <TableBlock
          data={sumData}
          expenses={totalExpenses}
          income={totalIncome}
        />
      </div>
    </div>
  );
}
