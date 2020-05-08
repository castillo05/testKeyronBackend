import db from '../models';
import express from 'express';
import {config} from 'dotenv';
import auth from '../middleware/authenticate';

config();

const api=express.Router();


export default api.post('/tickets',async(req,res)=>{
    try {
        const {id_user,ticket_pedido}=req.body;
        if(id_user=='' || ticket_pedido==''){
            return res.status(406).send({message:'Por favor llenar todos los campos'})
        }
        db.tickets.create({
            id_user:id_user,
            ticket_pedido:ticket_pedido
        }).then((ticket)=>{
            res.status(201).send({message:'Ticket Creado con Exito'});
        }).catch((error)=>{
            console.log(error)
        })
    } catch (error) {
        console.log(error)
    }
}).get('/tickets',async(req,res)=>{
    try {
       await db.tickets.findAll({

        }).then((ress)=>{
            res.status(200).send({tickets:ress});
        }).catch((error)=>{
            console.log(error)
        })
    } catch (error) {
        console.log(error)
    }
}).get('/tickets/:id',async(req,res)=>{
    try {
        const id=req.params.id;
       await db.tickets.findAll({
            where:{
                id:id
            }
        }).then((ress)=>{
            res.status(200).send({tickets:ress});
        }).catch((error)=>{
            console.log(error)
        })
    } catch (error) {
        console.log(error)
    }
}).put('/tickets/:id', async(req, res)=>{
    try {
        const id = req.params.id;
        const {id_user,ticket_pedido}=req.body;

       await db.tickets.update({
            id_user:id_user,
            ticket_pedido:ticket_pedido
        },{
            where:{
                id:id
            }
        }).then((ress)=>{
            res.status(200).send({message:'Ticket actualizado con exito'});
        }).catch((error)=>{
            console.log(error)
        })

    } catch (error) {
        console.log(error)
    }
}).delete('/tickets/:id',async(req,res)=>{
    try {
        const id = req.params.id;
        db.tickets.destroy({
            where:{
                id:id
            }
        }).then((ress)=>{
            res.status(200).send({message:'Ticket Eliminado Satisfactoriamente'});
        }).catch((error)=>{
            console.log(error)
        })
    } catch (error) {
        console.log(error)
    }
}).get('/tickets/usuario/:id',async(req,res)=>{
    try {
        const id=req.params.id;
       await db.tickets.findAll({
            where:{
                id_user:id
            }
        }).then((ress)=>{
            res.status(200).send({tickets:ress});
        }).catch((error)=>{
            console.log(error)
        })
    } catch (error) {
        console.log(error)
    }
})
