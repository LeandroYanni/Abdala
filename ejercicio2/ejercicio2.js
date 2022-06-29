const http = require('http')
const fs = require('fs')

const mime = {
  'html': 'text/html',
  'css': 'text/css',
  'min.css': 'text/css',
  'js': 'script/js',
  'min.js': 'script/js',
  'jpg': 'image/jpg',
  'ico': 'image/x-icon',
  'mp3': 'audio/mpeg3',
  'mp4': 'video/mp4'
}

const servidor = http.createServer((pedido, respuesta) => {
  const url = new URL('http://localhost:8088' + pedido.url)
  let camino = 'public' + url.pathname
  if (camino == 'public/')
    camino = 'public/index.html'
  encaminar(pedido, respuesta, camino)
})

servidor.listen(8888)


function encaminar(pedido, respuesta, camino) {
  console.log(camino)
  switch (camino) {
    case 'public/recuperardatos': {
      recuperar(pedido, respuesta)
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

function NumerosAleatorios(min, max) {
    return Math.round(Math.random() * (max - min) + min);
 } 


function recuperar(pedido, respuesta) {
  let info = ''
  pedido.on('data', datosparciales => {
    info += datosparciales
  })
  pedido.on('end', () => {
    const formulario = new URLSearchParams(info)
    console.log(formulario)
    respuesta.writeHead(200, { 'Content-Type': 'text/html' })
    let Resu ="";
    let Eleccion ="";
    let Elejug ="";
    
     let jug = formulario.get('elejug')

      let alnum = NumerosAleatorios(1, 3);

     if(jug == 'r'||jug =='R'){
      Elejug +=`Piedra`;
         if(alnum == '1'){
          Eleccion +=`El servidor eligio Piedra <br>`;
          Resu +=`Empataste <br>`;
         }else if(alnum == '2'){
          Eleccion +=`El servidor eligio Papel <br>`;
          Resu +=`Perdiste <br>`;
         }else if(alnum == '3'){
          Eleccion +=`El servidor eligio Tijeras <br>`;
          Resu +=`Ganaste <br>`;
         }
     }else if(jug == 'p'||jug == 'P'){
      Elejug +=`Papel`;
        if(alnum == '1'){
          Eleccion +=`El servidor eligio Piedra <br>`;
          Resu +=`Ganaste <br>`;
        }else if(alnum == '2'){
          Eleccion +=`El servidor eligio Papel <br>`;
          Resu +=`Empataste <br>`;
        }else if(alnum == '3'){
          Eleccion +=`El servidor eligio Tijeras <br>`;  
          Resu +=`Perdiste <br>`;
        }
     }else if(jug == 's'||jug =='S'){
      Elejug +=`Tijeras`;
        if(alnum == '1'){
          Eleccion +=`El servidor eligio Piedra <br>`;
          Resu +=`Perdiste <br>`;
        }else if(alnum == '2'){
          Eleccion +=`El servidor eligio Papel <br>`;
          Resu +=`Ganaste <br>`;
        }else if(alnum == '3'){
          Eleccion +=`El servidor eligio Tijeras <br>`;
          Resu +=`Empataste <br>`;
        }
     }else{
      Resu += `Elegi una opcion valida-<br>`;
     }
     const pagina =
     `<!doctype html><html>
     <head>
     <link rel="stylesheet" href="./css/bootstrap.css">
     <script src="./js/bootstrap.js"></script>
     </head>
     <body style="background-color: rgb(55, 34, 102) ;">
     <div align="center" style="background-color: rgba(0, 0, 0, 0.486); margin-top: 10%; width: 50%; margin-left: auto; margin-right: auto; color:white" >
     <p class="display-3" >Piedra, Papel y Tijeras</p>
     Eleccion del jugador: ${Elejug}<br>
    ${Eleccion}
    ${Resu}
     
     <a href="index.html"; class="btn btn-success">Retornar</a>
     </div>
     </body></html>`
    respuesta.end(pagina)
  })
}

console.log('Servidor web iniciado')