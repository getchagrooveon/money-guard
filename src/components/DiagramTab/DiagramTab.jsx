import Chart from 'components/Chart/Chart';
import TableBlock from 'components/Table/Table';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { summaryThunk } from 'redux/transactions/operation';
import {
  selectCategories,
  selectCategoriesSummary,
} from 'redux/transactions/selectors';
import { getRandomHexColor } from 'utils/getRandomColor';
import Select from 'react-select';
import css from './DiagramTab.module.css';

const months = [
  { label: 'January', value: 0 },
  { label: 'February', value: 1 },
  { label: 'March', value: 2 },
  { label: 'April', value: 3 },
  { label: 'May', value: 4 },
  { label: 'June', value: 5 },
  { label: 'July', value: 6 },
  { label: 'August', value: 7 },
  { label: 'September', value: 8 },
  { label: 'October', value: 9 },
  { label: 'November', value: 10 },
  { label: 'December', value: 11 },
];

const years = [
  { label: '2018', value: 2018 },
  { label: '2019', value: 2019 },
  { label: '2020', value: 2020 },
  { label: '2021', value: 2021 },
  { label: '2022', value: 2022 },
  { label: '2023', value: 2023 },
];

let currentYear = null;
let currentMonth = null;

export default function DiagramTab() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories).filter(
    e => e.type === 'EXPENSE'
  );
  const sum = useSelector(selectCategoriesSummary).filter(
    e => e.type === 'EXPENSE'
  );
  const sumData = categories.map(c => ({
    color: getRandomHexColor(),
    name: c.name,
    total: 0 - sum.find(e => e.name === c.name)?.total || 0,
  }));

  useEffect(() => {
    dispatch(summaryThunk());
  }, [dispatch]);

  return (
    <div className={css.diagram}>
      <div>
        <h2 className={css.statistics}>Statistics</h2>
        <Chart sumData={sumData} />
      </div>
      <div>
        <div className={css.selectWrapper}>
          <Select
            className={css.select}
            options={months}
            onChange={e => {
              if (e.value !== currentMonth) {
                currentMonth = e.value;
                console.log('Sended query', e);
              }
            }}
          />
          <Select
            className={css.select}
            options={years}
            onChange={e => {
              if (e.value !== currentYear) {
                currentYear = e.value;
                console.log('Sended query', e);
              }
            }}
          />
        </div>
        <TableBlock data={sumData} />
      </div>
    </div>
  );
}
