

const loginUserId = localStorage.getItem("userId");

const params = new URLSearchParams(location.search);

const ownerId =
    params.get("userId") || loginUserId;

const isMine =
    loginUserId === ownerId;

const nickname =
    localStorage.getItem("nickname");

document.getElementById("title").innerText =
isMine
? `${nickname}님의 옷장`
: `${ownerId}님의 옷장`;

loadClothes();

loadOutfits();

if (!isMine) {

    document.getElementById("addClothesBtn").style.display = "none";

    document.getElementById("addOutfitBtn").style.display = "none";

}

async function loadClothes() {
    const response = await fetch(`/clothes/${ownerId}`);
    const clothes = await response.json();

    const list = document.getElementById("clothesList");
    list.innerHTML = "";

    if (clothes.length === 0) {
        list.innerHTML = "<p>등록된 옷이 없습니다.</p>";
        return;
    }

    clothes.forEach(item => {
        list.innerHTML += `
        <div class="clothes-card">
            <h3>${item.name}</h3>
            <p>카테고리 : ${item.category}</p>
            <p>색상 : ${item.color}</p>
            <p>계절 : ${item.season}</p>
            <p>스타일 : ${item.style}</p>
            <p>브랜드 : ${item.brand}</p>
            <p>사이즈 : ${item.size}</p>
            ${isMine ? `
            <button onclick="editClothes(${item.id})"> 수정 </button>
            <button onclick="deleteClothes(${item.id})"> 삭제 </button>
            ` : ""}
        </div>`;
    });
}

async function deleteClothes(id) {
    if (!confirm("삭제하시겠습니까?")) return;

    const response = await fetch(`/clothes/user/${userId}`);

    const result = await response.json();

    alert(result.message);

    loadClothes();
}

function editClothes(id) {
    location.href = `add-clothes.html?id=${id}`;
}

async function loadOutfits() {

    const response =
        await fetch(`/outfits/${userId}`);

    const outfits =
        await response.json();

    const list =
        document.getElementById("outfitList");

    list.innerHTML = "";

    if (outfits.length === 0) {

        list.innerHTML =
        "<p>등록된 코디가 없습니다.</p>";

        return;

    }

    const clothesResponse =
        await fetch(`/outfits/${ownerId}`);

    const clothes =
        await clothesResponse.json();

    function getName(id) {

        if (!id) return "선택 안 함";

        const item =
            clothes.find(c => c.id == id);

        return item ? item.name : "-";

    }

    outfits.forEach(item => {

        list.innerHTML += `
        <div class="clothes-card">

            <h3>${item.title}</h3>

            <p>${item.description || ""}</p>

            <p>상의 : ${getName(item.top)}</p>

            <p>하의 : ${getName(item.bottom)}</p>

            <p>신발 : ${getName(item.shoes)}</p>

            <p>아우터 : ${getName(item.outer)}</p>

            <p>👍 ${item.likes} 👎 ${item.dislikes}</p>

            ${isMine ? `
                <button onclick="editOutfit(${item.id})">
                수정
                </button>

                <button onclick="deleteOutfit(${item.id})">
                삭제
                </button>
            ` : ""}

        </div>
        `;

    });

}

async function deleteOutfit(id) {

    if (!confirm("코디를 삭제하시겠습니까?"))
        return;

    const response =
        await fetch(`/outfits/${id}`, {

            method: "DELETE"

        });

    const result =
        await response.json();

    alert(result.message);

    loadOutfits();

}

function editOutfit(id) {

    location.href =
        `add-outfit.html?id=${id}`;

}


