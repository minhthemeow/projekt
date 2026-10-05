'use strict';
/* 
Áp dụng singleton pattern để đảm bảo chỉ có một kết nối duy nhất đến cơ sở dữ liệu MongoDB trong toàn bộ ứng dụng.
Điều này giúp tránh việc tạo ra nhiều kết nối không cần thiết, tiết kiệm tài nguyên và cải thiện hiệu suất của ứng dụng.
*/  

const mongoose = require('mongoose');
const {db: {host, port, name}} = require('../configs/config.mongodb.js');
const connectString = `mongodb://${host}:${port}/${name}`; // Kết nối đến cơ sở dữ liệu MongoDB với tên shopDEV
const {countConnect} = require('../helpers/check.connect.js');

console.log(`Connecting to MongoDB at ${connectString}...`);
class Database {
    constructor() {
        this.connect();
    }

    connect(type='mongodb') {
        if (1 === 1) {
            mongoose.set('debug', true);
            mongoose.set('debug', { color: true });
        }

        mongoose.connect(connectString, { maxPoolSize: 50 }).then(_ => {
            console.log('Connected to MongoDB PRO Successfully');
            countConnect();
        })
        .catch((err) => console.error('Error connecting to MongoDB:', err));
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }   
        return Database.instance;
    }       
}

const dbInstance = Database.getInstance();

module.exports = dbInstance;