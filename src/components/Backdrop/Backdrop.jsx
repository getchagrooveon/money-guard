import css from './Backdrop.module.css';

export const Backdrop = ({ onClick, children }) => {
  console.log('children', children);
  return (
    <div onClick={onClick} className={css.backdrop}>
      {children}
    </div>
  );
};
