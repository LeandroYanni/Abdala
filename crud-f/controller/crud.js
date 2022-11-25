const e = require('express')
const conexion = require('../database/db')

exports.save = (req, res) => {
    const nombre = req.body.nombre
    const apellido = req.body.apellido
    const fecha_nac = req.body.fecha_nac
    const peso = req.body.peso
    const altura = req.body.altura
    const domicilio = req.body.domicilio
    const cod_postal = req.body.cod_postal
    const num_m1 = req.body.num_m1
    const num_m2 = req.body.num_m2
    const email = req.body.email

    console.log(nombre +" - "+ apellido +" - "+ fecha_nac +" - "+ peso +" - "+ altura +" - "+ domicilio +" - "+ cod_postal +" - "+ num_m1 +" - "+ num_m2  +" - "+ email)

    conexion.query('INSERT INTO clientes SET ?', {nombreCliente:nombre, apellidoCliente:apellido, fNacimientoCliente:fecha_nac, pesoCliente:peso, alturaCliente:altura, domicilioCliente:domicilio, codPostal:cod_postal, tel01:num_m1, tel02:num_m2, emailCliente:email}, (error, data) => {
        if(error){
            console.log(error)
        }else{
            res.redirect('/')
        }
    })
}

exports.update = (req, res) => {
    const id = req.body.id
    const nombre = req.body.nombre
    const apellido = req.body.apellido
    const fecha_nac = req.body.fecha_nac
    const peso = req.body.peso
    const altura = req.body.altura
    const domicilio = req.body.domicilio
    const cod_postal = req.body.cod_postal
    const num_m1 = req.body.num_m1
    const num_m2 = req.body.num_m2
    const email = req.body.email

    conexion.query('UPDATE clientes SET ? WHERE ID_CLIENTE = ?', [{nombreCliente:nombre, apellidoCliente:apellido, fNacimientoCliente:fecha_nac, pesoCliente:peso, alturaCliente:altura, domicilioCliente:domicilio, codPostal:cod_postal, tel01:num_m1, tel02:num_m2, emailCliente:email}, id], (error, data) => {

        if(error){
            console.log(error)
        }else{
            res.redirect('/')
        }
    })
}