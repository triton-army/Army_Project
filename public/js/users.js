loadUsers();

async function loadUsers() {

    const response = await fetch("/auth/users");
    const users = await response.json();

    const list = document.getElementById("userList");
    list.innerHTML = "";

    users.forEach(user => {

        list.innerHTML += `
        <div class="clothes-card">
            <h3>${user.nickname}</h3>
            <p>${user.username}</p>
            <button onclick="viewCloset('${user.username}')">
                옷장 보기
            </button>
        </div>`;

    });

}

function viewCloset(userId) {
    location.href = `user-closet.html?user=${userId}`;
}
