import express from 'express';
import {
    handleInsertPeliculaRequest,
    handleGetPeliculasRequest,
    handleGetPeliculaByIdRequest,
    handleUpdatePeliculaRequest,
    handleDeletePeliculaRequest
} from './controller.js';

const peliculaRoutes = express.Router();

peliculaRoutes.post("/pelicula", handleInsertPeliculaRequest);
peliculaRoutes.get("/peliculas", handleGetPeliculasRequest);
peliculaRoutes.get("/pelicula/:id", handleGetPeliculaByIdRequest);
peliculaRoutes.put("/pelicula/:id", handleUpdatePeliculaRequest);
peliculaRoutes.delete("/pelicula/:id", handleDeletePeliculaRequest);

export { peliculaRoutes };