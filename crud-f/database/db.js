const mysql = require('mysql')

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'empresa'
})

conexion.connect((error) => {
    if(error) {
        console.log('El error de conexión es: ' + error) 
        return
    }
    console.log('Conexión exitosa')
})

module.exports = conexion