const User = require('../models/user');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        req.profile = user;
        next();
    });
};
exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};
exports.update = (req, res) => {
    const { first_name, last_name, email, phone_number } = req.body;
    User.findOne({ _id: req.profile._id }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        if (first_name) {
            user.first_name = first_name;
        }
        if (last_name) {
            user.last_name = last_name;
        }
        if (phone_number) {
            user.phone_number = phone_number;
        }
        if (email){
            user.email = email;
        }
        user.save((err, updatedUser) => {
            if (err) {
                console.log('USER UPDATE ERROR', err);
                return res.status(400).json({
                    error: 'User update failed'
                });
            }
            updatedUser.hashed_password = undefined;
            updatedUser.salt = undefined;
            res.json(updatedUser);
        });
    });
};
exports.listUsers = (req, res) => {
    User.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};
exports.addPoemToUserHistory = (req, res, next) => {
    let poem = [];
    poem.push(req.body);
    User.findOneAndUpdate({ _id: req.profile._id }, { $push: { poem: poem } }, { new: true }, (error, data) => {
        if (error) {
            return res.status(400).json({
                error: "Could not add poem to the author's list"
            });
        }
        next();
    });
};