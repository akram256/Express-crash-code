const express = require('express');
const path = require('path')
const logger = require('./middleware/logger')
const exphbs = require('express-handlebars')
const members =require ('./Members')


const app = express();

//function middleware

// init middleware
// app.use(logger);

//handles middleware
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

//home page route
app.get('/', (req, res) => {
    res.render('index', {
        title:' Member App',
        members
    });
});

// app.get('/',(req, res) =>{
    // res.send('hell world')
    // set a static folder
    // res.sendFile(path.join(__dirname,'public', 'index.html'));
// body Parse middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public'))) 
app.use('/api/members', require('./routes/api/members'));

// });

const PORT = process.env.PORT || 5000;



app.listen(PORT), (console.log(`server started on ${PORT}`));
