import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import InputBase from '@material-ui/core/InputBase';
import { history } from '../routers/AppRouter';

const styles = theme => ({
    search: {
        display: 'none',
        color: 'black',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing.unit * 15,
                width: '40%',
            },
            [theme.breakpoints.up('md')]: {
                marginLeft: theme.spacing.unit * 20,
                width: '50%',
            },
            [theme.breakpoints.up('lg')]: {
                marginLeft: theme.spacing.unit * 25,
                width: '50%',
            },
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    }
});

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
        };
        this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
        this.catchReturn = this.catchReturn.bind(this);
    }

    handleSearchTermChange(event) {
        this.setState({
            searchTerm: event.target.value,
        });
    }

    catchReturn(event) {
        if (event.key === 'Enter') {
            this.props.handleSearch(this.state.searchTerm);
            history.push(`/notes/search?searchTerm=${this.state.searchTerm}`);
            this.setState({
                searchTerm: ''
            });
            event.preventDefault();
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    onChange={this.handleSearchTermChange}
                    value={this.state.searchTerm}
                    onKeyPress={this.catchReturn}
                />
            </div>
        );
    }
}

SearchBar.propTypes = {
    classes: PropTypes.object.isRequired,
    handleSearch: PropTypes.func.isRequired,
};

export default withStyles(styles)(SearchBar);

