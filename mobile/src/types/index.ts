type RefreshToken = {
  id: string;
  userId: number;
  expiresIn: number;
}

type User = {
  id: number;
  token: string;
  username: string;
  refreshToken: RefreshToken;
}

type SignInData = {
  username: string;
  password: string;
};

type SignUpData = {
  username: string;
  password: string;
};

type Courses = {
  id: number;
  name: string;
}

type SignInResponse = {
  user: User;
}

export {
  User,
  Courses,
  SignInData,
  SignUpData,
  SignInResponse,
}
