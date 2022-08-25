import { useContext, useEffect } from 'react';
import DisableComponentContext from '../../contexts/DisableComponent';
import './Register.css';
import Form from '../Form/Form';
import Input from '../Input/Input';

import useFormAndValidation from '../../hook/useFormAndValidation';

export default function Register({signup}) {
  const {values, setValues, handleChange, isValid, errors, resetForm} = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    signup(values.name, values.email, values.password)
  }

  const disableComponent = useContext(DisableComponentContext);

  useEffect(()=> {
    disableComponent({header: true, footer: true});

    return () => {
      disableComponent({header: false, footer: false})
    }
  }, []);
  
  return (
    <section className="register">
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
        />

        <Input 
          inputTitle="E-mail"
          name="email"
          type="email"
          placeholder="Введите E-mail"
          value={values.email}
          inputClass="input-border"
          required={true}
          autoComplete="off"
          handleChange={handleChange}            
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
          maxLength="12"
          autoComplete="off"
          handleChange={handleChange}            
        />
      </Form>   
    </section>
  )
}
