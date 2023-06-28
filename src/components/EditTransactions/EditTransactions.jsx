import React, { useEffect } from 'react';
import css from './EditTransactions.module.css';
import 'react-datetime/css/react-datetime.css';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import { updateThunk } from 'redux/transactions/operation';
import { selectCategories } from 'redux/transactions/selectors';
import { selectTransaction } from 'redux/global/selectors';
import { closeEditModal } from 'redux/global/slice';
import 'flatpickr/dist/themes/material_green.css';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { customStyles } from 'utils/selectStyle';
import { Backdrop } from 'components/Backdrop/Backdrop';
import moment from 'moment';

const validationSchema = Yup.object({
  amount: Yup.number('must be a number').required(
    'Please enter amount of transaction'
  ),
});

export const EditTransactions = () => {
  const transaction = useSelector(selectTransaction);
  const initialValues =
    transaction.type === 'INCOME'
      ? {
          ...transaction,
          type: true,
        }
      : {
          ...transaction,
          type: false,
          amount: 0 - transaction.amount,
        };
  const categori = useSelector(selectCategories);
  const income = categori.find(el => el.type === 'INCOME');

  const filteredCategori = categori.filter(el => el.type !== 'INCOME');
  const options = filteredCategori.map(el => ({
    value: el.id,
    label: el.name,
  }));

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => {
      const transactionDate = moment(values.transactionDate).format(
        'YYYY-MM-DD'
      );
      const updatedValues = {
        ...values,
        categoryId: values.type ? income.id : values.categoryId,
        amount: values.type ? Number(values.amount) : 0 - values.amount,
        type: values.type ? 'INCOME' : 'EXPENSE',
        id: initialValues.id,
        transactionDate,
      };
      dispatch(updateThunk(updatedValues));
    },
  });

  useEffect(() => {
    const onClose = event => {
      if (event.code === 'Escape') {
        dispatch(closeEditModal());
      }
    };
    window.addEventListener('keydown', onClose);
    return () => {
      window.removeEventListener('keydown', onClose);
    };
  }, [dispatch]);

  const svgClose = (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none">
      <path stroke="#FBFBFB" d="m1 1 16 16M1 17 17 1" />
    </svg>
  );

  const closeBeckdrop = e => {
    if (e.target === e.currentTarget) {
      dispatch(closeEditModal());
    }
  };
  const closeBtn = () => {
    dispatch(closeEditModal());
  };

  const { type, transactionDate, categoryId } = formik.values;

  return (
    <Backdrop onClick={closeBeckdrop}>
      <div className={css.modal}>
        <button onClick={closeBtn} className={css.closeBtn} type="button">
          {svgClose}
        </button>

        <h1 className={css.title}>Edit transactions</h1>
        <div className={css.toggleContainer}>
          <button
            type="button"
            className={`${css.toggle} ${type ? css.orangeToggle : ''}`}
            onClick={() => {
              formik.setFieldValue('type', true);
            }}
          >
            Income
          </button>
          <p className={css.slash}>/</p>
          <button
            type="button"
            className={`${css.toggle} ${!type ? css.pinkToggle : ''}`}
            onClick={() => {
              formik.setFieldValue('type', false);
            }}
          >
            Expense
          </button>
        </div>

        <form className={css.form} onSubmit={formik.handleSubmit}>
          {!type && (
            <Select
              defaultValue={options.find(e => e.value === categoryId)}
              styles={customStyles}
              options={options}
              isDisabled={true}
              onChange={({ value }) => {
                formik.setFieldValue('categoryId', value);
              }}
            />
          )}
          <div className={css.formBlock}>
            <input
              onChange={formik.handleChange}
              className={css.inputLine}
              type="text"
              name="amount"
              placeholder="Transaction amount"
              value={formik.values.amount}
            />

            <Flatpickr
              defaultValue={transactionDate}
              options={{
                dateFormat: 'd.m.Y',
                disableMobile: 'true',
              }}
              type="date"
              name="transactionDate"
              id="date"
              selected={transactionDate}
              onChange={val => {
                formik.setFieldValue('transactionDate', val[0]);
              }}
            />
          </div>

          <input
            onChange={formik.handleChange}
            className={css.inputComment}
            type="text"
            name="comment"
            placeholder="Comment"
            value={formik.values.comment}
          />

          <button className={css.btnSave} type="submit">
            SAVE
          </button>
        </form>
        <button onClick={closeBtn} className={css.btnCancel} type="button">
          CANCEL
        </button>
      </div>
    </Backdrop>
  );
};
export default EditTransactions;
