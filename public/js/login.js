const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password
        })
    });

    const result = await response.json();

    alert(result.message);

    if (response.ok) {
        localStorage.setItem("token", result.token);
        location.href = "index.html";
    }
});