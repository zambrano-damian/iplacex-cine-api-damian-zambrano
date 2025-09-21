import { MongoClient, ServerApiVersion } from 'mongodb';
const uri =  "mongodb+srv://damianzambrano089_db_user:admin12345@cluster-spring.fghdfpr.mongodb.net/cine-db?retryWrites=true&w=majority&appName=cluster-spring&authSource=admin";


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

let db;


export const connectToDb = async () => {
    try {
        await client.connect();
               db = client.db("cine-db");
        console.log("Conexión a MongoDB Atlas generada correctamente.");
               return db; 
    } catch (err) {
        console.error("Error al conectar a MongoDB:", err);
        return null;
    }
};
