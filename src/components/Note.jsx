import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Card, CardHeader, CardContent, CardActions } from '@material-ui/core';
import { Link } from 'react-router-dom';
import highlightSearchTerm from '../utils/highlight-search-term';

const styles = theme => ({
    root: {
        maxWidth: theme.spacing.unit * 50,
        minWidth: theme.spacing.unit * 40,
        [theme.breakpoints.up('sm')]: {
            maxWidth: theme.spacing.unit * 30,
            minWidth: theme.spacing.unit * 20,
        }, 
        [theme.breakpoints.up('md')]: {
            maxWidth: theme.spacing.unit * 50,
            minWidth: theme.spacing.unit * 40
        }
    },
    card: {
        minWidth: 275,
    },
    pos: {
        marginBottom: 12,
    },
    deleteIcon: {
        justifyContent: 'flex-end', 
    },
});

const Note = (props) => {
    const { classes, note, handleRemoveNote, searchTerm } = props;
    return (
        <Card className={classes.root}>
            <CardHeader 
                action={
                    <Link to={`/edit-note/${note.id}`}>
                        <IconButton>
                            <EditIcon />
                        </IconButton>
                    </Link>
                }
                title={searchTerm ? highlightSearchTerm(note.noteTitle, searchTerm) : note.noteTitle}
            />
            <CardContent>
                <Typography
                    variant="h6"
                    component="h2"
                >   
                    { searchTerm ? highlightSearchTerm(note.noteDescription, searchTerm) : note.noteDescription }
                </Typography>
            </CardContent>
            <CardActions className={classes.deleteIcon}>
                <IconButton onClick={handleRemoveNote.bind(null, note.id)}>
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}

Note.propTypes = {
    classes: PropTypes.object.isRequired,
    note: PropTypes.object.isRequired,
    handleRemoveNote: PropTypes.func.isRequired,
    searchTerm: PropTypes.string,
};

export default withStyles(styles)(Note);