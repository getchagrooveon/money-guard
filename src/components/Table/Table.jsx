import React from 'react';
import css from './Table.module.css';
import styled from '@emotion/styled';

const IconBox = styled.div`
  min-width: 24px;
  height: 24px;
  border-radius: 2px;
  background-color: ${({ color }) => color || '#ffffff'};
`;

export default function TableBlock(props) {
  console.log('Theme table', props);
  const { data } = props;
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
            <th className={css.cell}>{e.total}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
