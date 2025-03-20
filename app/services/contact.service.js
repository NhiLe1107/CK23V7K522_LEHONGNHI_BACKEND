

const { ObjectId } = require("mongodb");

class ContactService {
    constructor(client) {
        this.Contact = client.db().collection("contacts");
    }

    extractContactData(payload) {
        const contact = {
            name: payload.name,
            email: payload.email,
            address: payload.address,
            phone: payload.phone,
            favorite: payload.favorite ?? false,
        };

        Object.keys(contact).forEach(
            (key) => contact[key] === undefined && delete contact[key]
        );

        return contact;
    }

    async create(payload) {
        try {
            const contact = this.extractContactData(payload);
            const result = await this.Contact.insertOne(contact);
            return await this.findById(result.insertedId);
        } catch (error) {
            console.error("Error creating contact:", error);
            return null;
        }
    }

    async find(filter = {}) {
        try {
            return await this.Contact.find(filter).toArray();
        } catch (error) {
            console.error("Error finding contacts:", error);
            return [];
        }
    }

    async findByName(name) {
        try {
            return await this.find({
                name: { $regex: new RegExp(name, "i") }
            });
        } catch (error) {
            console.error("Error finding contact by name:", error);
            return [];
        }
    }

    async findById(id) {
        if (!ObjectId.isValid(id)) return null;
        try {
            return await this.Contact.findOne({ _id: new ObjectId(id) });
        } catch (error) {
            console.error("Error finding contact by ID:", error);
            return null;
        }
    }

    
    async update(id, payload) {
    if (!ObjectId.isValid(id)) return null;
    try {
        const filter = { _id: new ObjectId(id) };
        const update = { $set: this.extractContactData(payload) };

        const result = await this.Contact.findOneAndUpdate(filter, update, { returnDocument: "after" });

        return result; 
    } catch (error) {
        console.error("Error updating contact:", error);
        return null;
    }
}


  async delete(id) {
    if (!ObjectId.isValid(id)) return null;
    try {
        const result = await this.Contact.findOneAndDelete({ _id: new ObjectId(id) });
        return result.value; 
    } catch (error) {
        console.error("Error deleting contact:", error);
        return null;
    }
}

   async deleteAll() {
    try {
        const result = await this.Contact.deleteMany({});
        return result.deletedCount;
    } catch (error) {
        console.error("Error deleting all contacts:", error);
        return 0;
    }
}


    async findFavorite() {
        try {
            return await this.Contact.find({ favorite: true }).toArray();
        } catch (error) {
            console.error("Error finding favorite contacts:", error);
            return [];
        }
    }
}

module.exports = ContactService;
