import { useEffect } from 'react';
import { useFormik } from 'formik';
import Select from 'react-select';
import css from './AddTransaction.module.css';
import { BtnPlus } from './BtnPlus';
import { BtnMinus } from './BtnMinus';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategories } from 'redux/transactions/selectors';
import { addThunk } from 'redux/transactions/operation';
import 'flatpickr/dist/themes/material_green.css';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { customStyles } from 'utils/selectStyle';

const svgClose = (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none">
    <path stroke="#FBFBFB" d="m1 1 16 16M1 17 17 1" />
  </svg>
);

export const AddTransaction = ({ closeModal }) => {
  const dispatch = useDispatch();

  const categori = useSelector(selectCategories);
  const income = categori.find(el => el.type === 'INCOME');

  const filteredCategori = categori.filter(el => el.type !== 'INCOME');
  const options = filteredCategori.map(el => ({
    value: el.id,
    label: el.name,
  }));

  useEffect(() => {
    const closeEsc = e => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', closeEsc);

    return () => {
      document.removeEventListener('keydown', closeEsc);
    };
  }, [closeModal]);

  const formik = useFormik({
    initialValues: {
      amount: '',
      transactionDate: '',
      comment: '',
      categoryId: 'Income',
      type: false,
    },

    onSubmit: value => {
      const date = value.transactionDate
        .toString()
        .replace('00:00:00', '12:00:00');

      if (type) {
        dispatch(
          addThunk({
            ...value,
            type: 'EXPENSE',
            amount: 0 - value.amount,
            transactionDate: new Date(date),
          })
        );
      } else {
        dispatch(
          addThunk({
            ...value,
            type: income.type,
            categoryId: income.id,
            transactionDate: new Date(date),
          })
        );
      }
    },
  });
  const { type, amount, transactionDate, comment, categoryId } = formik.values;

  const closeButton = () => {
    closeModal();
  };

  const closeBeckdrop = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className={css.backdrop} onClick={closeBeckdrop}>
      <div className={css.modal}>
        <button className={css.closeBtn} type="button" onClick={closeButton}>
          {svgClose}
        </button>
        <h2 className={css.header}>Add transaction</h2>
        <div className={css.transactionChoice}>
          <p className={!type ? css.income : css.text}>Income</p>
          <label className={css.switch}>
            <input
              type="checkbox"
              onChange={formik.handleChange}
              value={type}
              name="type"
            />
            <span className={`${css.slider} ${css.round}`}>
              <span className={css.choiceBtn}>
                {!type ? <BtnPlus /> : <BtnMinus />}
              </span>
            </span>
          </label>
          <p className={type ? css.expense : css.text}>Expense</p>
        </div>
        <form className={css.form} onSubmit={formik.handleSubmit}>
          {type && (
            <Select
              placeholder="Select a category"
              options={options}
              styles={customStyles}
              value={categoryId?.value}
              onChange={({ value }) =>
                formik.setFieldValue('categoryId', value)
              }
            />
          )}
          <div className={css.formBlock}>
            <input
              type="number"
              name="amount"
              placeholder="0.00"
              value={amount}
              onChange={formik.handleChange}
            />
            <Flatpickr
              options={{
                dateFormat: 'd.m.Y',
                disableMobile: 'true',
              }}
              type="date"
              name="transactionDate"
              id="date"
              selected={(transactionDate && new Date(transactionDate)) || null}
              onChange={val => {
                formik.setFieldValue('transactionDate', val[0]);
              }}
              placeholder="DD.MM.YYYY"
            />
          </div>
          <input
            type="text"
            name="comment"
            placeholder="Comment"
            value={comment}
            onChange={formik.handleChange}
          />
          <button className={css.btnAdd} type="submit">
            Add
          </button>
        </form>
        <button className={css.btn} type="button" onClick={closeButton}>
          Cancel
        </button>
      </div>
    </div>
  );
};
