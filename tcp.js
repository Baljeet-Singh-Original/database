const net = require('net')

const server = net.createServer(socket =>{
    socket.write("Welcome to Baljeet's Database\nRun your command here >>>  ")
    var database = {}
    socket.on("data", data => {
        let var1 = data.toString()
        if(var1[0] ==='S' && var1[1] === 'E' && var1[2] ==='T'){
            let npoint
            let key = ''
            let value = ''
            for (let i = 4; i < var1.length-2; i++) {
                if (var1[i] === ':') {
                    npoint = i
                    break
                } else {
                    key+=var1[i]
                }
            }
            for (let i = npoint+1; i < var1.length-2; i++) {
                value+=var1[i]
            }
            key = key.trim()
            value = value.trim()
            database[key] = value
            socket.write("Data saved in Database.\n>>> ")
            // console.log(database)
        }
        else if(var1[0] ==='G' && var1[1] === 'E' && var1[2] ==='T'){
            let param1 = ''
            for (let i = 4; i < var1.length-2; i++) {
                param1 += var1[i]
            }
            param1 = param1.trim()
            if (database[param1]) {
                socket.write(database[param1])
                socket.write("\n>>> ")
            } else {
                socket.write('Data not exists.\n>>> ')                
            }
            // console.log(database[param1])            
        }
    })
})

server.listen(5000)