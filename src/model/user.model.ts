export class User {
  private readonly _id?: number;
  private readonly _username: string;
  private readonly _email: string;
  private readonly _password: string;

  constructor(
    username: string,
    email: string,
    password: string,
    id?: number,
  ) {
    this._username = username;
    this._email = email;
    this._password = password;
    this._id = id;
  }

  public get getId(): number | undefined {
    return this._id;
  }

  public get getUsername(): string {
    return this._username;
  }

  public get getEmail(): string {
    return this._email;
  }

  public get getPassword(): string {
    return this._password;
  }
}
