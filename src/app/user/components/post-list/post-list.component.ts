import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
  ElementRef,
  Input,
  Output
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../../models/posts-model/posts/post.model';
import { PostsService } from '../../services/posts.service';
import * as socketIo from 'socket.io-client';
import { AuthService } from '../../../user-auth/services/auth.service';
import { ShoppingCartService } from '../../../shared-business/services/shopping-cart.service';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  valueSeen = 'seen';
  valueNotSeen = 'not read yet';
  private server_URL = 'http://localhost:3000';
  userIsAuthenticated: boolean;
  postListSubscrip: Subscription;
  @ViewChild('expanpanel', { read: ElementRef }) expanpanel: ElementRef;
  posts: Post[] = [];
  isLoading = false;
  private postsSub: Subscription;
  private varia = 0;
  constructor(private shoppingCartService: ShoppingCartService, private postsService: PostsService, private authService: AuthService) {
  }
  ngOnInit() {
    this.shoppingCartService.changeNotInhome(true);
    this.postsService.changeUpdateMessageStatus(this.postsService.allPosts);
    this.postsService.getPosts();
    this.postsSub = this.postsService
      .initializePostsList
      .subscribe((data) => {
        this.isLoading = false;
        this.posts = data;
        this.postListSubscrip = this.authService.authenticationStatusListener.subscribe(isAuthenticated => {
          this.userIsAuthenticated = isAuthenticated;
        });
      });
    this.postsService
      .newPostsList
      .subscribe((data) => {
        this.setPostsLists(data);
      });
  }
  hideMessageIcon(data: Post) {
    if (data.messageStatus === 'not read yet') {
      data.messageStatus = 'seen';
      this.postsService.updatePost(
        data.id,
        data.title,
        data.content,
        data.imagePath,
        data.messageStatus
      );
      this.postsService.changeUpdateMessageStatus(this.postsService.allPosts);
      this.varia = this.varia + 1;
    }
    if (this.varia === this.postsService.allPosts.length - 1) {
      this.postsService.changeNewMessageSignal(false);
    }
  }
  setPostsLists(newList) {
    this.posts = newList;
  }
  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.postListSubscrip.unsubscribe();
  }
}
