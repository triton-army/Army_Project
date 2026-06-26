const token = localStorage.getItem("token");

if (!token) {
    alert("로그인이 필요합니다.");
    location.href = "login.html";
}

document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("token");
    location.href = "login.html";
});