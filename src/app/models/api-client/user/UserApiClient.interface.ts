import { User } from "../../domains/user.domain";

export interface UserApiClientInterface {

  get(): Promise<User>;

  set(token: string): void;

  login(email: string, password: string): Promise<User>;

  signUp(user: User): Promise<User>;

  logout(): Promise<void>;
}