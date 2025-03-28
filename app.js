const express = require("express");
const cors = require("cors");
const ApiError = require("./app/api-error");

const app = express();

// Import route contacts
const contactsRouter = require("./app/routes/contact.route");

app.use(cors());
app.use(express.json());

// Middleware log request
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Route mặc định
app.get("/", (req, res) => {
    res.json({ message: "Welcome to contact book application." });
});

// Đăng ký routes cho contacts
app.use("/api/contacts", contactsRouter);

// Middleware xử lý lỗi 404
app.use((req, res, next) => {
    next(new ApiError(404, "Resource not found"));
});

// Middleware xử lý lỗi tập trung
app.use((err, req, res, next) => {
    console.error(err.statusCode, err.message);
    res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

module.exports = app;
