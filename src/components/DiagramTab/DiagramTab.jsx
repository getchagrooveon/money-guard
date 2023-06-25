import Chart from 'components/Chart/Chart';
import Table from 'components/Table/Table';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { summaryThunk } from 'redux/transactions/operation';
import {
  selectCategories,
  selectCategoriesSummary,
} from 'redux/transactions/selectors';
import { getRandomHexColor } from 'utils/getRandomColor';

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
    <>
      <Chart sumData={sumData} />
      <Table data={sumData} />
    </>
  );
}
