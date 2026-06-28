const addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", async () => {

    const userId = localStorage.getItem("userId");

    const name = document.getElementById("name").value;
    const category = document.getElementById("category").value;
    const color = document.getElementById("color").value;
    const season = document.getElementById("season").value;
    const style = document.getElementById("style").value;
    const brand = document.getElementById("brand").value;
    const size = document.getElementById("size").value;

    if (
        !name ||
        !brand
    ) {
        alert("빈칸을 입력해주세요.");
        return;
    }

    const response = await fetch("/clothes", {

        method: "POST",

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

