function init() {
    // Canvas
    const canvas = document.getElementById('dibujo');
    const clean = document.getElementById("limpiar");
    const ancho_line = document.getElementById("range")
    const context = canvas.getContext('2d');


    //GUI render
     document.getElementById('ancho').textContent = ancho_line.value;

    //ancho de linea
    ancho_line.addEventListener("mousemove", (e) => {
        document.getElementById('ancho').textContent = e.target.value
    })

    // function ancho(ancho){
    //     contexto.lineWidth = ancho.value;
    //     document.getElementById('ancho').innerHTML = ancho.value;
    // }

    //data config
    let canvas_config = {
        limpiar: false,
        ancho_line: ancho_line
    }


    let mouse = {
        click: false,
        move: false,
        position: { x: 0, y: 0 },
        position_prev: { x: 0, y: 0 }
    };

    const width = 1200;
    const height = 800;

    canvas.width = width;
    canvas.height = height;

    const sockets = io();

    // event listener and function
    canvas.addEventListener('mousedown', (e) => {
        mouse.click = true;
  
    });

    canvas.addEventListener('mouseup', (e) => {
        mouse.click = false;

    });

    canvas.addEventListener('mousemove', (e) => {
        mouse.position.x = e.clientX;
        mouse.position.y = e.clientY;
        mouse.move = true
    });
    

     clean.addEventListener('click', () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        sockets.emit('limpiar', limpiar = true) // para posibles guardados
        
    })

    sockets.on('limpiar', (data) => {
        console.log("Cliente limpiar es = ", data);
        canvas_config.limpiar = data;
    })

    sockets.on('dibujando', (data) => {
        console.log(data.line.ancho_line);
        const data_linea = data.line;
            context.beginPath();
            context.lineWidth = data_linea.ancho_line;
            context.moveTo(data_linea.line[0].x - canvas.offsetLeft, data_linea.line[0].y - canvas.offsetTop);
            context.lineTo(data_linea.line[1].x - canvas.offsetLeft, data_linea.line[1].y - canvas.offsetTop);
            context.stroke();

    })

    function mainLoop() {
          if(canvas_config.limpiar) {
              context.clearRect(0, 0, canvas.width, canvas.height);
              canvas_config.limpiar = false
          }
  
        
        if(mouse.click && mouse.move && mouse.position_prev) {
            sockets.emit('dibujando', { line: [mouse.position, mouse.position_prev], ancho_line: ancho_line.value});
            mouse.move = false;
        }

        mouse.position_prev = {x: mouse.position.x, y: mouse.position.y};
        setTimeout(mainLoop, 25);
    }
    mainLoop();


}

document.addEventListener('DOMContentLoaded', init());