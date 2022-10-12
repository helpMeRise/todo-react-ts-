import { Button } from 'react-bootstrap';
import { ITodo } from '../../types/data';

interface ITodoItem extends ITodo {
  completeTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  editTodo: (id: number) => void;
};

export const TodoItem: React.FC<ITodoItem> = (props) => {
  const { id, title, status, priority, order, completeTodo, removeTodo, editTodo } = props;

  return (
    <tr className={status ? 'table-success' : (priority === 'common' ? 'table-light' : priority === 'important' ? 'table-warning' : 'table-danger')}>
      <td>{order}</td>
      <td className={status ? 'text-decoration-line-through' : ''}>{title}</td>
      <td>{status ? (<>Выполнена</>) : (<>В процессе</>)}</td>
      <td style={{
        display: 'flex',
        gap: 10,
      }}>
        <Button variant='danger' onClick={() => removeTodo(id)}>Удалить</Button>
        <Button variant='success' onClick={() => completeTodo(id)}>{status ? 'Отменить' : 'Завершить'}</Button>
        <Button variant='warning' onClick={() => editTodo(id)}>Редактировать</Button>
      </td>
    </tr>
  )
}