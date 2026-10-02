//File này dùng để khai báo port và khởi đông server


const app = require('./src/app'); 
const PORT = 3055;

const server = app.listen(PORT, () => {
  console.log(`WebService eCommerce running on port ${PORT}`);
});


// Close the server safely before the application exits
//bắt sự kiện Ctrl+C và đóng HTTP server một cách an toàn trước khi chương trình Node.js thoát.
process.on('SIGINT', () => {
    server.close(() => { 
        console.log('Exit Server');
    });
});