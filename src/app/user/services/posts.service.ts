

// -----------------------------------------

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Post } from '../models/posts-model/posts/post.model';
import * as socketIo from 'socket.io-client';
import {environment} from '../../../environments/environment';

const BACKEND_URL = environment.api_URL + '/posts';
const server_URL = environment.server_URL;

@Injectable({ providedIn: 'root' })

export class PostsService {
  // private me;
  // private server_URL = 'http://localhost:3000';
  // private socket = socketIo.connect(this.server_URL);
  // private socket = socketIo.io();
  private reconnection = true;
  private reconnectionDelay = 5000;
  private reconnectionTry = 0;
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  private makeVisibleMessageSignalIcon = false;
  private receiveFromSocket = [];
  private socketFromRoutesClient;
  // private newMessageSignal = false;
  private _newMessageSignal: BehaviorSubject<boolean>;
  private _newMessage: BehaviorSubject<any>;
  private _newPostsList: BehaviorSubject<any>;
  private _sendSignalIconToChat: BehaviorSubject<any>;
  private _initializePostsList: BehaviorSubject<any>;
  private _updateMessageStatus: BehaviorSubject<any>;
  // private _newMessage: BehaviorSubject<any>;
  private _messageFromServerSocket: BehaviorSubject<any>;
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this._newMessageSignal = new BehaviorSubject<boolean>(false);
    this._newMessage = new BehaviorSubject(null);
    this._newPostsList = new BehaviorSubject([]);
    this._sendSignalIconToChat = new BehaviorSubject(false);
    this._initializePostsList = new BehaviorSubject([]);
    this._updateMessageStatus = new BehaviorSubject([]);
    const me = this;
    this._newMessageSignal.subscribe((value: boolean) => {
      // if (value === true) {
      ((data) => {

        socketIo(server_URL, { transports: ['websocket']}).emit(data, { response: value });
      })('messageSignalIconFromFrontend');

      //   this.makeVisibleMessageSignalIcon = true;
      // } else {
      //   this.makeVisibleMessageSignalIcon = false;
      // }
    });
    socketIo(server_URL, { transports: ['websocket']}).on('messageSignalIconFromBackend', function (data2) {
      // if(data2.response===true){
      // this.makeVisibleMessageSignalIcon = data2.response;
      // }
      me.changeSendSignalIconToChat(data2.response);
    });

    ((data) => {
      //  console.log('socketio', this.server_URL);
      socketIo(server_URL, { transports: ['websocket']}).on(data, function (data2) {
        console.log('from server', data2);
        me.changeNewPostsList(data2.response);
        // me.posts = data2.response;
        // me.postsUpdated.next([...data2.response]);
      });
    })('allPostsFromBackend');

