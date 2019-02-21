import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import NotesContainer from './NotesContainer';
import Header from './Header';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider } from '@material-ui/core';
import theme from '../theme/theme';

const styles = theme => ({
    title: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing.unit * 2,
    },
    fixed: {
        position: 'fixed',
        left: theme.spacing.unit * 2,
        bottom: theme.spacing.unit * 2,
        textDecoration: 'none',
    }
});

const SearchResult = (props) => {
    const { handleSearch, notes, handleRemoveNote, searchTerm } = props;
    if (props.notes.length > 0) {
        return (
            <MuiThemeProvider theme={theme}>
                <Header handleSearch={handleSearch} />
                <Fragment>
                    <Typography variant="h4" gutterBottom className={props.classes.title}>
                        Search Results
                        </Typography>
                    <NotesContainer
                        handleSearch={handleSearch}
                        notes={notes}
                        handleRemoveNote={handleRemoveNote}
                        searchTerm={searchTerm} 
                    />
                    <Link to="/home" className={props.classes.fixed}>
                        <Button color="primary">
                            Go Back
                            </Button>
                    </Link>
                </Fragment>
            </MuiThemeProvider>
        );
    } else {
        return (
            <MuiThemeProvider theme={theme}>
                <Header handleSearch={handleSearch} />
                <Fragment>
                    <Typography variant="h4" gutterBottom className={props.classes.title}>
                        Sorry...No Results Found!
                        </Typography>
                    <Link to="/home" className={props.classes.fixed}>
                        <Button color="primary">
                            Go Back
                            </Button>
                    </Link>
                </Fragment>
            </MuiThemeProvider>
        );
    }
}

SearchResult.propTypes = {
    classes: PropTypes.object.isRequired,
    handleSearch: PropTypes.func.isRequired,
    notes: PropTypes.array.isRequired,
    handleRemoveNote: PropTypes.func.isRequired,
    searchTerm: PropTypes.string.isRequired,
};

export default withStyles(styles)(SearchResult);