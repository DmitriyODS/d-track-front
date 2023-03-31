type User = {
  user_id: number;
  login: string;
  password: string;
  jwt: string;
};

export function CreateEmptyUser(): User {
  return { user_id: 0, login: '', password: '', jwt: '' };
}

export default User;
