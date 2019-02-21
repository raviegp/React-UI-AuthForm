import React, { Component, Fragment } from 'react';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import NotesApp from '../components/NotesApp';
import EditNote from '../components/EditNote';
import AuthenticationForm from '../components/AuthenticationForm';
import createHistory from 'history/createBrowserHistory';
import SearchResult from '../components/SearchResult';
import ProtectedRoute from './ProtectedRoute';
import checkIfUserExists from '../utils/check-if-user-exists';

export const history = createHistory();

class AppRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            filteredNotes: [],
            searchTerm: '',
        };
        this.handleAddNote = this.handleAddNote.bind(this);
        this.handleRemoveNote = this.handleRemoveNote.bind(this);
        this.handleUpdateNote = this.handleUpdateNote.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleFetchNotes = this.handleFetchNotes.bind(this);
        this.resetNotesState = this.resetNotesState.bind(this);
    }

    handleFetchNotes() {
        setTimeout(() => {
            const userEmail = localStorage.getItem('email');
            checkIfUserExists(userEmail)
                .then(user => {
                    if (user) {
                        fetch(`${process.env.REACT_APP_USERS_API}${userEmail}`)
                            .then(response => response.json())
                            .then(user => this.setState({ notes: user.notes }))
                            .catch(error => console.error(`Unable to fetch notes for user ${userEmail}: ERR: `, error));
                    } else {
                        this.setState({ notes: [] });
                    }
                });
        }, 0);
    }

    resetNotesState() {
        this.setState({ notes: [] });
    }

    handleAddNote(note) {
        const userEmail = localStorage.getItem('email');
        const userData = {
            id: userEmail,
            notes: this.state.notes.concat([note])
        };

        this.setState((currState) => (
            { notes: currState.notes.concat([note]) }
        ));

        checkIfUserExists(userEmail)
            .then(user => {
                if (user) {
                    fetch(`${process.env.REACT_APP_USERS_API}${userEmail}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(userData)
                    })
                        .then(response => response.json())
                        .catch(error => console.error(`Unable to save the note for user ${userEmail}: ERR: `, error));
                } else {
                    fetch(`${process.env.REACT_APP_USERS_API}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(userData)
                    })
                        .then(response => response.json())
                        .catch(error => console.error(`Unable to save the note for user ${userEmail}: ERR: `, error));
                }
            });
    }

    handleRemoveNote(noteId) {
        const userEmail = localStorage.getItem('email');
        const indexToRemove = this.state.notes.findIndex(note => note.id === noteId);
        const userData = {
            id: userEmail,
            notes: [...this.state.notes.slice(0, indexToRemove), ...this.state.notes.slice(indexToRemove + 1)]
        };

        this.setState((currState) => ({
            notes: [...currState.notes.slice(0, indexToRemove), ...currState.notes.slice(indexToRemove + 1)],
        }));

        fetch(`${process.env.REACT_APP_USERS_API}${userEmail}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        })
            .then(response => response.json())
            .catch(error => console.error(`Unable to delete the note for user ${userEmail}: ERR: `, error));
    }

    handleUpdateNote(updatedNote) {
        const userEmail = localStorage.getItem('email');
        const indexToUpdate = this.state.notes.findIndex(note => note.id === updatedNote.id);
        const userData = {
            id: userEmail,
            notes: [...this.state.notes.slice(0, indexToUpdate), { ...updatedNote }, ...this.state.notes.slice(indexToUpdate + 1)]
        };
        this.setState((currState) => ({
            notes: [...currState.notes.slice(0, indexToUpdate), { ...updatedNote }, ...currState.notes.slice(indexToUpdate + 1)],
        }));

        fetch(`${process.env.REACT_APP_USERS_API}${userEmail}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        })
            .then(response => response.json())
            .catch(error => console.error(`Unable to save the updated note for user ${userEmail}: ERR: `, error));
    }

    handleSearch(searchTerm) {
        const lowerCasedSearchTerm = searchTerm.toLowerCase();
        const filteredNotes = this.state.notes.filter(
            note => (note.noteTitle.toLowerCase().indexOf(lowerCasedSearchTerm) >= 0) ||
                (note.noteDescription.toLowerCase().indexOf(lowerCasedSearchTerm) >= 0));
        this.setState({ searchTerm, filteredNotes });
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <Switch>
                        <Route
                            path="/"
                            exact
                            render={() => (
                                localStorage.getItem("isLoggedIn") === 'true' ? (
                                    <Redirect to="/home" />
                                ) : (
                                        <AuthenticationForm />
                                    )
                            )}
                        />
                        {/* <Route
                            path="/home"
                            exact
                            render={(props) => 
                                <NotesApp
                                    {...props}
                                    notes={this.state.notes}
                                    handleAddNote={this.handleAddNote}
                                    handleRemoveNote={this.handleRemoveNote}
                                    handleSearch={this.handleSearch}         
                                />}
                        /> */}
                        <ProtectedRoute
                            path="/home"
                            exact
                            component={NotesApp}
                            resetNotesState={this.resetNotesState}
                            handleFetchNotes={this.handleFetchNotes}
                            notes={this.state.notes}
                            handleAddNote={this.handleAddNote}
                            handleRemoveNote={this.handleRemoveNote}
                            handleSearch={this.handleSearch}
                        />
                        {/* <Route
                            path="/edit-note/:id"
                            exact
                            render={(props) => 
                                <EditNote
                                    {...props}
                                    notes={this.state.notes}
                                    handleUpdateNote={this.handleUpdateNote}         
                                />}
                        /> */}
                        <ProtectedRoute
                            path="/edit-note/:id"
                            exact
                            component={EditNote}
                            notes={this.state.notes}
                            handleUpdateNote={this.handleUpdateNote}
                        />
                        {/* <Route
                            path="/notes/search"
                            exact
                            render={(props) => 
                                <SearchResult
                                    {...props}
                                    notes={this.state.filteredNotes}
                                    handleSearch={this.handleSearch}
                                    handleRemoveNote={this.handleRemoveNote}         
                                />}
                        /> */}
                        <ProtectedRoute
                            path="/notes/search"
                            exact
                            component={SearchResult}
                            notes={this.state.filteredNotes}
                            handleRemoveNote={this.handleRemoveNote}
                            handleSearch={this.handleSearch}
                            searchTerm={this.state.searchTerm}
                        />
                    </Switch>
                </Router>
            </Fragment>
        );
    }
}

export default AppRouter;