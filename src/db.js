import Dexie from "dexie";

const db = new Dexie("FinanceDB");
db.version(1).stores({
  income: "++id,title,amount,date",
  expense: "++id,title,amount,date",
});

export default db;