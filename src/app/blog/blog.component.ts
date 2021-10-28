import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogPosts: Array<BlogPost>;
  page: number = 1;
  tag: string = '';
  category: string = '';
  querySub: any;
  
  constructor(private data: PostService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.querySub = this.route.queryParams.subscribe(params => {
      if(params['tag']){
        this.tag = params['tag'];
        this.category = '';
      } else {
        this.tag = '';
      }
      if(params['category']){
        this.category = params['category'];
        this.tag = '';
      } else {
        this.category = '';
      }
      this.getPage(+params['page'] || 1);
     });
  }

  reData: Array<BlogPost> = [];
  getPage(num: number): void {
    this.data.getPosts(num, this.tag, this.category).subscribe(redata =>{
      if (redata.length > 0) {
        this.blogPosts = redata;
        this.page = num;
      }
    });
  }

  ngOnDestroy(): void {
    if(this.querySub) this.querySub.unsubscribe();
  }
}
