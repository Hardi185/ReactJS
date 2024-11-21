import {createSlice, nanoid } from '@reduxjs/toolkit';

//have to pass intial value to todo
const initialState = {
    todos: [{id: 1, text: "Hello world"}]
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(), 
                text: action.payload
            }
            state.todos.push(todo)
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload )
        },
    }
})

//exporting actions, here: addTodo and  removeTodo
export const {addTodo, removeTodo} = todoSlice.actions

//exporting reducer
export default todoSlice.reducer