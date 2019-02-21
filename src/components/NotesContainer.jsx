import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Note from './Note';
import PropTypes from 'prop-types';

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 2,
    },
    spaceAround: {
        display: 'flex',
        justifyContent: 'space-around',
        marginBottom: theme.spacing.unit * 2,
    },
});

const NotesContainer = (props) => {
    const { 
            classes, 
            notes, 
            handleRemoveNote,
            searchTerm,
        }  = props;
    return (
        <div className={classes.root}>
            <Grid container spacing={8}>
                {    
                    notes.map(note => (
                        <Grid item xs={12} sm={4} key={note.id} className={classes.spaceAround}>
                            <Note 
                                note={note}
                                handleRemoveNote={handleRemoveNote}
                                searchTerm={searchTerm}
                            />
                        </Grid>
                    ))
                }
            </Grid>
        </div>
    );
}

NotesContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    notes: PropTypes.array.isRequired,
    handleRemoveNote: PropTypes.func.isRequired,
    searchTerm: PropTypes.string,
};

export default withStyles(styles)(NotesContainer);