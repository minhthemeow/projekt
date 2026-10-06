require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const {default: helmet} = require('helmet');
const compression = require('compression');
const app = express();


/* 
Những library cần thiết cho việc xử lý request và response:
morgan: dùng để log các request đến server, giúp theo dõi và debug.
helmet: giúp bảo vệ ứng dụng khỏi một số lỗ hổng bảo mật phổ biến.
compression: nén response để giảm dung lượng dữ liệu truyền tải, cải thiện tốc độ tải trang.
*/

//init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
//init database
require('./dbs/init.mongodb.js');
const {checkOverload} = require('./helpers/check.connect.js');
// checkOverload(); // Start monitoring connections and memory usage
//init routes

app.use('/', require('./routes/index.js'));
//handle errors

module.exports = app;