import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import NoteTaker from './NoteTaker';
import NotesContainer from './NotesContainer';
import Header from './Header';
import { MuiThemeProvider } from '@material-ui/core';
import theme from '../theme/theme';

class NotesApp extends Component {
    componentDidMount() {
        this.props.handleFetchNotes();
    }
    render() {
        const {
            notes,
            handleAddNote,
            handleRemoveNote,
            handleSearch,
            resetNotesState,
        } = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <Grid container spacing={16}>
                    <Grid item xs={12}>
                        <Header resetNotesState={resetNotesState} handleSearch={handleSearch} />
                    </Grid>
                    <Grid item xs={12}>
                        <NoteTaker
                            handleAddNote={handleAddNote}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <NotesContainer
                            notes={notes}
                            handleRemoveNote={handleRemoveNote}
                        />
                    </Grid>
                </Grid>
            </MuiThemeProvider>
        );
    }
}

NotesApp.propTypes = {
    notes: PropTypes.array.isRequired,
    handleAddNote: PropTypes.func.isRequired,
    handleRemoveNote: PropTypes.func.isRequired,
    handleSearch: PropTypes.func.isRequired,
};

export default NotesApp;