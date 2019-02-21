import React from 'react';
import Header from './Header';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Divider, Paper, Tabs, Tab, Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import SignupForm from './SignupForm';
import SignInForm from './SignInForm';
import { MuiThemeProvider } from '@material-ui/core';
import theme from '../theme/theme';
import ThirdPartyLogin from './ThirdPartyLogin';

const styles = theme => ({
    root: {
        height: '100%',
        width: '100%',
    },
    alignCenter: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '130%',
    },
    paper: {
        width: theme.spacing.unit * 55,
        minHeight: '65vh',
        background: 'white',
    }, 
});

const TabContainer = (props) => (
    <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
    </Typography>
);

class AuthenticationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event, value) {
        this.setState({ value });
    }
    render() {
        const { classes } = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <div className={classes.root}>
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            <Header />
                        </Grid>
                        <Grid item xs={12}>
                            <div className={classes.alignCenter}>
                                <Paper className={classes.paper}>
                                    <Tabs
                                        value={this.state.value}
                                        onChange={this.handleChange}
                                        variant="fullWidth"
                                    >
                                        <Tab label="Sign up" />
                                        <Tab label="Sign in" />
                                    </Tabs>
                                    {this.state.value === 0 && <TabContainer><SignupForm /></TabContainer>}
                                    {this.state.value === 1 && <TabContainer><SignInForm /></TabContainer>}
                                    <Divider variant="fullWidth" />
                                    <ThirdPartyLogin />
                                </Paper>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </MuiThemeProvider>
        );
    }
}

AuthenticationForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AuthenticationForm);