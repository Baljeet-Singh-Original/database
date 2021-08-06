const db = require("./db");
const { setData, delData, getData, expData, saveData, lpush, lrange, lpop } = require("../apis");

// Setup connection to the database
beforeAll(async () => await db.connect());
afterAll(async () => await db.clear());
afterAll(async () => await db.close());

// set the data

describe("Testing of SET api", () => {
  it("it should save the data in Ram.", async () => {
    let var1 = "SET hello testing"
    const res = setData(var1);
    expect(res).toEqual("Data saved in Database.\n>>> ");
  });
})


// get the data

describe("Testing of GET api", () => {
  it("it should return data.", async () => {
    let var2 = "SET hello Hii"
    setData(var2)
    let var1 = "GET hello"
    let res = await getData(var1);
    expect(res).toEqual("Hii");
  });
  it("it should return a error of not existance.", async() => {
    let var1 = "GET hii"
    let res = await getData(var1);
    expect(res).toEqual("Data not exists.");
  })
})

// adding expire time of data 

describe("Testing of EXP api", () => {
  it("it should save the expire time of data.", async () => {
    let var1 = "EXP hello 30000"
    const res = expData(var1);
    expect(res).toEqual("Expire-time saved in Database.\n>>> ");
  });
  // it("it will return the data is expired now", async () => {
    //   let var1 = "SET hello hii"
    //   setData(var1)
    //   var1 = "EXP hello 3000"
    //   expData(var1)
    //   setTimeout(() => {
      //     var1 = "GET hello"
      //     const res1 = await getData(var1)
      //     expect(res1).toEqual("Expire-time saved in Database.\n>>> ")
      //   });
      // })
    })
    
    // deleting the data 
    
    describe("Testing of DEL api", () => {
      it("it should return data not deleted.", async () => {
        let var1 = "SET hii testing"
        setData(var1);
        var1 = "DEL hii"
        const res = delData(var1);
        expect(res).toEqual('Data removed from database.\n>>> ')
      });
      it("it will return data not found.", async () => {
        let var1 = "GET hii"
        const res1 = getData(var1)
        expect(res1).toEqual("Data not exists.")
      })
    })
    
    // saving data in disk
    
    describe("Testing of SAVE api", () => {
      it("it should save the data in Disk storage.", async () => {
        let var1 = "SAVE"
        const res = saveData(var1);
        expect(res).toEqual("Data saved in Disk.\n>>> ")
      });
    })
    
    
// set the data as a list
    
describe("Testing of lpush api", () => {
  it("it should save the data in list.", async () => {
    let var1 = "lpush hello testing"
    const res = lpush(var1);
    expect(res).toEqual("Data saved in Database.\n>>> ");
  });
})

// pop the last data in a list

describe("Testing of lpop api", () => {
  it("it should pop the last data in list.", async () => {
    let var1 = "lpush hello testing"
    lpush(var1);
    let var2 = "lpush hello testing1"
    lpush(var2);
    let var3 = "lpop hello" 
    let res2 = await lpop(var3)
    expect(res2).toEqual("testing1");
  });
})

// display the data of a list

describe("Testing of lrange api", () => {
  it("it should display the last data of list.", async () => {
    let var1 = "lpush test range"
    lpush(var1);
    let var2 = "lpush test range2"
    lpush(var2);
    let var3 = "lrange test 0 2" 
    let res2 = lrange(var3)
    expect(res2).toEqual("range\nrange2\n");
  });
})
