import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  blogPosts: Array<BlogPost>;
  constructor(private data: PostService) { }

  ngOnInit(): void {
    this.data.getPosts(1, null, null).subscribe(reData => this.blogPosts = reData.slice(-4, -1));
  }

}
