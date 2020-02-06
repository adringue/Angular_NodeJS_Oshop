import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  ViewEncapsulation,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { GameService } from '../../services/game.service';
import { AuthService } from '../../../user-auth/services/auth.service';
import { VisitorPerformances } from '../../models/visitor-game-performances.model';
import * as D3 from 'd3';
import { ShoppingCartService } from '../../../shared-business/services/shopping-cart.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-performance-bar-chart',
  templateUrl: './performance-bar-chart.component.html',
  styleUrls: ['./performance-bar-chart.component.css']
})
export class PerformanceBarChartComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('chart')
  chartContainer: ElementRef;
  private performancesData = [];
  private host: D3.Selection;
  private svg: D3.Selection;
  private width: number;
  private height: number;
  private radius: number;
  private htmlElement: HTMLElement;
  private numberOfMovesEqual8 = [];
  private numberOfMovesGT8andLT20 = [];
  private numberOfMovesGT20 = [];
  private numberOfMovesLT8 = [];
  private numberOfMovesEqual11 = [];
  statsData = [];
  statsData2 = [];
  statsData3 = [];
  accessAllPerfsTransSubscription: Subscription;
  dataAfterPageReloadSubscription: Subscription;
  accessAllPerfsSubscription: Subscription;
  constructor(
    private shoppingCartService: ShoppingCartService,
    private gameService: GameService,
    private authService: AuthService
  ) {
  }
  ngOnInit() {
    const me = this;
    this.accessAllPerfsTransSubscription = this.gameService.accessAllPerformancesTransformed.subscribe(data => {
      if (data) {
        this.statsData2 = data;
      }
    });
    this.dataAfterPageReloadSubscription = this.gameService.statsData2AfterReloadingThePage.subscribe(data => {
      if (data) {
        this.statsData2 = data;
      }
    });
    this.shoppingCartService.changeNotInhome(true);
    this.gameService.allPerformances();
    this.accessAllPerfsSubscription = this.gameService.accessAllPerformances.subscribe(data => {
      if (data) {
        // tslint:disable-next-line:forin
        for (const entry in data) {
          me.performancesData.push(data[entry].numberOfMoves);
        }
        this.numberOfMovesEqual8 = me.performancesData.filter(
          data3 => data3 === 8
        );
        this.numberOfMovesGT8andLT20 = me.performancesData.filter(
          data3 => data3 > 8 && data3 <= 20
        );
        this.numberOfMovesGT20 = me.performancesData.filter(
          data3 => data3 > 20
        );
        this.numberOfMovesEqual11 = me.performancesData.filter(
          data3 => data3 === 11
        );
        this.numberOfMovesLT8 = me.performancesData.filter(data3 => data3 < 8);
        if (this.numberOfMovesEqual8.length !== 0) {
          this.statsData.push({
            label: '=8',
            value: this.numberOfMovesEqual8.length
          });
        }
        if (this.numberOfMovesGT8andLT20.length !== 0) {
          this.statsData.push({
            label: '8<&&<20',
            value: this.numberOfMovesGT8andLT20.length
          });
        }
        if (this.numberOfMovesGT20.length !== 0) {
          this.statsData.push({
            label: '>20',
            value: this.numberOfMovesGT20.length
          });
        }
        if (this.numberOfMovesLT8.length !== 0) {
          this.statsData.push({
            label: '<8',
            value: this.numberOfMovesLT8.length
          });
        }
        if (this.numberOfMovesEqual11.length !== 0) {
          this.statsData.push({
            label: '= 11',
            value: this.numberOfMovesEqual11.length
          });
        }
        this.gameService.changeAccessAllPerformancesTransformed(this.statsData);
      }
    });
  }
  ngAfterViewInit() {
    if (this.statsData2.length === 0) {
      this.gameService.accessAllPerformancesTransformed.subscribe(data => {
        if (data) {
          this.gameService.changeStatsData2AfterReloadingThePage(data);
          this.htmlElement = this.chartContainer.nativeElement;
          this.host = D3.select(this.htmlElement);
          this.setup();
          this.buildSVG();
          this.buildPie();
        }
      });
    } else {
      this.gameService.changeAccessAllPerformancesTransformed(this.statsData2);
      this.htmlElement = this.chartContainer.nativeElement;
      this.host = D3.select(this.htmlElement);
      this.setup();
      this.buildSVG();
      this.buildPie();
    }
  }
  private setup(): void {
    this.width = 250;
    this.height = 250;
    this.radius = Math.min(this.width, this.height) / 2;
  }
  private buildSVG(): void {
    this.host.html('');
    this.svg = this.host
      .append('svg')
      .attr('viewBox', `0 0 ${this.width} ${this.height}`)
      .append('g')
      .attr('transform', `translate(${this.width / 2},${this.height / 2})`);
  }
  private buildPie(): void {
    const pie = D3.layout.pie();
    const values = this.statsData2.map(data => data.value);
    const arcSelection = this.svg
      .selectAll('.arc')
      .data(pie(values))
      .enter()
      .append('g')
      .attr('class', 'arc');
    this.populatePie(arcSelection);
  }
  private populatePie(arcSelection: D3.Selection<D3.layout.pie.Arc>): void {
    const innerRadius = this.radius - 50;
    const outerRadius = this.radius - 10;
    const pieColor = D3.scale.category20c();
    const arc = D3.svg.arc<D3.layout.pie.Arc>().outerRadius(outerRadius);
    arcSelection
      .append('path')
      .attr('d', arc)
      .attr('fill', (datum, index) => {
        return pieColor(this.statsData2[index].label);
      });
    arcSelection
      .append('text')
      .attr('transform', (datum: any) => {
        datum.innerRadius = 0;
        datum.outerRadius = outerRadius;
        return 'translate(' + arc.centroid(datum) + ')';
      })
      .text((datum, index) => this.statsData2[index].label)
      .style('text-anchor', 'middle')
      .style('font-size', '24px');
  }
ngOnDestroy() {
  this.accessAllPerfsSubscription.unsubscribe();
  this.accessAllPerfsTransSubscription.unsubscribe();
  this.dataAfterPageReloadSubscription.unsubscribe();
}
}
