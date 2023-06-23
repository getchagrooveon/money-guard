import css from './Transactions.module.css';
// import { initialState } from '../../redux/transactions/slice';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import { updateThunk } from 'redux/transactions/operation';

const validationSchema = Yup.object({
  amount: Yup.number('must be a number').required(
    'Please enter amount of transaction'
  ),
});

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

export const Transactions = ({
  id = '',
  transactionDate = '',
  type = '',
  categoryId = '',
  comment = '',
  amount = '',
}) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      amount,
      transactionDate,
      comment,
      categoryId,
      type,
    },
    validationSchema,

    onSubmit: value => {
      console.log(value);
      dispatch(updateThunk({ ...value, id }));
    },
  });

  useEffect(() => {
    const onClose = event => {
      if (event.code === 'Escape') {
        dispatch();
      }
    };
    document.addEventListener('keypress', onClose);
    return () => {
      document.removeEventListener('keypress', onClose);
    };
  });

  return (
    <div className={css.overlay}>
      <div className={`${css.backgroundColor} ${css.modal}`}>
        <h1 className={css.title}>Edit transactions</h1>
        <div className={css.toggleContainer}>
          <button type="button" className={css.toggle}>
            Income
          </button>
          <p>/</p>
          <button type="button" className={css.toggle}>
            Expense
          </button>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <label className={css.toggleSwitch}>
            <input
              type="radio"
              name="type"
              checked={formik.values.type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className={css.toggleSlider}></span>
          </label>
          {formik.values.type === 'EXPENSE' && (
            <Select
              options={options}
              value={formik.values.categoryId}
              onChange={option => formik.setFieldValue('categoryId', option)}
            />
          )}

          <input
            onChange={formik.handleChange}
            className={css.inputLine}
            type="text"
            name="amount"
            placeholder="Transaction amount"
            value={formik.values.amount}
          ></input>
          <Datetime
            value={formik.values.transactionDate}
            input={true}
            onChange={value => formik.setFieldValue('transactionDate', value)}
          />
          <input
            onChange={formik.handleChange}
            className={css.inputLine}
            type="text"
            name="comment"
            placeholder="Comment"
            value={formik.values.comment}
          ></input>

          <button className={css.btnSaveCancel} type="submit">
            SAVE
          </button>
          <button className={css.btnSaveCancel} type="button">
            CANCEL
          </button>
        </form>
      </div>
    </div>
  );
};

export default Transactions;
