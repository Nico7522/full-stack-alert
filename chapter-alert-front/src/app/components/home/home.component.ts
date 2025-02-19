import { Component, inject } from '@angular/core';
import { MangaComponent } from '../manga/manga.component';
import { MangaService } from '../../services/manga.service';
import { AsyncPipe } from '@angular/common';
import { tap } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [MangaComponent, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly #mangaService = inject(MangaService);

  mangaList$ = this.#mangaService.getManga().pipe(tap((_) => console.log(_)));
}
