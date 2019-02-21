import React from 'react';
import PropTypes from 'prop-types';
import Note from '../components/Note';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 2,
    },
    alignCenter: {
        display: 'flex',
        justifyContent: 'center',
    }
});

const ListView = props => {
    return (
        <Grid container spacing={8} className={props.classes.root}>
            {
                props.notes.map(note => <Grid key={note.id} item xs={12} className={props.classes.alignCenter}>
                                            <Note note={note} handleRemoveNote={props.handleRemoveNote} />
                                        </Grid>
                                )
            }
        </Grid>
    );
}

ListView.propTypes = {
    classes: PropTypes.object.isRequired,
    note: PropTypes.object.isRequired,
    handleRemoveNote: PropTypes.func.isRequired,
};

export default withStyles(styles)(ListView);