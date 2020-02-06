import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsService } from '../../../user/services/posts.service';
import { ShoppingCartService } from '../../../shared-business/services/shopping-cart.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  usersPosts = [];
  messagesUpdatedNotSeenToSeen = [];
  messagesNotSeen = [];
  newMessageVisibility = false;
  allPostsSaved = [];
  allUnreadPosts = [];
  addNewPostInArray = [];
  initializePostsListSubscription: Subscription;
  newPostsListSubscription: Subscription;
  updateMessageStatussubscription: Subscription;
  constructor(private shoppingCartService: ShoppingCartService, private postsService: PostsService) {
  }
  ngOnInit() {
    this.shoppingCartService.changeNavBarVisible(true);
    this.initializePostsListSubscription = this.postsService.initializePostsList.subscribe(data4 => {
      this.toggleNewMessageIconVisibilityInit(data4);
    }
    );
    this.newPostsListSubscription = this.postsService.newPostsList.subscribe(data => {
      this.addNewPostInArray = data.filter(data5 => data5.messageStatus === 'not read yet');
      this.toggleNewMessageIconVisibility(this.addNewPostInArray);
    }
    );
    this.updateMessageStatussubscription = this.postsService.updateMessageStatus.subscribe(data3 => {
      this.messagesNotSeen = data3.filter(data4 =>
        data4.messageStatus === 'not read yet'
      );
      this.toggleNewMessageIconVisibility(this.messagesNotSeen);
    });
  }
  toggleNewMessageIconVisibilityInit(data) {
    this.allUnreadPosts = data.filter(data2 =>
      data2.messageStatus === 'not read yet'
    );
    if (this.allUnreadPosts.length === 0) {
      this.newMessageVisibility = false;
    } else {
      this.newMessageVisibility = true;
    }
  }
  toggleNewMessageIconVisibility(data: any) {
    if (data.length !== 0) {
      this.newMessageVisibility = true;
    } else if (data.length === 0) {
      this.newMessageVisibility = false;
    }
  }
  ngOnDestroy() {
    this.newPostsListSubscription.unsubscribe();
    this.initializePostsListSubscription.unsubscribe();
    this.updateMessageStatussubscription.unsubscribe();
  }
}
