const { Router } = require("express");
// import des controllers
const userController = require("./controllers/userController");

const router = Router();

/**
 * Récupérer tous les users
 * @route GET /allUsers
 * @returns {Users} 200
 * @returns {string} 500 - Server error
 */
router.get("/allUsers", userController.getAllUsers);

/**
 * Récupérer un user par son id
 * @route GET /user/:id
 * @param {number} id du user
 * @returns {User} 200
 * @returns {string} 500 - Server error
 */
router.get("/user/:id(\\d+)", userController.getOneUser);

/**
 * Ajouter un user
 * @route POST /user/:id
 * @returns {User} 201 - created
 * @returns {string} 500 - Server error
 */
router.post("/register", userController.createNewUser);

/**
 * TODO
 * Modifier le profil d'un user
 * @route PATCH /user/:id
 * @returns {User} 201 - created
 * @returns {string} 500 - Server error
 */
//  router.post("/user/:id(\\d+)", userController.modifyUserProfile);

/**
 * Supprimer un user par son id
 * @route DELETE /user/:id
 * @param {number} id du user
 * @returns {User} 200
 * @returns {string} 500 - Server error
 */
router.delete("/user/:id(\\d+)", userController.deleteOneUser);

module.exports = router;
