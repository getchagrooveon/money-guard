import React from 'react';
import css from './Table.module.css';
import styled from '@emotion/styled';
import { formatMoney } from 'utils/formatMoney';

const IconBox = styled.div`
  min-width: 24px;
  height: 24px;
  border-radius: 2px;
  background-color: ${({ color }) => color || '#ffffff'};
`;
const colors = ['#FF868D', '#FFB627'];

export default function TableBlock(props) {
  const { data, income, expenses } = props;
  return (
    <table className={css.table}>
      <thead className={css.head}>
        <tr className={css.headRow}>
          <th className={css.cell}>Category</th>
          <th className={css.cell}>Sum</th>
        </tr>
      </thead>
      <tbody>
        {data?.map(e => (
          <tr className={css.row} key={e.name}>
            <th className={css.cell}>
              <IconBox color={e.color} />
              {e.name}
            </th>
            <th className={css.cell}>{formatMoney(e.total)}</th>
          </tr>
        ))}
        <tr className={css.rowAfter}>
          <th>Expenses:</th>
          <th style={{ color: colors[0] }}>{formatMoney(expenses)}</th>
        </tr>
        <tr className={css.rowAfter}>
          <th>Income:</th>
          <th style={{ color: colors[1] }}>{formatMoney(income)}</th>
        </tr>
      </tbody>
    </table>
  );
}
