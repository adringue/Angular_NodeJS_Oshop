import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../models/posts-model/posts/post.model';
import { mimeType } from 'shared/help-functions/mime-type.validator';
import { AuthService } from '../../../user-auth/services/auth.service';
import { ShoppingCartService } from '../../../shared-business/services/shopping-cart.service';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit, OnDestroy {
  enteredTitle = '';
  enteredContent = '';
  post: Post;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  private mode = 'create';
  private postId: string;
  userIsAuthenticated = false;
  private postCreateSubcrip: Subscription;
  constructor(
    private shoppingCartService: ShoppingCartService,
    public postsService: PostsService,
    public route: ActivatedRoute,
    private authService: AuthService
  ) { }
  ngOnInit() {
    this.shoppingCartService.changeNotInhome(true);
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
            imagePath: postData.imagePath ? postData.imagePath : '',
            messageStatus: 'not read yet'
          };
          this.form.setValue({
            title: this.post.title,
            content: this.post.content,
            image: this.post.imagePath
          });
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
    this.postCreateSubcrip = this.authService.authenticationStatusListener
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }
  ngOnDestroy() {
    this.postCreateSubcrip.unsubscribe();
  }
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
  onSavePost() {
    if (this.form.invalid) {
      if (this.form.value.content && !this.form.value.image) {
        this.form.value.image = null;
        this.form.value.title = 'no-title';
      } else if (this.form.value.content && this.form.value.image) {
        this.form.value.image = this.form.value.image;
        this.form.value.title = 'no-title';
      } else {
        return;
      }
    }
    if (this.form.get('image').value) {
      this.isLoading = false;
      if (this.mode === 'create') {
        this.postsService.addPost(
          this.form.value.content,
          'not read yet',
          this.form.value.title,
          this.form.value.image
        );
        this.postsService.receiveEvent();
      } else {
        this.postsService.updatePost(
          this.postId,
          this.form.value.title,
          this.form.value.content,
          this.form.value.image,
          'not read yet'
        );
      }
      this.form.reset();
    } else {
      this.isLoading = false;
      if (this.mode === 'create') {
        this.postsService.addPost(
          this.form.value.content,
          'not read yet',
          this.form.value.title,
          this.form.value.image
        );
        this.postsService.receiveEvent();
      } else {
        this.postsService.updatePost(
          this.postId,
          this.form.value.title,
          this.form.value.content,
          this.form.value.image,
          'not read yet'
        );
      }
      this.form.reset();
    }
  }
}
