const token = localStorage.getItem("token");

if (!token) {
    location.href = "login.html";
}

fetch("/auth/me", {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
.then(res => {
    if (!res.ok) {
        localStorage.removeItem("token");
        location.href = "login.html";
    }

    return res.json();
})
.then(data => {
    console.log(data.user);
});

document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("token");
    location.href = "login.html";
});