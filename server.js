import express, { urlencoded } from 'express';
import cors from 'cors';
import { connectToDb } from './src/common/db.js';
import { peliculaRoutes } from './src/pelicula/routes.js';
import { actorRoutes } from './src/actor/routes.js';

const PORT = 3000 || 4000;

const app = express();

app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use(cors())

app.get('/', (req, res) => {
  let message = 'Bienvenido al cine Iplacex';
  return res.status(200).send(message);
});

app.use('/api', peliculaRoutes);
app.use('/api', actorRoutes);

const startServer = async () => {
    try {
        const db = await connectToDb();
        if (db) {
            app.listen(PORT, () => {
                console.log(`Servidor corriendo en http://localhost:${PORT}`);
            });
        } else {
            console.log("No se pudo iniciar el servidor debido a un error de conexión a la base de datos.");
        }
    } catch (error) {
        console.error("Ocurrió un error al iniciar el servidor:", error);
    }
};

startServer();