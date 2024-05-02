export const currentUser = () => {
  let user = localStorage.getItem('user');
  if (user) return JSON.parse(user).decoded;
  else return {};
};
