import React, { Component } from "react";
import Paper from '@material-ui/core/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Link } from "react-router-dom";

import ReservationDataService from "../services/reservation.service";
import { withRouter } from '../common/with-router';

class AddReservation extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
        this.handleChangeLastName = this.handleChangeLastName.bind(this);
        this.handleChangeMail = this.handleChangeMail.bind(this);
        this.handleChangePhoneNumber = this.handleChangePhoneNumber.bind(this);

        this.state = {
            firstName: '',
            lastName: '',
            mail: '',
            phoneNumber: '',
            open: false,
            message: ''
        };
      }

      handleChangeFirstName(event) {
        this.setState({firstName: event.target.value});
      }
    
      handleChangeLastName(event) {
        this.setState({lastName: event.target.value});
      }
    
      handleChangeMail(event) {
        this.setState({mail: event.target.value});
      }
    
      handleChangePhoneNumber(event) {
        this.setState({phoneNumber: event.target.value});
      }

      handleSubmit(event) {
        event.preventDefault();
        
        var request = {
          volId: parseInt(this.props.router.params.id),
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          mail: this.state.mail,
          phoneNumber: this.state.phoneNumber,
        };
    
        ReservationDataService.createReservation(request)
            .then(response => {
                this.setState({
                    open: true,
                    message: response.data
                });
            })
            .catch(e => {
                if(e.response.status === 400)
                {
                    this.setState({
                        open: true,
                        message: e.response.data
                    });
                } else {
                    this.setState({
                        open: true,
                        message: e.message
                    });
                }
            });
      }

      render() {
        const classes = this.props;
        const { open, message } = this.state;
        return (
          <div>
            <Paper className={classes.root} style={{ width: '80%', margin: 'auto' }}>
                <div style={{ width: '80%', margin: 'auto', marginTop: '5%' }}>
                <h2 align="left">Ajouter une reservation</h2>
                <form
                    className={classes.container}
                    onSubmit={this.handleSubmit}
                    autoComplete="off"
                >
                    <Grid container rowSpacing={2} columnSpacing={{ xs: 4, sm: 4, md: 8 }}>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            required
                            value={this.state.firstName}
                            name="firstName"
                            type="text"
                            label="Nom"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={this.handleChangeFirstName}
                            variant="filled"
                            />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            required
                            value={this.state.lastName}
                            name="LastName"
                            type="text"
                            label="Prénom"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={this.handleChangeLastName}
                            variant="filled"
                            />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            required
                            value={this.state.mail}
                            name="mail"
                            type="text"
                            label="Email"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={this.handleChangeMail}
                            variant="filled"
                            />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            required
                            value={this.state.phoneNumber}
                            name="phoneNumber"
                            type="text"
                            label="numéro de téléphone"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={this.handleChangePhoneNumber}
                            variant="filled"
                            />
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                    <Grid item xs={4}>
                        <Button fullWidth type="submit" variant="filled">Ajouter</Button>
                    </Grid>
                    </Grid>
                </form>
                
                </div>
                <br />
            </Paper>
            <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {message}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button><Link
                                to={"/"}
                                className="badge badge-warning"
                              >OK</Link></Button>
                </DialogActions>
            </Dialog>
          </div>  
        );
      }
}

export default withRouter(AddReservation);