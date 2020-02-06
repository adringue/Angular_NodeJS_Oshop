// // import { networkInterfaces } from "os";
// // import { ftruncate } from "fs";

// //Inheritance:



// // create a datatype based upon another data type
// // in javascript we don't really inherite datatype from another datatype,
// // true inheritance in javascript come from chaining the prototypes of two or more objects together.
// //but we can still write code that acts like we are inheriting datatype from another datatype.

// // pure javascript

// // function Person(firstName, lastName) {
// //   this.firstName = firstName;
// //   this.lastName = lastName;
// // }
// // Object.defineProperty(Person.prototype, "fullName", {
// //   get: function () {
// //     return this.firstName + " " + this.lastName;
// //   },
// //   enumerable: true,
// //   configurable: true
// // });

// // Person.prototype.saHi = function (obj) {
// //   var predicate = "! My name is " + this.fullName;
// //   if (typeof obj === "string") {
// //     return "Hi, " + obj + predicate;
// //   } else {
// //     if (obj instanceof Person) {
// //       return "Hi, " + obj.fullName + predicate;
// //     }
// //   }
// //   return "Hi" + predicate;
// // };
// //    //   Employee datatype

// // function Employee(firstName, lastName, position) {
// //   Person.call(this, firstName, lastName); // call Person if that person were an employee with this.
// //   // it create that person as an employee
// //   this.position = position;
// // }
// // // chaining the employee.protype to person.prototype-> create inheritance
// // // prototype library
// // Employee.prototype = Object.create(Person.prototype);
// // Employee.prototype.sayHi = function (obj) {
// //   if (obj instanceof Employee) {
// //     return "Howdy, " + obj.fullName;
// //   }
// //   return Person.prototype.sayHi.call(this, obj); // if not reuse the same method  from person
// // }
// // end pure javascript

// // es6 typescript

// class Person {
//   get fullName() {
//     return this.firstName + " " + this.lastName;
//   }
//   // set fullName(value: string) {
//   //   this.firstName = value;
//   // }
//   constructor(public firstName: string, public lastName: string) { }
//   sayHi(): string;
//   // tslint:disable-next-line:unified-signatures
//   sayHi(name: string): string;
//   // tslint:disable-next-line:unified-signatures
//   sayHi(person: Person): string;
//   sayHi(obj?: any) {
//     const predicate = "!My name is" + this.fullName;
//     if (typeof obj === "string") {
//       return "Hi, " + obj + predicate;
//     } else if (obj instanceof Person) {
//       return "Hi, " + obj.fullName + predicate;
//     }
//     return "Hi" + predicate;
//   }
// }

// // employee class

// class Employee extends Person {
//   // here employee has everything that a person has
//   // every public and private member are now in employee
//   // some issues with private member as far typescript is concerned

//   // employee class has the fullName property, it doesnt have the Person constructor
//   // we will need to create a constructor here and add a position for the employee.
//   constructor(firstName: string, lastName: string, public position: string) {
//     // public -> is constructing the variable for our Employee class
//     // here firstName and lastName don't have public-> it will be handled by the Person constructor
//     // just call what we need from Person constructor using super
//     super(firstName, lastName); // the constructor created already firstName and lastName  using public
//   }
//   get fullName() {
//     // so we're overriding the get fullName in Person, so we have lost the set fullName in Person!!
//     // return super.fullName + "," + this.position; // will not work
//     return this.firstName + " " + this.lastName + " " + this.position;
//   }
//   // these following saayHi overload will override those in Person
//   // thats why we need to copy and paste everything with the same name from the parent class
//   sayHi(): string;   // overload signature

//   // tslint:disable-next-line:unified-signatures
//   sayHi(name: string): string;

//   // tslint:disable-next-line:unified-signatures
//   sayHi(person: Person): string;

//   // tslint:disable-next-line:unified-signatures
//   sayHi(employee: Employee): string;

//   ////// we can reuse the sayHi method of the class class, we nned a check first
//   sayHi(obj?: any) {   // implementation signature
//     if (obj instanceof Employee) {
//       return "Howdy, " + obj.fullName;
//     }
//     return super.sayHi(obj);
//   }
// }
// const employee = new Employee("John", "Doe", "Manager");
// const janeDoe = new Person("Jane", "Doe");
// console.log(employee.sayHi(janeDoe));


