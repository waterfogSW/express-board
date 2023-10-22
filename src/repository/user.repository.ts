import { Injectable } from '../common/decorator/injectable.decorator';
import { User } from '../model/user.model';

@Injectable()
export class UserRepository {
  public save(user: User): User {
    // TODO: implement
    return user;
  }
}
