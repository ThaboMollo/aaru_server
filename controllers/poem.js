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
  console.log('req.body', req.body);
  console.log('poem update param', req.params.poemId);

  const poem = req.poem;
  if (req.body.title) {
    poem.title = req.body.title;
  }
  if (req.body.album) {
    poem.album = req.body.album;
  }
  if (req.body.content) {
    poem.content = req.body.content;
  }
  if (req.body.isPublished) {
    poem.isPublished = req.body.isPublished;
  }
  poem.name = req.body.name;
  poem.save((err, data) => {
      if (err) {
          return res.status(400).json({
              error: errorHandler(err)
          });
      }
      res.json(data);
  });
};
exports.deletePoem = (req, res) => {
  let poem = req.poem;
  poem.remove((err, deletedPoem) => {
      if (err) {
          return res.status(400).json({
              error: errorHandler(err)
          });
      }
      res.json({
          message: 'Poem deleted successfully'
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