    this.newPostsList.subscribe(data => {
      me.posts = data;
    });
  }  /// end constructor
  get updateMessageStatus() {
    return this._updateMessageStatus;
  }

  changeUpdateMessageStatus(newVal: any) {
    this._updateMessageStatus.next(newVal);
  }
  get messageFromServerSocket() {
    return this._messageFromServerSocket;
  }

  changeMessageFromServerSocket(newVal: any) {
    this._messageFromServerSocket.next(newVal);
  }

  get initializePostsList() {
    return this._initializePostsList;
  }

  changeInitializePostsList(newVal: any) {
    this._initializePostsList.next(newVal);
  }
  get sendSignalIconToChat() {
    return this._sendSignalIconToChat;
  }

  changeSendSignalIconToChat(newVal: any) {
    this._sendSignalIconToChat.next(newVal);
  }
  // })('newMessage');

  //   get serverSocket() {
  //     return this._ServerSocket;
  //   }
  //  changeServerSocket(newVal: any) {
  //     this._ServerSocket.next(newVal);
  //   }
  get allPosts() {
    return this.posts;
  }
  isVisibleMessageSignalIcon() {
    this.sendSignalIconToChat.subscribe((data) => {
      this.makeVisibleMessageSignalIcon = data;
    });
    // socketIo(this.server_URL).on('messageSignalIconFromBackend', function (data2) {
    //   // if(data2.response===true){
    //   this.makeVisibleMessageSignalIcon = data2.response;
    //   // }
    // });
    // console.log(this.makeVisibleMessageSignalIcon);
    return this.makeVisibleMessageSignalIcon;
  }
  get newMessage() {
    return this._newMessage;
  }
  changeNewMessage(newVal: any) {
    this._newMessage.next(newVal);
  }
  get newPostsList() {
    return this._newPostsList;
  }
  changeNewPostsList(newVal: any) {
    this._newPostsList.next(newVal);
  }
  get newMessageSignal() {
    return this._newMessageSignal;
  }
  changeNewMessageSignal(newVal: boolean) {
    this._newMessageSignal.next(newVal);
    // return this._newMessageSignal;
  }


  getPosts() {  // recupere tous les post du serveur
    this.http
      .get<{ message: string; posts: any }>(BACKEND_URL)
      .pipe(
        map(postData => {
          return postData.posts.map(post => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
              imagePath: post.imagePath,
              messageStatus: post.messageStatus
            };
          });
        })
      )
      .subscribe(transformedPosts => {

        // console.log(transformedPosts);

        if (transformedPosts.length === 0) {
          console.log('no posts');
          this.changeNewMessageSignal(false);
        }
        //  ((data) => {
        //    console.log('emit from frontend');
        //   socketIo(this.server_URL).emit(data, { response: transformedPosts });
        // })('allPostsFromFrontend');

        this.posts = transformedPosts;
        this.changeInitializePostsList(this.posts);

        // this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{ _id: string, title: string, content: string, imagePath: string, messageStatus: string }>(
      BACKEND_URL + '/' + id
    );
  }

  // addPost(title: string, content: string, image?: File, messageStatus: string) {
  addPost(content: string, messageStatus: string, title?: string, image?: File) {
    const me = this;
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);
    postData.append('messageStatus', messageStatus);

    // ((data) => {
    //   socketIo( this.server_URL ).emit(data, {response: postData});
    //  })('createMessage');

    //  ((data) => {
    //   socketIo( this.server_URL ).on(data, function(data2) {
    //     console.log('from server', data);
    //   });
    //  })('newMessage');

    this.http
      .post<{ message: string, post: Post }>(
        BACKEND_URL,
        postData
      )
      .subscribe(responseData => {



        //  ((data) => {
        //   socketIo( this.server_URL ).on(data, function(data2) {
        //     console.log('from server', data2);
        //   });
        //  })('allPostsFromFrontend');
        // -------------------------------------
        //  (function(data) = {
        //   socketIo( this.server_URL ).emit(data, {response: responseData});
        //  })('createMessage');
        // //  socketIo(this.server_URL).emit('createMessage', {response: responseData});
        //  socketIo(this.server_URL).on('newMessage', function(data) {
        //    console.log('from server', data);
        //  });
        // socketIo(server_URL).emit('message', responseData);
        // this.emitterEvent(responseData);
        // this.receiveEvent();

        // me.socketFromRoutesClientData().emit('essai', { d: 4 } );
        // me.socketFromRoutesClientData().on('essai_res', function(data) {
        //   console.log('essai_res:', data);
        // });

        // console.log(responseData);
        // this.messageFromServerSocket.subscribe((data3) => {
        //   const post: Post = {
        //     id: data3.post.id,
        //     title: data3.title,
        //     content: data3.post.content,
        //     imagePath: data3.post.imagePath,
        //     messageStatus: 'not read yet'
        //   };
        //   console.log(post);
        //   this.posts.push(post);
        //   this.postsUpdated.next([...this.posts]);
        //   this.changeNewMessageSignal(true);
        // });
        if (responseData.post.imagePath) {
          const post: Post = {
            id: responseData.post.id,
            title: title,
            content: content,
            imagePath: responseData.post.imagePath,
            messageStatus: 'not read yet'
          };
          // console.log(post);
          me.posts.push(post);

          // me.changeNewPostsList(me.posts);
          me.changeNewMessage(responseData);

          // this.postsUpdated.next([...this.posts]);
          me.changeNewMessageSignal(true);

          ((data) => {
            console.log('emit from frontend');
            socketIo(server_URL, { transports: ['websocket']}).emit(data, { response: me.posts });
          })('allPostsFromFrontend');

          //  this.router.navigate(['../', 'postlist'], {relativeTo: this.route});
          // this.router.navigate(['./'], {relativeTo: this.route});
        } else {
          // responseData.post.imagePath = null;
          const post: Post = {
            id: responseData.post.id,
            title: title,
            content: content,
            imagePath: '',
            messageStatus: 'not read yet'
          };
          // console.log(post);
          me.posts.push(post);

          // me.changeNewPostsList(me.posts);
          me.changeNewMessage(responseData);

          // this.postsUpdated.next([...this.posts]);
          me.changeNewMessageSignal(true);

          ((data) => {
            console.log('emit from frontend', me.posts);
            socketIo(server_URL, { transports: ['websocket']}).emit(data, { response: me.posts });
          })('allPostsFromFrontend');
        } // end else
      });
    // socketIo(server_URL).on('message', (data) => {
    //   console.log('data:', data );
    // });

  }
  // emitterEvent(data: any) {
  //   console.log('emit');
  //   socketIo(this.server_URL).emit('message', data);
  // }
  receiveEvent() {
    // socketIo(this.server_URL).on('messageFetched', (data) => {
    //   console.log('data:');
    //   this.receiveFromSocket.push(data);
    //   console.log(this.receiveFromSocket);
    // });
  }

  updatePost(id: string, title: string, content: string, image: string, messageStatus: string) {
    // const imagePath2 = image;
    let postData: Post | FormData;
    if (image) {
      if (typeof image === 'object') {
        postData = new FormData();
        postData.append('id', id);
        postData.append('title', title);
        postData.append('content', content);
        postData.append('image', image, title);
      } else {
        postData = {
          id: id,
          title: title,
          content: content,
          imagePath: image,
          messageStatus: messageStatus
        };
      }
      this.http
        .put(BACKEND_URL + '/' + id, postData)
        .subscribe(response => {
          // console.log(response['post'].imagePath);
          const updatedPosts = [...this.posts];
          const oldPostIndex = updatedPosts.findIndex(p => p.id === id);
          const post: Post = {
            id: id,
            title: title,
            content: content,
            imagePath: response['post'].imagePath,
            messageStatus: messageStatus
          };
          updatedPosts[oldPostIndex] = post;
          this.posts = updatedPosts;
          this.postsUpdated.next([...this.posts]);
          // this.router.navigate(['/']);
        });
    } else {
      if (typeof image === 'object') {
        postData = new FormData();
        postData.append('id', id);
        postData.append('title', title);
        postData.append('content', content);
        postData.append('image', '', title);
      } else {
        postData = {
          id: id,
          title: title,
          content: content,
          imagePath: '',
          messageStatus: messageStatus
        };
      }
      this.http
        .put(BACKEND_URL + '/' + id, postData)
        .subscribe(response => {
          // console.log(response['post'].imagePath);
          const updatedPosts = [...this.posts];
          const oldPostIndex = updatedPosts.findIndex(p => p.id === id);
          const post: Post = {
            id: id,
            title: title,
            content: content,
            imagePath: response['post'].imagePath,
            messageStatus: messageStatus
          };
          updatedPosts[oldPostIndex] = post;
          this.posts = updatedPosts;
          this.postsUpdated.next([...this.posts]);
          // this.router.navigate(['/']);
        });
    }// end else
  }

  deletePost(postId: string) {
    this.http
      .delete(BACKEND_URL + '/' + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        // this.postsUpdated.next([...this.posts]);
        this.changeNewPostsList(this.posts);

      });
  }
}
