import axios from 'axios';

import { SUBMIT_FORM, submitFormSuccess } from 'src/actions/messages';

const messagesMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case SUBMIT_FORM: {
      const {
        messages: {
          email, message, firstname, lastname,
        },
      } = store.getState();

      const submitMessages = async () => {
        try {
          await axios.post('/api/contact', {
            lastname,
            firstname,
            email,
            message,
          });

          store.dispatch(submitFormSuccess());
        }
        catch (error) {
          console.log(error);
        }
      };

      submitMessages();
      next(action);
      break;
    }
    default:
      next(action);
  }
};

export default messagesMiddleware;
