const { Router } = require("express");

// import des controllers
const userController = require("./controllers/userController");
const categoryController = require("./controllers/categoryController");
const serviceController = require("./controllers/serviceController");
const tokenController = require("./controllers/tokenController");
const mainController = require("./controllers/mainController");
const userLikeServicesController = require("./controllers/userLikeServicesController");

// import des middlewares
const {
  verifyToken,
  isAdmin,
  verifyUserById,
  verifyRefreshToken,
} = require("./middlewares/auth");

// appel du router
const router = Router();

// liste des routes utilisées
//#region CATEGORIES
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
//#endregion

//#region SERVICES
router.get("/allServices", serviceController.getAllServicezz);
router.get("/service/:id(\\d+)", verifyToken, serviceController.getOneService);
router.delete(
  "/service/:id(\\d+)",
  verifyToken,
  serviceController.deleteOneService
);
router.patch(
  "/service/:id(\\d+)",
  verifyToken,
  verifyUserById,
  serviceController.modifyService
);
router.patch(
  "/service/:id(\\d+)/publish",
  verifyToken,
  isAdmin,
  serviceController.publishAService
);
router.post("/newService", verifyToken, serviceController.createService);
router.get("/search", verifyToken, serviceController.searchOneService);
//#endregion

//#region LIKED SERVICES
router.post(
  "/user/:id/service/:serviceId",
  verifyToken,
  verifyUserById,
  userLikeServicesController.likeService
); // liker un service
router.delete(
  "/user/:id/service/:serviceId",
  verifyToken,
  verifyUserById,
  userLikeServicesController.dislikeService
); // dislike un service
router.get(
  "/user/:id/likedServices",
  verifyToken,
  verifyUserById,
  userLikeServicesController.getLikedServicesByUserId
); // récupérer les services likés par le user
//#endregion

//#region USERS
/**
 * S'inscrire
 * @route POST "/register"
 */
router.post("/register", userController.createNewUser);

/**
 * Connecter un user
 * @route POST /login
 */
router.post("/login", userController.connectUser);

/**
 * Déconnecter un user
 * @route POST /logout
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
router.get("/user/:id(\\d+)", verifyToken, userController.getOneUser);

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
//#endregion

//#region TOKENS
/**
 * Refresh token
 * @route POST "/refreshToken"
 */
router.post(
  "/refreshToken",
  verifyRefreshToken,
  tokenController.verifyRefreshToken
);

/**
 * Get all refresh tokens
 * @route GET "/refreshTokens"
 */
router.get(
  "/refreshTokens",
  verifyToken,
  isAdmin,
  tokenController.getAllRefreshTokens
);

/**
 * Delete all refresh tokens
 * @route DELETE "/refreshTokens"
 */
router.delete(
  "/refreshTokens",
  verifyToken,
  isAdmin,
  tokenController.deleteAllRefreshTokens
);
//#endregion

/**
 * Send an email after submitting about page form
 * @route POST "/contact"
 */
router.post("/contact", mainController.sendMail);

// export du router
module.exports = router;
