
export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  }

export interface LoginData {
    email: string;
    password: string;
  }
  
export interface LoginResponse {
    access: string;
    refresh: string;
  }

export interface RegisterResponse {
  user: string,
  detail: string
}
  