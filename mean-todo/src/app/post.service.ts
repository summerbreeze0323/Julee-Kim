import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Post } from './post';

@Injectable()
export class PostService {
  private postsUrl = 'api/posts';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getPosts(): Observable<Post[]> {
    return this.http.get(this.postsUrl)
        .map(res => res.json() as Post[])
        .catch(this.handleError);
  }

  createPost(content: string): Observable<Post> {
    return this.http.post(this.postsUrl, JSON.stringify({content: content}), {headers: this.headers})
        .map(res => res.json() as Post)
        .catch(this.handleError);
  }

  deletePost(id: string): Observable<void> {
    const url = `${this.postsUrl}/${id}`;

    return this.http.delete(url, {headers: this.headers})
        .catch(this.handleError);
  }

  updatePost(post: Post): Observable<Post> {
    const url = `${this.postsUrl}/${post._id}`;

    return this.http.put(url, JSON.stringify(post), {headers: this.headers})
        .map(() => post)
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
      console.error('An error occurred', error);
      return Promise.reject(error.message || error);
  }
}