// // a retenir.....

// // there are two key thing to remember
// // 1)  everything you define in the child class override the same in the parent class
// // 2) you can't access some members in the parent class by using the super key word
// // the super key word is really usefull inside the constructor or if you want to call a method on the parent class
// // its not usefull to access a property on a parent class specially if that property is an accessor property




// ////   classes

// // a datatype consist of a constructor and all the methods attach to this constructor
// // using a datatype is very easy---> just create an instance using the constructor
// // in a class you have get accessor and set accessor
// // get accessor will be define this way in javascript--->
// // --------

// //  Object.defineProperty(Person.prototype, "fullNAme", {
// //   get: function(){
// //     return this.firstName + " "+ this.lastName;
// //   },
// //   enumerable: true,
// //   configurable: true
// // })

// //----------
// // with Person being the class name.
// // javascript has no privacy, typescript does, we can go around privacy using the brackets syntax,
// // johnDoe["privateMethodOrPropertyInClass "]
// // in typescript, class member are default public


// // - we can overload constructor and method in a class
// // casting in typescript---> var person = <Person> obj;

// // -----------------------------------------------
// //      Interfaces

// //Interfaces in typescript are differents from interfaces in other languages

// // the key thing to remember is that typescript object implement interfaces, other languages
// // a class implement interfaces


// // dom || dom={}   ----> if dom!=false then dom else dom={}



// // function  returnning:





