type User = {
  UserID: number;
  Login: string;
  Password: string;
  JWT: string;
};

export function CreateEmptyUser(): User {
  return { UserID: 0, Login: '', Password: '', JWT: '' };
}

export default User;
