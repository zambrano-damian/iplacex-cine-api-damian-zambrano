import { ObjectId } from 'mongodb';
import { connectToDb } from '../common/db.js';

const peliculaCollectionName = "peliculas";

const handleInsertPeliculaRequest = (req, res) => {
    connectToDb()
    .then(db => {
        const peliculas = db.collection(peliculaCollectionName);
        return peliculas.insertOne(req.body);
    })
    .then(result => {
        if (result.acknowledged) {
            return res.status(201).send({ message: "Película agregada con éxito." });
        }
        return res.status(400).send({ message: "Error al agregar la película." });
    })
    .catch(err => {
        return res.status(500).send({ error: "Error interno del servidor." });
    });
};

const handleGetPeliculasRequest = (req, res) => {
    connectToDb()
    .then(db => {
        const peliculas = db.collection(peliculaCollectionName);
        return peliculas.find({}).toArray();
    })
    .then(data => {
        return res.status(200).send(data);
    })
    .catch(err => {
        return res.status(500).send({ error: "Error interno del servidor." });
    });
};

const handleGetPeliculaByIdRequest = (req, res) => {
    try {
        const id = ObjectId.createFromHexString(req.params.id);
        connectToDb()
        .then(db => {
            const peliculas = db.collection(peliculaCollectionName);
            return peliculas.findOne({ _id: id });
        })
        .then(data => {
            if (data) {
                return res.status(200).send(data);
            }
            return res.status(404).send({ message: "Película no encontrada." });
        })
        .catch(err => {
            return res.status(500).send({ error: "Error interno del servidor." });
        });
    } catch (e) {
        return res.status(400).send({ message: "Id mal formado." });
    }
};

const handleUpdatePeliculaRequest = (req, res) => {
    try {
        const id = ObjectId.createFromHexString(req.params.id);
        connectToDb()
        .then(db => {
            const peliculas = db.collection(peliculaCollectionName);
            return peliculas.updateOne({ _id: id }, { $set: req.body });
        })
        .then(result => {
            if (result.matchedCount > 0) {
                return res.status(200).send({ message: "Película actualizada con éxito." });
            }
            return res.status(404).send({ message: "Película no encontrada." });
        })
        .catch(err => {
            return res.status(500).send({ error: "Error interno del servidor." });
        });
    } catch (e) {
        return res.status(400).send({ message: "Id mal formado." });
    }
};

const handleDeletePeliculaRequest = (req, res) => {
    try {
        const id = ObjectId.createFromHexString(req.params.id);
        connectToDb()
        .then(db => {
            const peliculas = db.collection(peliculaCollectionName);
            return peliculas.deleteOne({ _id: id });
        })
        .then(result => {
            if (result.deletedCount > 0) {
                return res.status(200).send({ message: "Película eliminada con éxito." });
            }
            return res.status(404).send({ message: "Película no encontrada." });
        })
        .catch(err => {
            return res.status(500).send({ error: "Error interno del servidor." });
        });
    } catch (e) {
        return res.status(400).send({ message: "Id mal formado." });
    }
};

export {
    handleInsertPeliculaRequest,
    handleGetPeliculasRequest,
    handleGetPeliculaByIdRequest,
    handleUpdatePeliculaRequest,
    handleDeletePeliculaRequest
};