// //testing
// Answer
// Answer ServerResponse {
//   _events: { finish: [Function: bound resOnFinish] },
//   _eventsCount: 1,
//     _maxListeners: undefined,
//       output: [],
//         outputEncodings: [],
//           outputCallbacks: [],
//             outputSize: 0,
//               writable: true,
//                 _last: false,
//                   chunkedEncoding: false,
//                     shouldKeepAlive: true,
//                       useChunkedEncodingByDefault: true,
//                         sendDate: true,
//                           _removedConnection: false,
//                             _removedContLen: false,
//                               _removedTE: false,
//                                 _contentLength: null,
//                                   _hasBody: true,
//                                     _trailer: '',
//                                       finished: false,
//                                         _headerSent: false,
//                                           socket:
//   Socket {
//     connecting: false,
//       _hadError: false,
//         _handle:
//     TCP {
//       reading: true,
//         owner: [Circular],
//           onread: [Function: onread],
//             onconnection: null,
//               _consumed: true
//     },
//     _parent: null,
//       _host: null,
//         _readableState:
//     ReadableState {
//       objectMode: false,
//         highWaterMark: 16384,
//           buffer: BufferList { length: 0 },
//       length: 0,
//         pipes: null,
//           pipesCount: 0,
//             flowing: true,
//               ended: false,
//                 endEmitted: false,
//                   reading: true,
//                     sync: false,
//                       needReadable: true,
//                         emittedReadable: false,
//                           readableListening: false,
//                             resumeScheduled: false,
//                               emitClose: false,
//                                 destroyed: false,
//                                   defaultEncoding: 'utf8',
//                                     awaitDrain: 0,
//                                       readingMore: false,
//                                         decoder: null,
//                                           encoding: null
//     },
//     readable: true,
//       _events:
//     {
//       end: [Array],
//         drain: [Array],
//           timeout: [Function: socketOnTimeout],
//             data: [Function: bound socketOnData],
//               error: [Function: socketOnError],
//                 close: [Array],
//                   resume: [Function: onSocketResume],
//                     pause: [Function: onSocketPause]
//     },
//     _eventsCount: 8,
//       _maxListeners: undefined,
//         _writableState:
//     WritableState {
//       objectMode: false,
//         highWaterMark: 16384,
//           finalCalled: false,
//             needDrain: false,
//               ending: false,
//                 ended: false,
//                   finished: false,
//                     destroyed: false,
//                       decodeStrings: false,
//                         defaultEncoding: 'utf8',
//                           length: 0,
//                             writing: false,
//                               corked: 0,
//                                 sync: false,
//                                   bufferProcessing: false,
//                                     onwrite: [Function: bound onwrite],
//                                       writecb: null,
//                                         writelen: 0,
//                                           bufferedRequest: null,
//                                             lastBufferedRequest: null,
//                                               pendingcb: 0,
//                                                 prefinished: false,
//                                                   errorEmitted: false,
//                                                     emitClose: false,
//                                                       bufferedRequestCount: 0,
//                                                         corkedRequestsFree: [Object]
//     },
//     writable: true,
//       allowHalfOpen: true,
//         _sockname: null,
//           _pendingData: null,
//             _pendingEncoding: '',
//               server:
//     Server {
//       _events: [Object],
//         _eventsCount: 6,
//           _maxListeners: undefined,
//             _connections: 8,
//               _handle: [TCP],
//                 _usingWorkers: false,
//                   _workers: [],
//                     _unref: false,
//                       allowHalfOpen: true,
//                         pauseOnConnect: false,
//                           httpAllowHalfOpen: false,
//                             timeout: 120000,
//                               keepAliveTimeout: 5000,
//                                 _pendingResponseData: 0,
//                                   maxHeadersCount: null,
//                                     _connectionKey: '6::::3000',
//                                       [Symbol(IncomingMessage)]: [Function],
//                                         [Symbol(ServerResponse)]: [Function],
//                                           [Symbol(asyncId)]: 13
//     },
//     _server:
//     Server {
//       _events: [Object],
//         _eventsCount: 6,
//           _maxListeners: undefined,
//             _connections: 8,
//               _handle: [TCP],
//                 _usingWorkers: false,
//                   _workers: [],
//                     _unref: false,
//                       allowHalfOpen: true,
//                         pauseOnConnect: false,
//                           httpAllowHalfOpen: false,
//                             timeout: 120000,
//                               keepAliveTimeout: 5000,
//                                 _pendingResponseData: 0,
//                                   maxHeadersCount: null,
//                                     _connectionKey: '6::::3000',
//                                       [Symbol(IncomingMessage)]: [Function],
//                                         [Symbol(ServerResponse)]: [Function],
//                                           [Symbol(asyncId)]: 13
//     },
//     parser:
//     HTTPParser {
//       '0': [Function: parserOnHeaders],
//         '1': [Function: parserOnHeadersComplete],
//           '2': [Function: parserOnBody],
//             '3': [Function: parserOnMessageComplete],
//               '4': [Function: bound onParserExecute],
//                 _headers: [],
//                   _url: '',
//                     _consumed: true,
//                       socket: [Circular],
//                         incoming: [IncomingMessage],
//                           outgoing: null,
//                             maxHeaderPairs: 2000,
//                               onIncoming: [Function: bound parserOnIncoming]
//     },
//     on: [Function: socketOnWrap],
//       _paused: false,
//         _httpMessage: [Circular],
//           [Symbol(asyncId)]: 969,
//             [Symbol(lastWriteQueueSize)]: 0,
//               [Symbol(timeout)]:
//     Timeout {
//       _called: false,
//         _idleTimeout: 120000,
//           _idlePrev: [TimersList],
//             _idleNext: [Timeout],
//               _idleStart: 9393,
//                 _onTimeout: [Function: bound],
//                   _timerArgs: undefined,
//                     _repeat: null,
//                       _destroyed: false,
//                         [Symbol(unrefed)]: true,
//                           [Symbol(asyncId)]: 1086,
//                             [Symbol(triggerId)]: 972
//     },
//     [Symbol(kBytesRead)]: 0,
//       [Symbol(kBytesWritten)]: 0
//   },
//   connection:
//   Socket {
//     connecting: false,
//       _hadError: false,
//         _handle:
//     TCP {
//       reading: true,
//         owner: [Circular],
//           onread: [Function: onread],
//             onconnection: null,
//               _consumed: true
//     },
//     _parent: null,
//       _host: null,
//         _readableState:
//     ReadableState {
//       objectMode: false,
//         highWaterMark: 16384,
//           buffer: BufferList { length: 0 },
//       length: 0,
//         pipes: null,
//           pipesCount: 0,
//             flowing: true,
//               ended: false,
//                 endEmitted: false,
//                   reading: true,
//                     sync: false,
//                       needReadable: true,
//                         emittedReadable: false,
//                           readableListening: false,
//                             resumeScheduled: false,
//                               emitClose: false,
//                                 destroyed: false,
//                                   defaultEncoding: 'utf8',
//                                     awaitDrain: 0,
//                                       readingMore: false,
//                                         decoder: null,
//                                           encoding: null
//     },
//     readable: true,
//       _events:
//     {
//       end: [Array],
//         drain: [Array],
//           timeout: [Function: socketOnTimeout],
//             data: [Function: bound socketOnData],
//               error: [Function: socketOnError],
//                 close: [Array],
//                   resume: [Function: onSocketResume],
//                     pause: [Function: onSocketPause]
//     },
//     _eventsCount: 8,
//       _maxListeners: undefined,
//         _writableState:
//     WritableState {
//       objectMode: false,
//         highWaterMark: 16384,
//           finalCalled: false,
//             needDrain: false,
//               ending: false,
//                 ended: false,
//                   finished: false,
//                     destroyed: false,
//                       decodeStrings: false,
//                         defaultEncoding: 'utf8',
//                           length: 0,
//                             writing: false,
//                               corked: 0,
//                                 sync: false,
//                                   bufferProcessing: false,
//                                     onwrite: [Function: bound onwrite],
//                                       writecb: null,
//                                         writelen: 0,
//                                           bufferedRequest: null,
//                                             lastBufferedRequest: null,
//                                               pendingcb: 0,
//                                                 prefinished: false,
//                                                   errorEmitted: false,
//                                                     emitClose: false,
//                                                       bufferedRequestCount: 0,
//                                                         corkedRequestsFree: [Object]
//     },
//     writable: true,
//       allowHalfOpen: true,
//         _sockname: null,
//           _pendingData: null,
//             _pendingEncoding: '',
//               server:
//     Server {
//       _events: [Object],
//         _eventsCount: 6,
//           _maxListeners: undefined,
//             _connections: 8,
//               _handle: [TCP],
//                 _usingWorkers: false,
//                   _workers: [],
//                     _unref: false,
//                       allowHalfOpen: true,
//                         pauseOnConnect: false,
//                           httpAllowHalfOpen: false,
//                             timeout: 120000,
//                               keepAliveTimeout: 5000,
//                                 _pendingResponseData: 0,
//                                   maxHeadersCount: null,
//                                     _connectionKey: '6::::3000',
//                                       [Symbol(IncomingMessage)]: [Function],
//                                         [Symbol(ServerResponse)]: [Function],
//                                           [Symbol(asyncId)]: 13
//     },
//     _server:
//     Server {
//       _events: [Object],
//         _eventsCount: 6,
//           _maxListeners: undefined,
//             _connections: 8,
//               _handle: [TCP],
//                 _usingWorkers: false,
//                   _workers: [],
//                     _unref: false,
//                       allowHalfOpen: true,
//                         pauseOnConnect: false,
//                           httpAllowHalfOpen: false,
//                             timeout: 120000,
//                               keepAliveTimeout: 5000,
//                                 _pendingResponseData: 0,
//                                   maxHeadersCount: null,
//                                     _connectionKey: '6::::3000',
//                                       [Symbol(IncomingMessage)]: [Function],
//                                         [Symbol(ServerResponse)]: [Function],
//                                           [Symbol(asyncId)]: 13
//     },
//     parser:
//     HTTPParser {
//       '0': [Function: parserOnHeaders],
//         '1': [Function: parserOnHeadersComplete],
//           '2': [Function: parserOnBody],
//             '3': [Function: parserOnMessageComplete],
//               '4': [Function: bound onParserExecute],
//                 _headers: [],
//                   _url: '',
//                     _consumed: true,
//                       socket: [Circular],
//                         incoming: [IncomingMessage],
//                           outgoing: null,
//                             maxHeaderPairs: 2000,
//                               onIncoming: [Function: bound parserOnIncoming]
//     },
//     on: [Function: socketOnWrap],
//       _paused: false,
//         _httpMessage: [Circular],
//           [Symbol(asyncId)]: 969,
//             [Symbol(lastWriteQueueSize)]: 0,
//               [Symbol(timeout)]:
//     Timeout {
//       _called: false,
//         _idleTimeout: 120000,
//           _idlePrev: [TimersList],
//             _idleNext: [Timeout],
//               _idleStart: 9393,
//                 _onTimeout: [Function: bound],
//                   _timerArgs: undefined,
//                     _repeat: null,
//                       _destroyed: false,
//                         [Symbol(unrefed)]: true,
//                           [Symbol(asyncId)]: 1086,
//                             [Symbol(triggerId)]: 972
//     },
//     [Symbol(kBytesRead)]: 0,
//       [Symbol(kBytesWritten)]: 0
//   },
//   _header: null,
//     _onPendingData: [Function: bound updateOutgoingData],
//       _sent100: false,
//         _expect_continue: false,
//           req:
//   IncomingMessage {
//     _readableState:
//     ReadableState {
//       objectMode: false,
//         highWaterMark: 16384,
//           buffer: BufferList { length: 0 },
//       length: 0,
//         pipes: null,
//           pipesCount: 0,
//             flowing: null,
//               ended: true,
//                 endEmitted: false,
//                   reading: false,
//                     sync: true,
//                       needReadable: false,
//                         emittedReadable: true,
//                           readableListening: false,
//                             resumeScheduled: false,
//                               emitClose: true,
//                                 destroyed: false,
//                                   defaultEncoding: 'utf8',
//                                     awaitDrain: 0,
//                                       readingMore: true,
//                                         decoder: null,
//                                           encoding: null
//     },
//     readable: true,
//       _events: { },
//     _eventsCount: 0,
//       _maxListeners: undefined,
//         socket:
//     Socket {
//       connecting: false,
//         _hadError: false,
//           _handle: [TCP],
//             _parent: null,
//               _host: null,
//                 _readableState: [ReadableState],
//                   readable: true,
//                     _events: [Object],
//                       _eventsCount: 8,
//                         _maxListeners: undefined,
//                           _writableState: [WritableState],
//                             writable: true,
//                               allowHalfOpen: true,
//                                 _sockname: null,
//                                   _pendingData: null,
//                                     _pendingEncoding: '',
//                                       server: [Server],
//                                         _server: [Server],
//                                           parser: [HTTPParser],
//                                             on: [Function: socketOnWrap],
//                                               _paused: false,
//                                                 _httpMessage: [Circular],
//                                                   [Symbol(asyncId)]: 969,
//                                                     [Symbol(lastWriteQueueSize)]: 0,
//                                                       [Symbol(timeout)]: [Timeout],
//                                                         [Symbol(kBytesRead)]: 0,
//                                                           [Symbol(kBytesWritten)]: 0
//     },
//     connection:
//     Socket {
//       connecting: false,
//         _hadError: false,
//           _handle: [TCP],
//             _parent: null,
//               _host: null,
//                 _readableState: [ReadableState],
//                   readable: true,
//                     _events: [Object],
//                       _eventsCount: 8,
//                         _maxListeners: undefined,
//                           _writableState: [WritableState],
//                             writable: true,
//                               allowHalfOpen: true,
//                                 _sockname: null,
//                                   _pendingData: null,
//                                     _pendingEncoding: '',
//                                       server: [Server],
//                                         _server: [Server],
//                                           parser: [HTTPParser],
//                                             on: [Function: socketOnWrap],
//                                               _paused: false,
//                                                 _httpMessage: [Circular],
//                                                   [Symbol(asyncId)]: 969,
//                                                     [Symbol(lastWriteQueueSize)]: 0,
//                                                       [Symbol(timeout)]: [Timeout],
//                                                         [Symbol(kBytesRead)]: 0,
//                                                           [Symbol(kBytesWritten)]: 0
//     },
//     httpVersionMajor: 1,
//       httpVersionMinor: 1,
//         httpVersion: '1.1',
//           complete: true,
//             headers:
//     {
//       host: 'localhost:3000',
//         connection: 'keep-alive',
//           accept: 'application/json, text/plain, */*',
//             origin: 'http://localhost:4200',
//               authorization:
//         'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
// eyJlbWFpbCI6InBvbUBwb20uY29tIiwidXNlcklkIjoiNWI1
//  YTIxNGQ4Y2U0MjQxOTY5NjkzZDY4IiwiaW1hZ2VQcmV2aWV3IjoiaHR0cDovL
// 2xvY2FsaG9zdDozMDAwL3Byb2ZpbGUtaW1hZ2VzL3Byb2ZpbGVfcGljL
// TE1MzI2MzM0MjEwMzcuanBnIiwidGl0bGUiOi
// Jwcm9maWxlX3BpYyIsImlhdCI6MTUzNjEwNzI4NCwiZXhwIjoxNTM2MTEwODg0fQ.ifpy0LpGcBTGx_TgiBt9jIBWmRPBfd1TZQWUqtkFKZE',
//         'user-agent':
//       'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
//         referer: 'http://localhost:4200/mygame',
//           'accept-encoding': 'gzip, deflate, br',
//             'accept-language': 'en-US,en;q=0.9',
//               'if-none-match': 'W/"5dd-Y5L4uB7ZoOtfv/oURrzSWjeAXx4"'
//     },
//     rawHeaders:
//     ['Host',
//       'localhost:3000',
//       'Connection',
//       'keep-alive',
//       'Accept',
//       'application/json, text/plain, */*',
//       'Origin',
//       'http://localhost:4200',
//       'Authorization',
//        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6Ik
// pXVCJ9.eyJlbWFpbCI6InBvbUBwb20uY29tIiwidXNlcklkIjoiNWI1YTIxNGQ4Y2U0MjQxOTY5NjkzZDY4IiwiaW1hZ2V
// QcmV2aWV3IjoiaHR0cDovL2xvY2FsaG9zdDozMDAwL3Byb2ZpbGUtaW1hZ2VzL
// 3Byb2ZpbGVfcGljLTE1MzI2MzM0MjEwMzcuanBnI
// iwidGl0bGUiOiJwcm9maWxlX3BpYyIsImlhdCI6MTUzNjEwNzI4NCwiZXhwIjoxNTM2MTEwODg0fQ.ifpy0LpGcBTGx_TgiBt9jIBWmRPBfd1TZQWUqtkFKZE',
//       'User-Agent',
//       'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
//       'Referer',
//       'http://localhost:4200/mygame',
//       'Accept-Encoding',
//       'gzip, deflate, br',
//       'Accept-Language',
//       'en-US,en;q=0.9',
//       'If-None-Match',
//       'W/"5dd-Y5L4uB7ZoOtfv/oURrzSWjeAXx4"'],
//       trailers: { },
//     rawTrailers: [],
//       aborted: false,
//         upgrade: false,
//           url: '/api/performances',
//             method: 'GET',
//               statusCode: null,
//                 statusMessage: null,
//                   client:
//     Socket {
//       connecting: false,
//         _hadError: false,
//           _handle: [TCP],
//             _parent: null,
//               _host: null,
//                 _readableState: [ReadableState],
//                   readable: true,
//                     _events: [Object],
//                       _eventsCount: 8,
//                         _maxListeners: undefined,
//                           _writableState: [WritableState],
//                             writable: true,
//                               allowHalfOpen: true,
//                                 _sockname: null,
//                                   _pendingData: null,
//                                     _pendingEncoding: '',
//                                       server: [Server],
//                                         _server: [Server],
//                                           parser: [HTTPParser],
//                                             on: [Function: socketOnWrap],
//                                               _paused: false,
//                                                 _httpMessage: [Circular],
//                                                   [Symbol(asyncId)]: 969,
//                                                     [Symbol(lastWriteQueueSize)]: 0,
//                                                       [Symbol(timeout)]: [Timeout],
//                                                         [Symbol(kBytesRead)]: 0,
//                                                           [Symbol(kBytesWritten)]: 0
//     },
//     _consuming: false,
//       _dumped: false,
//         next: [Function: next],
//           baseUrl: '',
//             originalUrl: '/api/performances',
//               _parsedUrl:
//     Url {
//       protocol: null,
//         slashes: null,
//           auth: null,
//             host: null,
//               port: null,
//                 hostname: null,
//                   hash: null,
//                     search: null,
//                       query: null,
//                         pathname: '/api/performances',
//                           path: '/api/performances',
//                             href: '/api/performances',
//                               _raw: '/api/performances'
//     },
//     params: { },
//     query: { },
//     res: [Circular],
//       body: { },
//     _parsedOriginalUrl:
//     Url {
//       protocol: null,
//         slashes: null,
//           auth: null,
//             host: null,
//               port: null,
//                 hostname: null,
//                   hash: null,
//                     search: null,
//                       query: null,
//                         pathname: '/api/performances',
//                           path: '/api/performances',
//                             href: '/api/performances',
//                               _raw: '/api/performances'
//     }
//   },
//   locals: { },
//   [Symbol(isCorked)]: false,
//     [Symbol(outHeadersKey)]: { 'x-powered-by': ['X-Powered-By', 'Express'] }
// }
// Answer end

// //end testing
