import { Component, input } from '@angular/core';
import { Manga } from '../../models/manga';

@Component({
  selector: 'app-manga',
  templateUrl: './manga.component.html',
  styleUrl: './manga.component.scss',
})
export class MangaComponent {
  manga = input.required<Manga>();
}
