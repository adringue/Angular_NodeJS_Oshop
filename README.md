# IA- My personal CV project using the MEAN STACK boilerplate

### IA-1 MEAN STACK Boilerplate

# IIA- Short summary on an Angularjs application

### IIA-1 How to install node and npm?

### IIA-2 Introducing nvm

### IIA-3 Setting up Angular and TypeScript

#### IIA-3-1 Angular Component

#### IIA-3-2 Angular Modules

##### IIA-3-2-1 Declarations

##### IIA-3-2-2 Imports

##### IIA-3-2-3 Providers

##### IIA-3-2-4 Bootstrap

### IIA-4 Advanced Custom Components with Typescript

#### IIA-4-1 Lifecycle hooks

#### IIA-4-2 ElementRef

#### IIA-4-View encapsulation

#### IIA-5 component communication

##### IIA-5-1 Parent to child component communication

##### IIA-5-1 Child to parent component communication

##### IIA-5-2 Accessing properties and methods of a child component via a parent component

##### IIA-5-3 Data class services

### IIA-6 Client-Side Routing for SPA ( Single page application)

##### IIA-6-1 RouterModule

##### IIA-6-1 Router directives

### IIA-7 Working with Real Hosted Data

### IIA-8 Observables

###IIA-9 The HTTP module

### IA-2 Project Description and settings

##### III Using google devtools

<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->

# IA- My personal CV project using the MEAN STACK boilerplate

### IA-1 MEAN STACK Boilerplate

My MEAN stack app is composed of MongoDB,Express,AngularJS and Node.js.
The MEAN resume project consist on a SPA(single page application) for managing
my personal CV and the matching cards game.

# IIA- Short summary on an Angularjs application

### IIA-1 How to install node and npm?

When developing Node.js applications, you might face situations where you need
to install multiple versions of Node. This can happen when you have multiple projects
and they have different requirements, or you have a deployable application which must be compatible with different Node versions, so always check for the version of node from the terminal you are working on in case a node version occur. Without a good tool, this would mean a lot of work and effort to install the different versions manually, and basing a project on
a specific version.Fortunately, there's a better way!

### IIA-2 Introducing nvm

     nvm stands for Node Version Manager. As the name suggest, it helps you manage and switch between different Node versions with ease.It provides a command line interface where you can install different versions with a single command, set a default, between them and much more. After installing "nvm",
     -  type "nvm install node".
     - listing installed instances with "nvm ls" ( you can see all installed node versions)

