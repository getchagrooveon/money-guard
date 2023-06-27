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
// import 'flatpickr/dist/themes/dark.css';

export const AddTransaction = ({ closeModal }) => {
  /*================Selector style=================*/
  const customStyles = {
    option: provided => {
      return {
        ...provided,
        background: 'transparent',
        border: 'none',
        borderBottom: '1px solid rgba(255, 255, 255, 0.4)',
        outline: 'none',

        // padding: '8px 20px',
        color: '#FBFBFB',
        fontSize: '18px',
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
      borderBottom: '1px solid rgba(255, 255, 255, 0.4)',
      borderRadius: 0,
      boxShadow: 'none',
      backgroundColor: 'transparent',
    }),
    /*=== текст в інпуті, обраний з випадаючого списку ===*/
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return {
        ...provided,
        opacity,
        transition,
        right: 5,
        color: '#FBFBFB',
        padding: '8px 20px',
        // color: 'red',
        // backgroundColor: 'green',
      };
    },
    /*=== випадаячий список ===*/
    menu: (provided, state) => {
      return {
        ...provided,
        backgroundColor: 'rgba(83, 61, 186, 1)',
        borderRadius: '8px',
        // color: 'red',
        // backgroundColor: 'green',
      };
    },
    menuList: base => ({
      ...base,
      '::-webkit-scrollbar': {
        display: 'none',

        // scroll: 'smooth',
      },
    }),

    // valueContainer: () => {
    //   return {
    //     padding: '8px 20px',
    //     cursor: 'pointer',
    //     // color: 'red',
    //     // backgroundColor: 'green',
    //     '&:hover': {
    //       cursor: 'text',
    //     },
    //   };
    // },
    /*=== текст плейсхолдеру ===*/
    placeholder: () => {
      return {
        // backgroundColor: 'red',
        color: 'rgba(255, 255, 255, 0.5)',
        position: 'absolute',
        left: 10,
        padding: '8px 20px',
        // height: '15px',
      };
    },
    indicatorSeparator: () => ({}),

    indicators: () => {
      return {
        cursor: 'pointer',
      };
    },
    /*=== стрілочка для відкриття випадаючого списку===*/
    dropdownIndicator: provided => {
      return {
        ...provided,
        color: 'rgba(255, 255, 255, 0.4)',
        '&:hover': {
          color: '#fbfbfb',
        },
      };
    },
    /*=== текст котрий вводять вручну в інпут ===*/
    input: provided => {
      return {
        ...provided,
        margin: '0px',
        color: '#FBFBFB',
        // backgroundColor: 'red',
        padding: '8px 20px',

        minWidth: '100%',
      };
    },
  };
  /*===============End Selector style================*/

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
      if (type) {
        dispatch(
          addThunk({ ...value, type: 'EXPENSE', amount: 0 - value.amount })
        );
      } else {
        dispatch(
          addThunk({ ...value, type: income.type, categoryId: income.id })
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
          {/* <label className={css.switch}>
            <input type="checkbox" onChange={handleChecked} />
            <span className={`${css.slider} ${css.round}`}></span>
          </label> */}
          <p className={type ? css.expense : css.text}>Expense</p>
        </div>
        <form className={css.form} onSubmit={formik.handleSubmit}>
          {/* {isChecked ? <Income /> : <Expense />} */}
          {type && (
            <Select
              placeholder="Select a category"
              // name="categoryId"
              options={options}
              styles={customStyles}
              value={categoryId?.value}
              onChange={({ value }) =>
                formik.setFieldValue('categoryId', value)
              }

              // {categori &&
              //   categori.map(el => (
              //     <option key={el.id} value={el.id}>
              //       {el.name}
              //     </option>
              //   ))}
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
              // defaultValue="07.10.2021"
              options={{
                dateFormat: 'd.m.Y',
                disableMobile: 'true',
              }}
              type="date"
              name="transactionDate"
              id="date"
              // options={optionsFlatpickr}
              // value={transactionDate}
              // onChange={e => {
              //   console.log('e', e);
              //   formik.handleChange(e[0]);
              // }}
              selected={(transactionDate && new Date(transactionDate)) || null}
              onChange={val => {
                formik.setFieldValue('transactionDate', val[0]);
              }}
              // placeholder={new Date()}
              placeholder="DD.MM.YYYY"
            />
          </div>
          <input
            type="text"
            name="comment"
            placeholder="Comment"
            value={comment}
            onChange={formik.handleChange}
            // className={css.inputComment}
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
