const params = new URLSearchParams(location.search);
const userId = params.get("user");

loadClothes();

async function loadClothes() {

    const userResponse = await fetch("/auth/users");
    const users = await userResponse.json();

    const user = users.find(u => u.username === userId);

    document.getElementById("title").innerText =
        `${user.nickname}님의 옷장`;

    const response = await fetch(`/clothes/user/${userId}`);
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
        </div>`;

    });

}
