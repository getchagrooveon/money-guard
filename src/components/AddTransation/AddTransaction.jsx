import { useEffect } from 'react';
import { useFormik } from 'formik';
import Select from 'react-select';
import css from './AddTransaction.module.css';
import { BtnPlus } from './BtnPlus';
import { BtnMinus } from './BtnMinus';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategories } from 'redux/transactions/selectors';
import { addThunk } from 'redux/transactions/operation';

export const AddTransaction = ({ closeModal }) => {
  // const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();

  const categori = useSelector(selectCategories);
  const income = categori.find(el => el.type === 'INCOME');

  const filteredCategori = categori.filter(el => el.type !== 'INCOME');
  const options = filteredCategori.map(el => ({
    value: el.id,
    label: el.name,
  }));

  // {
  //   categori &&
  //     categori.map(el => (
  //       <option key={el.id} value={el.id}>
  //         {el.name}
  //       </option>
  //     ));
  // }

  const stylePlus = { color: 'yellow' };
  const styleMinus = { color: 'red' };

  useEffect(() => {
    const closeEsc = e => {
      if (e.key === 'Escape') {
        closeModal(false);
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
    closeModal(false);
  };

  const closeBeckdrop = e => {
    if (e.target === e.currentTarget) {
      closeModal(false);
    }
  };

  // const handleChecked = e => {
  //   const { checked } = e.target;
  //   setIsChecked(checked);
  // };

  return (
    <div className={css.backdrop} onClick={closeBeckdrop}>
      <div className={css.modal}>
        <h2>Add transaction</h2>
        {/* <div>{<BtnPlus />}</div> */}
        {/* <div>{<BtnMinus />}</div> */}
        <div className={css.transactionChoice}>
          <p style={!type ? stylePlus : styleMinus}>Income</p>
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
          <p style={type ? styleMinus : stylePlus}>Expense</p>
        </div>
        <form className={css.form} onSubmit={formik.handleSubmit}>
          {/* {isChecked ? <Income /> : <Expense />} */}
          {type && (
            <Select
              placeholder="Select a category"
              // name="categoryId"
              options={options}
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
            <input
              type="date"
              name="transactionDate"
              value={transactionDate}
              onChange={formik.handleChange}
            />
          </div>
          <input
            type="text"
            name="comment"
            placeholder="Comment"
            value={comment}
            onChange={formik.handleChange}
          />
          <button type="submit">Add</button>
        </form>
        <button type="button" onClick={closeButton}>
          Cancel
        </button>
      </div>
    </div>
  );
};

// {
//   "transactionDate": "string",
//   "type": "INCOME",
//   "categoryId": "string",
//   "comment": "string",
//   "amount": 0
// }
