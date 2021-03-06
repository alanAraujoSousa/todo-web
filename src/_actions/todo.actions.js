import { todoConstants } from '../_constants';
import { todoService } from '../_services';
import { alertActions } from './';

export const todoActions = {
    create,
    getAll,
    delete: _delete
};

function create(todo) {
    return dispatch => {

        dispatch(request(todo));

        todoService.create(todo)
            .then(
                todo => { 
                    dispatch(success(todo));
                    dispatch(alertActions.success('The TODO was created successfuly!'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(todo) { return { type: todoConstants.CREATE_REQUEST, todo } }
    function success(todo) { return { type: todoConstants.CREATE_SUCCESS, todo } }
    function failure(error) { return { type: todoConstants.CREATE_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        todoService.getAll()
            .then(
                todos => dispatch(success(todos)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: todoConstants.GETALL_REQUEST } }
    function success(todos) { return { type: todoConstants.GETALL_SUCCESS, todos } }
    function failure(error) { return { type: todoConstants.GETALL_FAILURE, error } }
}

function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        todoService.delete(id)
            .then(
                todo => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: todoConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: todoConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: todoConstants.DELETE_FAILURE, id, error } }
}