[check for more infos about nvm](https://www.sitepoint.com/quick-tip-multiple-versions-node-nvm/)

### IIA-3 Setting up Angular and TypeScript

The angular framework has a lot of terms. Most of these terms represent the tools that
make Angular work,and not angular itself. Webpack, Typescript,typing, build processes,
and so on, are some confusing terms that you will notice at the beginning.

For this reason, the angular team built an all-in-one tool to help you pay less attention to those surrounding tools but more attention to building your project.
It's known as the Angular CLI, and with just a few CLI commands you are building your
app. The time spent on managing Javascript tools these days is alarming and you don't
want to get caught up in tha mess as a beginner (or even professional).
After successfully installed npm and node using nvm tool, you can install the cli using the command:
"npm install -g @angular/cli"
[check for commands to install new project](https://github.com/angular/angular-cli/wiki)

| Scaffold  | Usage                           |
| --------- | ------------------------------- |
| Component | ng g component my-new-component |
| Directive | ng g directive my-new-directive |
| Pipe      | ng g pipe my-new-pip            |
| Service   | ng g service my-new-service     |
| Class     | ng g class my-new-class         |
| Guard     | ng g guard my-new-guard         |
| Interface | ng g interface my-new-interface |
| Enum      | ng g enum my-new-enum           |
| Module    | ng g module my-module           |

#### IIA-3-1 Angular Component

In my project we will be using a lot of typescript components.
Components are the heart of any Angular project.they are the core building blocks, and every other feature is just meant to support components. All those components are written in typescript.
A component look like:

```javascript
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "app";
}
```

A component is a decorated class with a template. Decorators are just functions that extend the feature they are decorating. The decorator takes a javascript object as its argument to describe the component.
The class that is the actual component (and is being decorated) becomes the home for properties and methods that are associated with this component. All these work together as one , to make a reusable feature called a component.
The benefits of using the component architectujre is its reusability. This is the reason why templates and styles are scoped to the component rather than littering the app's environment with heavy HTML and CSS.

#### IIA-3-2 Angular Modules

We use components for building small reusable features in our product.They work together with concepts such as services, directives, pipes, and so
on, to make a functional feature. In some situations, you may want these features to be moved around from one project to another or even between different sections of a huge project.Therefore, you need a way to collect them together as a feature. This is exactly what modules do.
Modules are classes decoratedwith the NgModule decorator. The decorator takes an object, just like the component decorator. This object describes all the feature members that you need to associate to this module. The possible members(but not all members) are as follow:
. Declarations: These include components, directives, and pipes
. Providers: These include other injectable modules
. Imports: These include other imported modules
. Bootstrap: This is the entry component to start the app with.
We have one module already, which is appModule:

```javascript
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { RandomComponent } from "./random/random.component";
@NgModule({
  declaration: [AppComponent, RandomComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

##### IIA-3-2-1 Declarations

RandomComponent is a component. Therefore, it falls into this category, one amazing thing that the Angular CLI did after generating the Random component was to add it to the declarations automatically for us. If not, even when we use the component selector somewhere in the app, the random component contents will still not be displayed, and we will get an error in the console. Components, directives and pipes
must be defined in the declarations array for them to be exposed to the app.

##### IIA-3-2-2 Imports

BrowserModule is a module. it is a module that contains common browser tasks, especially directives for templates, such as \*ngFor and more.
The app module is not the only module that exists. You can have smaller and simpler modules that group related task members together.In this case, you still need to import the smaller modules to the app modules. The imports array is where you do that.These smaller modules are usually referred to as feature module.

##### IIA-3-2-3 Providers

Since we don't have any services yet, the providers can be omitted or the array can be left empty . If you have services that abstract specific tasks and need to be injected via dependency Injection into the app, you need to specify such services in the providers array

##### IIA-3-2-4 Bootstrap

The app module is our entry module. Therefore, it should define the entry component, which is AppComponent. This is what the bootstrap property does.

### IIA-4 Advanced Custom Components with Typescript

#### IIA-4-1 Lifecycle hooks

    These are class methods in Angular that we can hook into.They are achievable by implement a typesript interface.

    . ngOnChanges: Remember how properties are bound to components. These properties are reactive, meaning that, when they change, the view is updated    as well. This lifecycle method is called when any property, bound to a view, is changed. Therefore you can manipulate what happens before the     changes are reflected.
    . ngOnInit: This is the most common lifecycle. It is called after a component has been initialized with the default property binding. Hence, it is   called after the first ngOnChanges.( Once the component is ready, Angular calls this hook, we can bind values to the view even before they come in, asynchronously--> simulate with setTimeout function)
    . ngDoCheck: Reactivity(hange detection) is usually handled for you, but in extreme cases where it's not, you need to handle it yourself.
      Use ngDoCheck to detect and act upon changes that Angular can't or won't detect on its own.
    . ngAfterContentInit: This is called after the component's content has been initialized.
       To be assured of gaining access to the DOM, we need to hook into this lifecycle method. Its in this method that we can use ElementRef to query the DOM and manipulate it.
    . ngAfterContentChecked: This is called after every check on the component's content.
    . ngAfterViewInit: This is called after initializing the view based on the component's template.
    . ngAfterViewChecked: This is called after checking a component's view and the child views of a component.
    . ngOnDestroy: This is called before a component is destroyed. This is a good place for a clean-up.

#### IIA-4-2 ElementRef

this involves manipulating and querying DOM safely in Angular using the ElementRef API.

#### IIA-4-View encapsulation

this shows how scoped styles are applied to Angular components and how to change the default behavior.
Componnets can be configured to apply styles differently. This concept is called encapsulation.(viewing a component inside another component, child and parent component)
. Emulated
This is the default strategy. Any style applied globally via HTML(not the parent component) as well as all the styles applied to a component(child component) will be reflected. If we target h1 and apply styles to style.css, parent.css, child.css, only style.css and child.css will be reflected.
. Native
this strategy disables global styles from entering the component.

```javascript
  @Component({
    selector: 'app-child',
    templateUrl: './child.component.html',
    stylesUrls: ['./child.component.css'],
    //Encapsulation: ViewEncapsulation.Native
  })
```

. None

#### IIA-5 component communication

##### IIA-5-1 Parent to child component communication

     The Input Typescript decorator is used to specify that a class property will be set by the parent component, we do not need to set any values on the child component, but we need to wait until a value is passed down to it via the parent component.

##### IIA-5-1 Child to parent component communication

     ```javascript
     @Output() outPutProperty= new EventEmitter();
      attachDataToEventEmitter(){
        this.outPutProperty.emit(data);
      }
     ```

In the above code the handler uses outPutProperty, which is decorated as an output property with the Output decorator to emit an event of the EventEmitter type. This emitted event is what the parent component will need to listen to. Note how data is passed to the emit method; this shows how we can pass data from the child to the parent.

##### IIA-5-2 Accessing properties and methods of a child component via a parent component

    Other than data flowing in the event pushed up, there are other strategies for communication. We can access child members from the parent component using template variables.

    ```html
    <app-example #variable></app-example>
    ```

in the above example #variable is a variable that is accessible from anywhere in the template. Hence you can use it to access the methods and properties of the example component.

##### IIA-5-3 Data class services

For the sake of reusability and maintainability, we need to abstract the logic concerns out of the component and let the component just serve as a presentation layer. This is one of those use cases where Typescript services in angular come into play.
Remember that, when we scaffold components with the ng CLI command, the CLI not only creates a component but also adds it to our declaration array in the decorator of ngModule in app.module.ts file.
Module need to know which components and services belong to them as members. This is why the component is added automatically for you.This is
not he same for services because the CLi doesn't automatically update the module(it warns you during the scaffold) when you create service via the CLI tool. you need to add the service manually via the providers array in app.module.ts file. If there is a need to manipulate data in component, it must be done in the service and not in the component.

### IIA-6 Client-Side Routing for SPA ( Single page application)

    Single Page Applications(SPA) is a term used to refer to apps that are served from just one server route but have multiple clients views.
    The single-server route is usually the default (/ or *). Once the single-server route is loaded, the client (Javascript) hijacks the page
    and starts controlling the route using the browser's routing mechanisms.
    Being able to control the routes from Javascript gives developers the ability to build better user experiences.

##### IIA-6-1 RouterModule

    Angular doesn't generate routing by default in the CLI scaffold. This is because you might not need it in the project you're working on.
    To get routing working, you need to import it in the module that needs to make use of it:

      ```javascript
        import {RouterModule} from '@angular/router';
      ```

The module exposes a static forRoot method, which is passed in an array of routes. Doing so registers and configures those routes for the module importing RouterModule.

```javascript
 import {Routes} from '@angular/router'; export const routes: Routes=[{path:"",component: firstComponent },

 {.....}]

//in app.module.ts
import {NgModule} from '@angular/core';
import { RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {routes} from './routes';
@NgModule({
  declaration:[
    AppComponent
  ],
  import:[
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers:[],
  bootstrap: [AppComponent]
})
export class AppModule{}
```

##### IIA-6-1 Router directives

If you try testing your app at port 4200, you will still see the content of the app component.This is because we haven't told Angular where it should mount the route.
Angular exposes two important routes directives:
.Router outlet: This defines where the route configuration should be mounted. This is usually in an entry component for single-page apps.
.Router link: This is used to define the navigation for Angular routes. Basically, it adds features to the anchor tag so as to work better with routes defined in an Angular app.

### IIA-7 Working with Real Hosted Data

Modern web applications are usually data-driven. More often than not, we need to CRUD ( create,read,update,and delete) data from various
resources, or consume APIs. Angular makes it easy for us to work with data from external sources for use in our components.
Angular provides a simple HTTP API that grantsour applications HTTP functionality. It built on the native XMLHttpRequest interface exposed by modern browsers, and with it, we can carry out any of these HTTP operations:
.Get: Requests data from a resource
.Post: Submits data to a resource
.put: Modifies data in a resource
.Delete: Deletes a specified resource

### IIA-8 Observables

Observable, similar to promises, help handle asynchronous events in an application.Tkey differences between Observables and promises are:
.Observable can handle multiple values over time, while promises are called once and return one value
.Observables are cancellable, while promise are not.
To make use of Observable, Angular utilizes the Reactive Extensions for Javascript( RxJs) Observable library. Angular makes extensive use of Observables in handling HTTP requests and responses.

###IIA-9 The HTTP module

To get started with using HTTP in our components, we need to install the HttpModule that provides it in my application module.

```javascript
import {HttpModule} from '@angular/http';
// Next, we include the module in the array of import registered in my application, right after BrowserModule:
//app.module.ts
@NgModule({
  imports: [
    browserModule,
    HttpModule
  ]
})
```

### IA-2 Project Description and settings

#### IA-2-1 Description

In this personal project, you will get the choice to browse my CV(resume) or to entertain yourself with
a Game Chat system.
we will start built the things we can see(the core fundation) using the Angular frontend, thereafter we will attach the Node-Express backend( Node.js + Express Backend) so we can do more than just displaying a beautiful URI. And we want also want to work with data, store and fetch data, for that we will need a database, so we will add MongoDB.finally we will enhance our App:

- we will add things to our angular app and to our backend to turn this into a more realistic app.
- The user will be able to select an image from our angular app , upload that image to our backend and store or retrieve itto and from there.
- we will add features like Authentication, how a user signup, login . How to restore information wheter a certain user is Logged in our client side app and use it to reach protected ressources on the server.
- we will add feature like Authorization, It ensures that only user who created a post can add and delete that post.
  My project is composed of three main folder:

1. Backen folder
2. socket_chat folder
3. src/app folder

#### IA-2-2 Settings

##### IA-2-2-1 IDE (Integrated development environment)

for this project we will be using Visual Studio Code [totally free](www.code.visualstudio.com).
After installing the software, let's add some extensions

- Go to View/extensions and install Angular Essentials-Extension Pack for VS Code. This extension
  make the IDE work better with Angular
- As optical extension, you can install Material Icon Theme ( Material Design Icon for Visual studio Code)

- custonize your Theme by going to Code/preferences/color-theme .I Use Dark+ (default dark).

##### IA-2-2-2 Package.json file

- In this Package you can see all the dependencies and development only dependencies, all those dependencies are installed in the folder node_modules.
- Our application lives in the source(src) folder

##### IA-2-2-3 SPA (Single page application)

By running ng-serve, the index.html file is called and our first injected component is the app-component
with the app-root selector.This configuration is made in the angular.json file.

#### IA-2-2-4 Angular tools

- Angular Material

To have more focuss on our MEAN stack prject and not so much on styling, we will often angular Material.
It gives us a set of pre-built angualar component, we can easily include things like headers, button...
(npm install --save @angular/material) or ng add @angular/material
Angular material is logic + styling

- angular.json file that file configure our project, In styles we have the default setting
  in app.module.ts the BrowserAnimationModule will be added.

#### IA-2-2-5 Adding a Node + Express Backend

Node is a javascript runtime that runs on the server, that means you can execute javascript code with some extra feature and some missing features compare to the browser javascript. But in general its still javascript.
You can create a server that listen to requests and sends back a response with it , and you can handle your server side logic with it. Express is a framework building app on Node, so you use it to make node development easier to get couple of tools out of the box .
In the big picture of our MEAN stack we have:

- Node express,business logic, Persistent data storage, Authentication logic on the server side (backend side)
- The angular app is about the user interface

ng server behind the scene actually uses a nodejs server, it gives us only a development server. Its a server at angular development but not a production server. and doesn't contain all the logic we are trying to add on the server side.It doesn't give us an entry point to add that logic.It just a server that return the angular app.
We have two ways of connecting node and angular backend:

- Node app Servers Angular SPA
  . Node(Express) handles incoming requests
  . Requests targeting "/" path return Angular SPA
- Two Separated Servers
  . Node(Express) handles incoming requests
  .Angular SPA served from separate static host

In both Cases: Logically Separated Apps

#### IA-2-2-6 Restful API

REST means Representational State Transfer . It's a server side app, the angular app is going to run on the client. And this angular app is going to send a background request to the server and the server has to send a response that you can use in the angular app( for taditional web app, the responses was a bunch of pages).
In the SPA the client ( Mobile App, Code, Browser) we store and fetches Data but we don't use/render HTML.
The RESTful APIs are stateless Backends, it doesn't care about which client is connected to it. All RESTful api does is to expose couple of urls called paths (/users,/posts,/products). the datatype used for the requests
or response will be in JSON format close to javascript object and smaller.

#### IA-2-2-7 adding the Node backend and express to my project

I don't want to serve my angular app through my node server , I wanna keep using "ng serve" (Angular CLI) for angular development. so it will be ng ser for angular app and a totally separated backend for now.
Actually we can do it in a different folder, but we will do it in the same folder to keep the files switching easier. The node code is not related to our angular code. We are adding a brand new folder next to the source folder( backend folder)

- lets create a single javascript file which will be our server( in Nodejs we create a server with nodejs).
  So we created server.js in the root folder ( server.js) can be executed with nodejs (node server.js)
  to turn server.js into a server:
  .Import http package and use create a server
  here is a code snippet to create and activate a server:

  ```javascript
  const http = require("http");
  const app = require("./backend/app");
  const port = process.env.PORT || 3000;
  app.set("port", port);
  // const server = http.createServer((req, res) => {
  const server = http.createServer(
    app
    // parse (/)..... heavy!!!!
    // parse request body heavy!!!
    // parse request header...
    //  res.end('This is my first response');
  );
  server.listen(port);
  ```

  .Writing all the code with only nodejs will be cumbersome(large or heavy) because for example if we want to find out if we targeted just (/) path, then we will have to parse that manually on the incoming request. We don't want to do all those things, That's why we will add the express backend.

  . Express is a frame for Nodejs to make nodejs development easier.
  After installing Express , we will add the Express app and all the files that belong to it in the Backend folder.
  -in that folder let's create the app.js file ( will hold the express app)
  that app is still a nodejs server side app:

  ```javascript
  const express = require("express");
  const app = express();
  app.use((req, res, next) => {
    next(); // the request will continue is journey if we call next() here
    // and it will go to the next middelware.
    // if not next() here , the request will stop here
  });

  app.use((req, res, next) => {
    res.send("Hello from express");
  });
  module.export = app;
  ```

  the app express is a big chain of middelware that will be applied to the incoming requests.
  app.use() --> use a new midleware on our app and our incoming requests, the use() function is
  a middelware function take a function which is executed for an incoming request.

  Let's use the express as a listener:
  . we are going to export the express app first
  . import the express app in the server.js file
  .assign a port to the express app
  . we pass that express app to createServer.

  - Nodemon

    constantly been required to quit the server and restart it will become ennoying, so we will install Nodemon to make thing easier (npm install --save-dev nodemon), it watches our nodejs or javascript file for changes.
    It will automatically restart the server for us. We are not going to use the command "node server.js" anymore,instead it will be nodemon.
    Lets go in package.js file in the scipts section, and register a new scipt:
    "start:server": "nodemon server.js" and in the server.js--> add const debug=require("debug")("node-angular");
    (npm run start:server) to start the server.

  #### IA-2-2-8 sending request to the backend using Angular HTTP Client

  Sending http requests is very easy with Angular, because it has a built in http client, to use
  this client we need to unlock first. To unlock that feature we need to in app.module.ts and import
  " HttpClientModule " and add it in the imports array to really unlock it. Doing so we will be able to use
  the http client in our components or services.

  #### IA-2-2-9 CORS Error

  CORS stands for Cross-Origin Resource Sharing, we have separated server and client running on different Domain " localhost 3000 " and " localhost 4200 ", now client and server wanna talk to each other but they are not on the same host, if yes then it will be no issues.But in our case they are on different host
  the background request between client and server will fail. We want to expose our server API to all possible client.so we need to disable this mechanism by setting the right header on the server side response.
  so In the Express app we will add one additional middelware:

  - this needs to ba add before all requets

  ```javascript
  app.use((req,res,next)=>{
    res.setHeader("Access-Control-Origin);
    next();
  });
  ```

#### IA-2-2-10 MongoDB Database

- Why don't we connect angular to the database directly without sending http request to node, which then
  does the database connection thing?

Actually its possible to send queries to the database from our Angular App without using the node server
application, but is that a good thing? No!!!!! its highly unsecured. Secured Authentication will be not really possible, we have to log in , we have to authenticate to the database and that is through credential, that we eill have to store in angular code, that code is compiled to javascript at the end
and will be loaded to the browser. And then the browser everyone can view it, every viewer can access our javascript code, therefore our database will be exposed.

##### IA-2-2-10-1 setting up MongoDB Database

[A good way to start is to visit the webpage](www.mongodb.com). we will be using the cloud solution to install mongoDB, there is a free Sandbox available,its a cloud hosted mongo database:

A)

- click on get started for free and create an account
- sign in
- click on build a new cluster
- choose AWS
- click on free tier
- On Create New Cluster--> choose the option free shared Cluster
- continue and click on green button create Cluster
  this will configure a mongoDB cluster for you, which is a server that host some mongoDB database.
  In the Cluster Initialization page, we can create an user

1. on the security/MongoDB user click add New User
2. choose Read and Write to any database
3. add user name and memorized auto generated password
4. click add user
5. in Ip whitelist, you can add your current ip address, if ip address change , you will need to update it otherwise you will not be able to access the database
6. If you deploy your app, ip address should be the server address you deploy your app to., at the end it will be your nodejs server which is accessing the database.
   B) back in our node app
   lets install a package that helps us connect to our database

- we will use mongoose for accessing MongoDB more easier, it uses Schema for defining how our data willl look
  like and allows us to store and fetch much easier.

- Let's connect our express App to our MongoDB database
  1. let's go back to our mongodb cluster and click connect
  2. choose connect your application
  3. choose driver version
  4. copy the SRV address
  5. paste the address in mongoose.connect(address) in App.js in backend folder.
  6. replace the password with yours

##### IA-2-2-11 User Authentication concepts

Every User can read created Posts and Game performance records, but not everyone can add it or delete them.
Only the creator of post can delete them for example.

##### IA-2-2-12 Adding routes Guards

To avoid accessing a routes if we are not logged in we can use the routes guards, its a feature provide by the angular router.

- We create Users in the server upon receiving signup data
  see file( auth.guards.ts)
- add the exported class in routes in (app-routing.module.ts) like:

1. import {AuthGuard } from "./auth/auth.guard"
2. {path: "edit", coponent: PostComponent, canActivate: [AuthGuard]}

##### IA-2-2-13 Saving the Token in the Local Storage

If the timeout for clearing the token has expired----> that means the token is no longer available, we want to make sure we are still got the token if we come back to the page---> so we 're still got a valid token.
For that we will have to store our data in some storage that actually survive a page reload. And the Localstorage provide by the browser will be such of storage.It's a storage manage by the browser and accessible through javascript, therefore vulnerable to cross site scripting attack, but angular prevents us against these by default, we can't ouput script tag with angular for example.

- we will store data in Localstorage once we are authenticate
- Using localStorage.setItem("token",token), we are saving the token
- Using localStorage.setItem("expiration",expirationDate.toISOString) , we are saving the token's expiration date
- Use localStorage.getItem("token") to get item from the localStorage
- Using localStorage.removeItem("token") , we are removing token from localStorage.
  By logout , we will remove the token and by login we will set the token and expirationdate.
  To create a date-->
  const now=new Date();
  const expirationDate=new Date(now.getTime()+expiresInDuration\*1000)
- For auto authenticating:
  1. we check if token in localStorage or expirationDate in localStorage don't exist, in that case we just
     for more info see function getAuthData in auth.service.ts
  2. In the autoAuthUser(){} we we call getAuthData()
     we can only check the validity of our token using the expirationsDate, internally checking the token is done by the method in server, and we will check if the expirationsDate is still running( not yet reached)
     see how to check expirationsDate in the autoAuthUser()---> we ill call this method in app.component.ts

##### IA-2-2-14 Interceptors

To authenticate all outgoing requests, we will need to configure the token and add a Header to each request.We will instead Angular Interceptor, its just a function that will run on all outgoing http requests. And we can than manipulate all those request for example to attach our token. see the file
(auth-interceptor.ts)

##### IA-2-2-15 D3.js

D3.js is a javascript library for manipulating documents based on data. D3 helps you bring data to life using HTML, SVG and CSS. D3's emphasis on web standards gives you the full capabilities of modern browsers without tying yourself to a proprietary framework, combining powerful visualization components and a data-driven approach to DOM manipulation. We will be generating visualization from an array of numbers.

### IA-III- ES6 concepts

##### IA-III-1 String method addition

this is the new of manipulating string contain instead of using indexof() method.

    ```javascript
    var msg="Hello World!";
    // this  string has a length of 12
    // starting with index 0

    msg.startsWith("Hello"); // true
    msg.endsWith("!"); // true
    msg.includes("o"); // true
    msg.startsWith("o",4); // true
    msg.endsWith("o",8); // true
    msg.includes("o",8); // false
    ```

##### IA-III-1 String template litterals

```javascript
var message = `Hello World`;
// not that the string is enclosed within back tick, not a single quote and not a double qote
console.log(message); // "Hello World"
console.log(typeof message); // string

var name = "Adrien",
  message = `Hello,${name}`; // you can put anything within those curly braces
console.log(message); // "Hallo, Adrien"
// we can also have template literal inside template literal
```

##### IA-III-1 const and let

const prevent the modification of the binding ,but not the modification of the bound value

```javascript
const person = {
  name: "Abhay"
};

person.name = "John"; // modifying bound value, no error

person = {
  // modifying the binding, error
  name: "John"
};
////////////////////////////// for loop///////////////////////////////////////////////
for (var i = 0; i < 10; i++) {
  //console.log(i)
}
// i is stil accessible here
for (let j = 0; j < 10; j++) {}
// j is not accessible here

//////////////////for loop pushing function into an array(function in loop////////////////
for (var i = 0; i < 10; i++) {
  funcs.push(function() {
    console.log(i);
  });
}
funcs.forEach(function(func) {
  func(); // output the number 10  ten times
});
// we were expecting this code to print 0-9, that is because i is shared across each iteration of //the loop meaning the function created inside the loop   all hold a reference to the same //variable i and the value of that reference is 10. the variable i has the value of 10 once the
// loop completes

//1 solution (use of IIFE  immediately invoked functions)

for (var i = 0; i < 10; i++) {
  funcs.push(
    (function(value) {
      return function() {
        console.log(value);
      };
    })(i)
  );
}
funcs.forEach(function(func) {
  func();
});
// 2)solution  Using let
// the let declaration create a new variable i each time, and so each  function create inside the //loop has his own copy of i

for (let i = 0; i < 10; i++) {
  funcs.push(function() {
    console.log(i);
  });
}
funcs.forEach(function(func) {
  func();
});
//////////// another example using let //////////////////////////////////

///// first of all, let has a non hoisting characteristic(exist only in the block within they are
// declared ) compare to var

var object = {
  a: true,
  b: true,
  c: true
};
for (let key in object) {
  // here const will work too
  // with var c the output will be " 3 times "c"
  funcs.push(function() {
    console.log(key);
  });
}
funcs.forEach(function(func) {
  func();
});

//////////////////////////let and const in global scope/////////////////////

// global scope behavior between let,const and var ( important )
// when variables are used whitin a global scope, its created a new global variable, which will be
// a property of the global object, and Window in case of browser. And accidently we can override them. (window.variavle)
// Using let or const a new binding will be created within the global variable, but no property is
// added to the global object!!!!!!! it means we cannot override a global variable using a let or // const variable. (window.variable will not be available)
```

##### IA-III-2 function

```javascript
////////////// in this function , the default value of parameter is not provided///
/// if parameter are provided per default, they will be value als false and the second operand the
// second operand after the || sign will be selected  and we don't want that!!!!!!!!!
// if timeout=0 --> false, timeout will be 3000, they is a way to overcome it using typeof!!!!

function makeRequest(url, timeout,callback){
  timeout=timeout || 3000;
  callback=callback || function(){};
}
// first solution, we fix this by adding typeof to our function.
function makeRequest(url, timeout,callback){
  timeout=(typeof timeout !=="undefined") ? timeout : 3000;
  callback=(typeof callback!=="undefined") ? callback || function(){};
}
// second solution, using the es6 feature to provide default value to parameter

// here we don't have to check for valuemissing parameter or...
// this function expect parameter always to be passed
function makeRequest(url, timeout=3000, callback=function(){}){

}
// url is required here otherwise it will not be working
makeRequest("/foo"); // this will work and other parameter are set to default value
makeRequest("/foo",1000)// same thing here
makeRequest("/foo",1000, function(){});// same here
// whenever you need default value always use undefined

makeRequest("/foo", undefined)// in this case timeout will be 3000
makeRequest("/foo",undefined) // in this case timeout will be null
```

##### IA-III-2 spread operator

    ```javascript

    // let's play with the spread operator
    let value1=25,
    value2=30;
    console.log(Math.max(value1,value2)); // 30
    // we want to track those values in a array, Math.max doesn't allow us to pass an array

// solution using the apply()
let values=[10,20,30,40];
console.log(Math.max.apply(Math,values)); // 40, but using apply here is bit confusing!!!!

// solution using new es6 spread operator
// passing the ...[], the javascript engine will split the array into its number of arguments
// and pass it to the max
console.log(Math.max(...values)); // 40
// and we can pass others value to be filtered
console.log(Math.max(...values, 60,70));// 70
//////////////////////
let array1=[2,3];
let array2=[1,4];
let array3=[...array1,...array2];// [2,3,1,4], no need to use push slice concat...
/////// copy an array
let newArray=[...array3];
///// concatenation
let concatArray=array1.concat(array2);// [2,3,1,4]
or [...array1,...array2];

```
##### IA-III-3 Arrow functions

```javascript

  // they behave differently from javascript functions
  // we will not use the keywords: this, super, arguments, new target bindings
  // arrow function can not be called with the new parameter, thats means they don't have the //construct method, and therefore they can be use as a constructor
  // arrow function don't have prototype
  // the value of this inside the arrow function cannot be changed, it remains the same through
 // the entire lifecycle of the function.
// we also don't have the argument object

// why all that?!!!!!!!!!!!!
// the javascript engine can better optimize the execution of the function.!!!!!!!

// 1)  Binding are the common sources of error in javascript


    // Syntax
    var reflect=function(value){
      return value;
    }
     // with arrow
     var reflect=value=>value;
     // IIFE and this keywords

  //////////////////////////  solve problem using this/////////
  //  lets see ageneral javascript code

var PageHandler={
  id:"123456",
  init : function(){
    document.addEventListener("click", function(event){
      this.doSomething(event.type);   // error, in this case this is in contex of PageHandler //object instead document object
    }, false);
  },
  doSomething: function(type){
    console.log("Handling" + type + "for" + this.id);
  }
};
// first solution:

var PageHandler={
  id:"123456",
  init : function(){
    document.addEventListener("click", function(event){
      this.doSomething(event.type);   // no error, because of binding outside
    }.bind(this), false);
  },
  doSomething: function(type){
    console.log("Handling" + type + "for" + this.id);
  }
};
// second solution is to use arrow function
 var PageHandler={
  id:"123456",
  init : function(){
    // this, in this case this here will be the same as this in the arrow function.
    // we cannot change the this value within the arrow function using apply, call or...
    // this within the arrow function is this from the parent function
    document.addEventListener("click", event=>this.doSomething(event.type)
    , false);
  },
  doSomething: function(type){
    console.log("Handling" + type + "for" + this.id);
  }
};
```

##### IA-III-4 Objects Literals

```javascript
/// in regular javascript
function createPerson(name, age) {
  return {
    name: name,
    age: age
  };
}
// using es6 new way
function createPerson(name, age) {
  return {
    name,
    age
  };
}
/////////////////////////another example
// in es6 here we can have dynamic keys
var person = {},
  suffix = "name";
lastname = "last";
person["first" + suffix] = "Abhay";
person[lastName + suffix] = "Talreja";
console.log(person["first name"]); // "Abhay"
console.log(person[lastName + suffix]); // "Talreja"

//////////// cloning an oject//////////
var obj = { a: 1 };
var copy = Object.assign({}, obj);
console.log(copy); // Object:{a:1}

///////// mergin Object/////////// biggest advantage!!!!!
// when same key name , when mergin key will get latest value , if match value, key will be //replaced with the latest
var o1 = { a: 1 };
var o2 = { a: 2 };
var o3 = { a: 3 };
console.log(Object.assign({}, o1, o2, o3)); // Object{a:1,b:2,c:3}

//// comparing two objects
// work the same as === operator only +0,-0 is new here
Object.is(+0, -0); // false
Object.is(NaN, NaN); // true
Object.is(5, 5); // true
Oject.is(5, "5"); // false
```

##### IA-III-5 prototype

```javascript
let person={
  getGreeting(){
    return "Hello';
  }
};
let dog={
  getGreeting(){
    return "Woof";
  }
}
let friend=Object.create(person);
console.log(friend.getGreeting());// "Hello"
console.log(Object.getPrototypeOf(friend)===person); // true

Object.setPrototypeOf(friend,dog); // dog became  friend's parent, so we can use super to access
// parent property
console.log(friend.getGreeting());// "Woof"
console.log(Object.getPrototypeOf(friend)===person); // false, ots now dog
// the actual value of an object prototype is stored in an internal property calls prototype!!!
```

##### IA-III-6 class and Inheritance

```javascript
////  es5 class Inheritance

// create a datatype based upon another data type
// in javascript we don't really inherite datatype from another datatype,
// true inheritance in javascript come from chaining the prototypes of two or more objects together.
//but we can still write code that acts like we are inheriting datatype from another datatype.

// here the Square is inheriting from Rectangle--->Rectangle is overriding the square.prototype

// so we will to update the square.prototype to whatever prototype we want to....
// and we will need to create the constructor inside the created object.
// definetely confuing!!!!!!!!!!!!! and this is not the way we want to do Inheritance when we write the
//code

function Rectangle(length, width) {
  this.length = length;
  this.width = width;
}
Rectangle.prototype.getArea = function() {
  return this.length * this.width;
};
function Square(length) {
  Rectangle.call(this, length, length);
}
Square.prototype = Object.create(Rectangle.prototype, {
  constructor: {
    value: Square,
    enumerable: true,
    writable: true,
    configurable: true
  }
});
var square = new Square(5);
console.log(square.getArea()); //25
console.log(square instanceof Square); // true
console.log(square instanceof Rectangle); // true
// lets use es6

class Rectangle {
  constructor(length, width) {
    this.length = length;
    this.width = width;
  }
  getArea() {
    return this.length * this.width;
  }
}

class Square extends Rectangle {
  constructor(length) {
    super(length, length); // by default it calls the super constructor and we just pass the values
  }
  //If we don't pass the above constructor, javascript will add following lines for us:
  // javascript engine will pass all of our arguments to the superclass internally.
  // constructor(...args){
  //   super(...args);
  // }
}

var square = new Square(4);
console.log(square.getArea()); // 16
console.log(square instanceof Square); // true
console.log(square instanceof Rectangle); // true

// If we define getArea in the Square, square.getArea()  will call getArea() define in square
//----> overriding or shadowing!!!!!!!---> we can take a basic structure and modelling it the way we want to.
// and inside that overrided method we can still get access to the parent by calling return super.getArea();
```

<!-- #### IA-IV My Project Structure and description -->

##### IA-III-7 Deploying my app

I build a beautiful application and learned a lot , Angular features, NodeJs, Express Mongoose and Mongo features and how to connect them all to build an entire application where I have a beautiful client side angular driven application and powerful Backend powered by NodeJs, Express and MongoDB, lets deploy our application, let's move it from our local development environment to a real server in the internet where we can access it.

###### IA-III-7-1 Deployment Options

I will get two options to deploy my application:

- The first one will be to do it with two separated Apps
  . we have the Angular App and the Node REST API (Node ,Express,and MongoDB) backend
- the second one will be to deploy it with one combined App  
  .We have REST API which has a route which renders the Angular App( right now I will have to restructure my project to be able to use this case)

1)
My backend run on "localhost:3000" and my Front-end runs on "localhost:4200" => I had to start 2 processes
to work on my app (this is the model we use a lot to build SPAs).Because the angular App is just a static App , it will required a static host ( will return or serve only HTML,JS,and CSS ), others statics host=>
AWS S3, Firebase Hosting..... we need those static host because Angular App executes no server side code.
It's not connected to the Node code, we only need to work with what the browsers users: HTML,Javascript and CSS, hence a server capable of returning these files, thats all we need.(we need no server that can executes Node...)

2)
In the Backend I need a Host that is capable of running NodeJs code (NodeJS Host), which is capable of executing it (AWS EC2/ EB, Heroku,...)

.1 and 2 runs on two separated Domains during development ( they are not connected), I can deploy it this way and keep the same setup. For this case we will need the CORS Headers setted-up in the backen!
. In the case of one combined App, we will need a host that is capable of running NodeJS( NodeJS Host), its
also capable to return angular..( every host can return Angular but nor NodeJS!) in these case we will don't need the CORS Headers, because Angular will serve in the same Domain as the Backend.

###### IA-III-7-2 Deployment with 2 separated Apps approach

In our projects we had 2 Apps with separated frontent and backend Folder, we put Backend folder in Angular folder for more flexibility (switching between folder), for deployement it will make things confusing because we are not going to deploy the entire folder
. we are going to build a new folder fpor Angular App
. we will deploy the server.js file and the files in the backend folder
              let's split the app:
. let's move server.js file in Backend folder , after doing so let's update start:server target in package.JSON file.
.change app address in server.js
.copy the package.json file into the backend folder, because my backend will need certain indepencies and angular will need it too.(remove all related angular files), we will just care about the dependencies,
when we deploy our App ,the files in the dependencies will be used  by the hosting provider which hosts our NodeJS App  , because all hosting provider scan that file   and install the dependencies before starting with the Node App ---> our Node app needs them.
   - deploying our server app

In my case I will go ahead and choose AWS ( amazon web service ) to host my Application.
 . we will need to create an account there to be able to access the feature AWS Elastic Beanstalk.
 . click on create new Application
 .click on create one now after completing above step
 . choose I want to buid a web server 
 .choose NodeJS platform
 . choose upload your code
   - go in backend folder select all the files and compress them 
   - choose the compressed file in AWS
   - press upload
   - after uploading, go in configure more options and make sure low cost is checked
we just finished creating environment file for the frontend project, let's do the same for the backend project. the Angular CLI doesn't manage the Backend folder. 
So during development we can used a feature called node environment variable, NodeJs has that feature built in, and pretty much all hosting providers for nodeJS applications offer a feature which allows us to inject
global variable into our node running program. Here for the local development we can also fake this by
reconfiguring Nodemon ( the tool we are using to start the node server), for that we add a new file called 
nodemon.json to setup some global configuration ( the variable inside will be injected into our running node app!) and we will set that on our server through the hosting provider who hosts our app. Here for development we will do it with nodemon since its kind of our hosting provider here.
   . For NodeJS these gloabal variables are injected into running node process and the we can access them
   on a special object which PROCESS.ENV ( process environment object).
   - click on modify software  
   - enter node environment variable, we need to do this, because we are not using nodemon!, we will need to call our server.js with "npm run start:server"
   - click on create Environment---> we will notice that bcrypt package failed!! we will nee to install something similar

 - deploying our Angular  app (front-end)

   . we will use the CLI to build it (taking all the typescript code in the angular code and compiling that to a bunch of javascript javascript files and one HTML file, everything about Angular happens in the browser,its a client side or browser framework. It rerenders the page we are seeing in the browser  )
   . we will use the command "ng build --prod" to set all the settings to production  
   .global variable for production development will be set up in environments/environment.pro.ts file.
   . very important--> the environment file will be not use for production (for example: api_URL), we will have to do some setting in the environment.prod.ts file. Change the api_URL with the one from  aws( http://Nodeapp-env-2.pgt2ey2ica.us-east-2.elasticbeanstalk.com/api)
   .After successfuly running the command, we will get a new folder named "dist"
   .let's deploy the content of the dist folder, to be precise the content of the 
   MEAN-RESUME folder. all those files will be deploy to a static front end host

   Elastik Beanstalk is a host for dynamic content, so for php or nodeJS..
   We will use the AWS s3 service for static cloud storage, we can also use it as a static host.
    . go in service and enter s3 and choose "static cloud storage"
    . we create a new website by creating a new bucket
    . enter a name and click on create..
    . after successfuly creating the bucket , select your bucket's name
    . select upload and drag your file( file in dist/mean-resume).
    . click upload and then everything should be loaded in the bucket.
    . the bucket is only a file storage and by default not accessible by other peoples
    . To make it accessible you need to change 2 more things:
      - enter permission/bucket policy, we can click on documentation to see some examples, we will need some examples, check on "Granting Read-only Permission to an Anonymous User" because visitor on our website will be anonymous and we should give them only read access.
      .copy and paste object and press save.
      .enter now properties to enable static website hosting
       - choose use this bucket to host a website
       - in the fields index document and error document enter index.html
       the field error document is required for our angular route to work --->
       when the user enter for example: domain/auth/login, that will by default parse by the server , the server doesn't know that route ( there is no subfolder named auth or login there!) it will throw an error , by adding index.html as an error document ,it will then forward that error to the index.html file and will execute that file and since that file contains our angular app which knows its routes, the angular router can then parse the URL and render the correct component. 

  ##### III Using google devtools

.Elements--> all your html and css
.sources--> all your fonts, scripts, css fiolders and other folders
.network--> shows you all the assets that are loaded into the page with the timeline--> show you all your network requests
.performance--> show you why our webpage might be working slowly
. application--> gives us information about our application
--> most important things are Local storage and cookies info
. security panel shows u what type of security protocol your page is using and help u debug many problems with insecured scripts
.Audits --> help to figure out how to load your page quickly

  /////////debugger//////////

this is the simpliest way to see whats your code is doing

- breakpoints
  a) choose a breakpoint and then click run, function will stop at breakpoint, we can go ahead and set another breakpoint and resume the program until it reaches the breakpoint
  b) step over a statement with curved arrow with dot in center
  c) click on button play to resume script execution( breakpoint will still be visible)
  d) lets put another breakpoint and click run on the snippet
  e) you can add a second breakpoint and press f8 to resume
  -watch
  add a variable to watch to see it changing (press enter),
  you can put anything on the watch--> function call and other
  -step over
  -step in---> we can step in in the current function call by clicking on step into next function call
  -step out --> will make us back from where we're coming from, if we dont want to continue in the current function

note!!! while we are in a scope of a function, we can type variable of that scope in the console!!!!!!

cmd + enter ---> to run snippet code

--------keyboard shortcut for debugging-----

    step over f10
    step in f11
    step out shift+f11
    resume f8

mac setting---> system preferences/keyboard/ check use all f1 f2.... as standart functions keys
in mission control----> change show desktop and show dashboard to -

------/////// finding stuff in your files from developer tools////

////////////////breakpoints types////////////////
-line of code // when you know exactly where you need to stop
-conditional line of code // you wanna stop somewhere but you only want to do it when certain conditions is true
-dom // we need to stop if we know a piece of the dom is being edited and we can figure out what
piece of javascript is changing the dom
-xhr // breaking to figure out if we re going to the server to get some data
-event listener // allow us to figure what to do if there is a click for instanze
-exception // automatically call if you make a mistake in your code an exception is thrown.

   
# visual Studio Code Plugins

-  Angular Essential
- Angular Language service
- Angular Snippets
- angular2-inline
- auto import
- Beautify
- EditorConfig for Vs Code
- Material Icon Theme
- Move Ts (Move TypeScript files and update relative imports)
- Path Intellisense ( for autocompleting filenames)
- prettier - code formatter
- PrintColde ( add printing function to VS Code)
- TSLint
- TypeScript Hero

# visual Studio Code configuration
```javascript
    // this file has been reconfigured to make the platform works with Sass instead of vanilla css
    // angular.json file
     "schematics": {"@schematics/angular:component": {
        "styleext": "scss"
      }},

      //some relative paths has been fixed  using following configuration
      // tsconfig.json
      {
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./src",
    "paths":{
   "shared/*":[
     "app/shared/*"
   ],
   "shared-business/*":[
    "app/shared-business/*"
  ],
  "user/*":[
    "app/user/*"
  ],
  "user-auth/*":[
    "app/user-auth/*"
  ],
  "business/*":[
    "app/business/*"
  ],
  "game/*":[
    "app/game/*"
  ],
  "personal/*":[
    "app/personal/*"
  ],
  "home-page/*":[
    "app/home-page/*"
  ],
  "business-admin/*":[
    "app/business-admin/*"
  ],
  "app-routing-mod/*":[
    "app/app-routing-mod/*"
  ],
    },
    "outDir": "./dist/out-tsc",
    "sourceMap": true,
    "declaration": false,
    "moduleResolution": "node",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "target": "es5",
    "typeRoots": [
      "node_modules/@types"
    ],
    "lib": [
      "es2017",
      "dom"
    ]
  }
}

```



# MeanResume

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

<!-- ```

```

```

``` -->
