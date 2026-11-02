const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
    {
        _id: { type: String, required: true },
        field: String,
        title: { type: String, required: true },
        badge: String,
        duration: String,
        description: String,
        instructor: String,
        mode: String,
        certificate: String,
        modules: { type: Array, default: [] }
    },
    {
        strict: false,
        minimize: false,
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret.__v;
                return ret;
            }
        }
    }
);

module.exports = mongoose.model("Course", courseSchema);