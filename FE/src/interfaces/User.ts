export interface LoginDto {
  id: string;
  password: string;
}

export interface LoginUserDto {
  userId: number;
  id: string;
  name: string;
}

export interface SignupDto {
  id: string;
  password: string;
  name: string;
}

export interface User {
  userId: number;
  id: string;
  password: string;
  name: string;
}

export interface UserListDto {
  userId: number;
  name: string;
}
