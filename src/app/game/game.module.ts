import { GameService } from './services/game.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyGameComponent } from './components/my-game/my-game.component';
import { GameAlertComponent } from './components/cards-game/game-alert/game-alert.component';
import { GameCardComponent } from './components/cards-game/game-card/game-card.component';
import { GameContainerComponent } from './components/cards-game/game-container/game-container.component';
import { GameContinueButtonComponent } from './components/cards-game/game-continue-button/game-continue-button.component';
import { GameEndWindowComponent } from './components/cards-game/game-end-window/game-end-window.component';
import { GameBoardComponent } from './components/cards-game/game-board/game-board.component';
import { GameMoveComponent } from './components/cards-game/game-move/game-move.component';
import { GameMyGameComponent } from './components/cards-game/game-my-game/game-my-game.component';
import { GamePauseComponent } from './components/cards-game/game-pause/game-pause.component';
import { GameRestartComponent } from './components/cards-game/game-restart/game-restart.component';
import { GameSternComponent } from './components/cards-game/game-stern/game-stern.component';
import { GameStartButtonComponent } from './components/cards-game/game-start-button/game-start-button.component';
import { GameTimerComponent } from './components/cards-game/game-timer/game-timer.component';
import { ChatComponent } from './components/chat/chat.component';
import { PortraitComponent } from './components/portrait/portrait.component';
import { PerformancesListComponent } from './components/performances-list/performances-list.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { PerformanceBarChartComponent } from './components/performance-bar-chart/performance-bar-chart.component';
import { MyBestPerformanceComponent } from './components/my-best-performance/my-best-performance.component';
import { UserModule } from 'user/user.module';

@NgModule({
  imports: [
    CommonModule,
    UserModule
  ],
  declarations: [MyGameComponent, GameAlertComponent,
    GameCardComponent,
    GameContainerComponent,
    GameContinueButtonComponent,
    GameEndWindowComponent,
    GameBoardComponent,
    GameMoveComponent,
    GameMyGameComponent,
    GamePauseComponent,
    GameRestartComponent,
    GameSternComponent,
    GameStartButtonComponent,
    GameTimerComponent,
    ChatComponent,
    PortraitComponent,
    PerformancesListComponent,
    BarChartComponent,
    PerformanceBarChartComponent,
    MyBestPerformanceComponent,
  ],
  providers: [GameService]
})
export class GameModule { }
