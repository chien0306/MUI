import { Box, Checkbox } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { IoRadioButtonOffOutline, IoRadioButtonOnOutline } from 'react-icons/io5';
import { visuallyHidden } from '@mui/utils';
import { IoCaretDownSharp } from "react-icons/io5";

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

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

type CustomTableProps = {
  configColumn: Array<any>;
  data: Array<any>;
};

function ColumnGroupingTable(props: CustomTableProps) {
  console.log('props', props.data)
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Data>('id');
  const [rowsData, setRowsData] = useState(props.data);
  const [headerSpan, setHeaderSpan] = useState([]);
  const [headerNoSpan, setHeaderNoSpan] = useState([]);
  const [rows, setRow] = useState([]);
  const [dataTable, setDataTable] = useState([]);

  const [selected, setSelected] = useState<string[]>([]);


  // console.log('headerSpan', headerSpan)
  // console.log('headerNoSpan', headerNoSpan)

  useEffect(() => {
    handleHeader(props.configColumn);
  }, [props.configColumn]);

  // handle header
  /*   const renderGroupHeader = (column: any) => {
      return (
        <div>
          <div>{column.lable}</div>
          <div>
            {(column.group.map((gr) => {
              return 'chien'
            }))}
          </div>
        </div>
      )
    } */
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    };
  const handleHeader = (configColumn: Array<any>) => {
    const row = [];
    const subHeader = [];
    const header = configColumn.map((item) => {
      let colSpan = 1;
      let rowSpan = 2;
      if (!item.subTitle) {
        row.push(item);
      } else {
        if (item.subTitle) {
          rowSpan = 1;
          colSpan = item.subTitle.length;
          item.subTitle.map((subTitle) => {
            row.push(subTitle);
            subHeader.push(subTitle);
          });
        }
      }
      return {
        title: item.title,
        field: item.field,
        rowSpan,
        colSpan,
        width: item.width,
        minWidth: item.minWidth,
        sortAble: item?.sortAble,
      };
    });
    setHeaderSpan(header);
    // TODO need Update for change many config subheader
    setHeaderNoSpan(subHeader);
    setRow(row);
  };

  const onClick = (event, data) => {
    const selectedIndex = selected.indexOf(data);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, data);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  }
  console.log('selected', selected);
  const renderHeaderCell = (headCell) => {
    return (
      <Box>
        {headCell.title}
        {headCell.sortAble && <TableSortLabel
          // active={orderBy === headCell.field}
          active={true}
          direction={orderBy === headCell.field ? order : 'asc'}
          onClick={createSortHandler(headCell.field)}
          style={{
            height: '20px',
            boxSizing: 'border-box',
          }}
          IconComponent={IoCaretDownSharp}
        />}
      </Box>

    );
  };
  const renderSubHeaderCell = (headCell) => {
    return (
      <Box>
        {headCell.title}
        {headCell.sortAble && <TableSortLabel
          // active={orderBy === headCell.field}
          active={true}
          direction={orderBy === headCell.field ? order : 'asc'}
          onClick={createSortHandler(headCell.field)}
          style={{
            // height: '20px',
            boxSizing: 'border-box',
          }}
          IconComponent={IoCaretDownSharp}
        />}
      </Box>
    );
  };

  const renderDataCell = (column, data) => {
    switch (column.cellType) {
      case 'checkbox':
        return (
          <Box
            style={{
              // width: '100%',
              border: '1px solid',
              margin: '5px 10px',
              width: '20px',
              height: '20px',
              overflow: 'hidden',
            }}
          >
            <Checkbox
              onChange={(e) => onClick(e, data)}
              // checked={data.isSelect}
              style={{
                margin: '-25px -1px',
                width: '20px',
                height: '20px',
              }}
            // icon={<IoRadioButtonOffOutline size={18} />}
            // checkedIcon={<IoRadioButtonOnOutline size={18} />}
            />
          </Box>

        );
      default: {
        return data[column.field];
      }
    }
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table"
          style={{
            borderLeft: '1px solid black',
            // borderTop: '1px solid black'
          }}>
          <TableHead>
            <TableRow>
              {headerSpan.map((column) => (
                <TableCell
                  key={column.field}
                  align={'center'}
                  rowSpan={column.rowSpan}
                  colSpan={column.colSpan}
                  style={{
                    top: '0',
                    padding: '5px',
                    minWidth: column.minWidth,
                    borderRight: '1px solid orange',
                    borderBottom: '1px solid orange',
                    borderTop: '1px solid orange',
                    boxSizing: 'border-box'
                  }}
                // rowSpan={column.rowSpan}
                >
                  {renderHeaderCell(column)}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              {headerNoSpan.map((column) => (
                <TableCell
                  key={column.field}
                  align={'center'}
                  rowSpan={column.rowSpan}
                  colSpan={column.colSpan}
                  style={{
                    top: 36,
                    width: column.width,
                    minWidth: column.minWidth,
                    borderRight: '1px solid orange',
                    borderBottom: '1px solid orange',
                    borderTop: '1px solid orange',
                    padding: '5px',
                    boxSizing: 'border-box',
                  }}
                // rowSpan={column.rowSpan}
                >
                  {renderSubHeaderCell(column)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {/* render body */}
          <TableBody>
            {stableSort(rowsData, getComparator(order, orderBy))
              // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {rows.map((column) => {
                      return (
                        <TableCell
                          key={column.id}
                          align={'center'}
                          style={{
                            padding: '5px',
                            minWidth: column.minWidth,
                            borderRight: '1px solid green',
                            borderBottom: '1px solid green',
                            boxSizing: 'border-box'

                          }}
                        >
                          {renderDataCell(column, row)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper >
  );
}
export default ColumnGroupingTable;