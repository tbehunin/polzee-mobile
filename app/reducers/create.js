const initialState = {
    question: '',
    options: [],
};

const create = (state = initialState, action) => {
    switch (action.type) {
    case 'UPDATE_QUESTION': {
        const options = state.options.concat();
        if (options.length === 0) {
            options.push({ optionId: options.length, optionText: '' });
        }
        return { question: action.payload, options };
    }
    case 'UPDATE_OPTION': {
        const options = state.options.concat();
        options.splice(action.payload.index, 1, { optionId: action.payload.index, optionText: action.payload.optionText });
        if (action.payload.index === options.length - 1) {
            options.push({ optionId: options.length, optionText: '' });
        }
        return { ...state, options };
    }
    default:
        return state;
    }
};
export default create;
