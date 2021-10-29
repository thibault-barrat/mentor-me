const { Router } = require("express");
// import des controllers
const userController = require("./controllers/userController");
// import des middlewares
const { withAuth, isAdmin } = require("./middlewares/auth");

const router = Router();

/**
 * Récupérer tous les users
 * @route GET /allUsers
 * @returns {Users} 200 - OK
 * @returns {string} 500 - Server error
 */
router.get("/allUsers", isAdmin, userController.getAllUsers);

/**
 * Récupérer un user par son id
 * @route GET /user/:id
 * @param {number} id du user
 * @returns {User} 200 - OK
 * @returns {string} 500 - Server error
 */
router.get("/user/:id(\\d+)", withAuth, userController.getOneUser);

/**
 * S'inscrire
 * @route POST /user/:id
 * @returns {User} 201 - created
 * @returns {string} 500 - Server error
 */
router.post("/register", userController.createNewUser);

/**
 * Modifier le profil d'un user
 * @route PATCH /user/:id
 * @param {number} id du user
 * @returns {User} 200 - OK
 * @returns {string} 500 - Server error
 */
router.patch("/user/:id(\\d+)", withAuth, userController.modifyUserProfile);

/**
 * Supprimer un user par son id
 * @route DELETE /user/:id
 * @param {number} id du user
 * @returns {User} 200 - OK
 * @returns {string} 500 - Server error
 */
router.delete("/user/:id(\\d+)", withAuth, userController.deleteOneUser);

/**
 * Connecter un user
 * @route post /login
 * @returns {User} 200
 * @returns {string} 500 - Server error
 */
router.post("/login", userController.connectUser);

/**
 * Déconnecter un user
 * @route get /logout
 * @returns {User} 200
 * @returns {string} 500 - Server error
 */
router.get("/logout", withAuth, userController.disconnectUser);

module.exports = router;
