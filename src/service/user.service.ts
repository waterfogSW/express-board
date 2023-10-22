import { Injectable } from '../common/decorator/injectable.decorator';
import { User } from '../model/user.model';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) { }

  public create(
    username: string,
    email: string,
    password: string,
  ): User {
    const user: User = new User(username, email, password);
    return this.userRepository.save(user);
  }
}
