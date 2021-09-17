import { Injectable } from "@nestjs/common";

// Методы в этом классе переписывать нельзя - они имитируют внешние небезопасне функции

export class CommonServiceError extends Error {
  name = 'CommonServiceError'
}

@Injectable()
export class CommonService {
  async throwablePromise(error = false): Promise<string> {
    if (error) {
      throw new Error('Throw promise')
    }
    return "Sir"
  }

  async throwablePromiseConstructor(error = false): Promise<number> {
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
