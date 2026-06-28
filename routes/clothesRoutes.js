const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const clothesPath = path.join(__dirname, "../data/clothes.json");

// 옷 등록
router.post("/", (req, res) => {

    console.log(req.body);

    const {
        userId,
        name,
        category,
        color,
        season,
        style,
        brand,
        size
    } = req.body;

    const clothes = JSON.parse(
        fs.readFileSync(clothesPath, "utf8")
    );

    const nextId =
        clothes.length === 0
            ? 1
            : Math.max(...clothes.map(c => c.id)) + 1;

    const newClothes = {
        id: nextId,
        userId,
        name,
        category,
        color,
        season,
        style,
        brand,
        size
    };

    clothes.push(newClothes);

    fs.writeFileSync(
        clothesPath,
        JSON.stringify(clothes, null, 4)
    );

    res.json({
        message: "옷 등록 완료",
        clothes: newClothes
    });

});

// 내 옷 조회
router.get("/:userId", (req, res) => {

    const clothes = JSON.parse(
        fs.readFileSync(clothesPath, "utf8")
    );

    const myClothes =
        clothes.filter(
            item => item.userId === req.params.userId
        );

    res.json(myClothes);

});

// 옷 삭제
router.delete("/:id", (req, res) => {
    const clothes = JSON.parse(fs.readFileSync(clothesPath, "utf8"));
    const newClothes = clothes.filter(item => item.id != req.params.id);
    fs.writeFileSync(clothesPath, JSON.stringify(newClothes, null, 4));
    res.json({ message: "삭제 완료" });
});

// 옷 수정
router.put("/:id", (req, res) => {
    const clothes = JSON.parse(fs.readFileSync(clothesPath, "utf8"));
    const index = clothes.findIndex(item => item.id == req.params.id);

    if (index === -1) {
        return res.status(404).json({
            message: "옷을 찾을 수 없습니다."
        });
    }

    clothes[index] = {
        ...clothes[index],
        ...req.body
    };

    fs.writeFileSync(clothesPath, JSON.stringify(clothes, null, 4));

    res.json({
        message: "수정 완료"
    });
});

module.exports = router;

