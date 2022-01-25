import reducer, { initialState } from 'src/reducers/user';
import {
  CHANGE_LOGIN_FIELD, SUBMIT_LOGIN, SAVE_USER, CREATE_MAIL_ERROR, CREATE_PASSWORD_ERROR,
} from 'src/actions/user';

describe('reducer for users', () => {
  describe('structure', () => {
    // we check that reducer is a function
    it('should be a function', () => {
      expect(typeof reducer).toBe('function');
    });
    // we check that reducer return an object
    it('should return an object', () => {
      expect(typeof reducer()).toBe('object');
    });
  });
  describe('execution', () => {
    // we check that reducer return initialState when
    // called without arguments
    it('should return initialState when called without arguments', () => {
      expect(reducer()).toEqual(initialState);
    });
    // we check that reducer return a new state when
    // called with a CHANGE_LOGIN_FIELD action on email field
    it('should handle correctly CHANGE_LOGIN_FIELD action on email field', () => {
      const action = {
        type: CHANGE_LOGIN_FIELD,
        name: 'email',
        value: 'test',
      };
      const expectedState = {
        ...initialState,
        email: 'test',
      };
      expect(reducer(initialState, action)).toEqual(expectedState);
    });
    // we check that reducer return a new state when
    // called with a CHANGE_LOGIN_FIELD action on password field
    it('should handle correctly CHANGE_LOGIN_FIELD action on password field', () => {
      const action = {
        type: CHANGE_LOGIN_FIELD,
        name: 'password',
        value: 'test',
      };
      const expectedState = {
        ...initialState,
        password: 'test',
      };
      expect(reducer(initialState, action)).toEqual(expectedState);
    });
    // we check that reducer return the same state when
    // called with a SUBMIT_LOGIN action because this action
    // is not handled by reducer but by middleware to do POST request
    it('should handle correctly SUBMIT_LOGIN action', () => {
      const action = {
        type: SUBMIT_LOGIN,
      };
      expect(reducer(initialState, action)).toEqual(initialState);
    });
    // we check that reducer return a new state when
    // called with a SAVE_USER action
    it('should handle correctly SAVE_USER action', () => {
      const action = {
        type: SAVE_USER,
        id: 1,
        role: 'admin',
        accessToken: 'token',
      };
      const expectedState = {
        ...initialState,
        logged: true,
        id: 1,
        role: 'admin',
        accessToken: 'token',
        logout: false,
        errors: {
          ...initialState.errors,
          mail: false,
          password: false,
        },
      };
      expect(reducer(initialState, action)).toEqual(expectedState);
    });
    // we check that reducer return a new state when
    // called with a CREATE_MAIL_ERROR action
    it('should handle correctly CREATE_MAIL_ERROR action', () => {
      const action = {
        type: CREATE_MAIL_ERROR,
      };
      const expectedState = {
        ...initialState,
        errors: {
          ...initialState.errors,
          mail: true,
        },
      };
      expect(reducer(initialState, action)).toEqual(expectedState);
    });
    // we check that reducer return a new state when
    // called with a CREATE_PASSWORD_ERROR action
    it('should handle correctly CREATE_PASSWORD_ERROR action', () => {
      const action = {
        type: CREATE_PASSWORD_ERROR,
      };
      const expectedState = {
        ...initialState,
        errors: {
          ...initialState.errors,
          password: true,
        },
      };
      expect(reducer(initialState, action)).toEqual(expectedState);
    });
  });
});
