const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { chats } = require('../data/data');
const { route } = require('./useRoutes');
const {accessChat} = require("../controller/chatController");
const router = express.Router();

router.route('/').post(protect,accessChat);
// router.route("/").get(protect, fetchChats);
// router.route("/group").post(protect, createGroupChat);
// router.route("/rename").put(protect, renameGroup);
// router.route("/groupremove").put(protect, renameFromGroup);
// router.route("/groupadd").put(protect,addtoGroup);

module.exports = router;