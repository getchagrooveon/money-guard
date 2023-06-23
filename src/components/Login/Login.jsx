import { Formik, Form, Field, ErrorMessage } from 'formik';
import css from './Login.module.css';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { Link } from 'react-router-dom';
import { loginUser } from 'redux/auth/operations';

const LoginForm = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = values => {
    dispatch(loginUser(values)).then(data => {
      console.log('data :>> ', data);
      if (data.meta.rejectedWithValue) {
        return alert('Login or password is incorrect');
      }
      //   dispatch(fetch());
    });
  };
  return (
    <div className={css.container}>
      <div className={css.screen}>
        <div className={css.screen__content}>
          <h1 className={css.title}>Money Guard</h1>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className={css.login}>
              <div className={css.login__field}>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  autoComplete="username"
                  className={css.login__input}
                />
              </div>
              <ErrorMessage
                name="email"
                component="div"
                className={css.error_message_email}
              />
              <div className={css.login__field}>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  className={css.login__input}
                />
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className={css.error_message_password}
              />

              <ErrorMessage
                name="password"
                component="div"
                className={css.error_message_password}
              />
              <div className={css.registration__link}>
                <Link to="/registration">Registration</Link>
              </div>
              <button type="submit" className={css.login__submit}>
                <span className={css.button__text}>Log in</span>
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
