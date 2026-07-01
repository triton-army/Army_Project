const fs = require("fs");
const path = require("path");

const outfitPath = path.join(__dirname, "../data/outfits.json");

function getOutfits() {

    return JSON.parse(
        fs.readFileSync(outfitPath, "utf8")
    );

}

function saveOutfits(outfits) {

    fs.writeFileSync(
        outfitPath,
        JSON.stringify(outfits, null, 4)
    );

}

module.exports = {
    getOutfits,
    saveOutfits
};