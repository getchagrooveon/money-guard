import { getRandomHexColor } from 'utils/getRandomColor';

export const months = [
  { label: 'January', value: 1 },
  { label: 'February', value: 2 },
  { label: 'March', value: 3 },
  { label: 'April', value: 4 },
  { label: 'May', value: 5 },
  { label: 'June', value: 6 },
  { label: 'July', value: 7 },
  { label: 'August', value: 8 },
  { label: 'September', value: 9 },
  { label: 'October', value: 10 },
  { label: 'November', value: 11 },
  { label: 'December', value: 12 },
];

export const years = [
  { label: '2018', value: 2018 },
  { label: '2019', value: 2019 },
  { label: '2020', value: 2020 },
  { label: '2021', value: 2021 },
  { label: '2022', value: 2022 },
  { label: '2023', value: 2023 },
];
const date = new Date();

export const current = {
  year: date.getFullYear(),
  month: date.getMonth() + 1,
};

/*================Selector style=================*/
export const customStyles = {
  option: provided => {
    return {
      ...provided,
      background: 'transparent',
      outline: 'none',
      color: '#FBFBFB',
      fontSize: '18px',
      fontWeight: '400',
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
    border: '1px solid rgba(255, 255, 255, 0.4)',
    borderRadius: 8,
    boxShadow: 'none',
    backgroundColor: 'transparent',
    height: '50px',
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
    };
  },
  /*=== випадаячий список ===*/
  menu: (provided, state) => {
    return {
      ...provided,
      background:
        'linear-gradient(0deg,rgba(83, 61, 186, 0.7) 0%,rgba(80, 48, 154, 0.9) 36%,rgba(106, 70, 165, 0.9) 61%,rgba(133, 93, 175, 0.9) 100%)',
      borderRadius: '8px',
      blur: '5px',
    };
  },
  menuList: base => ({
    ...base,
    '::-webkit-scrollbar': {
      display: 'none',
    },
  }),
  /*=== текст плейсхолдеру ===*/
  placeholder: () => {
    return {
      color: 'rgba(255, 255, 255, 0.5)',
      position: 'absolute',
      left: 10,
      padding: '8px 20px',
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
      padding: '8px 20px',
      minWidth: '100%',
    };
  },
};

const defaultColors = [
  '#FED057',
  '#FFD8D0',
  '#FD9498',
  '#C5BAFF',
  '#6E78E8',
  '#4A56E2',
  '#81E1FF',
  '#24CCA7',
  '#00AD84',
];

export const colors = [...Array(10)].map(
  (_, i) => defaultColors[i] || getRandomHexColor()
);
