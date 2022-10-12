import './App.css';
// import { Auth } from './Components/Auth/Auth';
import { Form, Button, Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { ITodo } from './types/data';
import { TodoItem } from './Components/TodoItem/TodoItem';
import { getStorage, setStorage } from './api/storage';
import { Auth } from './Components/Auth/Auth';


function App() {

  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('common');
  const [login, setLogin] = useState('');
  const [todoList, setTodoList] = useState<ITodo[]>([]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (todoList.some(item => item.title === inputValue)) {
      alert('Задача с таким именем уже есть');
      return;
    }
    setTodoList([...todoList, {
      id: Date.now(),
      title: inputValue,
      priority: selectValue,
      status: false,
      order: 0,
    }]);
    setInputValue('');
    setSelectValue('common');
  }

  const completeTodo = (id: number): void => {
    setTodoList(todoList.map(item => {
      if (item.id !== id) return item;
      return {
        ...item,
        status: !item.status,
      }
    }))
  };

  const removeTodo = (id: number): void => {
    const answer: boolean = window.confirm('Действительно удалить задачу?')
    if (!answer) return;
    setTodoList(todoList.filter(item => item.id !== id))
  }

  const editTodo = (id: number): void => {
    const newTask: string | null = prompt('Введите новую задачу');

    if (typeof newTask === 'string') {
      setTodoList(todoList.map(item => {
        if (item.id !== id) return item;
        return {
          ...item,
          title: newTask,
        }
      }))
    }    
  }

  useEffect(() => {
    console.log(getStorage(login));
    if (login) setTodoList(getStorage(login));
  }, [login]);

  useEffect(() => {
    setStorage(login, todoList)
  }, [todoList])
  

  return (
    <>
      {!login ? (
        <Auth setLogin={setLogin}/>
      ) : (
        <>
          <h1>Todo App</h1>
          <Form className='form' onSubmit={handleSubmit}>
          <Form.Control type='text' placeholder='Ввести задачу' value={inputValue} onChange={(e) => setInputValue(e.target.value)}></Form.Control>
          <Form.Select value={selectValue} onChange={(e) => setSelectValue(e.target.value)}>
            <option value="common">Обычная</option>
            <option value="important">Важная</option>
            <option value="immediate">Срочная</option>
          </Form.Select>
          <Button variant='primary' type='submit' disabled={!inputValue}>Сохранить</Button>
          <Button variant='warning' type='reset' disabled={!inputValue} onClick={() => {setInputValue(''); setSelectValue('')}}>Очистить</Button>
        </Form>
        <Table bordered>
          <thead>
            <tr>
              <th>№</th>
              <th>Задача</th>
              <th>Статус</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {todoList.map((item, index) => (
              <TodoItem key={item.id} {...item} order={index + 1} completeTodo={completeTodo} removeTodo={removeTodo} editTodo={editTodo}/>
            ))}
          </tbody>
        </Table>
        </>
      )}
      
      
    </>
  );
}

export default App;
