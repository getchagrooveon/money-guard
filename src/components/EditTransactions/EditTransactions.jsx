import React, { useState, useEffect } from 'react';
import css from './EditTransactions.module.css';
// import Datetime from 'react-datetime';
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

const validationSchema = Yup.object({
  amount: Yup.number('must be a number').required(
    'Please enter amount of transaction'
  ),
});

export const EditTransactions = () => {
  // const customStyles = {
  //   option: provided => {
  //     return {
  //       ...provided,
  //       borderBottom: '1px solid rgba(255, 255, 255, 0.4);',
  //       fontWeight: '400',
  //       color: 'rgba(251, 251, 251, 1)',
  //       backgroundColor: 'transparent',
  //       cursor: 'pointer',
  //       '&:hover': {
  //         backgroundColor: 'rgba(255, 255, 255, 0.1)',
  //         color: '#FF868D',
  //         fontWeight: '400',
  //       },
  //       textAlign: 'left',
  //     };
  //   },
  //   control: styles => ({
  //     ...styles,
  //     paddingBottom: '0px',
  //     border: 'none',
  //     boxShadow: 'none',
  //     backgroundColor: 'transparent',
  //   }),
  //   singleValue: (provided, state) => {
  //     const opacity = state.isDisabled ? 0.5 : 1;
  //     const transition = 'opacity 300ms';

  //     return {
  //       ...provided,
  //       opacity,
  //       transition,
  //       right: 5,
  //       fontWeigth: '400',
  //       color: 'rgba(251, 251, 251, 1)',
  //     };
  //   },
  //   menu: (provided, state) => {
  //     return {
  //       ...provided,
  //       backgroundColor: 'rgba(83, 61, 186, 1)',
  //       borderRadius: '8px',
  //       height: '320px',
  //     };
  //   },
  //   menuList: base => ({
  //     ...base,
  //     overflow: 'auto',
  //     '::-webkit-scrollbar': {
  //       display: 'none',
  //       scrollBehavior: 'smooth',
  //     },
  //   }),

  //   valueContainer: () => {
  //     return {
  //       height: '10px',
  //       padding: '0px',
  //       cursor: 'pointer',
  //       '&:hover': {
  //         cursor: 'text',
  //       },
  //     };
  //   },
  //   placeholder: () => {
  //     return {
  //       position: 'absolute',
  //       left: 10,
  //     };
  //   },
  //   indicatorSeparator: () => ({}),

  //   indicators: () => {
  //     return {
  //       cursor: 'pointer',
  //     };
  //   },
  //   dropdownIndicator: provided => {
  //     return {
  //       ...provided,
  //       color: 'rgba(255, 255, 255, 0.4)',
  //       '&:hover': {
  //         color: '#fbfbfb',
  //       },
  //     };
  //   },
  //   // input: provided => {
  //   //   return {
  //   //     ...provided,
  //   //     margin: '0px',

  //   //     minWidth: '100%',
  //   //   };
  //   // },
  // };

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
  // const [toggleValue, setToggleValue] = useState(type === 'EXPENSE');

  const [toggleValue, setToggleValue] = useState(type === 'INCOME');
  const [showSelect, setShowSelect] = useState(false);
  const formik = useFormik({
    initialValues: {
      amount,
      transactionDate,
      comment,
      categoryId,
      type: toggleValue ? 'INCOME' : 'EXPENSE',
    },
    validationSchema,
    onSubmit: values => {
      const transactionDate = values.transactionDate.format('YYYY-MM-DD');
      const updatedValues = {
        ...values,
        type: toggleValue ? 'INCOME' : 'EXPENSE',
        id,
        transactionDate,
      };

      if (!toggleValue) {
        updatedValues.type = income.type;
        updatedValues.categoryId = income.id;
        updatedValues.amount = 0 - updatedValues.amount;
      }

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

  const handleToggle = value => {
    setToggleValue(value);
    setShowSelect(value);
  };

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

  return (
    // <div className={css.container}>
    <Backdrop onClick={closeBeckdrop}>
      <div className={css.modal}>
        <button onClick={closeBtn} className={css.closeBtn} type="button">
          {svgClose}
        </button>

        <h1 className={css.title}>Edit transactions</h1>
        <div className={css.toggleContainer}>
          <button
            type="button"
            className={`${css.toggle} ${!toggleValue ? css.orangeToggle : ''}`}
            onClick={() => handleToggle(false)}
          >
            Income
          </button>
          <p className={css.slash}>/</p>
          <button
            type="button"
            className={`${css.toggle} ${toggleValue ? css.pinkToggle : ''}`}
            onClick={() => handleToggle(true)}
          >
            Expense
          </button>
        </div>

        <form className={css.form}>
          {toggleValue && showSelect && (
            <Select
              styles={customStyles}
              options={options}
              value={formik.values.categoryId.value}
              onChange={({ value }) =>
                formik.setFieldValue('categoryId', value)
              }
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
              // defaultValue="07.10.2021"
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

            {/* <Datetime
                inputProps={{ name: 'transactionDate' }}
                className={css.rdtPicker}
                value={formik.values.transactionDate}
                dateFormat="YYYY-MM-DD"
                onChange={value =>
                  formik.setFieldValue('transactionDate', value)
                }
              /> */}
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
      {/* </div> */}
    </Backdrop>
  );
};
export default EditTransactions;
