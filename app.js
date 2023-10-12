const express = require('express')
const app = express()
const PORT = 7000;
const cookieParser = require('cookie-parser')
const session = require('express-session')
const expressLayout = require('express-ejs-layouts')
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose')
const mongoDbSessions = require('connect-mongodb-session')(session)
const config = require('./config/config')
mongoose.connect(config.mongodb_url, {
    useNewUrlParser: true,
    useUnifeidTopology: true,
    useFindAndModify: false,
    useCreateindex: true
})
    .then(() => {
        console.log("DataBase in running");
    })
    .catch((error) => {
        console.log(error);
    })




//Midlawere
app.use(expressLayout)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// ejs fayylarni oqiy olishi uchun


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");



app.use(express.static(path.join(__dirname, "public")));



app.use('/', require('./page/admin'))


app.use('/api/user', require('./router/userRouter'))
app.use('/api/category', require('./router/categoryRouter'))
app.use('/api/tag', require('./router/tagRouter'))
app.use('/api/author', require('./router/authorRouter'))
app.use('/api/news', require('./router/newsRouter'))
app.use('/api/news', require('./router/newsRouter'))
app.use('/api/advertisement', require('./router/advertisementRouter'))
app.use('/api/audio', require('./router/audioRouter'))
// app.use('/api/comment', require('./router/commentRouter'))
// app.use('/api/reply', require('./router/replyRouter'))
// app.use('/api/rating', require('./router/ratingRouter'))





app.listen(PORT, () => {
    console.log("Server is running");
})