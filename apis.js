var fs = require('fs');

var database = {}

const setData = (var1) => {
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
            let timer = Date.now()+9999999999
            database[key] = [value, timer]
            return ("Data saved in Database.\n>>> ")
}

const getData = (var1) => {
    let param1 = ''
            for (let i = 4; i < var1.length-2; i++) {
                param1 += var1[i]
            }
            param1 = param1.trim()
            if (database[param1]) {
                if (database[param1][1] > Date.now()) {
                    return (database[param1][0])
                }else {
                    delete database[param1]
                    return ("Your Data is expired and no longer saved here.")
                }
            } else {
                return ('Data not exists.')                
            }
}

const delData = (var1) => {
    let param1 = ''
            for (let i = 4; i < var1.length-2; i++) {
                param1 += var1[i]
            }
            param1 = param1.trim()
            if (database[param1]) {
                delete database[param1]
                return ("Data removed from database.\n>>> ")
            } else {
                return ('Data not exists.\n>>> ')                
            }
}

const expData = (var1) => {
    let npoint
            let key = ''
            let timer = ''
            for (let i = 4; i < var1.length-2; i++) {
                if (var1[i] === ':') {
                    npoint = i
                    break
                } else {
                    key+=var1[i]
                }
            }
            for (let i = npoint+1; i < var1.length-2; i++) {
                timer+=var1[i]
            }
            key = key.trim()
            timer = parseInt(timer.trim())+Date.now()
            database[key][1] = timer
            return ("Expire-time saved in Database.\n>>> ")
}

const saveData = (var1) => {
    jsonData = JSON.stringify(database)
            fs.writeFile('./db.json', jsonData, function (err) {
            if (err) throw err;
        });
        return ("Data saved in Disk.\n>>> ")
}

module.exports = { setData, getData, delData, expData, saveData };