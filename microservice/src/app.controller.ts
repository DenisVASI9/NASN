import { Controller } from "@nestjs/common";
import { AppService } from "./app.service";
import { GrpcMethod } from "@nestjs/microservices";
import { Either, getOrElseW } from "fp-ts/Either";

/* Декоратор для распаковки Either и порождения exception в случае left сценария.
   Необходим потому что nest на всех уровнях работает с концепцией Exception
*/

export function CastEither<E, A>() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    let originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const either: Either<E, A> = originalMethod.apply(this, args);
      return getOrElseW((error) => {
        throw error
      })(either)
    }
  }
}

function castEither<E, A>(either: Either<E, A> | Promise<Either<E, A>>): Promise<A> {
  return Promise.resolve(either).then((either) => {
    return getOrElseW((error) => {throw error})(either);
  })
}

// Тестироваллось в BloomRPC
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod("HelloService", "Hello")
  getHello(data: {name: string}): { greeting: string } {
    return this.appService.getHello(data);
  }

  // TODO: Problem 1
  /*
    Этот метод вернет:
    {
    "error": "2 UNKNOWN: Internal server error"
    }
    А хотелось бы:
    {
    "error": "<Вменяемый статус>: <Сообщение об ошибке>"
    }
  */

  // Этот вариант интересный, но плох тем, что меняет выходящий тип неявным образом,
  // В итоге с инструментами типа ts-proto, которые генерируют типы контроллера от
  // .proto файла окажется несовместим
  // @GrpcMethod("HelloService", "ExceptionCase")
  // @CastEither()
  // exceptionCase(data: {name: string}): Either<unknown, { greeting: string }>{
  //   return this.appService.exceptionCase(data);
  // }

  // Не так красиво, зато не ломает typescript
  @GrpcMethod("HelloService", "ExceptionCase")
  exceptionCase(data: {name: string}): Promise<{ greeting: string }> {
    return castEither(this.appService.exceptionCase(data));
  }

  // TODO: Problem 3
  /*
  Этот метод вернет:
  {
    "greeting": "hello, undefined!"
  }
  А хотелось бы:
  {
    "error": "<Вменяемый статус>: <Сообщение об ошибке>"
  }
  */
  @GrpcMethod("HelloService", "BadInputDataCase")
  badInputDataCase(data: {name: string}): { greeting: string } {
    return this.appService.badInputDataCase(data);
  }

  // TODO: Problem 5
  /*
  Этот метод вернет:
  {
     "greeting": ""
  }
  А хотелось бы:
  {
    "error": "<Вменяемый статус>: <Сообщение об ошибке>"
  }
  */
  @GrpcMethod("HelloService", "BadOutputDataCase")
  badOutputDataCase(data: {name: string}): { greeting: string } {
    return this.appService.badOutputDataCase(data);
  }

  // TODO: Problem 6
  /*
  Этот метод вернет:
  {
    "error": "2 UNKNOWN: Internal server error"
  }
  А хотелось бы:
  {
    "error": "<Вменяемый статус>: <Сообщение об ошибке>"
  }
  */
  @GrpcMethod("HelloService", "FewPromisesErrorCase")
  async fewPromisesErrorCase(data: {name: string}): Promise<{ greeting: string }> {
    return castEither(await this.appService.fewPromisesErrorCase(data));
  }

  // TODO: Problem 8
  /*
  Этот метод вернет:
  {
    "error": "2 UNKNOWN: Internal server error"
  }
  А хотелось бы:
  {
    "error": "<Вменяемый статус>: <Сообщение об ошибке>"
  }
  */
  @GrpcMethod("HelloService", "ReturnedCallbackError")
  returnedCallbackError(data: {name: string}): { greeting: string } {
    return this.appService.returnedCallbackError(data);
  }

  @GrpcMethod("HelloService", "ExecutableInsideCallbackError")
  executableInsideCallbackError(data: {name: string}): { greeting: string }  {
    return this.appService.executableInsideCallbackError(data);
  }
}
