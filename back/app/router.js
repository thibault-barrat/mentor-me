const { Router } = require("express");
// import des controllers
const userController = require("./controllers/userController");
// import des middlewares
const { withAuth, isAdmin } = require("./middlewares/auth");

const router = Router();

/**
 * S'inscrire
 * @route POST /user/:id
 */
router.post("/register", userController.createNewUser);

/**
 * Connecter un user
 * @route post /login
 */
router.post("/login", userController.connectUser);

/**
 * Déconnecter un user
 * @route get /logout
 */
router.get("/logout", withAuth, userController.disconnectUser);

/**
 * Récupérer tous les users
 * @route GET /allUsers
 */
router.get("/allUsers", isAdmin, userController.getAllUsers);

/**
 * Récupérer un user par son id
 * @route GET /user/:id
 */
router.get("/user/:id(\\d+)", withAuth, userController.getOneUser);

/**
 * Modifier le profil d'un user
 * @route PATCH /user/:id
 */
router.patch("/user/:id(\\d+)", withAuth, userController.modifyUserProfile);
/**
 * Modifier l'avatar d'un user
 * @route PATCH /user/:id/avatar
 */
router.patch(
  "/user/:id(\\d+)/avatar",
  withAuth,
  userController.modifyUserAvatar
);

/**
 * Supprimer un user par son id
 * @route DELETE /user/:id
 */
router.delete("/user/:id(\\d+)", withAuth, userController.deleteOneUser);

module.exports = router;
