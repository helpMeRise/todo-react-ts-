import { AuthForm } from '../AuthFrom/AuthForm';
import style from './Auth.module.sass';

type Props = {
  setLogin: React.Dispatch<React.SetStateAction<string>>
}

export const Auth = (props: Props) => {
  const { setLogin } = props;
  return (
    <div className={style.wrap}>
      <h2 className={style.title}>Введите ваше имя</h2>
      <AuthForm setLogin={setLogin}/>
    </div>
  )
}