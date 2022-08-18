import { useContext, useEffect } from 'react';
import DisableComponentContext from '../../contexts/DisableComponent';

import './Login.css';
import Form from '../Form/Form';
import Input from '../Input/Input';

export default function Login({signin}) {
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
        onSubmit={signin}
      >
        {({onChangeInput, inputsData}) => 
          <>
            <Input 
              inputTitle="E-mail"
              name="email"
              type="email"
              placeholder="Введите E-mail"
              value={inputsData.email || ""}
              inputClass="input-border"
              onChange={onChangeInput}
            />

            <Input 
              inputTitle="Пароль"
              name="password"
              type="password"
              placeholder="Введите пароль"
              inputClass="input-border"
              onChange={onChangeInput}
            />
          </>
        }
        
      </Form>
    </section>
  )
}
