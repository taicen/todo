import * as actionType from '../actions/actionTypes';

const initialState = {
  tasks: [],
};

const updateObject = (oldObject, updatedProps) => {
    return {
        ...oldObject,
        ...updatedProps
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionType.TASK_LOAD: return updateObject(state, { tasks: action.payload });
        case actionType.TASK_ADD: return state;
        default: return state;
    }
}

export default reducer;
