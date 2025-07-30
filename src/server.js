require('dotenv').config();
const express = require('express');
const connection = require('./config/database');
const apiRoutes = require('./routes/api')
// const User = require('./models/user');

const app = express();
const port = process.env.PORT;
const hostname = process.env.HOST_NAME;

//config req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/v1/api/', apiRoutes);


// User.create({ name: 'A', email: 'b', city: 'c' });

(async () => {
    //test connection
    try {
        await connection();
        app.listen(port, hostname, () => {
            console.log(`Backend app listening on port ${port}`)
        })
    } catch (error) {
        console.log(">>> Error connect to DB: ", error);
    }
})()



