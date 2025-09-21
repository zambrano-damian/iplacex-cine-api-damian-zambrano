import { ObjectId } from 'mongodb';
import { connectToDb } from '../common/db.js';

const actorCollectionName = "actores";

const handleInsertActorRequest = (req, res) => {
    connectToDb()
    .then(db => {
        const peliculaCollection = db.collection("peliculas");
        return peliculaCollection.findOne({ nombre: req.body.nombrePelicula });
    })
    .then(pelicula => {
        if (!pelicula) {
            return res.status(404).send({ message: "La película no existe, no se puede asociar el actor." });
        }

        const actorData = {
            idPelicula: new ObjectId(pelicula._id),
            nombre: req.body.nombre,
            edad: req.body.edad,
            estaRetirado: req.body.estaRetirado,
            premios: req.body.premios
        };

        return connectToDb()
        .then(db => {
            const actoresCollection = db.collection(actorCollectionName);
            return actoresCollection.insertOne(actorData);
        });
    })
    .then(result => {
        if (result.acknowledged) {
            return res.status(201).send({ message: "Actor agregado con éxito." });
        }
        return res.status(400).send({ message: "Error al agregar el actor." });
    })
    .catch(err => {
        return res.status(500).send({ error: "Error interno del servidor." });
    });
};

const handleGetActoresRequest = (req, res) => {
    connectToDb()
    .then(db => {
        const actores = db.collection(actorCollectionName);
        return actores.find({}).toArray();
    })
    .then(data => {
        return res.status(200).send(data);
    })
    .catch(err => {
        return res.status(500).send({ error: "Error interno del servidor." });
    });
};

const handleGetActorByIdRequest = (req, res) => {
    try {
        const id = ObjectId.createFromHexString(req.params.id);
        connectToDb()
        .then(db => {
            const actores = db.collection(actorCollectionName);
            return actores.findOne({ _id: id });
        })
        .then(data => {
            if (data) {
                return res.status(200).send(data);
            }
            return res.status(404).send({ message: "Actor no encontrado." });
        })
        .catch(err => {
            return res.status(500).send({ error: "Error interno del servidor." });
        });
    } catch (e) {
        return res.status(400).send({ message: "Id mal formado." });
    }
};

const handleGetActoresByPeliculaIdRequest = (req, res) => {
    try {
        const peliculaId = ObjectId.createFromHexString(req.params.id);
        connectToDb()
        .then(db => {
            const actores = db.collection(actorCollectionName);
            return actores.find({ idPelicula: peliculaId }).toArray();
        })
        .then(data => {
            return res.status(200).send(data);
        })
        .catch(err => {
            return res.status(500).send({ error: "Error interno del servidor." });
        });
    } catch (e) {
        return res.status(400).send({ message: "Id mal formado." });
    }
};

export {
    handleInsertActorRequest,
    handleGetActoresRequest,
    handleGetActorByIdRequest,
    handleGetActoresByPeliculaIdRequest
};
