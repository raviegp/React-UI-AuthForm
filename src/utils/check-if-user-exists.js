const checkIfUserExists = (userEmail) => {
    return fetch(`${process.env.REACT_APP_USERS_API}${userEmail}`)
        .then(response => response.json())
        .then(user => !!user.id)
};

export default checkIfUserExists;