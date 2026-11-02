const mongoose = require("mongoose");

const legacyEnrollmentSchema = new mongoose.Schema(
    { _id: { type: String, required: true } },
    {
        strict: false,
        minimize: false,
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
                return ret;
            }
        }
    }
);

module.exports = mongoose.model("LegacyEnrollment", legacyEnrollmentSchema);