//Dev by Andrew Urquhart 7/29/2022
//slack/discord - Drewlongshot


// set app to use express ejs views
const express = require('express')
const app = express()


// set app to use port in either .ENV or default 
//Set database name that you want your PostGre to connent to
app.set("port", process.env.PORT || 3000)
app.set("database", "generalassembly")


//---- set up of the Postgres database client
// pg has a bunch of stuff just need client
const dbClient = require('pg').Client
const client = new dbClient({
    user:"postgres",
    password:"2356",
    host:"Digital-S-Lumos4322598",
    //port is optional this is 5432 default
    port: 5432,
    database: (app.get("database"))
})


//Configure other requires
require('dotenv').config()
const methodOverride = require('method-override')
const expressEjsLayout = require('express-ejs-layouts')
const navController = require('./controllers/nav-controller')


// Config set and use---------------
app.use(express.static('public'))
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:false}));
app.use(expressEjsLayout)
app.set('view engine', 'ejs')



//connect your database postgres client returns a promise and some results  $database defined above

client.connect()
.then(()=> console.log(`✅ connected to Postgres: ${app.get("database")} 🌟`))
.then(() => client.query("SELECT * FROM students;"))
.then((results => console.table(results.rows)))
.catch(e => console.log("here is your error ", e))
.finally(() => client.end())


// redirect user to home page ---------------
app.get('/', (req, res) => {
    res.redirect('/')
  })

// Controllers ---------------
// the "home" page in this section is the index
app.use('/',navController)


app.listen(app.get("port"), () => {
  console.log(`✅ PORT: ${app.get("port")} 🌟`);
});