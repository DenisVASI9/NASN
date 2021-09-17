import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from "@nestjs/microservices";
import { pipe } from "fp-ts/function";
import { match } from "fp-ts/Either";

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
  @GrpcMethod("HelloService", "ExceptionCase")
  exceptionCase(data: {name: string}): { greeting: string } {
    const either = this.appService.exceptionCase(data);
    console.log(
      match((error) => {
        console.log(error)
      }, (data) => {
        console.log(data);
      })(either)
    )
    return null as any;
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
  fewPromisesErrorCase(data: {name: string}): Promise<{ greeting: string }> {
    return this.appService.fewPromisesErrorCase(data);
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
