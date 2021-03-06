import { todoConstants } from '../_constants';

const initialTodoState = {
  items:[]
}

export function todos(state = initialTodoState, action) {
  switch (action.type) {
    case todoConstants.CREATE_REQUEST:
        return { 
            ...state, creating: true 
        };
    case todoConstants.CREATE_SUCCESS:
        return {
          ...state,
          items: [...state.items, action.todo]
        };
    case todoConstants.CREATE_FAILURE:
        return {};
    case todoConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case todoConstants.GETALL_SUCCESS:
      return {
        items: action.todos
      };
    case todoConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    case todoConstants.DELETE_REQUEST:
      // add 'deleting:true' property to the TODO being deleted
      return {
        ...state,
        items: state.items.map(todo =>
          todo.id === action.id
            ? { ...todo, deleting: true }
            : todo
        )
      };
    case todoConstants.DELETE_SUCCESS:
      // remove deleted todo from state
      return {
        items: state.items.filter(todo => todo.id !== action.id)
      };
    case todoConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to the TODO 
      return {
        ...state,
        items: state.items.map(todo => {
          if (todo.id === action.id) {
            // make copy of todo without 'deleting:true' property
            const { deleting, ...todoCopy } = todo;
            // return copy of todo with 'deleteError:[error]' property
            return { ...todoCopy, deleteError: action.error };
          }

          return todo;
        })
      };
    default:
      return state
  }
}