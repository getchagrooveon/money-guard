import React from 'react';
import {
  HeadTableRow,
  IconBox,
  StyledTH,
  Table,
  TableHead,
  TableRow,
} from './Table.styled';

export default function TableBlock(props) {
  console.log('Theme table', props);
  const { data } = props;
  return (
    <Table>
      <TableHead>
        <HeadTableRow>
          <StyledTH>Category</StyledTH>
          <StyledTH>Sum</StyledTH>
        </HeadTableRow>
      </TableHead>
      <tbody>
        {data?.map(e => (
          <TableRow key={e.name}>
            <StyledTH>
              <IconBox color={e.color} />
              {e.name}
            </StyledTH>
            <StyledTH>{e.total}</StyledTH>
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
}
