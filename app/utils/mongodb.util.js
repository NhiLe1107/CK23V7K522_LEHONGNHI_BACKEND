const { MongoClient } = require("mongodb");

class MongoDB {
    static connect = async (uri) => { 
        if (this.client) return this.client;

        this.client = await MongoClient.connect(uri);
        return this.client;
    };
}

module.exports = MongoDB;

// const { MongoClient } = require("mongodb");

// class MongoDB {
//     static client = null;

//     static async connect(uri) {
//         if (this.client) return this.client;

//         const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//         await client.connect();
//         this.client = client;
//         return this.client;
//     }
// }

// module.exports = MongoDB;
