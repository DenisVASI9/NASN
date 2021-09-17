import { Injectable } from '@nestjs/common';
import { CommonService, CommonServiceError } from "./common.service";
import * as TE from "fp-ts/TaskEither";
import * as E from "fp-ts/Either";

export class AppServiceError extends Error {
  name = 'AppServiceError'
}

@Injectable()
export class AppService {

  constructor(private readonly common: CommonService) {
  }

  getHello(data: {name: string}): { greeting: string } {
    return {
      greeting: `hello, ${data.name}!`
    }
  }

  // TODO: Problem 2
  // Как нам обработать все возможные ошибка в этом методе
  exceptionCase(data: {name: string}, error = true): E.Either<unknown, { greeting: string }> {

    /*
    Представим, что у нас есть какая-то неизвестная функция,
    обернем ее в вызов tryCatch из пакета Either, чтобы сделать безопасной.
    Важно: если появится Promise - следует использовать TaskEither, потому что tryCatch
    завершение промиса.

    export const tryCatch = <E, A>(f: Lazy<A>, onThrow: (e: unknown) => E): Either<E, A> => {
      try {
        return right(f())
      } catch (e) {
        return left(onThrow(e))
      }
    }

    Использование этого паттерна создает приятный еффект в виде сохранения изначальной
    ошибки на верхнем уровне приложения и возможности ее обработать
    */
    const nameEither = E.tryCatch(() => this.common.someFunctionThatReturnsError(error), (e) => e)

    return E.match((e) => E.left(e), (name) => E.right({
      greeting: `hello, ${name}!`
    }))(nameEither)
  }

  // TODO: Problem 4
  // Как не дать попасть неправильным данным в метод
  badInputDataCase(data: {name: string}): { greeting: string } {

    data = {
      name: undefined
    }

    return {
      greeting: `hello, ${data.name}!`
    }
  }

  // TODO: Problem 6
  // Как не дать покинуть неправильным данным в метод
  badOutputDataCase(data: {name: string}): { greeting: string } {
    return {
      greeting: undefined
    }
  }

  // TODO: Problem 7
  // Как обработать ошибку в группе в группе вызовов асинхронных функций
  async fewPromisesErrorCase(data: {name: string}): Promise<{ greeting: string }> {
    await this.common.throwablePromiseConstructor()
    await this.common.throwablePromise()
    await this.common.throwablePromiseConstructor()
    await this.common.throwablePromise()
    return {
      greeting: undefined
    }
  }

  // TODO: Problem 9
  // Как обработать ошибки внутри callback, который возвращается внутри executeCallback
  returnedCallbackError(data: {name: string}): { greeting: string } {

    const result = this.common.executeCallback(() => {
      throw new Error('throw error from callback')
      return "Hi"
    })

    return {
      greeting: result
    }
  }

  executableInsideCallbackError(data: {name: string}): { greeting: string } {
    const result = this.common.executeInsideCallback(() => {
      throw new Error('throw inside error from callback')
      return "Hi"
    })

    return {
      greeting: result
    }
  }
}
