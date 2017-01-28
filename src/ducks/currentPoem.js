import { formatPoem } from 'src/utils/formatPoem.js';

module.exports = (currentPoem = null, action) => {
  switch (action.type) {
    case 'POEM_RECEIVED':
      return formatPoem(action.poem);
    default:
      return currentPoem;
  }
};
