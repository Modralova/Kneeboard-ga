
require('dotenv').config({ path: '.env'});
const app = require('./app.js');
const  mongoose  = require('mongoose');



// uaktualnić zmienne środowiskowe
 
const dBASEurl = process.env.DATABASE_URL;   // połącznie ze zdalną bazą danych :: jeśli baza jest na AWS sprawdź czy IP, oraz IP w SecurityGroup jest aktualne




app.set('port', process.env.PORT || 8080);


const server = app.listen(app.get('port'),()=>{console.log(`-------> live on port: ${server.address().port}` );});


dBASE()




 function dBASE(){

try{
    mongoose.connect(dBASEurl, {

        useUnifiedTopology: true,
        useNewUrlParser: true 
    
    });
        
       console.log("-------> DB connected on  URL: ",dBASEurl )

    }catch(error){handleError(error);    
    
    }

    process.on('unhandledRejection', error => {console.log('unhandledRejection', error.message);

    console.log(mongoose);

})


 }