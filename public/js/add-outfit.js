const loginUser =
    localStorage.getItem("userId");

const params =
    new URLSearchParams(location.search);

const ownerId =
    params.get("user") || loginUser;

loadClothes();

async function loadClothes() {

    const response = await fetch(`/clothes/${userId}`);
    const clothes = await response.json();

    const top = document.getElementById("top");
    const bottom = document.getElementById("bottom");
    const shoes = document.getElementById("shoes");
    const outer = document.getElementById("outer");

    clothes.forEach(item => {

        const option = `<option value="${item.id}">
            ${item.name}
        </option>`;

        if (item.category === "상의") {
            top.innerHTML += option;
        }

        else if (item.category === "하의") {
            bottom.innerHTML += option;
        }

        else if (item.category === "신발") {
            shoes.innerHTML += option;
        }

        else if (item.category === "아우터") {
            outer.innerHTML += option;
        }

    });

}

document.getElementById("saveBtn").addEventListener("click", async () => {

    const title =
        document.getElementById("title").value.trim();

    const description =
        document.getElementById("description").value.trim();

    if (!title) {

        alert("코디 제목을 입력해주세요.");

        return;

    }

    const response = await fetch("/outfits", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            ownerId: ownerId,

            creatorId: loginUser,

            title,

            description,

            top:
                document.getElementById("top").value || null,

            bottom:
                document.getElementById("bottom").value || null,

            shoes:
                document.getElementById("shoes").value || null,

            outer:
                document.getElementById("outer").value || null
        })
    });

    const result = await response.json();

    alert(result.message);

    if (response.ok) {
        location.href = "closet.html";
    }
});