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
  ButtonEditTransaction,
  BtnEditTransaction,
  ButtonDelTransaction,
  StyledBiPencil,
  NoTransactions,
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
import { setUpdatedTransaction } from 'redux/global/slice';

export default function Transactions() {
  const dispatch = useDispatch();
  const transactions = useSelector(selectTransactions);
  const categories = useSelector(selectCategories);

  useEffect(() => {
    dispatch(getAllThunk());
    dispatch(categoriesThunk());
  }, [dispatch]);

  const sortedTransactions = transactions.slice().sort((a, b) => {
    return new Date(b.transactionDate) - new Date(a.transactionDate);
  });

  const handleEditClick = object => {
    dispatch(setUpdatedTransaction(object));
  };

  return (
    <>
      <MediaQuery deviceName={'mobileAll'}>
        {!sortedTransactions.length && (
          <NoTransactions>
            Please add transactions (click button &#10010; )
          </NoTransactions>
        )}
        {sortedTransactions.length > 0 && categories.length > 0
          ? sortedTransactions.map((el, i) => (
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
                    onClick={() => {
                      handleEditClick(el);
                    }}
                  >
                    <StyledBiPencil /> Edit
                  </ButtonEditTransaction>
                </TransactionDetailsItem>
              </TransactionDetails>
            ))
          : ''}
      </MediaQuery>
      <MediaQuery deviceName={'tabletFrom'}>
        {!sortedTransactions.length && (
          <NoTransactions>
            Please add transactions (click button &#10010; )
          </NoTransactions>
        )}
        <Table>
          <TableBody>
            <TableHead>
              <TableHeader>Date</TableHeader>
              <TableHeader>Type</TableHeader>
              <TableHeader>Category</TableHeader>
              <TableHeader>Comment</TableHeader>
              <TableHeader>Sum</TableHeader>
              <TableHeader></TableHeader>
              <TableHeader></TableHeader>
            </TableHead>
            {sortedTransactions.length > 0 && categories.length > 0
              ? sortedTransactions.map((el, i) => (
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
                      <BtnEditTransaction
                        type="button"
                        onClick={() => handleEditClick(el)}
                      >
                        <StyledBiPencil />
                      </BtnEditTransaction>
                    </ButtonContainer>
                    <ButtonContainer>
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
