/*
CREATE TABLE `empresa`.`clientes` ( `ID_CLIENTE` INT NOT NULL , `nombreCliente` VARCHAR(100) NOT NULL , `apellidoCliente` VARCHAR(100) NOT NULL , `fNacimientoCliente` DATE NOT NULL , `pesoCliente` FLOAT NOT NULL , `alturaCliente` FLOAT NOT NULL , `domicilioCliente` VARCHAR(100) NOT NULL , `codPostal` INT NOT NULL , `tel01` INT NOT NULL , `tel02` INT NOT NULL , `emailCliente` VARCHAR(100) NOT NULL , PRIMARY KEY (`ID_CLIENTE`)) ENGINE = InnoDB;

*/
const http = require('http')
const fs = require('fs')

const mysql = require('mysql');

const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'empresa'
})

conexion.connect(error => {
  if (error)
    console.log('Problemas de conexion con mysql')
})


const mime = {
  'html': 'text/html',
  'css': 'text/css',
  'jpg': 'image/jpg',
  'png': 'image/png',
  'ico': 'image/x-icon',
  'mp3': 'audio/mpeg3',
  'mp4': 'video/mp4'
}

const servidor = http.createServer((pedido, respuesta) => {
  const url = new URL('http://localhost:8000' + pedido.url)
  let camino = 'public' + url.pathname
  if (camino == 'public/')
    camino = 'public/index.html'
  encaminar(pedido, respuesta, camino)
  
})

servidor.listen(8000)


function encaminar(pedido, respuesta, camino) {
  switch (camino) {
    case 'public/peso+90&altura+1.78':{
      ClientesPeso90Altura178(respuesta)
      break;
    }
    case 'public/email+gmail':{
      clientesConGmail(respuesta)
      break;
    }
    case 'public/promediopeso':{
      promedioPeso(respuesta)
      break;
    }
    case 'public/pesoMasAlto':{
      pesoMasAlto(respuesta)
      break;
    }
    case 'public/clienteMenor':{
      clienteMenor(respuesta)
      break;
    }
//
    case 'public/crearTabla':{
        crearTabla(respuesta)
        break;
    }

    case 'public/alta':{
      alta(pedido,respuesta)
      break
    }

    case 'public/baja':{
      baja(pedido,respuesta)
      break
    }

    case 'public/listado': {
      listado(respuesta)
      break
    }
    case 'public/consultaporcodigo': {
      consulta(pedido, respuesta)
      break
    }

    default: {
      fs.stat(camino, error => {
        if (!error) {
          fs.readFile(camino, (error, contenido) => {
            if (error) {
              respuesta.writeHead(500, { 'Content-Type': 'text/plain' })
              respuesta.write('Error interno')
              respuesta.end()
            } else {
              const vec = camino.split('.')
              const extension = vec[vec.length - 1]
              const mimearchivo = mime[extension]
              respuesta.writeHead(200, { 'Content-Type': mimearchivo })
              respuesta.write(contenido)
              respuesta.end()
            }
          })
        } else {
          respuesta.writeHead(404, { 'Content-Type': 'text/html' })
          respuesta.write('<!doctype html><html><head></head><body>Recurso inexistente</body></html>')
          respuesta.end()
        }
      })
    }
  }
}

function printData(filas,respuesta){
  respuesta.writeHead(200, { 'Content-Type': 'text/html' })
  let datos = ''
  for (let f = 0; f < filas.length; f++) {
    datos += '<center>Codigo: ' + filas[f].ID_CLIENTE + '<br>'
    datos += 'Nombre: ' + filas[f].nombreCliente + '<br>'
    datos += 'Apellido: ' + filas[f].apellidoCliente + '<br>'
    datos += 'Fecha Nac: ' + filas[f].fNacimientoCliente + '<br>'
    datos += 'Peso: ' + filas[f].pesoCliente + '<br>'
    datos += 'Altura: ' + filas[f].alturaCliente + '<br>'
    datos += 'Domicilio: ' + filas[f].domicilioCliente + '<br>'
    datos += 'Cod. Postal: ' + filas[f].codPostal + '<br>'
    datos += 'Telefono 1: ' + filas[f].tel01 + '<br>'
    datos += 'Telefono 2: ' + filas[f].tel02 + '<br>'
    datos += 'E-mail: ' + filas[f].emailCliente + '<hr>'
  }
  respuesta.write('<!doctype html><html><head></head><body>')
  respuesta.write(datos)
  respuesta.write('<a href="index.html">Retornar</a>')
  respuesta.write('</body></html>')
  respuesta.end()
}
//
function crearTabla(respuesta) {
  conexion.query('drop table if exists articulos', (error, resultado) => {
    if (error)
      console.log(error)
  })
  conexion.query("CREATE TABLE `empresa`.`clientes` ( `ID_CLIENTE` INT NOT NULL AUTO_INCREMENT , `nombreCliente` VARCHAR(100) NOT NULL , `apellidoCliente` VARCHAR(100) NOT NULL , `fNacimientoCliente` DATE NOT NULL , `pesoCliente` FLOAT NOT NULL , `alturaCliente` FLOAT NOT NULL , `domicilioCliente` VARCHAR(100) NOT NULL , `codPostal` INT NOT NULL , `tel01` INT NOT NULL , `tel02` INT NOT NULL , `emailCliente` VARCHAR(100) NOT NULL , PRIMARY KEY (`ID_CLIENTE`)) ENGINE = InnoDB;", (error, resultado) => {
    if (error) {
      console.log(error)
      return
    }
  })
  respuesta.writeHead(200, { 'Content-Type': 'text/html' })
  respuesta.write(`<!doctype html><html><head></head><body>
                  Se creo la tabla<br><a href="index.html">Retornar</a></body></html>`)
  respuesta.end()
}

