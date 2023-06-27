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
import { closeEditModal } from 'redux/global/slice';

const validationSchema = Yup.object({
  amount: Yup.number('must be a number').required(
    'Please enter amount of transaction'
  ),
});

export const EditTransactions = () => {
  const customStyles = {
    option: provided => {
      return {
        ...provided,
        borderBottom: '1px solid rgba(255, 255, 255, 0.4);',
        fontWeight: '400',
        color: 'rgba(255, 255, 255, 0.4)',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: '#FF868D',
          fontWeight: '400',
        },
        textAlign: 'left',
      };
    },
    control: styles => ({
      ...styles,
      border: 'none',
      boxShadow: 'none',
      backgroundColor: 'transparent',
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return {
        ...provided,
        opacity,
        transition,
        right: 5,
        color: 'rgba(255, 255, 255, 0.4)',
      };
    },
    menu: (provided, state) => {
      return {
        ...provided,
        backgroundColor: 'rgba(83, 61, 186, 1)',
        borderRadius: '8px',
      };
    },

    valueContainer: () => {
      return {
        padding: '0px',
        cursor: 'pointer',
        '&:hover': {
          cursor: 'text',
        },
      };
    },
    placeholder: () => {
      return {
        position: 'absolute',
        left: 10,
      };
    },
    indicatorSeparator: () => ({}),

    indicators: () => {
      return {
        cursor: 'pointer',
      };
    },
    dropdownIndicator: provided => {
      return {
        ...provided,
        color: 'rgba(255, 255, 255, 0.4)',
        '&:hover': {
          color: '#fbfbfb',
        },
      };
    },
    input: provided => {
      return {
        ...provided,
        margin: '0px',

        minWidth: '100%',
      };
    },
  };

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
      console.log(event);
      if (event.code === 'Escape') {
        dispatch(closeEditModal());
      }
    };
    window.addEventListener('keydown', onClose);
    return () => {
      window.removeEventListener('keydown', onClose);
    };
  }, [dispatch]);

  const handleToggle = () => {
    setToggleValue(prevToggleValue => !prevToggleValue);
  };

  return (
    <div className="container">
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
            <p className={css.slash}>/</p>
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
              styles={customStyles}
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
              className={css.rdtPicker}
              // className={`${css.inputLine} react-datetime-picker`}
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
