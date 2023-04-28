import { Component } from '@angular/core';
import { TextService } from '../text.service';
import { HighScoresService } from '../high-scores.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css'],
})
export class PlayComponent {
  gameInProgress = false;
  gameFinished = false;
  timer = 0;
  currentRound = 0;
  score = 0;
  currentText = '';
  playerTextInput = '';
  scoreSubmitted = false;

  constructor(
    private textService: TextService,
    private highScoresService: HighScoresService
  ) {}

  postHighScore() {
    const unparsedToken = localStorage.getItem('userToken');
    if (!unparsedToken) {
      return;
    }
    const { token }: { token: string } = JSON.parse(unparsedToken);
    this.highScoresService.postHighScore(token, this.score)?.subscribe(() => {
      this.scoreSubmitted = true;
      alert('Score successfully submitted!');
    });
  }

  setCurrentRoundTime() {
    this.timer = 60;
  }

  get currentTextArray() {
    return this.currentText.split('');
  }

  updateScore() {
    const newScore = this.currentText.length * 5;
    this.score = this.score + newScore;
  }

  startNextRound() {
    const unparsedToken = localStorage.getItem('userToken');
    if (!unparsedToken) {
      return;
    }
    const { token }: { token: string } = JSON.parse(unparsedToken);
    if (token) {
      this.textService.getRandomText(token).subscribe({
        next: (data) => {
          this.currentText = data.text.trim();
        },
        error: (error) => console.error(error),
      });
    }
  }

  startTimer() {
    let interval = setInterval(() => {
      this.timer -= 1;
      if (this.timer <= 0) {
        clearInterval(interval);
        this.endGame();
      }
    }, 1000);
  }

  endGame() {
    this.gameInProgress = false;
    this.gameFinished = true;
  }

  updateText() {
    const currentTextSpan = document.querySelectorAll('span');
    const playerInput = this.playerTextInput.split('');
    let currentTypedIndex = playerInput.length - 1;
    currentTextSpan?.forEach((span, index) => {
      const letter = playerInput[index];
      if (currentTypedIndex >= index) {
        span.classList.add('typed');
      }
      if (letter === span.innerText) {
        span.classList.add('correct');
        span.classList.remove('incorrect');
      } else {
        span.classList.remove('correct');
        span.classList.add('incorrect');
      }
    });

    if (this.currentText === this.playerTextInput) {
      this.updateScore();
      this.startNextRound();
      this.playerTextInput = '';
      currentTextSpan.forEach((span) => span.classList.remove('typed'));
    }
  }

  startGame() {
    this.gameInProgress = true;
    this.scoreSubmitted = false;
    this.score = 0;
    this.setCurrentRoundTime();
    this.startNextRound();
    this.startTimer();
  }
}
