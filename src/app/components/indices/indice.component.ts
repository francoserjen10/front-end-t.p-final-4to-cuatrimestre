import { Component, OnInit } from '@angular/core';
import { IValueIndice } from '../../interfaces/indices-value';
import { DbService } from '../../services/db.service';
import { Util } from '../../utils/util';
import { ChartIndiceComponent } from './chart-line/chart-indice.component';
import { SideBarHomeComponent } from '../home/sideBar/side-bar-home.component';

@Component({
  selector: 'app-indice',
  standalone: true,
  imports: [ChartIndiceComponent, SideBarHomeComponent],
  templateUrl: './indice.component.html',
  styleUrl: './indice.component.css'
})
export class IndiceComponent implements OnInit {

  originalsIndices: IValueIndice[] = [];
  indicesChartData: { [key: string]: IValueIndice[] } = {};
  hasLoaded = false;
  util: Util;

  constructor(private dbService: DbService) { this.util = new Util(); }

  ngOnInit(): void {
    this.getAllIndices();
  }

  getAllIndices() {
    this.dbService.getAllIndicesOfBackEnd()
      .subscribe({
        next: (value: IValueIndice[]) => {
          const sortedIndices = this.indicesSorted(value)
          const groupedIndices = this.util.groupByIndice(sortedIndices);
          this.indicesChartData = groupedIndices;
        }, error(err) {
          console.error('Error al obtener los indices en el home', err);
        },
        complete: () => {
          this.hasLoaded = true;
        },
      });
  }

  indicesSorted(indices: IValueIndice[]) {
    const sortedIndices = indices.sort((a, b) => {
      const dateA = new Date(a.fecha + 'T' + a.hora);
      const dateB = new Date(b.fecha + 'T' + b.hora);
      return Number(dateA) - Number(dateB);
    });
    return sortedIndices;
  }
}
