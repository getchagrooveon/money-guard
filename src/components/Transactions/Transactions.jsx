import { useDispatch, useSelector } from 'react-redux';
import {
  selectCategories,
  selectTransactions,
} from 'redux/transactions/selectors';

import {
  TransactionDetails,
  TransactionDetailsItem,
  TransactionDetailsItemTitle,
  SumText,
  TableHead,
  TableHeader,
  TableBody,
  Table,
  TableRow,
  Sum,
} from './Transactions.styled';
import { formatMoney } from 'utils/formatMoney';
import { MediaQuery } from 'components/MediaQuery/MediaQuery';
import { useEffect } from 'react';
import { categoriesThunk, getAllThunk } from 'redux/transactions/operation';

const colors = [
  '#FED057',
  '#FFD8D0',
  '#FD9498',
  '#C5BAFF',
  '#6E78E8',
  '#4A56E2',
  '#81E1FF',
  '#24CCA7',
  '#00AD84',
];

export default function Transactions() {
  const dispatch = useDispatch();
  const transactions = useSelector(selectTransactions);
  const categories = useSelector(selectCategories);

  useEffect(() => {
    dispatch(getAllThunk());
    dispatch(categoriesThunk());
  }, [dispatch]);
  const handleClick = object => console.log('enter Edit');

  return (
    <>
      <MediaQuery deviceName={'mobileAll'}>
        {transactions.length > 0 && categories.length > 0
          ? transactions.map((el, i) => (
              <TransactionDetails key={el.id}>
                <TransactionDetailsItem color={colors[i < 9 ? i : i % 9]}>
                  <TransactionDetailsItemTitle>
                    Date
                  </TransactionDetailsItemTitle>
                  {new Date(el.transactionDate)
                    .toLocaleDateString()
                    .replace(/\//g, '.')}
                </TransactionDetailsItem>
                <TransactionDetailsItem color={colors[i < 9 ? i : i % 9]}>
                  <TransactionDetailsItemTitle>
                    Type
                  </TransactionDetailsItemTitle>
                  {el.type[0] + el.type.slice(1).toLowerCase()}
                </TransactionDetailsItem>
                <TransactionDetailsItem color={colors[i < 9 ? i : i % 9]}>
                  <TransactionDetailsItemTitle>
                    Category
                  </TransactionDetailsItemTitle>
                  {categories.find(e => e.id === el.categoryId).name}
                </TransactionDetailsItem>
                <TransactionDetailsItem color={colors[i < 9 ? i : i % 9]}>
                  <TransactionDetailsItemTitle>
                    Comment
                  </TransactionDetailsItemTitle>
                  {el.comment}
                </TransactionDetailsItem>
                <TransactionDetailsItem color={colors[i < 9 ? i : i % 9]}>
                  <TransactionDetailsItemTitle>Sum</TransactionDetailsItemTitle>
                  <SumText color={colors[i < 9 ? i : i % 9]}>
                    {formatMoney(el.amount).replace('-', '')}
                  </SumText>
                </TransactionDetailsItem>
                <TransactionDetailsItem color={colors[i < 9 ? i : i % 9]}>
                  <TransactionDetailsItemTitle>
                    Balance
                  </TransactionDetailsItemTitle>
                  {formatMoney(el.balanceAfter).replace('-', '')}
                </TransactionDetailsItem>
              </TransactionDetails>
            ))
          : ''}
      </MediaQuery>
      <MediaQuery deviceName={'tabletFrom'}>
        <Table>
          <TableBody>
            <TableHead>
              <TableHeader className="alignRight">Date</TableHeader>
              <TableHeader className="alignRight">Type</TableHeader>
              <TableHeader className="alignRight">Category</TableHeader>
              <TableHeader className="alignRight">Comment</TableHeader>
              <TableHeader className="alignRight">Sum</TableHeader>
            </TableHead>
            {transactions.length > 0 && categories.length > 0
              ? transactions.map(el => (
                  <TableRow key={el.id}>
                    <td>
                      {new Date(el.transactionDate)
                        .toLocaleDateString()
                        .replace(/\//g, '.')}
                    </td>
                    <td>{el.amount > 0 ? '+' : '-'}</td>
                    <td>{categories.find(e => e.id === el.categoryId).name}</td>
                    <td>{el.comment}</td>
                    <Sum color={el.amount < 0 ? '#FF6596' : '#24CCA7'}>
                      {formatMoney(el.amount).replace('-', '')}
                    </Sum>
                    <td>
                      <button type="button" onClick={handleClick}>
                        Edit
                      </button>
                    </td>
                    <td>
                      <button>Delete</button>
                    </td>
                  </TableRow>
                ))
              : ''}
          </TableBody>
        </Table>
        <button>Add transaction</button>
      </MediaQuery>
    </>
  );
}
