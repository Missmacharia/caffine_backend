import mssql, { query } from "mssql"
import sqlConfig from "../config/index"
// shapes the type of data
type data = {
    [c:string]: any
}


 class DbConnection{
    pool: Promise<mssql.ConnectionPool>

    constructor(){
        //connecting to the database
        this.pool= mssql.connect(sqlConfig)
    }

    //classes are private to their classes
    private async createRequest(request:mssql.Request, data:data){
        try {
            const keys= Object.keys(data)
            //maps through the keys
            keys.map((name: string)=>{
                const value=data[name]
                request.input(name, value)
            });
            return request;
        } catch (error: any) {
        //  throw new error(error.message)
        console.log(error);
            
        }
    };

    async exec(procedure_name: string, data={}){
        try {
            let request= await (await this.pool).request() as mssql.Request
            this.createRequest(request, data)
            const result = await request?.execute(procedure_name)
            return result
        } catch (error) {
            // throw new (error.message)
            console.log(error);
            
        }
    }

    async query(query: string){
        const result = await (await this.pool).request().query(query)
        return result
    }
}

export default new DbConnection();