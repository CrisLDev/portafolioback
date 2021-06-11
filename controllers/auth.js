"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
function createToken(user) {
    return jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, config_1.default.SECRET, {
        expiresIn: 86400
    });
}
//@Route    Post api/users
//@desc     Register new user
//@access   Public
exports.register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Destructuring Request Body
    const { fullname, username, email, password } = req.body;
    // Try save user and verify is not exist
    try {
        // Verify if content is not empty
        if (!fullname || !username || !email || !password) {
            return res.status(400).json({ errors: [{ msg: 'Fill all data.' }] });
        }
        // Search User if exist
        let userExist = yield User_1.default.findOne({ email });
        // If User exist then not register a new user
        if (userExist) {
            return res.status(400).json({ errors: [{ msg: 'Email already in use.' }] });
        }
        // If User not exist then we creating the object user
        const user = new User_1.default({
            fullname, username, email, password
        });
        // Encrypt user password
        user.password = yield user.encrypPassword(user.password);
        // Save User
        yield user.save();
        // Generating Token
        return res.status(200).json({ token: createToken(user) });
    }
    catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
});
//@Route    POST api/auth
//@desc     Authenticate user & get token
//@access   Public
exports.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res
                .status(401)
                .json({ errors: [{ msg: 'Pls send your email and password' }] });
        }
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(401).json({ errors: [{ msg: 'User Not exist' }] });
        }
        // Validating Password
        const isMatch = yield user.validatePassword(password);
        if (isMatch) {
            // Get Token
            return res.status(200).json({ token: createToken(user) });
        }
        return res.status(401).json({ errors: [{ msg: 'Email or password invalid' }] });
    }
    catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
});
//@Route    GET api/auth
//@desc     Get Personal Info of Logged User
//@access   Public
exports.getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Ayer me quede por aqui, el error esta en que ya que mandamos a buscar el ussuario con el findbyid no exister el req.params en la ruta so debemos crear un parametro en req como hicmos ne la nueva hera opara guardar la id del usuario
    try {
        const user = req.user;
        if (!user) {
            return res.status(400).json({ msg: 'There is no user' });
        }
        res.json(user);
    }
    catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
});
