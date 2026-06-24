const registerBtn =
  document.getElementById("registerBtn");

const userList =
  document.getElementById("userList");

const users =
  JSON.parse(
    localStorage.getItem("users")
  ) || [];

renderUsers();

registerBtn.addEventListener(
  "click",
  () => {
    const nickname =
      document.getElementById(
        "nickname"
      ).value;

    const gender =
      document.getElementById(
        "gender"
      ).value;

    if (!nickname || !gender) {
      alert(
        "닉네임과 성별은 필수입니다."
      );
      return;
    }

    users.push({
      id: Date.now(),
      nickname,
      gender,
      clothes: []
    });

    saveUsers();

    renderUsers();

    document.getElementById(
      "nickname"
    ).value = "";

    document.getElementById(
      "gender"
    ).value = "";
  }
);

function saveUsers() {
  localStorage.setItem(
    "users",
    JSON.stringify(users)
  );
}

function deleteUser(id) {
  const index =
    users.findIndex(
      user => user.id === id
    );

  if (index !== -1) {
    users.splice(index, 1);
  }

  saveUsers();
  renderUsers();
}

function addClothes(id) {
  const category =
    prompt(
      "카테고리 입력 (상의/하의/신발)"
    );

  if (!category) return;

  const name =
    prompt("옷 이름 입력");

  if (!name) return;

  const user =
    users.find(
      user => user.id === id
    );

  user.clothes.push({
    id: Date.now(),
    category,
    name
  });

  saveUsers();
  renderUsers();
}

function renderUsers() {
  userList.innerHTML = "";

  users.forEach(user => {
    const card =
      document.createElement("div");

    card.className =
      "user-card";

    let clothesHtml = "";

    user.clothes.forEach(
      cloth => {
        clothesHtml += `
          <div class="clothes-item">
            ${cloth.category}
            :
            ${cloth.name}
          </div>
        `;
      }
    );

    card.innerHTML = `
      <h3>
        ${user.nickname}
      </h3>

      <p>
        성별 :
        ${user.gender}
      </p>

      <button
        onclick="addClothes(${user.id})"
      >
        옷 추가
      </button>

      <button
        onclick="deleteUser(${user.id})"
      >
        삭제
      </button>

      <div class="clothes-list">
        <h4>보유 옷</h4>

        ${clothesHtml}
      </div>
    `;

    userList.appendChild(card);
  });
}