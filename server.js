var fs = require('fs')
const net = require('net')
const { setData, delData, getData, expData, saveData, loadData, lpush, lrange, lpop } = require("./apis.js");

const server = net.createServer(socket =>{
    socket.write("Welcome to Baljeet's Database\nRun your command here >>>  ")
    loadData()
    socket.on("data", data => {
        let var1 = data.toString()
        if(var1[0] ==='S' && var1[1] === 'E' && var1[2] ==='T'){
            socket.write(setData(var1))
        }
        else if(var1[0] ==='G' && var1[1] === 'E' && var1[2] ==='T'){
            socket.write(getData(var1))    
            socket.write("\n>>> ")        
        }
        else if(var1[0] ==='D' && var1[1] === 'E' && var1[2] ==='L'){
            socket.write(delData(var1))         
        }
        else if(var1[0] ==='E' && var1[1] === 'X' && var1[2] ==='P'){
            socket.write(expData(var1))
        }
        else if(var1[0] ==='S' && var1[1] === 'A' && var1[2] ==='V' && var1[3] ==='E'){
            socket.write(saveData(var1))
        }
        else if(var1[0] ==='l' && var1[1] === 'p' && var1[2] ==='u' && var1[3] ==='s' && var1[4] ==='h'){
            socket.write(lpush(var1))
        }
        else if(var1[0] ==='l' && var1[1] === 'p' && var1[2] ==='o' && var1[3] ==='p'){
            socket.write(lpop(var1))
            socket.write("\n>>> ")
        }
        else if(var1[0] ==='l' && var1[1] === 'r' && var1[2] ==='a' && var1[3] ==='n' && var1[4] ==='g' && var1[5] === 'e'){
            socket.write(lrange(var1))
            socket.write(">>> ")
        }
        else if(var1[0] ==='E' && var1[1] === 'X' && var1[2] ==='I' && var1[3] ==='T'){
            socket.end("You exited succesfully and ")
        }
        else {
            socket.write("Please enter a valid command.\n>>> ")
        }
    })
})

server.listen(5000)