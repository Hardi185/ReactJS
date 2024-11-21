import {createContext, useContext} from "react"

//defined context
export const TodoContext = createContext({
    todos: [
        {
            id: 1,
            todo: " Todo msg",
            completed: false,
        }
    ],
    addTodo: (todo) => {},
    updateTodo: (id, todo) => {},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {}
})

//function to use context
export const useTodo = () => {
    return useContext(TodoContext)
}

//provider of context
export const TodoProvider = TodoContext.Provider