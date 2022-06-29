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

function esPrimo(numi) {
  // Casos especiales
  if (numi == 0 || numi == 1 || numi == 4) return false;
  for (let x = 2; x < numi / 2; x++) {
    if (numi % x == 0) return false;
  }
  // Si no se pudo dividir por ninguno de los de arriba, sí es primo
  return true;
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
/*    let pagina =
      `<!doctype html><html><head>
        <link rel="stylesheet" href="./css/bootstrap.min.css">
        <script src="./js/bootstrap.min.js"></script>
      </head><body style="background-color: rgb(55, 34, 102) ;">
      <div align="center" style="background-color: rgba(0, 0, 0, 0.486); margin-top: 10%; width: 50%; margin-left: auto; margin-right: auto; color:white" >
      <p style="color: white" class="display-3" >Numeros del Presidente</p>`
*/
    let mayor; let menor;
    let g;
    let res;
    let mos = "";

    if(formulario.get('primero')<formulario.get('segundo')){
      mayor = formulario.get('segundo');
      menor = formulario.get('primero');
    }else if(formulario.get('primero')>formulario.get('segundo')){
      mayor = formulario.get('primero');
      menor = formulario.get('segundo');
    }else{
      mayor = menor = mayor = formulario.get('primero');
    }
     
    for (let i = menor; i <= mayor; i++) {
      g = i;
      if(esPrimo(i)==true){
        let sum = 0;
        do{
          res = g%10;
          g = g/10;
          g = Math.trunc(g);
          sum = sum + res;
        }while(g!=0);

        if (esPrimo(sum)==true) {
          mos += i;
          mos += ' ';
        }
      }
     
    }

    const pagina =
      `<!doctype html><html><head>
        <link rel="stylesheet" href="./css/bootstrap.min.css">
        <script src="./js/bootstrap.min.js"></script>
      </head><body style="background-color: rgb(55, 34, 102) ;">
      <div align="center" style="background-color: rgba(0, 0, 0, 0.486); margin-top: 10%; width: 50%; margin-left: auto; margin-right: auto; color:white" >
      <p style="color: white" class="display-3" >Numeros del Presidente</p>
      <p><b>Entre los valores</b></p>
    Menor: ${menor} Y Mayor: ${mayor}<br>
    <div style="overflow: auto; width: auto; height: 300px; width: 90%;">
    ${mos}
    </div>
     <a href="index.html" class="btn btn-success">Retornar</a>
     </div>
     </body></html>`
    respuesta.end(pagina)
  })
}

console.log('Servidor web iniciado')

