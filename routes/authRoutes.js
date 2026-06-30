const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
    getUsers,
    saveUsers
} = require("../models/userModel");

const auth = require("../middleware/auth");

const router = express.Router();

// 회원가입
router.post("/register", async (req, res) => {

    const { username, nickname, password } = req.body;

    const users = getUsers();

    const exist = users.find(
        user => user.username === username
    );

    if (exist) {
        return res.status(400).json({
            message: "이미 존재하는 아이디입니다."
        });
    }

    const hashedPassword =
        await bcrypt.hash(password, 10);

    const newUser = {
        id: Date.now(),
        username,
        nickname,
        password: hashedPassword
    };

    users.push(newUser);

    saveUsers(users);

    res.json({
        message: "회원가입 성공"
    });

});

// 로그인
router.post("/login", async (req, res) => {

    const { username, password } = req.body;

    const users = getUsers();

    const user = users.find(
        user => user.username === username
    );

    if (!user) {
        return res.status(400).json({
            message: "아이디가 존재하지 않습니다."
        });
    }

    const isMatch =
        await bcrypt.compare(
            password,
            user.password
        );

    if (!isMatch) {
        return res.status(400).json({
            message: "비밀번호가 틀렸습니다."
        });
    }

    const token = jwt.sign(
        {
            username: user.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );

    res.json({
        message: "로그인 성공",
        token,
        user: {
            username: user.username,
            nickname: user.nickname
        }
    });

});

// 로그인 확인
router.get("/me", auth, (req, res) => {

    res.json({
        user: req.user
    });

});

//남의 옷장 보기
router.get("/users", (req, res) => {
    const users = getUsers();

    const result = users.map(user => ({
        username: user.username,
        nickname: user.nickname
    }));

    res.json(result);
});


module.exports = router;
