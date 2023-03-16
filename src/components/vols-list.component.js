import React, { Component } from "react";
import Paper from '@material-ui/core/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import VolDataService from "../services/vols.service";
import TableVol  from '../common/table';

class VolsList extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeDepartCity = this.handleChangeDepartCity.bind(this);
    this.handleChangeArrivalCity = this.handleChangeArrivalCity.bind(this);
    this.handleChangeDepartDate = this.handleChangeDepartDate.bind(this);
    this.handleChangeArrivalDate = this.handleChangeArrivalDate.bind(this);
    this.handleChangePassengersNbr = this.handleChangePassengersNbr.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
        vols: [],
        departCity: '',
        arrivalCity: '',
        departDate: '',
        arrivalDate: '',
        passengersNbr: '',
        open: false,
        message: ''
    };
  }

  handleChangeDepartCity(event) {
    this.setState({departCity: event.target.value});
  }

  handleChangeArrivalCity(event) {
    this.setState({arrivalCity: event.target.value});
  }

  handleChangeDepartDate(event) {
    this.setState({departDate: event.target.value});
  }

  handleChangeArrivalDate(event) {
    this.setState({arrivalDate: event.target.value});
  }

  handleChangePassengersNbr(event) {
    this.setState({passengersNbr: event.target.value});
  }
  
  handleClose = () => {
    this.setState({
      open: false
    });
  };


  handleSubmit(event) {
    event.preventDefault();

    var request = {
      departCity: this.state.departCity === '' ? null : this.state.departCity,
      arrivalCity:this.state.arrivalCity === '' ? null : this.state.arrivalCity,
      departDate: this.state.departDate === '' ? null : this.state.departDate,
      arrivalDate: this.state.arrivalDate === '' ? null : this.state.arrivalDate,
      passengersNbr: this.state.passengersNbr === '' ? null : parseInt(this.state.passengersNbr),
    };

    VolDataService.getByRequest(request)
      .then(response => {
        this.setState({
          vols: response.data
        });
      })
      .catch(e => {
        this.setState({
          vols: [],
          open: true,
          message: e.message
        });
      });
  }

  render() {
    const classes = this.props;
    const { vols, open, message } = this.state;
    return (
      <div>
        <Paper className={classes.root} style={{ width: '80%', margin: 'auto' }}>
          <div style={{ width: '80%', margin: 'auto', marginTop: '5%' }}>
              <h2 align="left">Recherche</h2>
              <form
                    className={classes.container}
                    onSubmit={this.handleSubmit}
                    autoComplete="off"
                >
                    <Grid container rowSpacing={2} columnSpacing={{ xs: 4, sm: 4, md: 8 }}>
                      <Grid item xs={4}>
                        <TextField
                            fullWidth
                            value={this.state.departCity}
                            name="departCity"
                            type="text"
                            label="Ville de départ"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onChange={this.handleChangeDepartCity}
                            variant="filled"
                          />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                            fullWidth
                            value={this.state.arrivalCity}
                            name="arrivalCity"
                            type="text"
                            label="Ville d'arrivée"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onChange={this.handleChangeArrivalCity}
                            variant="filled"
                          />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                            fullWidth
                            value={this.state.departDate}
                            name="departDate"
                            type="datetime-local"
                            label="Date de départ"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onChange={this.handleChangeDepartDate}
                            variant="filled"
                          />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                            fullWidth
                            value={this.state.arrivalDate}
                            name="arrivalDate"
                            type="datetime-local"
                            label="Date de retour"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onChange={this.handleChangeArrivalDate}
                            variant="filled"
                          />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                            fullWidth
                            value={this.state.passengersNbr}
                            id="outlined-number"
                            name="passengersNbr"
                            type="text"
                            label="Nombre de passagers"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onChange={this.handleChangePassengersNbr}
                            variant="filled"
                          />
                      </Grid>
                      <Grid item xs={4}>
                        <Button fullWidth variant="filled" onClick={this.handleSubmit}>Rechercher</Button>
                      </Grid>
                    </Grid>
                </form>
              </div>
              <br />
        </Paper>
        <Paper className={classes.root} style={{ width: '80%', margin: 'auto' }}>
        <h2 align="left">Listes des vols</h2>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TableVol vols={vols} />
          </Grid>
        </Grid>
        </Paper>
        <Dialog
            open={open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {message}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose}>Ok</Button>
            </DialogActions>
        </Dialog>
      </div>  
    );
  }
}

export default VolsList
