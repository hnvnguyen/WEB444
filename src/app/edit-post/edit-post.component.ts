import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogPost } from '../BlogPost';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  blogPost: BlogPost;
  tags: string;
  sub: any;
  constructor(private data: PostService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.sub = this.route.params.subscribe(params => {
      this.data.getPostbyId(id).subscribe(reData => {
        this.tags = reData.tags.toString();
        this.blogPost = reData ;
      });
    });
    
  }

  formSubmit(): void {
    this.blogPost.tags = this.tags.split(",").map(tag => tag.trim()); // convert the string to an array and remove whitespace
    this.data.updatePostById(this.blogPost._id, this.blogPost).subscribe(reData => this.blogPost = reData);
    this.router.navigate(['/admin']).then(() => {
      window.location.reload();
    });
  }

  deletePost(): void {
    this.data.deletePostById(this.blogPost._id).subscribe(reData => this.blogPost = reData);
    this.router.navigate(['/admin']).then(() => {
      window.location.reload();
    });
  }
}
