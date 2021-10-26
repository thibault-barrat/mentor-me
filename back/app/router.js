const { Router } = require("express");
// import des controllers
const mainController = require("./controllers/mainController");

const router = Router();

/**
 * Respond with a visitor idenfified by its ticket number
 * @route GET /register
 * @param {string} ticketNumber.path.required The ticket number
 * @returns {Visitor} 200 - An identified visitor
 * @returns {string} 400 - Missing ticket number
 * @returns {string} 401 - Outdated ticket number
 * @returns {string} 404 - Unknown ticket number
 * @returns {string} 500 - Server error
 */
// router.get("/register", mainController.init);

module.exports = router;
