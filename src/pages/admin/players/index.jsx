import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../../hoc/AdminLayout";
import { getDocs } from "firebase/firestore";
import { playersQuery } from "../../../firebase";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import * as toasts from "../../../utils/toast";
import config from "../../../config.json";

const AdminPlayers = () => {
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    setLoading(true);

    getDocs(playersQuery)
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPlayers(data);
      })
      .catch((err) => {
        toasts.showError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <AdminLayout title="The players">
      <div className="mb-15">
        <Button
          disableElevation
          variant="outlined"
          component={Link}
          to={config.routes.addPlayer}
        >
          Add player
        </Button>
      </div>

      <Paper className="mb-5">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First name</TableCell>
              <TableCell>Last name</TableCell>
              <TableCell>Number</TableCell>
              <TableCell>Position</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players
              ? players.map((player, i) => (
                  <TableRow key={player.id}>
                    <TableCell>
                      <Link
                        to={`${config.routes.editPlayer.route}/${player.id}`}
                      >
                        {player.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link
                        to={`${config.routes.editPlayer.route}/${player.id}`}
                      >
                        {player.lastname}
                      </Link>
                    </TableCell>
                    <TableCell>{player.number}</TableCell>
                    <TableCell>{player.position}</TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </Paper>

      <div className="admin_progress">
        {loading ? (
          <CircularProgress thickness={7} style={{ color: "#98c5e9" }} />
        ) : null}
      </div>
    </AdminLayout>
  );
};

export default AdminPlayers;
