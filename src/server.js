require('dotenv').config();
const express = require('express');
const connection = require('./config/database');
const apiRoutes = require('./routes/api')
const fileUpload = require('express-fileupload');

const app = express();
const port = process.env.PORT;
const hostname = process.env.HOST_NAME;

//config file upload
app.use(fileUpload());


//config req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/v1/api/', apiRoutes);


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



