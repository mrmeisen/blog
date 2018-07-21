import invariant from 'invariant';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import checkStore from './checkStore';
import { createReducers } from './reducers';

export function injectReducerFactory (store, isValid) {
  return function injectReducer (key, reducer) {
    if (!isValid) checkStore(store);

    invariant(
      isString(key) && !isEmpty(key) && isFunction(reducer),
      '(src/store...) injectReducer: Expected `reducer` to be a reducer function'
    );

    // Check `store.asyncReducers[key] === reducer` for hot reloading when a key is the same but a reducer is different
    if (Reflect.has(store.asyncReducers, key) && store.asyncReducers[key] === reducer) return;

    store.asyncReducers[key] = reducer; // eslint-disable-line no-param-reassign
    store.replaceReducer(createReducers(store.asyncReducers));
  };
}

export default function getInjectors (store) {
  checkStore(store);
  return {
    injectReducer: injectReducerFactory(store, true)
  };
}
