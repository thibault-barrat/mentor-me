const { Router } = require("express");

// import des controllers
const userController = require("./controllers/userController");
// import des middlewares
const {
  verifyToken,
  isAdmin,
  verifyUserById,
  verifyRefreshToken,
} = require("./middlewares/auth");

const categoryController = require("./controllers/categoryController");

const serviceController = require("./controllers/serviceController");
const tokenController = require("./controllers/tokenController");

const router = Router();

//router.get("/register", mainController.init);

/* Category */
router.get("/allCategories", categoryController.getAllCategorizz); // Route pour toutes les catégories
router.get(
  "/category/:id(\\d+)",
  verifyToken,
  categoryController.getOneCategory
); // Route pour un ID de catégorie
router.delete(
  "/category/:id(\\d+)",
  verifyToken,
  isAdmin,
  categoryController.deleteOneCategory
); // Route pour suppirmer une catégorie
router.post(
  "/category",
  verifyToken,
  isAdmin,
  categoryController.createOneCategory
); // Route pour ajouter une catégorie
router.patch(
  "/category/:id(\\d+)",
  verifyToken,
  isAdmin,
  categoryController.modifyCategory
); // Route pour modifier une catégorie
router.get(
  "/category/:id(\\d+)/services",
  verifyToken,
  categoryController.getAllServicebyCategoryId
); // Route pour avoir tous les services d'une catégorie

/* Services */
router.get("/allServices", serviceController.getAllServicezz);
router.get("/services/:id(\\d+)", serviceController.getOneService);
router.delete("/services/:id(\\d+)", serviceController.deleteOneService);
router.patch("/services/:id(\\d+)", serviceController.modifyService);

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
router.post("/logout", verifyRefreshToken, userController.disconnectUser);

/**
 * Récupérer tous les users
 * @route GET /allUsers
 */
router.get("/allUsers", verifyToken, isAdmin, userController.getAllUsers);

/**
 * Récupérer un user par son id
 * @route GET /user/:id
 */
router.get(
  "/user/:id(\\d+)",
  verifyToken,
  verifyUserById,
  userController.getOneUser
);

/**
 * Modifier le profil d'un user
 * @route PATCH /user/:id
 */
router.patch(
  "/user/:id(\\d+)",
  verifyToken,
  verifyUserById,
  userController.modifyUserProfile
);
/**
 * Modifier l'avatar d'un user
 * @route PATCH /user/:id/avatar
 */
router.patch(
  "/user/:id(\\d+)/avatar",
  verifyToken,
  verifyUserById,
  userController.modifyUserAvatar
);

/**
 * Supprimer un user par son id
 * @route DELETE /user/:id
 */
router.delete(
  "/user/:id(\\d+)",
  verifyRefreshToken,
  verifyUserById,
  userController.deleteOneUser
);

/**
 * Refresh token
 */
router.post(
  "/refreshToken",
  verifyRefreshToken,
  tokenController.verifyRefreshToken
);

module.exports = router;
