import styled from '@emotion/styled';

export const Table = styled.table`
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  font-family: sans-serif;
  width: 280px;
`;
export const TableHead = styled.thead`
  background-color: transparent;
  height: auto;
`;
export const TableRow = styled.tr`
  color: #ffffff;
  width: auto;
  padding: 16px 14px;
  border-bottom: 1px solid #ffffff33;
  display: flex;
  justify-content: space-between;
`;
export const HeadTableRow = styled.tr`
  display: flex;
  justify-content: space-between;
  color: #ffffff;
  width: auto;
  padding: 16px;
  background: rgba(82, 59, 126, 0.6);
  border-radius: 8px;
  width: 280px;
  box-shadow: 0px 4px 60px 0px rgba(0, 0, 0, 0.25);
  overflow: hidden;
`;
export const IconBox = styled.div`
  min-width: 24px;
  height: 24px;
  border-radius: 2px;
  background-color: ${({ color }) => color || '#ffffff'};
`;

export const StyledTH = styled.th`
  width: auto;
  display: flex;
  align-items: center;
  gap: 16px;
`;
