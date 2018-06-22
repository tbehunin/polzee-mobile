export const updateQuestion = question => ({ type: 'UPDATE_QUESTION', payload: question });
export const updateOption = (optionText, index) => ({ type: 'UPDATE_OPTION', payload: { optionText, index } });
