import { type Constructor } from '../type/constructor.type';

export class Container {
  private readonly _beans = new Map<string, Constructor<any>>();

  register<T>(key: string, constructor: Constructor<T>): void {
    this._beans.set(key, constructor);
  }

  resolve<T>(key: string): T {
    const TargetType: Constructor<any> | undefined = this._beans.get(key);
    if (TargetType === undefined) {
      throw new Error(`Unregistered dependency ${key}`);
    }

    const dependencies: Array<Constructor<any>> = Reflect.getMetadata('design:paramtypes', TargetType) ?? [];
    const instances: any[] = dependencies.map((dependency: Constructor<any>) => this.resolve(dependency.name));
    return new TargetType(...instances);
  }
}

export const container: Container = new Container();
