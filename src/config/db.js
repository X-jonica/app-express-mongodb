const { MongoClient } = require("mongodb");

client = null;

async function openConnection(url, callback) {
    try {
        if (!client) {
            client = new MongoClient(url);
            await client.connect();
            console.log("Connexion MongoDB établie !");
        } else {
            console.log("Connexion MongoDB déjà ouverte !");
        }
        callback();
    } catch (error) {
        console.error("Erreur de connexion MongoDB : ", error);
        client = null;
        callback(error);
    }
}

function database() {
    if (!client) throw new Error("Aucune connexion MongoDB active !");
    return client.db("db_crud_mongodb");
}

function closeConnection() {
    if (client) {
        client.close();
        client = null;
        console.log("connexion MongoDB férmé !");
    }
}

module.exports = { openConnection, database, closeConnection };
