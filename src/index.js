const express = require('express');

const app = express();

const { PORT } = require('./config/serverConfig');
    
const apiRoutes = require('./routes/index');
const bodyParser = require('body-parser');
const UserService = require('./services/user-service')
const prepareAndStartServer = () => {
    app.use(express.json());
    // app.use(bodyParser.json());
    // app.use(bodyParser.urlencoded({extended: true}))

    app.use('/api', apiRoutes);

    app.listen(PORT, async () => {
        console.log(`Server started at ${PORT}`);

        const service = new UserService();
        // const newToken = service.createToken({
        //     email: 'akshatkba24@gmail.com', id: 1
        // });

        // console.log("new token is ", newToken);
        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFrc2hhdGtiYTI0QGdtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE3MTkzOTc1NTEsImV4cCI6MTcxOTQwMTE1MX0.Vl8TXTzKIhWJrhJlXoY1LesGpK4PR-fg9teiSkbhf-k';
        // const response = service.verifyToken(token);
        // console.log(response);
    })
}

prepareAndStartServer();