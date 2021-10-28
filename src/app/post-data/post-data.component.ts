import { Component, Input, OnInit } from '@angular/core';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-data',
  templateUrl: './post-data.component.html',
  styleUrls: ['./post-data.component.css']
})
export class PostDataComponent implements OnInit {
  post: BlogPost;
  querySub: any;
  commentName: string;
  commentText: string;
  
  constructor(private data: PostService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.querySub = this.route.params.subscribe(params => {
      //TODO: Get post by Id params['id'] and store the result in this.post
      this.data.getPostbyId(params['id']).subscribe(reData => {
        this.post = reData;
        this.post.views++;
        this.data.updatePostById(this.post._id, this.post).subscribe();
      });
     })
  }

  submitComment(): void {
    this.post.comments.push({author: this.commentName, comment: this.commentText, date: new Date().toLocaleDateString()});
    this.data.updatePostById(this.post._id, this.post).subscribe(reData => {
      this.commentName = "";
      this.commentText = "";
    });

  }

  ngOnDestroy(): void {
    if(this.querySub) this.querySub.unsubscribe();
  }

}
