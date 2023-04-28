import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environment';
import { map } from 'rxjs/operators';
import { Score } from './types';

@Injectable({
  providedIn: 'root',
})
export class HighScoresService {
  constructor(private http: HttpClient) {}

  order = 'desc';

  getHighScores() {
    return this.http
      .get<{ [key: string]: Score }>(
        `${environment.DATABASE_URL}/scores?order=${this.order}`
      )
      .pipe(
        map((res) => {
          const highScores = [];
          for (const key in res) {
            if (res.hasOwnProperty(key)) {
              highScores.push({ ...res[key], id: Number(key) });
            }
          }
          return highScores;
        })
      );
  }

  postHighScore(userToken: string, score: number) {
    if (userToken) {
      return this.http.post<number>(
        `${environment.DATABASE_URL}/scores`,
        { score },
        { headers: { authorization: `Bearer ${userToken}` } }
      );
    } else {
      return;
    }
  }
}
