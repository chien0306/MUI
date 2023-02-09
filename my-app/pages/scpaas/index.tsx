import { Box, Grid } from '@mui/material';
import ColumnGroupingTable from '../../component/table/customTable';
import CustomTable from '../../component/table2/CustomTable2';
import { initColumnsTable } from '../../component/table2/initConfig';


interface Column {
  id: 'name' | 'code' | 'population' | 'size' | 'density' | 'country' | 'details';
  label: string;
  minWidth?: number;
  align?: 'right';
  subLabel?: Array<any>,
  format?: (value: number) => string;
}

const columns: Column[] = [
  {
    id: 'country',
    label: 'Country',
    minWidth: 170,
    subLabel: [
      {
        id: 'name',
        label: 'Name',
        minWidth: 170
      },
      {
        id: 'code',
        label: 'ISO\u00a0Code',
        minWidth: 100
      },
    ]
  },
  {
    id: 'details',
    label: 'Details',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
    subLabel: [
      {
        id: 'population',
        label: 'Population',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
      },
      {
        id: 'size',
        label: 'Size\u00a0(km\u00b2)',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
      },
      {
        id: 'density',
        label: 'Density',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toFixed(2),
      },
    ],
  },
];

interface Data {
  selection: string;
  id: number;
  companyName: string;
  productCategory: string;
  productHandled: string;
  qualityScore: number;
  costScore: number;
  deliveryScore: number;
  financeScore: number;
  environmentScore: number;
  laborScore: number;
  ethicsScore: number;
  sustainableScore: number;
  totalMoney: string;
  totalDeliveries: string;
}

function createData(
  selection: string,
  id: number,
  companyName: string,
  productCategory: string,
  productHandled: string,
  qualityScore: number,
  costScore: number,
  deliveryScore: number,
  financeScore: number,
  environmentScore: number,
  laborScore: number,
  ethicsScore: number,
  sustainableScore: number,
  totalMoney: string,
  totalDeliveries: string,
): Data {
  return {
    selection, id,
    companyName,
    productCategory,
    productHandled,
    qualityScore,
    costScore,
    deliveryScore,
    financeScore,
    environmentScore,
    laborScore,
    ethicsScore,
    sustainableScore,
    totalMoney,
    totalDeliveries
  };
}

const dataRows = [
  createData('a', 1, 'Hitachi1', 'Website1', 'KGIT1', 80, 90, 100, 60, 40, 40, 60, 70, '1111', '9999'),
  createData('a', 2, 'Hitachi2', 'Website2', 'KGIT2', 81, 99, 100, 60, 40, 40, 60, 70, '2222', '9999'),
  createData('a', 3, 'Hitachi3', 'Website3', 'KGIT3', 82, 98, 100, 60, 40, 40, 60, 70, '4444', '9999'),
  createData('a', 4, 'Hitachi4', 'Website4', 'KGIT4', 83, 97, 100, 60, 40, 40, 60, 70, '4444', '9999'),
  createData('a', 5, 'Hitachi5', 'Website5', 'KGIT5', 84, 96, 100, 60, 40, 40, 60, 70, '5555', '9999'),
  createData('a', 6, 'Hitachi6', 'Website6', 'KGIT6', 85, 95, 100, 60, 40, 40, 60, 70, '6666', '9999'),
  createData('a', 7, 'Hitachi7', 'Website7', 'KGIT7', 86, 94, 100, 60, 40, 40, 60, 70, '7777', '9999'),
  createData('a', 8, 'Hitachi8', 'Website8', 'KGIT9', 87, 93, 100, 60, 40, 40, 60, 70, '8888', '9999'),
  createData('a', 9, 'Hitachi9', 'Website9', 'KGIT10', 88, 92, 100, 60, 40, 40, 60, 70, '9999', '9999'),
  createData('a', 10, 'Hitachi10', 'Website10', 'KGIT11', 89, 91, 100, 60, 40, 40, 60, 70, '1000000', '9999'),
  createData('a', 12, 'Hitachi10', 'Website11', 'KGIT12', 89, 91, 100, 60, 40, 40, 60, 70, '1000000', '9999'),
  createData('a', 13, 'Hitachi10', 'Website12', 'KGIT13', 89, 91, 100, 60, 40, 40, 60, 70, '1000000', '9999'),
  createData('a', 14, 'Hitachi10', 'Website13', 'KGIT14', 89, 91, 100, 60, 40, 40, 60, 70, '1000000', '9999'),
];
export default function CustomTableScpaas() {
  // console.log('dataRows', dataRows);
  return (
    <Grid container>
      <Grid item xs={1}></Grid>
      <Grid
        item xs={10}
      >
        <Box 
          style={{
            marginTop: '10px',
          }}  
        >
          <ColumnGroupingTable
            configColumn={initColumnsTable()}
            data={dataRows}
          />
        </Box>

        chien
      </Grid>
      <Grid item xs={1}></Grid>

    </Grid>
  );
}