const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { chats } = require('../data/data');
const { route } = require('./useRoutes');
const {accessChat} = require("../controller/chatController")
const {fetchChats} = require("../controller/chatController");
const {createGroupChat} = require("../controller/chatController");
const {renameGroup} = require("../controller/chatController");
const{addToGroup} = require("../controller/chatController");
const {removeFromGroup} = require("../controller/chatController");
const router = express.Router();

router.route('/').post(protect,accessChat);
router.route("/").get(protect, fetchChats);
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/groupremove").put(protect, removeFromGroup);
router.route("/groupadd").put(protect,addToGroup);

module.exports = router;