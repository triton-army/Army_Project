const express = require("express");
const { getOutfits, saveOutfits } = require("../models/outfitModel");

const router = express.Router();

router.post("/", (req, res) => {

    const {
        ownerId,
        creatorId,
        title,
        description,
        top,
        bottom,
        shoes,
        outer
    } = req.body;

    const outfits = getOutfits();

    const nextId =
        outfits.length === 0
            ? 1
            : Math.max(...outfits.map(item => item.id)) + 1;

    const newOutfit = {
        id: nextId,
        ownerId,
        creatorId,
        title,
        description,
        top,
        bottom,
        shoes,
        outer,
        likes: 0,
        dislikes: 0,
        createdAt: new Date().toISOString()
    };

    outfits.push(newOutfit);

    saveOutfits(outfits);

    res.json({
        message: "코디 등록 완료",
        outfit: newOutfit
    });

});

router.get("/:ownerId", (req, res) => {

    const outfits = getOutfits();

    const result = outfits.filter(
        item => item.ownerId === req.params.ownerId
    );

    res.json(result);

});

router.put("/:id", (req, res) => {

    const outfits = getOutfits();

    const index = outfits.findIndex(
        item => item.id == req.params.id
    );

    if (index === -1) {
        return res.status(404).json({
            message: "코디를 찾을 수 없습니다."
        });
    }

    outfits[index] = {
        ...outfits[index],
        ...req.body
    };

    saveOutfits(outfits);

    res.json({
        message: "수정 완료"
    });

});

router.delete("/:id", (req, res) => {

    const outfits = getOutfits();

    const result = outfits.filter(
        item => item.id != req.params.id
    );

    saveOutfits(result);

    res.json({
        message: "삭제 완료"
    });

});

module.exports = router;