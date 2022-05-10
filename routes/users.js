// router создаёт объект, на который мы повесим обработчики
const router = require("express").Router();
const { getUserMe } = require("../controllers/users");
// const { patchUserValidate } = require("../middlewares/validation");

// Вернуть информацию о пользователе (email и имя)
router.get("/me", getUserMe);

// // обновляет информацию о пользователе (email и имя) (Доделать)
// router.patch("/me", patchUserValidate, patchUser);

module.exports = router;
