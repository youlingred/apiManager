const router = require('./router');
const UserController = require('../controller/UserController');
const user = new UserController();
router.get('/captcha', user.getCaptcha);
router.post('/reg', user.reg);
router.post('/login', user.login);