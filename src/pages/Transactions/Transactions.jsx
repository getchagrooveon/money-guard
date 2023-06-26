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
  ButtonContainer,
  ButtonDelTransaction,
  ButtonEditTransaction,
  StyledBiPencil,
} from './Transactions.styled';
import { formatMoney } from 'utils/formatMoney';
import { MediaQuery } from 'components/MediaQuery/MediaQuery';
import { useEffect } from 'react';
import {
  categoriesThunk,
  getAllThunk,
  removeThunk,
} from 'redux/transactions/operation';
import { BtnAddTransaction } from 'components/BtnAddTransaction/BtnAddTransaction';

export default function Transactions() {
  const dispatch = useDispatch();
  const transactions = useSelector(selectTransactions);
  const categories = useSelector(selectCategories);

  useEffect(() => {
    dispatch(getAllThunk());
    dispatch(categoriesThunk());
  }, [dispatch]);
  const handleEditClick = object => console.log('enter Edit');

  return (
    <>
      <MediaQuery deviceName={'mobileAll'}>
        {transactions.length > 0 && categories.length > 0
          ? transactions.map((el, i) => (
              <TransactionDetails
                key={el.id}
                color={el.amount < 0 ? '#FF868D' : '#FFB627'}
              >
                <TransactionDetailsItem>
                  <TransactionDetailsItemTitle>
                    Date
                  </TransactionDetailsItemTitle>
                  {new Date(el.transactionDate)
                    .toLocaleDateString()
                    .replace(/\//g, '.')}
                </TransactionDetailsItem>
                <TransactionDetailsItem>
                  <TransactionDetailsItemTitle>
                    Type
                  </TransactionDetailsItemTitle>
                  {el.amount > 0 ? '+' : '-'}
                </TransactionDetailsItem>
                <TransactionDetailsItem>
                  <TransactionDetailsItemTitle>
                    Category
                  </TransactionDetailsItemTitle>
                  {categories.find(e => e.id === el.categoryId).name}
                </TransactionDetailsItem>
                <TransactionDetailsItem>
                  <TransactionDetailsItemTitle>
                    Comment
                  </TransactionDetailsItemTitle>
                  {el.comment}
                </TransactionDetailsItem>
                <TransactionDetailsItem>
                  <TransactionDetailsItemTitle>Sum</TransactionDetailsItemTitle>
                  <SumText color={el.amount < 0 ? '#FF868D' : '#FFB627'}>
                    {formatMoney(el.amount).replace('-', '')}
                  </SumText>
                </TransactionDetailsItem>
                <TransactionDetailsItem>
                  <TransactionDetailsItemTitle>
                    <ButtonDelTransaction
                      type="button"
                      onClick={() => dispatch(removeThunk(el.id))}
                    >
                      Delete
                    </ButtonDelTransaction>
                  </TransactionDetailsItemTitle>
                  <ButtonEditTransaction
                    type="button"
                    onClick={handleEditClick}
                  >
                    <StyledBiPencil />
                    Edit
                  </ButtonEditTransaction>
                </TransactionDetailsItem>
              </TransactionDetails>
            ))
          : ''}
      </MediaQuery>
      <MediaQuery deviceName={'tabletFrom'}>
        <Table>
          <TableBody>
            <TableHead>
              <TableHeader>Date</TableHeader>
              <TableHeader>Type</TableHeader>
              <TableHeader>Category</TableHeader>
              <TableHeader>Comment</TableHeader>
              <TableHeader>Sum</TableHeader>
              <TableHeader></TableHeader>
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
                    <Sum color={el.amount < 0 ? '#FF868D' : '#FFB627'}>
                      {formatMoney(el.amount).replace('-', '')}
                    </Sum>
                    <ButtonContainer>
                      <ButtonEditTransaction
                        type="button"
                        onClick={handleEditClick}
                      >
                        <StyledBiPencil />
                      </ButtonEditTransaction>
                      <ButtonDelTransaction
                        type="button"
                        onClick={() => dispatch(removeThunk(el.id))}
                      >
                        Delete
                      </ButtonDelTransaction>
                    </ButtonContainer>
                  </TableRow>
                ))
              : ''}
          </TableBody>
        </Table>
      </MediaQuery>
      <BtnAddTransaction />
    </>
  );
}
