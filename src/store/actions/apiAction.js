import * as actionType from './actionTypes';
import * as api from '../../utils/api';

export const fetchTask = (params) => {
    return async(dispatch) => {
        const data = await api.getTasks( params )
        await dispatch(api.fetchStatus(actionType.TASK_LOAD, data.message))
    }
}

export const addTask = (params) => {
    return async(dispatch) => {
        const data = await api.addTask( params )
        await dispatch(api.fetchStatus(actionType.TASK_ADD, data))
    }
}