const Poem = require('../models/poem');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.getPoemById = (req, res, next, id) => {
  Poem.findById(id).exec((err, poem) => {
    if (err || !poem) {
      return res.status(400).json({
        error: 'ERROR! Poem details not found'
      });
    }
    req.poem = poem;
    next();
  });
};
exports.createPoem = (req, res) => {
  req.body.author = req.profile;
  const poem = new Poem(req.body);
  poem.save((error, data) => {
    if (error) {
      return res.status(400).json({
        error: error
      });
    }
    res.json(data);
  })
};
exports.updatePoem = (req, res) => {
  const { title, album, content, isPublished } = req.body;
  Poem.findOne({ _id: req.profile._id }, (err, poem) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'Poem not found'
      });
    }
    if (title) {
      poem.title = title;
    }
    if (album) {
      poem.album = album;
    }
    if (content) {
      poem.content = content;
    }
    if (isPublished) {
      poem.isPublished = isPublished;
    }
    poem.save((err, updatedPoem) => {
      if (err) {
        console.log('POEM UPDATE ERROR', err);
        return res.status(400).json({
          error: 'Poem update failed'
        });
      }
      res.json(updatedPoem);
    });
  });
};
exports.listAllPoems = (req, res) => {
  Poem.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json(data);
  });
};
exports.addPoemToUserHistory = (req, res, next) => {
  let poems = [];
  poems.push(req.body);
  User.findOneAndUpdate({ _id: req.profile._id }, { $push: { poems: poems } }, { new: true }, (error, data) => {
    if (error) {
      return res.status(400).json({
        error: 'Could not update user poetry history'
      });
    }
    next();
  });
};