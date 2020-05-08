import express from 'express';
import db from '../models';
import bcrypt from 'bcrypt';
import {config} from 'dotenv';
import auth from '../middleware/authenticate';
import jwt from 'jsonwebtoken';
config();

const api = express.Router();
const {PRIVATEKEYTOKEN}= process.env;

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

            if(pass){
                bcrypt.hash(pass,10).then((hash)=>{
                    db.users.create({
                        id_tipouser:id_tipouser,
                        nombre:nombre,
                        mail:mail,
                        pass:hash
                    }).then((ress)=>{
                        res.status(201).send({message:'Usuario Registrado con exito'});
                    }).catch((error)=>{
                        console.log(error)
                    })
                })
            }else{
                res.status(200).send({message:'Por favor introduzca la contraseña'});
            }
        })
    } catch (error) {
        console.log(error)
    }
}).post('/users/login', async(req, res)=>{
    
    const {mail, pass}=req.body;
    if(mail===''){
        return res.status(200).send({message:'Introduzca el correo'})
    }
    db.sequelize.sync().then(()=>{
        db.users.findAll({
                
                where:{
                    mail:mail
                }
                    
    }).then(users=>{
        console.log(users)
        if(users){
            if(users.length<=0){
                return res.status(200).send({message:'Este correo no existe'})
            }
            users.forEach(element => {
               
                console.log(element.dataValues.mail)
                if(pass){
                    bcrypt.compare(pass,element.dataValues.pass).then((check)=>{
                        if(!check){
                            return res.status(200).send({message:'Contraseña Incorrecta'})
                        }

                       
                            let token=jwt.sign({
                                user:element
                            }, PRIVATEKEYTOKEN,{expiresIn:60*60});
                            res.status(200).send({
                                token:token,
                                user:element
                            });
                       
                    })
                }else{
                    res.status(200).send({message:'Introduzca la contraseña'})
                }
            });
        }
    }).catch((error)=>{
        console.log(error)
    })

}).catch((error)=>{
    console.log(error)
})
}).get('/users', async(req,res)=>{
    try {
        db.users.findAll({

        }).then((ress)=>{
            res.status(200).send({users:ress})
        })
    } catch (error) {
        console.log(error)
    }
})