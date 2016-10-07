import { createAction } from 'redux-act';

export const ensure<%= componentNameCamelCase %> = createAction('Retrieve <%= componentNameCamelCase %>');
export const <%= componentNameCamelCase %>Retrieved = createAction('<%= componentNameCamelCase %> successfully retrieved.');
export const <%= componentNameCamelCase %>RetrievalError = createAction('Error getting <%= componentNameCamelCase %>.');

export function doEnsure<%= componentNameCamelCase %>(){
  return new Promise()
    .then(<%= componentNameCamelCase %>Retrieved)
    .catch(<%= componentNameCamelCase %>RetrievalError);
}
