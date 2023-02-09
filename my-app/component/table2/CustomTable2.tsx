import React, { FC, useEffect, useState } from 'react';
// import {useDispatch} from 'react-redux';
import MaterialTable, { Column, Components } from '@material-table/core';
import { Box, Checkbox, createStyles, makeStyles, TableCell, TableHead, TableRow, Theme } from '@material-ui/core';
import { IoRadioButtonOffOutline, IoRadioButtonOnOutline, IoCaretDownOutline } from 'react-icons/io5';
// import { selectRow } from 'redux/searchForSupplier/reducer';

/**
 * The Props Interface
 */
interface TextTableProps {
    options?: any;
    /** Component for render table */
    components?: Components;
    /** Columns of table **/
    columns: Column<any>[];
    /** Data of table **/
    data: any;
    /** Is Table Span */
    isTableSpan?: boolean;
    /** Render table has rowSpan or colSpan */
    headerSpan?: [];
    /** Reder table has no rowSpan or ColSpan */
    headerNoSpan?: [];
    /** Render data row for table has Span */
    row?: [];
    /** onClick Row tableSpan */
    onClickDataRow?: (data, item) => void;
    /**table cellstyle */
    tableCellStyle?: React.CSSProperties;
    /**set background row with condition */
    /** onClick Row tableSpan */
    getStyleCondition?: (index) => React.CSSProperties;
    onSelect?: any;
}
/**
 * The default style of table
 */
const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        width: '100%',
        '& *': {
            boxShadow: 'none !important',
        },
        '& .MuiPaper-rounded': {
            borderRadius: '0',
        },
        '& .MuiPaper-rounded .MuiToolbar-gutters': {
            minHeight: '0',
        },
    },
    iconItem: {
        color: theme.palette.text.primary
    },
    boxIcon: {
        display: 'flex',
        flexDirection: 'column',
    },
    iconSortAsc: {
        fontSize: '14px',
        color: 'var(--silver-gray)',
        margin: 'auto',
        '&:hover': {
            cursor: 'pointer',
            color: 'var(--white)',
        },
    },
    headerTable: {
        backgroundColor: theme.palette.primary.dark,
        border: `1px solid ${theme.palette.primary.main}`,
        textAlign: 'center',
        padding: '0 12px',
        fontSize: '16px',
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${theme.palette.text.primary}`,
        position: 'sticky',
        top: '0px',
        zIndex: 1,
        fontWeight: 600,
    },
    subHeaderStyle: {
        textAlign: 'center',
        padding: '0 12px',
        fontWeight: 600,
        fontSize: '16px',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.text.primary,
        border: `1px solid ${theme.palette.primary.main}`,
        borderBottom: `1px solid ${theme.palette.text.primary}`,
        position: 'sticky',
        top: '25px',
        zIndex: 1,
    },
    rowStyle: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.text.primary,
        '& .MuiTableCell-body': {
            border: `1px solid ${theme.palette.primary.main}`,

        }
    }
}));
/**
 * The Text Table component
 *
 * @returns Details the Text Table component
 */
const CustomTable: FC<TextTableProps> = (props) => {

    const [isCustomHeader, setIsCustomHeader] = useState(false);
    const [headerSpan, setHeaderSpan] = useState([]);
    const [headerNoSpan, setHeaderNoSpan] = useState([]);
    const [rows, setRow] = useState([]);
    const [dataTable, setDataTable] = useState([]);
    // const dispatch = useDispatch<any>();
    useEffect(() => {
        handleHeader(props.columns);
    }, [props.columns, isCustomHeader]);
    useEffect(() => {
        setDataTable(props.data);
    }, [props.data]);

    const classes = useStyles();

    // handle header, subHeader and row
    const handleHeader = (configColumn) => {
        const row = [];
        const subHeader = [];
        const header = configColumn.map((item) => {
            let colSpan = 1;
            let rowSpan = 2;
            if (!item.subTitle) {
                row.push(item);
            } else {
                if (item.subTitle) {
                    setIsCustomHeader(true);
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
            };
        });
        setHeaderSpan(header);
        // TODO need Update for change many config subheader
        setHeaderNoSpan(subHeader);
        setRow(row);
    };

    const renderDataRow = (rowData, data) => {
        switch (rowData.cellType) {
            case 'Checkbox':
                return (
                    <Checkbox
                        onChange={(e) => props.onSelect(e, data)}
                        checked={data.isSelect}
                        icon={<IoRadioButtonOffOutline className={classes.iconItem} size={18} />}
                        checkedIcon={<IoRadioButtonOnOutline className={classes.iconItem} size={18} />}
                    />
                );
            default: {
                return data[rowData.field];
            }
        }
    };

    const getOrderSort = (prop) => {
        return ((prev, next) => {
            if (prop === 'id') {
                return prev[prop] - next[prop];
            }
            if (prev[prop] > next[prop]) {
                return 1;
            } else if (prev[prop] < next[prop]) {
                return -1;
            }
            return 0;
        });
    };

    const handleClickSort = (e, item) => {
        const dataSort = dataTable.map(item => item).sort(getOrderSort(item));
        // dispatch(selectRow(dataSort));
    };
    return (
        <Box className={classes.root}>
            {isCustomHeader ? (<MaterialTable
                options={props.options}
                columns={props.columns}
                data={dataTable}
                components={{
                    Header: () => {
                        return (
                            <TableHead>
                                <TableRow>
                                    {headerSpan && headerSpan.map((item, index) => {
                                        return (
                                            <TableCell
                                                style={{
                                                    width: item?.width,
                                                }}
                                                className={classes.headerTable}
                                                key={index}
                                                rowSpan={item.rowSpan}
                                                colSpan={item.colSpan}
                                                align="center"
                                            >
                                                <Box className={classes.boxIcon}>
                                                    {item.title}
                                                    {(item.field !== ('selection' && 'score')) && <IoCaretDownOutline className={classes.iconSortAsc} onClick={(e) => handleClickSort(e, item.field)} />}
                                                </Box>

                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                                <TableRow>
                                    {headerNoSpan.map((item, index) => {
                                        return (
                                            <TableCell
                                                style={{
                                                    width: item?.width
                                                }}
                                                className={classes.subHeaderStyle}
                                                key={index}
                                                align="center"
                                            >
                                                <Box className={classes.boxIcon}>
                                                    {item.title}
                                                    <IoCaretDownOutline className={classes.iconSortAsc} onClick={(e) => handleClickSort(e, item.field)} />
                                                </Box>
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            </TableHead>
                        );
                    },
                    Row: ({ data }) => {
                        return (
                            <TableRow
                                className={classes.rowStyle}
                                key={data.tableData.index}
                            >
                                {
                                    rows.map((item, index) => {
                                        return (
                                            <TableCell
                                                key={index}
                                                align={item.align}
                                            >
                                                {
                                                    renderDataRow(item, data)
                                                }
                                            </TableCell>
                                        );
                                    })
                                }
                            </TableRow>
                        );
                    },
                }}
            />) : (
                <MaterialTable
                    options={props.options}
                    columns={props.columns}
                    data={props.data}
                    components={props.components}
                />
            )}
        </Box>
    );
};
export default CustomTable;