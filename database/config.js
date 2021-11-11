const mongoose = require("mongoose");

const dbConnection = async () => {

    try {
        mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log("Base de datos online")
    } catch (error) {
        console.log(error)
        throw new Error("Error a la hora de conectar la base de datos", error)
    }
}

module.exports = {
    dbConnection
}