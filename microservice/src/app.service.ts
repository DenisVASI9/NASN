import { Injectable } from '@nestjs/common';
import { CommonService } from "./common.service";

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
  exceptionCase(data: {name: string}): { greeting: string } {

    throw new Error("Error for test")

    return {
      greeting: `hello, ${data.name}!`
    }
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
