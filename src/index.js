const express = require('express');

const app = express();

const { PORT } = require('./config/serverConfig');
    
const apiRoutes = require('./routes/index');
const bodyParser = require('body-parser');
// const UserRepository = require('./repository/user-repository');

const prepareAndStartServer = () => {
    app.use(express.json());
    // app.use(bodyParser.json());
    // app.use(bodyParser.urlencoded({extended: true}))

    app.use('/api', apiRoutes);

    app.listen(PORT, async () => {
        console.log(`Server started at ${PORT}`);

        // const repo = new UserRepository();
        // const response = await repo.getById(1);
        // console.log(response);
    })
}

prepareAndStartServer();