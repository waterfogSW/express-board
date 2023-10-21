import { Injectable } from '../common/decorator/injectable.decorator';

@Injectable()
export class UserService {
  public getUser (): string {
    return 'test';
  }
}
