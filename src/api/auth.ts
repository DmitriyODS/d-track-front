import User from '../models/user/User';

export async function LoginUser(
  login: string,
  password: string
): Promise<User> {
  return new Promise<User>((resolve, reject) => {
    setTimeout(() => {
      if (login === 'admin' && password === 'admin') {
        resolve({ UserID: 1, Login: login, Password: '', JWT: '' });
      }
      reject('Неверный логин, или пароль');
    }, 5000);
  });
}
