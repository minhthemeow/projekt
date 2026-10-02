const express = require('express');
const morgan = require('morgan');
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

//init database

//init routes

//handle errors

module.exports = app;