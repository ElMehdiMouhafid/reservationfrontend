import * as React from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { Link } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

export default function TableVol({vols}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const compareDates = (dp) => {
    let current = new Date();
    let departDate = new Date(dp);

    if (departDate < current)
    {
      return true
    } 
    else 
    {
      return false
    }
  };

  return (
    <Paper>
       <TableContainer component={Paper}>
            <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Ville de départ</StyledTableCell>
                    <StyledTableCell align="center">Ville d'arrivée</StyledTableCell>
                    <StyledTableCell align="center">Date de départ</StyledTableCell>
                    <StyledTableCell align="center">Date de retour</StyledTableCell>
                    <StyledTableCell align="center">Nombre de passagers</StyledTableCell>
                    <StyledTableCell align="center">Prix de vol</StyledTableCell>
                    <StyledTableCell align="center"></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {vols && vols
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((vol) => (
                    <StyledTableRow key={vol.volId}>
                      <StyledTableCell align="center">{vol.departCity}</StyledTableCell>
                      <StyledTableCell align="center">{vol.arrivalCity}</StyledTableCell>
                      <StyledTableCell align="center">{vol.departDate}</StyledTableCell>
                      <StyledTableCell align="center">{vol.arrivalDate}</StyledTableCell>
                      <StyledTableCell align="center">{vol.passengersNbr}</StyledTableCell>
                      <StyledTableCell align="center">{vol.volPrice}</StyledTableCell>
                      <StyledTableCell align="center">
                       { vol.spaceAvailable === 0 || compareDates(vol.departDate) ? 
                            <Link
                            to="/"
                                className="badge badge-warning"
                              >
                                Expiré
                              </Link>
                            : <Link
                                   to={"/reservation/" + vol.volId}
                                   className="badge badge-warning"
                                 >
                                  Réserver
                              </Link> } 
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={vols.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
      />
    </Paper>
  );
}
