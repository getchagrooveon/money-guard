import React, { useState } from 'react';
import css from './EditTransactions.module.css';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import { updateThunk } from 'redux/transactions/operation';
import { selectCategories } from 'redux/transactions/selectors';
import { selectTransaction } from 'redux/global/selectors';

const validationSchema = Yup.object({
  amount: Yup.number('must be a number').required(
    'Please enter amount of transaction'
  ),
});

export const EditTransactions = () => {
  const {
    id = null,
    transactionDate = '',
    type = '',
    categoryId = '',
    comment = '',
    amount = '',
  } = useSelector(selectTransaction);
  const categori = useSelector(selectCategories);
  const income = categori.find(el => el.type === 'INCOME');

  const filteredCategori = categori.filter(el => el.type !== 'INCOME');
  const options = filteredCategori.map(el => ({
    value: el.id,
    label: el.name,
  }));

  const dispatch = useDispatch();
  const [toggleValue, setToggleValue] = useState(type === 'EXPENSE');
  const formik = useFormik({
    initialValues: {
      amount,
      transactionDate,
      comment,
      categoryId,
      type: toggleValue ? 'INCOME' : 'EXPENSE',
    },
    validationSchema,

    onSubmit: value => {
      const transactionDate = value.transactionDate.format('YYYY-MM-DD');
      if (type) {
        dispatch(
          updateThunk({
            ...value,
            type: 'EXPENSE',
            amount: 0 - value.amount,
            id,
            transactionDate,
          })
        );
      } else {
        dispatch(
          updateThunk({
            ...value,
            type: income.type,
            categoryId: income.id,
            id,
            transactionDate,
          })
        );
      }

      console.log(value, transactionDate);
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

  const handleToggle = () => {
    setToggleValue(prevToggleValue => !prevToggleValue);
  };

  return (
    <div>
      <div className={`${css.backgroundColor} ${css.modal}`}>
        <h1 className={css.title}>Edit transactions</h1>
        {toggleValue && (
          <div className={css.toggleContainer}>
            <button
              type="button"
              className={`${css.toggle} ${toggleValue ? css.activeToggle : ''}`}
              onClick={handleToggle}
            >
              Income
            </button>
            <p>/</p>
            <button
              type="button"
              className={`${css.toggle} ${
                !toggleValue ? css.activeToggle : ''
              }`}
              onClick={handleToggle}
            >
              Expense
            </button>
          </div>
        )}
        <form className={css.inputForm} onSubmit={formik.handleSubmit}>
          <label className={css.toggleSwitch}>
            <input
              type="radio"
              name="type"
              checked={toggleValue}
              onChange={handleToggle}
            />
            <span className={css.toggleSlider}></span>
          </label>
          {toggleValue && (
            <Select
              className={css.inputLine}
              options={options}
              value={formik.values.categoryId.value}
              onChange={({ value }) =>
                formik.setFieldValue('categoryId', value)
              }
            />
          )}
          <div className={css.amount}>
            <input
              onChange={formik.handleChange}
              className={css.inputLine}
              type="text"
              name="amount"
              placeholder="Transaction amount"
              value={formik.values.amount}
            ></input>
          </div>
          <div className={css.date}>
            <Datetime
              inputProps={{ name: 'transactionDate' }}
              className={css.customDatetime}
              value={formik.values.transactionDate}
              dateFormat="YYYY-MM-DD"
              // input={true}
              onChange={value => formik.setFieldValue('transactionDate', value)}
            />
          </div>
          <div className={css.comment}>
            <input
              onChange={formik.handleChange}
              className={css.inputLine}
              type="text"
              name="comment"
              placeholder="Comment"
              value={formik.values.comment}
            ></input>
          </div>
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

export default EditTransactions;
