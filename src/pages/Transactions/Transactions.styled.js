import styled from '@emotion/styled';
import { BiPencil } from 'react-icons/bi';

export const TransactionDetails = styled.ul`
  border-radius: 10px;
  width: 100%;
  overflow: hidden;
  margin-top: 32px;
  margin-bottom: 8px;
`;

export const TransactionDetailsItem = styled.li`
  position: relative;
  display: flex;
  justify-content: space-between;
  color: white;
  font-weight: ${({ theme }) => theme.fontWeight.normal};
  background: linear-gradient(220deg, #6d54eb 3.47%, #652392 90.06%);
  padding: 12px 20px;
  font-size: 16px;
  border-left: 5px solid ${({ theme }) => theme.colors.dashboardText};

  &:after {
    position: absolute;
    bottom: 0;
    left: 0;
    content: '';
    width: 100%;
    height: 1px;
    background-color: #dcdcdf;
  }
`;

export const TransactionDetailsItemTitle = styled.p`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export const SumText = styled.span`
  color: ${({ theme }) => theme.colors.dashboardText};
`;

export const Table = styled.table`
  margin-top: 20px;
  display: block;
  width: 100%;

  ${({ theme }) => theme.media.desktop} {
    width: 715px;
  }
`;

export const TableBody = styled.tbody`
  display: block;
  width: 100%;
`;

export const TableHead = styled.tr`
  display: grid;
  grid-template-columns: 1.6fr 1.2fr 2fr 2fr 1fr 2fr;
  width: 100%;
  color: #fbfbfb;
  background-color: rgba(82, 59, 126, 0.6);
  padding: 16px 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 60px 0px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(50px);
`;

export const TableHeader = styled.th`
  font: ${({ theme }) => theme.fonts.secondary};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: 16px;
  color: #fbfbfb;
  text-align: left;
`;

export const TableRow = styled.tr`
  font: ${({ theme }) => theme.fonts.secondary};
  font-weight: ${({ theme }) => theme.fontWeight.normal};
  font-size: 14px;
  color: #fbfbfb;
  text-align: center;
  position: relative;
  display: grid;
  padding: 16px 20px;
  grid-template-columns: 1.6fr 1.2fr 2fr 2fr 1fr 2fr;
  width: 100%;

  &:after {
    position: absolute;
    bottom: 0;
    left: 0;
    content: '';
    width: 100%;
    height: 1px;
    background-color: #b8bbc2;
  }
`;

export const Sum = styled.td`
  text-align: right;
  color: ${({ theme }) => theme.colors.dashboardText};
`;

export const ButtonContainer = styled.td`
  display: flex;
  justify-content: center;
  align-items: right;
  margin-left: auto;
  margin-right: 15px;
`;

export const ButtonDelTransaction = styled.button`
  text-align: center;
  background: linear-gradient(
    167deg,
    #ffc727 0%,
    #9e40ba 61.46%,
    #7000ff 90.54%
  );
  font-size: 14px;
  font-weight: 400;
  padding: 4px 12px;
  border-radius: 18px;
  border: none;
  width: 69px;
  height: 29px;
  color: ${({ theme }) => theme.colors.white60};
  box-shadow: 1px 9px 15px 0px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: 0.2s;

  .ButtonDelTransaction:active,
  .ButtonDelransaction:focus,
  .ButtonDelTransaction:hover {
    box-shadow: 1px 5px 8px 0px rgba(0, 0, 0, 0.5);
  }
`;
export const ButtonEditTransaction = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  text-align: center;
  background: transparent;
  font-size: 16px;
  padding: 4px 12px;
  border-radius: 18px;
  border: none;
  width: 69px;
  height: 29px;
  color: ${({ theme }) => theme.colors.white60};
  cursor: pointer;
  transition: 0.2s;

  .ButtonEditTransaction:active,
  .ButtonEditTransaction:focus,
  .ButtonEditTransaction:hover {
    box-shadow: 1px 5px 8px 0px rgba(0, 0, 0, 0.5);
  }
`;
export const StyledBiPencil = styled(BiPencil)`
  width: 14px;
  height: 14px;
  fill: rgba(255, 255, 255, 0.6);
`;