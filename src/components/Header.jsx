import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { firebase } from '../firebase/firebase';
import SearchBar from './SearchBar';
import logo from '../logo.png';
import { history } from '../routers/AppRouter';
import { Link } from 'react-router-dom';

const styles = theme => ({
  root: {
    width: '100%',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 5,
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      fontWeight: 'bold',
    },
  },
  grow: {
    flexGrow: 1,
  },
  logo: {
    width: 35,
    height: 35,
    marginRight: 15,
    [theme.breakpoints.up('sm')]: {
      width: 40,
      height: 40
    },
  },
});

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || false,
      anchorEl: null,
    };
    // this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleMenu(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose() {
    this.setState({ anchorEl: null });
  }

  handleLogout() {
    return firebase.auth().signOut()
      .then(() => {
        localStorage.removeItem('isLoggedIn'); // doing this because localStorage operations are synchronous
        localStorage.removeItem('email');
        this.setState({
          isLoggedIn: Boolean(localStorage.getItem('isLoggedIn')),
        });
        this.handleClose();
        this.props.resetNotesState();
        history.push('/');
      })
  }

  render() {
    const { classes, handleSearch } = this.props;
    const open = Boolean(this.state.anchorEl);
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Link to="/home">
              <img className={classes.logo} src={logo} alt="notes logo" />
            </Link>
            <Typography
              className={classes.title}
              variant="h6"
              color="textPrimary"
              noWrap
            >
              Notes
            </Typography>
            {this.state.isLoggedIn === true && <SearchBar handleSearch={handleSearch} />}
            <div className={classes.grow}></div>
            {this.state.isLoggedIn === true && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSearch: PropTypes.func,
  resetNotesState: PropTypes.func,
};

export default withStyles(styles)(Header); 
