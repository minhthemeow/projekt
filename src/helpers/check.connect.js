'use strict';

const mongoose = require('mongoose');
const os = require('os');
const process = require('process');
const _SECONDS = 5000;

// count connect
const countConnect = () => {
    const numConnections = mongoose.connections.length;
    console.log(`Number of active connections::${numConnections}`);
    return numConnections;
}

const checkOverload = () => {
    setInterval(() => {
        const numConnections = countConnect();
        const numCores = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;
        // Example maximum number of connections based on CPU cores
        const maxConnections = numCores * 5; // Allow 5 connections per CPU core 
       
        console.log(`Active connections::${numConnections}`);
        console.log(`Memory usage::${(memoryUsage / (1024 * 1024)).toFixed(2)} MB`);
        if (numConnections > maxConnections) {
            console.warn(`Warning: Number of active connections (${numConnections}) exceeds the maximum allowed (${maxConnections}).`);
        }
    }, _SECONDS); // Monitor every 5 seconds
}

module.exports = {countConnect, checkOverload};