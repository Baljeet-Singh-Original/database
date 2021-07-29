const db = require("./db");
const { setData, delData, getData, expData, saveData } = require("../apis");

// Setup connection to the database
beforeAll(async () => await db.connect());
afterAll(async () => await db.clear());
afterAll(async () => await db.close());

// set the data

describe("Testing of SET api", () => {
  it("it should save the data in Ram.", async () => {
    let var1 = "SET hello:testing"
    const res = await setData(var1);
    expect(res).toEqual("Data saved in Database.\n>>> ");
  });
})

// get the data

describe("Testing of GET api", () => {
  it("it should return data not exists yet.", async () => {
    let var1 = "GET hello"
    const res = await getData(var1);
    expect(res).toEqual("Data not exists.");
  });
})

// adding expire time of data 

describe("Testing of EXP api", () => {
  it("it should save the expire time of data.", async () => {
    let var1 = "EXP hello:30000"
    const res = await expData(var1);
    expect(res).toEqual("Expire-time saved in Database.\n>>> ");
  });
})

// deleting the data 

describe("Testing of DEL api", () => {
  it("it should return data not deleted.", async () => {
    let var1 = "SET hello:testing"
    await setData(var1);
    var1 = "DEL hello"
    const res = await delData(var1);
    expect(res).toEqual('Data not exists.\n>>> ')
  });
})

// saving data in disk

describe("Testing of SAVE api", () => {
  it("it should save the data in Disk storage.", async () => {
    let var1 = "SAVE"
    const res = await saveData(var1);
    expect(res).toEqual("Data saved in Disk.\n>>> ")
  });
})