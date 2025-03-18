// exports.create = (req, res) => {
// res.send({ message: "create handler" });
// };
// exports.findAll = (req, res) => {
// res.send({ message: "findAll handler" });
// };
// exports.findOne = (req, res) => {
// res.send({ message: "findOne handler" });
// };
// exports.update = (req, res) => {
// res.send({ message: "update handler" });
// };
// exports.delete = (req, res) => {
// res.send({ message: "delete handler" });
// };
// exports.deleteAll = (req, res) => {
// res.send({ message: "deleteAll handler" });
// };
// exports.findAllFavorite = (req, res) => {
// res.send({ message: "findAllFavorite handler" });
// };
// Dữ liệu mẫu
let contacts = [
    { id: 1, name: "LÊ HỒNG NHI", email: "nhi@example.com", phone: "0123456789", favorite: true },
    { id: 2, name: "LÊ VĂN ANH", email: "anh@example.com", phone: "0098765489", favorite: false },
    { id: 3, name: "LÊ VĂN CƯỜNG", email: "cuong@example.com", phone: "03456709091", favorite: true }
];

// Tạo mới một liên hệ
exports.create = (req, res) => {
    const newContact = {
        id: contacts.length + 1,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        favorite: req.body.favorite || false
    };
    contacts.push(newContact);
    res.send(newContact);
};

// Lấy tất cả liên hệ
exports.findAll = (req, res) => {
    res.send(contacts);
};

// Lấy một liên hệ theo ID
exports.findOne = (req, res) => {
    const id = parseInt(req.params.id);
    const contact = contacts.find(c => c.id === id);
    if (!contact) {
        return res.status(404).send({ message: "Không tìm thấy liên hệ" });
    }
    res.send(contact);
};

// Cập nhật thông tin liên hệ
exports.update = (req, res) => {
    const id = parseInt(req.params.id);
    const contactIndex = contacts.findIndex(c => c.id === id);
    if (contactIndex === -1) {
        return res.status(404).send({ message: "Không tìm thấy liên hệ" });
    }
    contacts[contactIndex] = { ...contacts[contactIndex], ...req.body };
    res.send(contacts[contactIndex]);
};

// Xóa một liên hệ
exports.delete = (req, res) => {
    const id = parseInt(req.params.id);
    contacts = contacts.filter(c => c.id !== id);
    res.send({ message: "Đã xóa liên hệ" });
};

// Xóa tất cả liên hệ
exports.deleteAll = (req, res) => {
    contacts = [];
    res.send({ message: "Đã xóa tất cả liên hệ" });
};

// Lấy danh sách liên hệ yêu thích
exports.findAllFavorite = (req, res) => {
    const favoriteContacts = contacts.filter(contact => contact.favorite);
    res.send(favoriteContacts);
};
