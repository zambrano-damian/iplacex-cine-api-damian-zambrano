import { ObjectId } from 'mongodb';

export const Actor = {
    _id: ObjectId,
    idPelicula: ObjectId,
    nombre: String,
    edad: Number,
    estaRetirado: Boolean,
    premios: Array
};
