// export const getStorage = (key: string) => {
//   if (localStorage.getItem(key) === null) {
//     return [];
//   } else {
//     return JSON.parse(localStorage.getItem(key));
//   }
// };

import { ITodo } from "../types/data";

export const getStorage = (key: string): [] => {
  if (localStorage.getItem(key) !== null) return JSON.parse(localStorage.getItem(key) || '');
  return [];
}

export const setStorage = (login: string, todoList: ITodo[]): void => {
  localStorage.setItem(login, JSON.stringify(todoList));
}