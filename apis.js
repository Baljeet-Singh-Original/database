var fs = require('fs');

var database = {}

const loadData = () => {
    fs.readFile("./db.json", "utf8", (err, jsonString) => {
        if (err) {
          console.log("File read failed:", err);
          return;
        }
        let new_json = JSON.parse(jsonString)
        database = new_json
      });
}

const setData = (var1) => {
    let npoint
            let key = ''
            let value = ''
            for (let i = 4; i < var1.length; i++) {
                if (var1[i] === ' ') {
                    npoint = i
                    break
                } else {
                    key+=var1[i]
                }
            }
            for (let i = npoint+1; i < var1.length; i++) {
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
            for (let i = 4; i < var1.length; i++) {
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
            for (let i = 4; i < var1.length; i++) {
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
            for (let i = 4; i < var1.length; i++) {
                if (var1[i] === ' ') {
                    npoint = i
                    break
                } else {
                    key+=var1[i]
                }
            }
            for (let i = npoint+1; i < var1.length; i++) {
                timer+=var1[i]
            }
            key = key.trim()
            timer = parseInt(timer.trim())+Date.now()
            database[key][1] = timer
            return ("Expire-time saved in Database.\n>>> ")
}

const lpush = (var1) =>{
    let npoint
    let key = ''
    let value = ''
    for (let i = 6; i < var1.length; i++) {
        if (var1[i] === ' ') {
            npoint = i
            break
        } else {
            key+=var1[i]
        }
    }
    for (let i = npoint+1; i < var1.length; i++) {
        value+=var1[i]
    }
    key = key.trim()
    value = value.trim()
    if (database[key]) {
        let index = database[key].length
        database[key][index] = value
    }else {
        database[key] = []
        let index = database[key].length
        database[key][index] = value
    }
    return ("Data saved in Database.\n>>> ")
}

const lrange = (var1) => {
    let npoint
    let npoint1
    let key = ''
    let value = ''
    let value1 = ''
    for (let i = 7; i < var1.length; i++) {
        if (var1[i] === ' ') {
            npoint = i
            break
        } else {
            key+=var1[i]
        }
    }
    for (let i = npoint+1; i < var1.length; i++) {
        if (var1[i] === ' ') {
            npoint1 = i
            break
        } else {
            value+=var1[i]
        }
    }
    for (let i = npoint1+1; i < var1.length; i++) {
        
            value1+=var1[i]
        
    }
    key = key.trim()
    value = parseInt(value.trim())
    value1 = parseInt(value1.trim())
    if (!database[key]) {
        return ("Data not exists.\n")
    }
    if (!value1) {
        return ("arguments are missing.\n")
    } else {
        
    
    let returnData = ""
    for (let i = value; i < value1; i++) {
        if (database[key][i]) {
            returnData += database[key][i]
            returnData += "\n"
        }
    }
    console.log(returnData)
    return (returnData)
    }
}

const lpop = (var1) => {
    let param1 = ''
            for (let i = 5; i < var1.length; i++) {
                param1 += var1[i]
            }
            param1 = param1.trim()
            if (database[param1]) {
                return (database[param1].pop())
            } else {
                return ('Data not exists.')                
            }
}

const saveData = (var1) => {
    jsonData = JSON.stringify(database)
            fs.writeFile('./db.json', jsonData, function (err) {
            if (err) throw err;
        });
        return ("Data saved in Disk.\n>>> ")
}

module.exports = { setData, getData, delData, expData, saveData, loadData, lpush, lrange, lpop };