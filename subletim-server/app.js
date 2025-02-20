const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const createCountMinSketch = require('count-min-sketch');

const indexRouter = require('./src/routes/index');
const subletRouter = require('./src/routes/subletRoute');
const apartmentRouter = require('./src/routes/apartmentRoute');
const userRouter = require('./src/routes/userRoute');
const cmsRouter = require('./src/routes/cmsRoute');
const scrapingModule = require('./src/modules/ScrapingModule');
const scraping = new scrapingModule();

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io').listen(http);
const cors = require('cors');

global.cms =  createCountMinSketch();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('views', path.join(__dirname, '../subletim-app/dist/subletim-app'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
// Set Static Folder
app.use(express.static(path.join(__dirname, '../subletim-app/dist/subletim-app')));

app.use('/', indexRouter);
app.use('/subletRoute', subletRouter);
app.use('/apartmentRoute', apartmentRouter);
app.use('/userRoute', userRouter);
app.use('/cmsRoute', cmsRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({ error: err });
});

app.listen(4200, function () {
    console.log('App listening on port 4200!');
});

let usersNumber = 0;

io.on("connection", socket => {
    socket.on("newUser", user => {
        usersNumber += 1;
        io.emit("usersCount", usersNumber);
        socket.emit("usersCount", usersNumber);
    });

    socket.on("usersUpdateByAdmin", usersCount => {
        usersNumber = usersCount;
        io.emit("usersCount", usersNumber);
        socket.emit("usersCount", usersNumber);
    });
});

http.listen(4444);

scraping.scrapeBooking();
