export const CHANGE_FIELD = 'CHANGE_FIELD';
export const SUBMIT_FORM = 'SUBMIT_FORM';
export const SUBMIT_FORM_SUCCESS = 'SUBMIT_FORM_SUCCESS';

export const changeField = (value, name) => ({
  type: CHANGE_FIELD,
  value,
  name,
});

export const submitForm = () => ({
  type: SUBMIT_FORM,
});

export const submitFormSuccess = () => ({
  type: SUBMIT_FORM_SUCCESS,
});
