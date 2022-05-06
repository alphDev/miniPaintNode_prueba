
module.exports = (io) => {

    // Config Server canvas
    var limpiar = false
    var history_dibujo = [];
    
    io.on('connection', (socket) => {
        //console.log("Nuevo usuario address: ", socket.handshake.address);
        //console.log(socket.handshake.headers)

        for(let i in history_dibujo){
                socket.emit('dibujando', {line: history_dibujo[i]})
        }

        socket.on('dibujando', (data) => {
            history_dibujo.push(data);
            io.emit('dibujando', {line: data});
        })

        socket.on('limpiar', (data) => {
            console.log("Servidor limpiar es = ", data);
                limpiar = data;

                if(limpiar) {
                    history_dibujo = []
                    io.emit('limpiar', limpiar);
                    limpiar = false           
                }
        })

    });
}