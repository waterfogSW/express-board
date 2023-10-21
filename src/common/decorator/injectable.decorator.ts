import { container } from '../util/ioc.container';
import { type Constructor } from '../type/constructor.type';

function Injectable () {
  return function (target: Constructor<any>) {
    container.register(target.name, target);
  };
}

export { Injectable };
