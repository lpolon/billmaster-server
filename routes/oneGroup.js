const express = require('express');
const router = express.Router({ mergeParams: true });
const Group = require('../models/Groups');
// get all info from an specific group Id
router.get('/', (req, res, next) => {
  Group.findById(req.groupId)
    .populate([
      'expenses',
      // 'settles',
    ])
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

router.delete('/', (req, res, next) => {
  Group.findByIdAndDelete(req.groupId)
    .then((response) =>
      res.status(200).json({
        msg: `group ${response.groupName} deleted sucessfully`,
        deletedGroup: response,
      })
    )
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

router.put('/', (req, res, next) => {
  Group.findByIdAndUpdate(req.groupId, req.body, {
    new: true,
    useFindAndModify: false,
  })
    .then((response) => {
      res.status(200).json({
        msg: `group ${response.groupName} updated sucessfully`,
        newObj: response,
      });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

router.use('/expenses', require('./expenses'));

module.exports = router;