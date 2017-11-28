import { Component, OnInit } from '@angular/core';

import { PostService } from '../post.service';
import { Post } from '../Post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})

export class PostsComponent implements OnInit {
  posts: Post[];
  selectedPost: Post;
  post: Post;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.showPosts();
  }

  showPosts(): void {
    this.postService.getPosts()
        .subscribe(posts => this.posts = posts);
  }

  add(content: string): void {
    content = content.trim();

    if (!content) { return; }

    this.postService.createPost(content)
        .subscribe(post => this.posts.push(post));
  }

  delete(id: string): void {
    this.postService.deletePost(id)
        .subscribe(() => {
          this.posts = this.posts.filter(p => p._id !== id);
        });
  }

  onSelect(post: Post): void {
    this.selectedPost = post;
  }

  update(): void {
      this.post = this.selectedPost;
      this.postService.updatePost(this.post)
          .subscribe(post => {
            this.post = post;
            this.goBack();
          });
  }

  goBack(): void {
      this.showPosts();
  }

}
