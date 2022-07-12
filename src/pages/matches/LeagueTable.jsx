import { useEffect, useState } from "react";
import { getDocs } from "firebase/firestore";
import { positionsQuery } from "../../firebase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import * as toasts from "../../utils/toast";

const LeagueTable = () => {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    getDocs(positionsQuery)
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPositions(data);
      })
      .catch((err) => {
        toasts.showError(err.message);
      });
  }, []);

  return (
    <div className="league_table_wrapper">
      <div className="title">League Table</div>
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Pos</TableCell>
              <TableCell>Team</TableCell>
              <TableCell>W</TableCell>
              <TableCell>L</TableCell>
              <TableCell>D</TableCell>
              <TableCell>Pts</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {positions.map((pos, i) => (
              <TableRow key={i}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{pos.team}</TableCell>
                <TableCell>{pos.w}</TableCell>
                <TableCell>{pos.d}</TableCell>
                <TableCell>{pos.l}</TableCell>
                <TableCell>{pos.pts}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LeagueTable;
