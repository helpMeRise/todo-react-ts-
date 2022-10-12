import { useState } from 'react';
import { Button, Form } from 'react-bootstrap'
import { getStorage, setStorage } from '../../api/storage';
import style from './AuthForm.module.sass';

type Props = {
  setLogin: React.Dispatch<React.SetStateAction<string>>
}

export const AuthForm = (props: Props) => {
  const [value, setValue] = useState('');

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (value) {
      props.setLogin(value);
      getStorage(value);
    }
  }

  return (
    <Form className={style.form} onSubmit={handleSubmit}>
      <Form.Control type='text' value={value} onChange={(e) => setValue(e.target.value)}/>
      <Button type='submit' variant="primary" disabled={!value}>Войти</Button>
    </Form>
  )
}