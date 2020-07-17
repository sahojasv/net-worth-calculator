import React from 'react';
import { useTable } from 'react-table'
import { prepareAssetData } from '../../utility/Util';
import TableContainer from '@material-ui/core/TableContainer';
import MaUTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'; 

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const LiabilityTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.warning.light,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const NetWorthCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontSize: 18,
    fontWeight: 500
  },
  body: {
    fontSize: 24,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const EditableCell = (props, records, callback) => {
  const [value, setValue] = React.useState(props.value)

  const onChange = e => {
    setValue(e.target.value)
  }

  const onBlur = () => {
    const record = records.find(rec => rec.Name === props.row.original.Type);
    record.Amount = Number(value);
    callback(record);
  }

  return (
    <div style={{display: 'inline-flex', width: '100%'}}>
      <input style={{width: '20%'}} className={'form-control'} type={"number"} value={value} onChange={onChange} onBlur={onBlur} />
    </div>
  );
}

const getColumns = (type, records, callback) => {
  return React.useMemo(
    () => [
      {
        Header: type,
        accessor: 'Type',
      },
      {
        Header: "",
        accessor: "amount",
        Cell: (props) => EditableCell(props, records, callback)
      },
    ],
    []
  );
};

const renderTable = ({ getTableProps, headerGroups, rows, prepareRow }, type) => {
  const CustomCell = type === 'asset' ? StyledTableCell : LiabilityTableCell;

  return (
    <TableContainer component={Paper}>
      <MaUTable {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <StyledTableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <CustomCell {...column.getHeaderProps()}>
                  {column.render("Header")}
                </CustomCell>
              ))}
            </StyledTableRow>
          ))}
        </TableHead>
        <TableBody>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <StyledTableRow {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TableCell>
                  );
                })}
              </StyledTableRow>
            );
          })}
        </TableBody>
      </MaUTable>
    </TableContainer>
  );
};

const renderAssets = ({ assetTypes, assets, updateAsset }) => {
  return assetTypes.map((asset) => {
    const data = prepareAssetData(assets, asset);

    const { getTableProps, headerGroups, rows, prepareRow } = useTable({
      columns: getColumns(asset.Type, assets, updateAsset),
      data
    });

    return renderTable({
      getTableProps,
      headerGroups,
      rows,
      prepareRow,
    }, 'asset');
  });
};

const renderLiabilites = ({ liabilites, liabilityTypes, updateLiability }) => {
  return liabilityTypes.map((liability) => {
    const data = prepareAssetData(liabilites, liability);

    const { getTableProps, headerGroups, rows, prepareRow } = useTable({
      columns: getColumns(liability.Type, liabilites, updateLiability),
      data
    });

    return renderTable({
      getTableProps,
      headerGroups,
      rows,
      prepareRow,
    });
  });
};

const NetWorth = ({
  assets,
  assetTypes,
  updateAsset,
  liabilites,
  liabilityTypes,
  updateLiability,
  networth
}) => {
  return (
    <div style={{ margin: '2%'}}>
      <h3> Tracking Your NetWorth </h3>
      <MaUTable>
        <TableHead>
          <TableRow>
            <NetWorthCell>Net Worth</NetWorthCell>
            <NetWorthCell>{`$ ${networth.get(`NetWorth`)}`}</NetWorthCell>
          </TableRow>
        </TableHead>
      </MaUTable>
      <br/>
      <h4> Assets </h4>
      {renderAssets({ assetTypes, assets, updateAsset })}
      <MaUTable>
        <TableHead>
          <TableRow>
            <TableCell>Total Assets</TableCell>
            <TableCell>{`$ ${networth.get(`TotalAssets`)}`}</TableCell>
          </TableRow>
        </TableHead>
      </MaUTable>
      <br/>
      <h4> Liabilites </h4>
      {renderLiabilites({ liabilites, liabilityTypes, updateLiability })}
      <MaUTable>
        <TableHead>
          <TableRow>
            <TableCell>Total Liabilites</TableCell>
            <TableCell>{`$ ${networth.get(`TotalLiabilites`)}`}</TableCell>
          </TableRow>
        </TableHead>
      </MaUTable>
    </div>
  )
};

export default NetWorth;