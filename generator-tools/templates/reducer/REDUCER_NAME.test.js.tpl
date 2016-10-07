import { loop, Effects } from 'redux-loop';
import Immutable from 'immutable';

import {
  default as <%= componentNameCamelCase %>,
  INITIAL
} from './<%= componentNameCamelCase %>.reducer';
import {
  doEnsure<%= componentNameCamelCase %>,
  ensure<%= componentNameCamelCase %>,
  <%= componentNameCamelCase %>Retrieved
} from './<%= componentNameLowerCase %>.actions';

describe('<%= componentNameCamelCase %> reducer', ()=>{
	it('gets',()=>{
		let action = ensure<%= componentNameCamelCase %>(),
          result = <%= componentNameCamelCase %>(INITIAL, action),
          looped = loop(
            INITIAL
              .set('loading', true)
              .set('load_error', false),
            Effects.promise(doEnsure<%= componentNameCamelCase %>)
          );
      expect(looped).toEqual(result);
	})
	it('returns current ', ()=>{
      let current = INITIAL
            .set('data', Immutable.fromJS({
              'mockKey': {content: 'mockValue'}
            })),
          action = ensure(),
          result = <%= componentNameCamelCase %>(current, action);
      expect(current).toEqual(result);
    });
    it('retrieves', (done)=>{
      doEnsure<%= componentNameCamelCase %>()
        .then((action)=>{
          expect(action['type']).toEqual(<%= componentNameCamelCase %>Retrieved.getType());
          done()
        });
    });
});