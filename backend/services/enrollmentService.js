const LegacyEnrollment = require("../models/LegacyEnrollment");
const makeId = require("../utils/makeId");
const { mirrorEnrollment, mirrorRemoval } = require("./mirrorService");

function clean(data) {
    const { _id, id, __v, ...rest } = data || {};
    return rest;
}

const getAllEnrollments = async () => {
    const items = await LegacyEnrollment.find();
    return items.map((item) => item.toJSON());
};

const getEnrollmentById = async (id) => {
    const item = await LegacyEnrollment.findById(id);
    return item ? item.toJSON() : null;
};

const createEnrollment = async (enrollmentData) => {
    const id = (enrollmentData && (enrollmentData.id || enrollmentData._id)) || makeId("enr");
    const item = await LegacyEnrollment.create({ ...clean(enrollmentData), _id: id });
    const record = item.toJSON();
    await mirrorEnrollment(record);
    return record;
};

const updateEnrollment = async (id, enrollmentData) => {
    const item = await LegacyEnrollment.findByIdAndUpdate(
        id,
        { $set: clean(enrollmentData) },
        { new: true, strict: false }
    );
    if (!item) {
        return null;
    }
    const record = item.toJSON();
    await mirrorEnrollment(record);
    return record;
};

const deleteEnrollment = async (id) => {
    const item = await LegacyEnrollment.findByIdAndDelete(id);
    if (item) {
        await mirrorRemoval(item.toJSON());
    }
    return !!item;
};

module.exports = {
    getAllEnrollments,
    getEnrollmentById,
    createEnrollment,
    updateEnrollment,
    deleteEnrollment
};