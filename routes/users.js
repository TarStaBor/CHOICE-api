const router = require("express").Router();

const { getUserMe } = require("../controllers/users");

// TODO: Validation with Joi
// const { patchUserValidate } = require("../middlewares/validation");

router.get("/me", getUserMe);

// TODO: Patch User
// router.patch("/me", patchUserValidate, patchUser);

module.exports = router;
