import * as React from 'react';
import KWEDefaultCheckbox from '../../component/checkBox/CheckBox';
import ColumnGroupingTable from '../../component/table/customTable';

interface Column {
  id: 'name' | 'code' | 'population' | 'size' | 'density' | 'details';
  label: string;
  minWidth?: number;
  rowSpan?: number;
  align?: 'right';
  format?: (value: number) => string;
  group?: Array<any>,
}

const columns: Column[] = [
  {
    id: 'name',
    label: 'Name',
    minWidth: 170,
    rowSpan: 2,
  },
  {
    id: 'code',
    label: 'ISO\u00a0Code',
    minWidth: 100,
    rowSpan: 2,
  },
  {
    id: 'details',
    label: 'details',
    minWidth: 100,
    rowSpan: 2,
    group: [
      {
        id: 'population',
        label: 'Population',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
        rowSpan: 1,
      },
      {
        id: 'size',
        label: 'Size\u00a0(km\u00b2)',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
        rowSpan: 1,
      },
      {
        id: 'density',
        label: 'Density',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toFixed(2),
        rowSpan: 1,
      },
    ]
  },
];

interface Data {
  name: string;
  code: string;
  population: number;
  size: number;
  density: number;
}

function createData(
  name: string,
  code: string,
  population: number,
  size: number,
): Data {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

export default function mui2() {

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        direction: 'column',
        backgroundColor: 'gray',
      }}>
      <div
        style={{
          width: '20%'
        }}> dang xuan chien</div>
      <div
        style={{
          width: '80%',
          margin: '10px 10px',
          // border: '1px solid black'
          
        }}>
        <ColumnGroupingTable configColumn={columns}/>
        <div
          style={{
            marginTop: '10px',
            backgroundColor: '#b1154a'
          }}
        > dang xuan chien </div>
        <div>
          <KWEDefaultCheckbox
            label={'check'}
            name={'checkboxxx'}
          />

        </div>
      </div>
    </div>

  );
}