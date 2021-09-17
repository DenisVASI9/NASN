import { Injectable } from "@nestjs/common";

export class CommonServiceError extends Error {
  name = 'CommonServiceError'
}

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

  someFunctionThatReturnsError(error = false) {
    if (error) {
      throw new CommonServiceError("Error for test")
    }
    else {
      return "Sir"
    }
  }

  executeCallback(callback) {
    return callback()
  }

  executeInsideCallback(callback) {
    const result = callback()
    return result;
  }
}
