import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { Text } from './types';

@Injectable({
  providedIn: 'root',
})
export class TextService {
  constructor(private http: HttpClient) {}

  getRandomText(userToken: string) {
    return this.http.get<Text>(`${environment.DATABASE_URL}/text/random`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
  }
}
