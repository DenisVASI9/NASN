import { Injectable } from "@nestjs/common";

@Injectable()
export class CommonService {
  async throwablePromise(): Promise<number> {
    console.log('throw')
    throw new Error('Throw promise')
    return 1
  }

  async throwablePromiseConstructor(): Promise<number> {
    return new Promise((resolve, reject) => {
      reject('Reject promise')
      return 1;
    })
  }

  executeCallback(callback) {
    return callback()
  }

  executeInsideCallback(callback) {
    const result = callback()
    return result;
  }
}