function alta(pedido, respuesta) {
  let info = ''
  pedido.on('data', datosparciales => {
    info += datosparciales;
  })
  pedido.on('end', () => {
    const formulario = new URLSearchParams(info)
    const registro = {
      nombreCliente: formulario.get('nombre'),
      apellidoCliente: formulario.get('apellido'),
      fNacimientoCliente: formulario.get('fnac'),
      pesoCliente: formulario.get('peso'),
      alturaCliente: formulario.get('altura'),
      domicilioCliente: formulario.get('domicilio'),
      codPostal: formulario.get('cp'),
      tel01: formulario.get('t1'),
      tel02: formulario.get('t2'),
      emailCliente: formulario.get('email')
    }
    conexion.query('insert into clientes set ?', registro, (error, resultado) => {
      if (error) {
        console.log(error)
        return
      }
    })
    respuesta.writeHead(200, { 'Content-Type': 'text/html' })
    respuesta.write(`<!doctype html><html><head></head><body>
                    Se cargó la información<br><a href="index.html">Retornar</a></body></html>`)
    respuesta.end()
  })
}

function baja(pedido, respuesta) {
  let info = ''
  pedido.on('data', datosparciales => {
    info += datosparciales
  })
  pedido.on('end', () => {
    const formulario = new URLSearchParams(info)
    
    const dato = [formulario.get('codigo')]
    conexion.query('delete from clientes where ID_CLIENTE=?', dato, (error, filas) => {
      if (error) {
        console.log('error en la consulta')
        return
      }
      //printData(filas, respuesta);
      respuesta.writeHead(200, { 'Content-Type': 'text/html' })
      respuesta.write(`<!doctype html><html><head></head><body>
                      Operacion realizada<br><a href="index.html">Retornar</a></body></html>`)
      respuesta.end()
    })
  })
}


function listado(respuesta) {
  conexion.query('select * from clientes', (error, filas) => {
    if (error) {
      console.log('error en el listado')
      return
    }
    printData(filas, respuesta);
  })
}




function consulta(pedido, respuesta) {
  let info = ''
  pedido.on('data', datosparciales => {
    info += datosparciales
  })
  pedido.on('end', () => {
    const formulario = new URLSearchParams(info)
    
    const dato = [formulario.get('codigo')]
    conexion.query('select * from clientes where ID_CLIENTE=?', dato, (error, filas) => {
      if (error) {
        console.log('error en la consulta')
        return
      }
      printData(filas, respuesta);
    })
  })
}

console.log('Servidor web iniciado')

// Cuestiones

function ClientesPeso90Altura178(respuesta){
  //SELECT * FROM `clientes` WHERE `pesoCliente` > 90 AND `alturaCliente` > 1.78
  conexion.query('SELECT * FROM `clientes` WHERE `pesoCliente` > 90 AND `alturaCliente` > 1.78', (error, filas) => {
    if (error) {
      console.log('error en el listado')
      return
    }
    printData(filas,respuesta);

  })
}

function clientesConGmail(respuesta){
  //SELECT * FROM `clientes` WHERE `emailCliente` LIKE '%gmail%'
  conexion.query("SELECT * FROM `clientes` WHERE `emailCliente` LIKE '%gmail%'", (error, filas) => {
    if (error) {
      console.log('error en el listado')
      return
    }
    printData(filas,respuesta);
  })
}



function promedioPeso(respuesta){
  //select avg(pesoCliente) from clientes
  conexion.query("select avg(pesoCliente) from clientes", (error, filas) => {
    if (error) {
      console.log('error en el listado')
      return
    } 
      let datos = JSON.stringify(filas[0]['avg(pesoCliente)']); 
      respuesta.writeHead(200, { 'Content-Type': 'text/html' })
      respuesta.write("<h1>Promedio</h1>" + datos + "<br>");
      respuesta.write(`<!doctype html><html><head></head><body>
                    <br><a href="index.html">Retornar</a></body></html>`)
      respuesta.end();

  })
  
}

function pesoMasAlto(respuesta){
  //select max(pesoCliente) from clientes;
  conexion.query("select max(pesoCliente) from clientes", (error, filas) => {
    if (error) {
      console.log('error en el listado')
      return
    }
      let datos = JSON.stringify(filas[0]['max(pesoCliente)']); 
   
          conexion.query("SELECT * FROM `clientes` WHERE `pesoCliente` LIKE " + datos, (error, filas) => {
          if (error) {
            console.log('error en el listado')
            return
          }

            printData(filas, respuesta);

        })
  })

}

function clienteMenor(respuesta){
  //select max(pesoCliente) from clientes;

    conexion.query("select max(fNacimientoCliente) from clientes", (error, filas) => {
    if (error) {
      console.log('error en el listado')
      return
    }
      let datos = JSON.stringify(filas[0]['max(fNacimientoCliente)']); datos=datos.substring(1,11);
      console.log(datos);
          conexion.query("SELECT * FROM `clientes` WHERE `fNacimientoCliente` LIKE '" + datos + "'" , (error, filas) => {
          if (error) {
            console.log('error en el listado')
            return
          }

            printData(filas, respuesta);

        })
  })
}