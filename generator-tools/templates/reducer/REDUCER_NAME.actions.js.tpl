import { createAction } from 'redux-act';

export const ensure<%= componentNameCamelCase %> = createAction('Retrieve <%= componentNameCamelCase %>');
export const <%= componentNameCamelCaseDecapitalized %>Retrieved = createAction('<%= componentNameCamelCase %> successfully retrieved.');
export const <%= componentNameCamelCaseDecapitalized %>RetrievalError = createAction('Error getting <%= componentNameCamelCase %>.');

export function doEnsure<%= componentNameCamelCase %>(){
  return new Promise()
    .then(<%= componentNameCamelCaseDecapitalized %>Retrieved)
    .catch(<%= componentNameCamelCaseDecapitalized %>RetrievalError);
}
