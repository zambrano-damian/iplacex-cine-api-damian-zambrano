import express from 'express';
import {
    handleInsertActorRequest,
    handleGetActoresRequest,
    handleGetActorByIdRequest,
    handleGetActoresByPeliculaIdRequest
} from './controller.js';

const actorRoutes = express.Router();

actorRoutes.post("/actor", handleInsertActorRequest);
actorRoutes.get("/actores", handleGetActoresRequest);
actorRoutes.get("/actor/:id", handleGetActorByIdRequest);
actorRoutes.get("/actorByPeliculaId/:id", handleGetActoresByPeliculaIdRequest);

export { actorRoutes };
