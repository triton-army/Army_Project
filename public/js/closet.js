const userId = localStorage.getItem("userId");
const nickname = localStorage.getItem("nickname");

document.getElementById("title").innerText =
`${nickname}님의 옷장`;

loadClothes();

async function loadClothes() {

    const response =
        await fetch(`/clothes/${userId}`);

    const clothes =
        await response.json();

    const list =
        document.getElementById("clothesList");

    list.innerHTML = "";

    if (clothes.length === 0) {

        list.innerHTML =
        "<p>등록된 옷이 없습니다.</p>";

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

            <button onclick="editClothes(${item.id})">
                수정
            </button>

            <button onclick="deleteClothes(${item.id})">
                삭제
            </button>
        </div>`;
    });

    async function deleteClothes(id) {

    if (!confirm("삭제하시겠습니까?")) return;

    const response = await fetch(`/clothes/${id}`, {
        method: "DELETE"
    });

    const result = await response.json();

    alert(result.message);

    loadClothes();

}

function editClothes(id) {

    location.href = `edit-clothes.html?id=${id}`;

}

}
