import mssql from "mssql"
import dotenv from "dotenv"
dotenv.config()

const sqlConfig= {
    user: process.env.DB_USER as string,
    password: process.env.DB_PASS as string,
    database: process.env.DB_NAME as string,
    server: "localhost",
    pool: {
        max: 10,
        min: 0,
        idleTimeOutMillis: 30000
    },
    options: {
        encrypt: false,
        trustServerCertificate: false
    }
}


mssql.connect(sqlConfig).then((pool) => {
    if (pool.connected) {
      console.log('connected');
    }
  });

  export default sqlConfig

