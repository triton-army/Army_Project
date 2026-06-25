const registerBtn =
  document.getElementById("registerBtn");

const userList =
  document.getElementById("userList");

const users =
  JSON.parse(
    localStorage.getItem("users")
  ) || [];

renderUsers();

registerBtn.addEventListener("click", () => {

  const nickname =
    document.getElementById("nickname")
      .value
      .trim();

  const gender =
    document.getElementById("gender")
      .value;

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

    profile: {
      height: "",
      weight: "",
      shoulder: "",
      waist: ""
    },

    clothes: [],

    comments: []
  });

  saveUsers();

  renderUsers();

  document.getElementById(
    "nickname"
  ).value = "";

  document.getElementById(
    "gender"
  ).value = "";
});

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

function addClothes(userId) {

  const category =
    document.getElementById(
      `category-${userId}`
    ).value;

  const clothName =
    document.getElementById(
      `cloth-${userId}`
    ).value
    .trim();

  if (!clothName) {
    alert("옷 이름 입력");
    return;
  }

  const user =
    users.find(
      user => user.id === userId
    );

  user.clothes.push({
    id: Date.now(),
    category,
    name: clothName
  });

  saveUsers();
  renderUsers();
}

function deleteClothes(
  userId,
  clothId
) {

  const user =
    users.find(
      user => user.id === userId
    );

  user.clothes =
    user.clothes.filter(
      cloth => cloth.id !== clothId
    );

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

    user.clothes.forEach(cloth => {

      clothesHtml += `
        <div class="clothes-item">

          <span>
            ${cloth.category}
            : ${cloth.name}
          </span>

          <button
            class="delete-btn"
            onclick="
              deleteClothes(
                ${user.id},
                ${cloth.id}
              )
            "
          >
            삭제
          </button>

        </div>
      `;
    });

    card.innerHTML = `

      <h3>
        ${user.nickname}
      </h3>

      <p>
        성별 :
        ${user.gender}
      </p>

      <div class="user-actions">

        <button
          class="delete-btn"
          onclick="
            deleteUser(
              ${user.id}
            )
          "
        >
          사용자 삭제
        </button>

      </div>

      <div class="clothes-form">

        <select
          id="category-${user.id}"
        >
          <option value="상의">
            상의
          </option>

          <option value="하의">
            하의
          </option>

          <option value="신발">
            신발
          </option>

          <option value="기타">
            기타
          </option>
        </select>

        <input
          id="cloth-${user.id}"
          placeholder="옷 이름"
        >

        <button
          class="add-btn"
          onclick="
            addClothes(
              ${user.id}
            )
          "
        >
          옷 추가
        </button>

      </div>

      <div class="clothes-list">

        <h4>
          보유 옷
        </h4>

        ${clothesHtml}

      </div>

    `;

    userList.appendChild(card);
  });
}

async function loadWeather() {

  try {

    const response =
      await fetch("/weather");

    const data =
      await response.json();

    document.getElementById(
      "weatherBox"
    ).innerHTML = `
      <h3>현재 날씨</h3>

      <p>
        ${data.weather}
      </p>

      <p>
        ${data.temp}℃
      </p>

      <p>
        습도 ${data.humidity}%
      </p>
    `;

  } catch (error) {

    console.error(error);

    document.getElementById(
      "weatherBox"
    ).textContent =
      "날씨 정보를 불러오지 못했습니다.";
  }
}

loadWeather();