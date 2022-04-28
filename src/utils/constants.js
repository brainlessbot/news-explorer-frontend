const defaultCurrentUser = {
  isLoggedIn: false,
  data: {
    name: undefined,
  },
};

const fakeCurrentUser = {
  isLoggedIn: true,
  data: {
    name: 'Bruce Wayne',
  },
};

export {
  defaultCurrentUser,
  fakeCurrentUser,
};
