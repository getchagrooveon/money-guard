import React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Link, NavLink } from 'react-router-dom';
import { loginUser } from 'redux/auth/operations';
import { LogoSVG } from 'components/Icons/LogoSVG';
import css from './Login.module.css';
import { IconEmail } from 'components/Icons/IconEmail';
import { IconLock } from 'components/Icons/IconLock';

const LoginForm = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid e-mail').required('E-mail is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: values => {
      dispatch(loginUser(values)).then(data => {
        console.log('data :>> ', data);
        // if (data.meta.rejectedWithValue) {
        //   return alert('Login or password is incorrect');
        // }
      });
    },
  });

  return (
    <section className={css.wrapper}>
      <div className={css.container}>
        <div className={css.screen}>
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
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <div className={css.error_message}>{formik.errors.email}</div>
            ) : null}
            <div className={css.login__field}>
              <IconLock className={css.icon_lock} />
              <input
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="current-password"
                className={css.login__input}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className={css.error_message}>{formik.errors.password}</div>
            ) : null}
            <button type="submit" className={css.login__submit}>
              <span className={css.button__text}>Log in</span>
            </button>
            <Link to="/registration">
              <div className={css.registration__link}>Register</div>
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
