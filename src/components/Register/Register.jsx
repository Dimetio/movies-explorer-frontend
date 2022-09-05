import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DisableComponentContext from '../../contexts/DisableComponent';
import './Register.css';
import Form from '../Form/Form';
import Input from '../Input/Input';
import Toasty from '../Toasty/Toasty';

import useFormAndValidation from '../../hook/useFormAndValidation';

export default function Register({
  signup,
  isLoggedIn,
  toastyText,
  isSuccess,
  showToasty
}) {
  const navigate = useNavigate();
  const { values, handleChange, isValid, errors } = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    signup(values.name, values.email, values.password)
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
        title="Добро пожаловать!"
        buttonText="Зарегистрироваться"
        question="Уже Зарегистрированы?"
        linkText="Войти"
        url="/signin"
        handleSubmit={handleSubmit}
        isValid={isValid}
      >
        <Input
          inputTitle="Имя"
          name="name"
          type="text"
          placeholder="Введите имя"
          value={values.name}
          inputClass="input-border"
          required={true}
          autoComplete="off"
          handleChange={handleChange}
          minLength="2"
          maxLength="30"
          errors={errors.name}
        />

        <Input
          inputTitle="E-mail"
          name="email"
          type="text"
          placeholder="Введите E-mail"
          value={values.email}
          inputClass="input-border"
          required={true}
          autoComplete="off"
          handleChange={handleChange}
          errors={errors.email}
          pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$"
        />

        <Input
          inputTitle="Пароль"
          name="password"
          type="password"
          placeholder="Введите пароль"
          value={values.password}
          inputClass="input-border"
          required={true}
          minLength="4"
          autoComplete="off"
          handleChange={handleChange}
          errors={errors.password}
        />
      </Form>
    </section>
  )
}
