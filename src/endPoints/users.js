import express from 'express';
import db from '../models';
import {config} from 'dotenv';
config();

const api = express.Router();

export default api.post('/users', async(req, res)=>{
    try {
        const{id_tipouser,nombre,mail,pass}=req.body;

        db.users.findAll({
            where:{
                mail:mail
            }
        }).then((user)=>{
            if (user.length>=1){
                return res.status(200).send({message:'Este email ya existe'});
            }

            
        })
    } catch (error) {
        console.log(error)
    }
})