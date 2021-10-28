import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { BlogPost } from '../BlogPost';

@Component({
  selector: 'app-posts-table',
  templateUrl: './posts-table.component.html',
  styleUrls: ['./posts-table.component.css']
})
export class PostsTableComponent implements OnInit {
  blogPosts: Array<BlogPost> = [];

  constructor(private data: PostService, private router: Router) { }

  ngOnInit(): void {
    this.data.getAllPosts().subscribe(reData => this.blogPosts = reData);
  }

  rowClicked(e: any, id: any) {
    this.router.navigate(['/admin/post', id]);
  }
}
