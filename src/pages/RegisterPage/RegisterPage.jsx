import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { registerThunk } from 'redux/authReducer';
import css from './RegisterPage.module.css';

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = data => {
    console.log(data);
    dispatch(registerThunk(data));
    reset();
  };

  return (
    <div className={css.registrContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={css.registrForm}>
        <label className={css.emailLabel}>
          <span className={css.emailInfo}>Email:</span>
          <input
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            placeholder="Enter email"
            className={css.emailInput}
            {...register('email', { required: true })}
            type="email"
          />
          {errors.email && <span>This field is required</span>}
        </label>
        <label className={css.nameLabel}>
          <span className={css.nameInfo}>Name:</span>
          <input
            placeholder="Enter name"
            className={css.nameInput}
            {...register('name', { required: true })}
            type="text"
          />
          {errors.name && <span>This field is required</span>}
        </label>
        <label className={css.passwordLabel}>
          <span className={css.passwordInfo}>Password:</span>
          <input
            placeholder="Enter password"
            className={css.passwordInput}
            {...register('password', { required: true, minLength: 7 })}
            type="password"
          />
          {errors.password && <span>This field is required</span>}
        </label>

        <button className={css.buttonSignup} type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
