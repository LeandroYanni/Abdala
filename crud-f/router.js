const express = require('express')
const router = express.Router()

const conexion = require('./database/db')

router.get('/', (req, res) => {
    conexion.query('SELECT * FROM clientes', (error, data) => {
        if(error){
            console.log(error)
        }else{
            //console.log(data)
            res.render('index.ejs', {data:data})
        }
    })
})

//ruta para crear registros
router.get('/create', (req, res) => {
    res.render('create');
})

//ruta para editar registros
router.get('/edit/:ID_CLIENTE', (req, res) => {
    const id = req.params.ID_CLIENTE
    conexion.query('SELECT * FROM clientes WHERE ID_CLIENTE=?', [id], (error, data) => {
        //console.log(id, data)
        if(error){
            console.log(error)
        }else{
            //console.log(data)
            res.render('edit', {clientes:data[0]})
        }
    })
})

//ruta para eliminar registro
router.get('/delete/:ID_CLIENTE', (req, res) => {
    const id = req.params.ID_CLIENTE
    conexion.query('DELETE FROM clientes WHERE ID_CLIENTE = ?', [id], (error, results) => {
        if (error){
            console.log(error)
        }else{
            res.redirect('/')
        }
    })
})

const crud = require('./controller/crud')

router.post('/save', crud.save)
router.post('/update', crud.update)

module.exports = router
