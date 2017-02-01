import {app, router, store} from './app';

export default context => {
  router.push(context.url);
  const matchedComponents = router.getMatchedComponents();

  if (matchedComponents.length === 0) {
    return Promise.reject({code: '404'});
  }

  return Promise.all(matchedComponents.map(component => {
    if (component.preFetch) {
      return component.preFetch(store);
    }
  })).then(() => {
    context.initialState = store.state;
    return app;
  });
}
