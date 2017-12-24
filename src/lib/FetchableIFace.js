const fetch = () => console.log("implement me!!!");
export const requestable = (loc, request) => {
  request.loc = loc;
};
export const fetchable = (loc, request) => {
  const f = {};
  f.req = request;
  requestable(loc, request);
  f.fetch = () => fetch(request.URL, request.Meta);
  return f;
};

export const fetchhandler = (fetchable, prefetch, postfetch) => {
  return (dispatch, getState) => {
    let state = getState();
    fetchable.req.addHeader("Authorization", "Bearer " + state.user.token);
    if (prefetch) {
      prefetch(state, fetchable.req);
    }
    return fetchable
      .fetch()
      .then(res => res.json())
      .then(json => [dispatch, json]);
  };
};

export default fetchable;
