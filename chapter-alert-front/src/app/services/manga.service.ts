import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Manga } from '../models/manga';
@Injectable({
  providedIn: 'root',
})
export class MangaService {
  private httpClient = inject(HttpClient);
  constructor() {}

  getManga(): Observable<Manga[]> {
    return this.httpClient.get<{ data: Manga[] }>(`http://api:3000/manga`).pipe(
      map((res) => {
        return res.data;
      })
    );
  }
}
