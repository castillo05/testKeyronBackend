import db from './models';
import app from './app';
import {config} from 'dotenv';
config()
 const {PORT}=process.env;

 (async()=>{
    try {
        app.listen(PORT,async()=>{
           await db.sequelize.authenticate().then(()=>{
                console.log(`Connect to Database in http://localhost:${PORT}/api`)
            }).catch((error)=>{
                console.log(error)
            }) 
         })
        
    } catch (error) {
        console.log(error)
    }
 })()

 
