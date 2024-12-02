import { Component } from '@angular/core';
import { IValueIndice } from '../../interfaces/indices-value';
import { DbService } from '../../services/db.service';
import { Util } from '../../utils/util';
import { AreaData, Time } from 'lightweight-charts';

@Component({
  selector: 'app-indice',
  standalone: true,
  imports: [],
  templateUrl: './indice.component.html',
  styleUrl: './indice.component.css'
})
export class IndiceComponent {

  originalsIndices: IValueIndice[] = [];
  util: Util;

  constructor(private dbService: DbService) { this.util = new Util(); }

  getAllIndices() {
    this.dbService.getAllIndicesOfBackEnd()
      .subscribe({
        next: (value: IValueIndice[]) => {
          const groupedIndices = this.util.groupByIndice(value);
          // this.originalsIndices = indices
          // console.log('Indices bursatiles', groupedIndices);

          const formattedIndices = this.formatIndices(groupedIndices);
          console.log('Indices bursatiles', formattedIndices);
        }
      });
  }

  // Método para formatear los índices transformados
  formatIndices(groupedIndices: { [key: string]: IValueIndice[] }) {
    const transformedData: { [key: string]: AreaData<Time>[] } = {};

    // Recorro cada grupo (por `codigoIndice`)
    for (const codigoIndice in groupedIndices) {
      if (groupedIndices.hasOwnProperty(codigoIndice)) {
        // Obtengo los índices correspondientes a este `codigoIndice`
        const indices = groupedIndices[codigoIndice];

        // Paso 3: Transformar los índices en formato adecuado (timestamp)
        transformedData[codigoIndice] = this.util.transformDateAndTimeInTimestampIndices(indices);
      }
    }
    // console.log("transformedData", transformedData)
    return transformedData;
  }
}
