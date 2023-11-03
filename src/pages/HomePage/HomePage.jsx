import React from 'react';
import css from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={css.homeContainer}>
      <h1 className={css.homeTitle}>Welcome to PhoneBook</h1>
      <p className={css.homeInfo}>
        This App keeps track of your contacts with ease! It allows you to add,
        delete and edit contacts quickly and easily. Stay in touch with the
        people you care about!
      </p>
      <p className={css.homeAction}>
        Sign up or Log In to discover this service!
      </p>
      <img
        src="https://cdn.pixabay.com/photo/2022/01/16/19/01/candle-6942931_640.jpg"
        alt="Warm Candle"
        className={css.candleImg}
      />
    </div>
  );
};

export default HomePage;
