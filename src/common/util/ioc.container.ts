import { Constructor } from "../type/constructor.type";

export class Container {

  private readonly _beans: Map<string, Constructor<any>> = new Map();


  register<T>(key: string, constructor: Constructor<T>): void {
    this._beans.set(key, constructor);
  }

  resolve<T>(key: string): T {
    const targetType: Constructor<any> | undefined = this._beans.get(key);
    if (!targetType) {
      throw new Error(`Unregistered dependency ${ key }`);
    }

    const dependencies: Constructor<any>[] = Reflect.getMetadata('design:paramtypes', targetType) || [];
    const instances: Array<any> = dependencies.map((dependency: Constructor<any>) => this.resolve(dependency.name));
    return new targetType(...instances);
  }
}

export const container: Container = new Container();