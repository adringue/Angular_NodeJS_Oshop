import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthService } from './user-auth/services/auth.service';
import { GameService } from './game/services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular app';
  // hideMainHeader: boolean;
  // private post = {};
  constructor(private http: HttpClient, private authService: AuthService , private gameService: GameService) { }
  ngOnInit() {
       this.authService.autoAuthUser();
        // this.gameService.allPerformances();
    // this.http.get<{ message: string; posts: any }>('http://localhost:3000/api/posts')
    //   .pipe(map((data) => {
    //     return data.posts.map(post => {
    //       return {
    //         title: post.title,
    //         content: post.content,
    //         id: post._id
    //       };
    //     });
    //   }))
    //   .subscribe((transformedPosts) => {
    //    // console.log(transformedPosts);
    //   });
    // this.http.post('http://localhost:3000/api/posts', { title: 'adrisop', content: 'yuuu' }).subscribe((data) => {
    //   console.log(data);
    // });
  }
  // hideHeader() {
  //   return  this.authService.getHideMainHeader();
  // }
}
