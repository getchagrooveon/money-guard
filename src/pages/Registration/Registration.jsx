import css from './Registration.module.css';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Link, NavLink } from 'react-router-dom';
import { registerUser } from 'redux/auth/operations';
import { LogoSVG } from 'components/Icons/LogoSVG';
import { IconUser } from 'components/Icons/IconUser';
import { IconLock } from 'components/Icons/IconLock';
import { IconEmail } from 'components/Icons/IconEmail';
import PasswordStrengthIndicator from 'components/PasswordStrengthIndicator/PasswordStrengthIndicator';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const Registration = () => {
  const dispatch = useDispatch();

  const onSubmit = values => {
    const { confirmPassword, ...payload } = values;
    dispatch(registerUser(payload));
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
    <section className={css.wrapper}>
      <ToastContainer />
      <div className={css.container}>
        <div className={css.screen}>
          <div className={css.screen__content}>
            <NavLink to="/" className={css.logo}>
              <LogoSVG className={css.logoSvg} />
            </NavLink>
            <h1 className={css.title}>Money Guard</h1>
            <form className={css.login} onSubmit={formik.handleSubmit}>
              <div className={css.login__field}>
                <IconEmail className={css.icon_email} />
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  autoComplete="username"
                  className={css.login__input}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </div>
              {formik.touched.email && formik.errors.email ? (
                <div className={css.error_message}>{formik.errors.email}</div>
              ) : null}
              <div className={css.login__field}>
                <span className={css.user_icon__field}>
                  <IconLock className={css.icon_lock} />
                </span>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  autoComplete="new-password"
                  className={css.login__input}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className={css.error_message}>
                  {formik.errors.password}
                </div>
              ) : null}
              <div className={css.login__field}>
                <span className={css.user_icon__field}>
                  <IconLock className={css.icon_lock} />
                </span>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  autoComplete="new-password"
                  className={css.login__input}
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                />
              </div>
              <div className={css.password_srtength}>
                <PasswordStrengthIndicator password={formik.values.password} />
              </div>
              <div className={css.strong_passworg}></div>
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className={css.error_message}>
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
              <div>
                <div className={css.login__field}>
                  <span className={css.user_icon__field}>
                    <IconUser className={css.icon_user} />
                  </span>
                  <input
                    type="text"
                    name="username"
                    placeholder="First name"
                    autoComplete="username"
                    className={css.login__input}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                  />
                </div>
                {formik.touched.username && formik.errors.username ? (
                  <div className={css.error_wrapper}>
                    <div className={css.error_message}>
                      {formik.errors.username}
                    </div>
                  </div>
                ) : null}
              </div>
              <button type="submit" className={css.login__submit}>
                <span className={css.button__text}>Register</span>
              </button>
              <Link to="/login">
                <div className={css.login__link}>Log in</div>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;
