
const ContactService = require("../services/contact.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const { ObjectId } = require("mongodb");

// Tạo mới một liên hệ
exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, "Name cannot be empty"));
    }

    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.create(req.body);
        return res.status(201).send(document);
    } catch (error) {
        return next(new ApiError(500, "An error occurred while creating the contact"));
    }
};

// Truy vấn tất cả liên hệ
exports.findAll = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const { name } = req.query;
        const documents = name 
            ? await contactService.findByName(name) 
            : await contactService.find({});
        return res.send(documents);
    } catch (error) {
        return next(new ApiError(500, "An error occurred while retrieving contacts"));
    }
};

// Tìm một liên hệ theo ID
exports.findOne = async (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
        return next(new ApiError(400, "Invalid contact ID"));
    }

    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findById(req.params.id);

        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, `Error retrieving contact with id=${req.params.id}`));
    }
};

// Cập nhật thông tin liên hệ
exports.update = async (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
        return next(new ApiError(400, "Invalid contact ID"));
    }
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update cannot be empty"));
    }

    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.update(req.params.id, req.body);

        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }

        return res.send({ message: "Contact was updated successfully" });
    } catch (error) {
        return next(new ApiError(500, `Error updating contact with id=${req.params.id}`));
    }
};

// Xóa một liên hệ
exports.delete = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const deleted = await contactService.delete(req.params.id);

        if (!deleted) {
            return res.status(200).send({ message: "Contact already deleted or not found" });
        }

        return res.status(200).send({ message: "Contact was deleted successfully" });
    } catch (error) {
        return next(new ApiError(500, `Could not delete contact with id=${req.params.id}`));
    }
};





// Xóa tất cả liên hệ
exports.deleteAll = async (_req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const deletedCount = await contactService.deleteAll();

        return res.send({
            message: `${deletedCount} contacts were deleted successfully`,
        });
    } catch (error) {
        return next(new ApiError(500, "An error occurred while removing all contacts"));
    }
};


// Lấy danh sách liên hệ yêu thích
exports.findAllFavorite = async (_req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const documents = await contactService.findFavorite();
        return res.send(documents);
    } catch (error) {
        return next(new ApiError(500, "An error occurred while retrieving favorite contacts"));
    }
};
