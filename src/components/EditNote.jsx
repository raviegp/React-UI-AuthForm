import React, { Component } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { MuiThemeProvider } from '@material-ui/core';
import theme from '../theme/theme';

class EditNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            noteTitle: this.props.notes.filter(note => note.id === parseFloat(this.props.match.params.id))[0].noteTitle,
            noteDescription: this.props.notes.filter(note => note.id === parseFloat(this.props.match.params.id))[0].noteDescription,
        };
        this.handleUpdateNote = this.handleUpdateNote.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleNoteTitleChange = this.handleNoteTitleChange.bind(this);
        this.handleNoteDescriptionChange = this.handleNoteDescriptionChange.bind(this);
    }

    handleClose() {
        this.setState({
            open: false,
            noteTitle: '',
            noteDescription: '',
        });
        this.props.history.push('/home');
    }

    handleNoteTitleChange(event) {
        this.setState({ noteTitle: event.target.value });
    }

    handleNoteDescriptionChange(event) {
        this.setState({ noteDescription: event.target.value });
    }

    handleUpdateNote() {
        const updatedNote = {
            id: parseFloat(this.props.match.params.id),
            noteTitle: this.state.noteTitle,
            noteDescription: this.state.noteDescription,
        };
        this.props.handleUpdateNote(updatedNote);
        this.handleClose();
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="edit-note-form"
                >
                    <DialogTitle id="edit-note-form">
                        Edit Note
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
                        />
                        <TextField
                            margin="dense"
                            id="note"
                            label="Note Description"
                            type="text"
                            onChange={this.handleNoteDescriptionChange}
                            value={this.state.noteDescription}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleUpdateNote} color="primary">
                            Update
                        </Button>
                    </DialogActions>
                </Dialog>
            </MuiThemeProvider>
        );
    }
}

EditNote.propTypes = {
    notes: PropTypes.array.isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    handleUpdateNote: PropTypes.func.isRequired,
};

export default EditNote;