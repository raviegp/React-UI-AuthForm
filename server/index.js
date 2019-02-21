const jsonServer = require('json-server');
const path = require('path');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const express = require('express');

const PORT = process.env.PORT || 3000;

server.use(express.static(path.join(__dirname, '..', 'build')));

server.use('/api/v1', router);

server.use('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

server.listen(PORT, () => {
    console.log(`server is listening on port: ${PORT}`);
});
