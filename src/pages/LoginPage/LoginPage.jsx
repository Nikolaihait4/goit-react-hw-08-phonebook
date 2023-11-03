import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginThunk } from 'redux/authReducer';
import css from './LoginPage.module.css';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = data => {
    dispatch(loginThunk(data));
    reset();
  };

  return (
    <div className={css.formContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={css.formLogin}>
        <label className={css.emailLabel}>
          <span className={css.emaiInfo}>Email:</span>
          <input
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            placeholder="Enter email"
            {...register('email', { required: true })}
            type="email"
            className={css.emaiInput}
          />
          {errors.email && <span>This field is required</span>}
        </label>
        <label className={css.passwordLabel}>
          <span className={css.passworInfo}>Password:</span>
          <input
            placeholder="Enter password"
            className={css.passworInput}
            {...register('password', { required: true, minLength: 7 })}
            type="password"
          />
          {errors.password && <span>This field is required</span>}
        </label>

        <button type="submit" className={css.singinButton}>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
