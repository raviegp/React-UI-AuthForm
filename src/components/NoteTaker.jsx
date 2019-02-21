import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
    root: {
        width: '100%',
    },
    fab: {
        margin: theme.spacing.unit * 2,
    },
    fixed: {
        position: 'fixed',
        bottom: theme.spacing.unit * 3,
        right: theme.spacing.unit * 3,
        zIndex: 1,
    },
});

class NoteTaker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            noteTitle: '',
            noteDescription: '',
            error: '',
        };
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleAddNote = this.handleAddNote.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleNoteTitleChange = this.handleNoteTitleChange.bind(this);
        this.handleNoteDescriptionChange = this.handleNoteDescriptionChange.bind(this);
    }

    handleClickOpen() {
        this.setState({ open: true });
    }

    handleClose() {
        this.setState({ 
            open: false,
            noteTitle: '',
            noteDescription: '',
            error: '',
        });
    }

    handleNoteTitleChange(event) {
        this.setState({ noteTitle: event.target.value });
    }

    handleNoteDescriptionChange(event) {
        this.setState({ noteDescription: event.target.value });
    }

    handleAddNote() {
        if (!this.state.noteTitle) {
            this.setState({ error: 'Please enter a note title'});
            return;
        }
        const note = {
            id: Math.random() * 3423423,
            noteTitle: this.state.noteTitle,
            noteDescription: this.state.noteDescription,
        };
        this.props.handleAddNote(note);
        this.handleClose();
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Tooltip title="Add Note" aria-label="Add note">
                    <Fab
                        color="secondary"
                        className={classes.fixed}
                        onClick={this.handleClickOpen}
                    >
                        <AddIcon />
                    </Fab>
                </Tooltip>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="create-note-form"
                >
                    <DialogTitle id="create-note-form">
                        Add Note
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="note"
                            label="Note Title"
                            type="text"
                            onChange={this.handleNoteTitleChange}
                            value={this.state.noteTitle}
                            fullWidth
                            required
                            error={this.state.error !== ''}
                            helperText={this.state.error ? this.state.error : ''}
                        />
                        <TextField
                            margin="dense"
                            id="note"
                            label="Note Description"
                            type="text"
                            onChange={this.handleNoteDescriptionChange}
                            value={this.state.noteDescription}
                            fullWidth
                            // error={this.state.noteDescription === ''}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button 
                            onClick={this.handleAddNote}
                            color="primary">
                                Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

NoteTaker.propTypes = {
    classes: PropTypes.object.isRequired,
    handleAddNote: PropTypes.func.isRequired,
};

export default withStyles(styles)(NoteTaker);