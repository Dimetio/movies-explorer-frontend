import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DisableComponentContext from '../../contexts/DisableComponent';
import useFormAndValidation from '../../hook/useFormAndValidation';
import Toasty from '../Toasty/Toasty';

import './Login.css';
import Form from '../Form/Form';
import Input from '../Input/Input';

export default function Login({
  signin,
  isLoggedIn,
  toastyText,
  isSuccess,
  showToasty
}) {
  const navigate = useNavigate();
  const { values, handleChange, isValid, errors } = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    signin(values.email, values.password);
  }

  const disableComponent = useContext(DisableComponentContext);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }

    disableComponent({ header: true, footer: true });

    return () => {
      disableComponent({ header: false, footer: false })
    }
  }, [disableComponent, isLoggedIn, navigate]);

  return (
    <section className="register">
      <Toasty
        showToasty={showToasty}
        toastyText={toastyText}
        isSuccess={isSuccess}
      />
      <Form
        title="Рады видеть!"
        buttonText="Войти"
        question="Ещё не Зарегистрированы?"
        linkText="Регистрироваться"
        url="/signup"
        handleSubmit={handleSubmit}
        isValid={isValid}
      >
        <Input
          inputTitle="E-mail"
          name="email"
          type="email"
          placeholder="Введите E-mail"
          value={values.email}
          inputClass="input-border"
          handleChange={handleChange}
          required={true}
          errors={errors.email}
        />

        <Input
          inputTitle="Пароль"
          name="password"
          type="password"
          placeholder="Введите пароль"
          inputClass="input-border"
          value={values.password}
          handleChange={handleChange}
          required={true}
          minLength="4"
          errors={errors.password}
        />

      </Form>
    </section>
  )
}
