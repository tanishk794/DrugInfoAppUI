import React from 'react'; 
import{
TableContainer,Table,TableHead,TableRow,TableCell,Paper,TableBody} from "@mui/material"
import { format } from 'date-fns';

const DrugInfoTable = ({ drugs }) => (
  <TableContainer component={Paper} sx={{ borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
    <Table sx={{ minWidth: 650 }} aria-label="drug information table">
      <TableHead>
        <TableRow>
          <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e0e0e0' }}>Id</TableCell>
          <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e0e0e0' }}>Code</TableCell>
          <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e0e0e0' }}>Name</TableCell>
          <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e0e0e0' }}>Company</TableCell>
          <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e0e0e0' }}>Launch Date</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {drugs.map((drug, index) => (
          <TableRow
            key={drug.code + index}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {index + 1}
            </TableCell>
            <TableCell>{drug.code}</TableCell>
            <TableCell>{`${drug.genericName} (${drug.brandName})`}</TableCell>
            <TableCell>{drug.company}</TableCell>
            <TableCell>{format(new Date(drug.launchDate), 'dd.MM.yyyy')}</TableCell>
          </TableRow>
        ))}
        {drugs.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} align="center">
              No drugs found for the selected company.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </TableContainer>
);


export default DrugInfoTable