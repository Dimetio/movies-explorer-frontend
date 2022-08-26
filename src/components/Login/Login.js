import { useContext, useEffect } from 'react';
import DisableComponentContext from '../../contexts/DisableComponent';
import useFormAndValidation from '../../hook/useFormAndValidation';

import './Login.css';
import Form from '../Form/Form';
import Input from '../Input/Input';

export default function Login({signin}) {
  const {values, setValues, handleChange, isValid, errors, resetForm} = useFormAndValidation();
  
  function handleSubmit(e) {
    e.preventDefault();
    signin(values.email, values.password)
    console.log(values)
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
        />
        
      </Form>
    </section>
  )
}
