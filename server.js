var fs = require('fs')
const net = require('net')
const { setData, delData, getData, expData, saveData } = require("./apis.js");

const server = net.createServer(socket =>{
    socket.write("Welcome to Baljeet's Database\nRun your command here >>>  ")
    fs.readFile("./db.json", "utf8", (err, jsonString) => {
        if (err) {
          console.log("File read failed:", err);
          return;
        }
        let new_json = JSON.parse(jsonString)
        database = new_json
      });
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
        else if(var1[0] ==='E' && var1[1] === 'X' && var1[2] ==='I' && var1[3] ==='T'){
            socket.end("You exited succesfully and ")
        }
        else {
            socket.write("Please enter a valid command.\n>>> ")
        }
    })
})

server.listen(5000)