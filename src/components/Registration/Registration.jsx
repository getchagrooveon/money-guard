import css from './Registration.module.css';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { registerUser } from 'components/redux/Auth/operations';
import { Link } from 'react-router-dom';

export const Registration = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    username: Yup.string().required('Please enter your name'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Please enter your email'),
    password: Yup.string()
      .required('Please enter your password')
      .min(6, 'Password must be at least 6 characters')
      .max(12, 'Password should be no longer than 12 characters'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password'),
  });

  const onSubmit = values => {
    const { confirmPassword, ...payload } = values;
    dispatch(registerUser(payload)).then(res => {
      if (res.payload === 409) {
        return alert('User with such email already exists');
      }
      if (res.payload === 400) {
        return alert('Validation error');
      }
    });
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit,
  });

  return (
    <div className={css.container}>
      <div className={css.screen}>
        <div className={css.screen__content}>
          <h1 className={css.title}>Money</h1>
          <form className={css.login} onSubmit={formik.handleSubmit}>
            <div className={css.login__field}>
              <input
                type="text"
                name="username"
                placeholder="User name"
                autoComplete="username"
                className={css.login__input}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
            </div>
            {formik.touched.username && formik.errors.username ? (
              <div className={css.error_message_name}>
                {formik.errors.username}
              </div>
            ) : null}
            <div className={css.login__field}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                autoComplete="username"
                className={css.login__input}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <div className={css.error_message_email}>
                {formik.errors.email}
              </div>
            ) : null}
            <div className={css.login__field}>
              <input
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="new-password"
                className={css.login__input}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className={css.error_message_password}>
                {formik.errors.password}
              </div>
            ) : null}
            <div className={css.login__field}>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                autoComplete="new-password"
                className={css.login__input}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
            </div>
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className={css.error_message_password}>
                {formik.errors.confirmPassword}
              </div>
            ) : null}
            <button type="submit" className={css.login__submit}>
              <span className={css.button__text}>Sign Up Now</span>
            </button>
            <div className={css.login__link}>
              <Link to="/login">Log in</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
