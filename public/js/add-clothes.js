const addBtn = document.getElementById("addBtn");
const params = new URLSearchParams(location.search);
const editId = params.get("id");

if (editId) {
    document.querySelector("h1").innerText = "옷 수정";
    addBtn.innerText = "수정 완료";
    loadClothes();
}

async function loadClothes() {
    const response = await fetch(`/clothes/item/${editId}`);
    const item = await response.json();

    document.getElementById("name").value = item.name;
    document.getElementById("category").value = item.category;
    document.getElementById("color").value = item.color;
    document.getElementById("season").value = item.season;
    document.getElementById("style").value = item.style;
    document.getElementById("brand").value = item.brand;
    document.getElementById("size").value = item.size;
}

addBtn.addEventListener("click", async () => {

    const userId = localStorage.getItem("userId");

    const name = document.getElementById("name").value;
    const category = document.getElementById("category").value;
    const color = document.getElementById("color").value;
    const season = document.getElementById("season").value;
    const style = document.getElementById("style").value;
    const brand = document.getElementById("brand").value;
    const size = document.getElementById("size").value;

    if (!name || !brand) {
        alert("빈칸을 입력해주세요.");
        return;
    }

    const url = editId ? `/clothes/${editId}` : "/clothes";
    const method = editId ? "PUT" : "POST";

    const response = await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId,
            name,
            category,
            color,
            season,
            style,
            brand,
            size
        })
    });

    const result = await response.json();

    alert(result.message);

    if (response.ok) {
        location.href = "closet.html";
    }

});
