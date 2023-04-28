import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HighScoresService } from '../high-scores.service';
import { Score } from '../types';

@Component({
  selector: 'app-high-scores',
  templateUrl: './high-scores.component.html',
  styleUrls: ['./high-scores.component.css'],
})
export class HighScoresComponent implements OnInit {
  highScores: Score[] = [];

  constructor(private highScoreService: HighScoresService) {}

  ngOnInit(): void {
    this.highScoreService.getHighScores().subscribe((highScores) => {
      this.highScores = highScores;
    });
  }
}
