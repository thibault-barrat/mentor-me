const {
  Router
} = require("express");

// import des controllers
const userController = require("./controllers/userController");

const categoryController = require("./controllers/categoryController");

const serviceController = require("./controllers/serviceController");

// import des middlewares
const {
  withAuth,
  isAdmin
} = require("./middlewares/auth");


const router = Router();

/**
 * S'inscrire
 * @route POST /user/:id
 */
//router.get("/register", mainController.init);

/* Category */
router.get("/categorys", categoryController.getAllCategorizz); // Route pour toutes les catégories
router.get("/categorys/:id(\\d+)", categoryController.getOneCategory); // Route pour un ID de catégorie
router.delete("/categorys/:id(\\d+)", categoryController.deleteOneCategory); // Route pour suppirmer une catégorie
router.post("/categorys", categoryController.createOneCategory); // Route pour ajouter une catégorie
router.patch("/categorys/:id(\\d+)", categoryController.modifyCategory) // Route pour modifier une catégorie
router.get("/categorys/:id(\\d+)/services", categoryController.getAllServicebyCategoryId) // Route pour modifier une catégorie

/* Services */
router.get("/allServices", serviceController.getAllServicezz); // Route pour tout les services
router.get("/service/:id(\\d+)", serviceController.getOneService); // Route pour un service
router.delete("/service/:id(\\d+)", serviceController.deleteOneService); // Route pour supprimer un service
router.patch("/service/:id(\\d+)", serviceController.modifyService); // Route pour modifier un service
router.post("/service/", serviceController.createService); // Route pour creer un service




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