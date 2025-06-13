
const KEY = 'godigital-users';

export const registerUser = ({ email, password, nickname }) => {
  const users = JSON.parse(localStorage.getItem(KEY) || '[]');

  if (users.find(u => u.email === email)) {
    throw new Error('이미 가입된 이메일입니다.');
  }
  users.push({ email, password, nickname });
  localStorage.setItem(KEY, JSON.stringify(users));
};

export const loginUser = ({ email, password }) => {
  const users = JSON.parse(localStorage.getItem(KEY) || '[]');
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) throw new Error('이메일 또는 비밀번호가 틀렸습니다.');

  localStorage.setItem('godigital-currentUser', JSON.stringify(user));
  return user;
};

export const logoutUser = () => {
  localStorage.removeItem('godigital-currentUser');
};

export const getCurrentUser = () =>
  JSON.parse(localStorage.getItem('godigital-currentUser') || 'null');
