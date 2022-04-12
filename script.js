async function fetchData() {
  try {
    const response = await fetch("data.json");
    const json = await response.json();
    const workJson = json.result;
    divTemplateItem(workJson);
    addWorkItem(workJson);
  } catch (err) {
    console.log(err);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

const divTemplateItem = (data) => {
  return `<div class="work-experience-item work-experience-bg animation-fadein" style='background:url("${
    data.work_img
  }")'>
  <div class="work-experience-detail">
      <div class="work-experience-text">
          <h1>${data.work_name}</h1>
          <p>${data.work_detail}</p>
          ${data.work_type ? divButtonTemplate(data.work_type) : ""}
      </div>
      <div class="work-experience-company-text">
          <h5 class="text-excellent">${data.work_employer}</h5>
          ${
            data.work_link !== "Closed"
              ? `<a href="${data.work_link}" class="view-page" target='_blank'><i class='fas fa-link'></i></a>`
              : `<p class="text-closed">${data.work_link}</p>`
          }
      </div>
  </div>
</div>
  `;
};

const divButtonTemplate = (workType) => {
  return `${workType
    .map((btn) => {
      let btnValue = "";
      switch (btn) {
        case "html":
          btnValue += `<button class="btn-html" value="${btn}">${btn}</button>`;
          break;
        case "css":
          btnValue += `<button class="btn-css" value="${btn}">${btn}</button>`;
          break;
        case "bootstrap":
          btnValue += `<button class="btn-bootstrap" value="${btn}">${btn}</button>`;
          break;
        case "wordpress":
          btnValue += `<button class="btn-wordpress" value="${btn}">${btn}</button>`;
          break;
        case "owl carousel":
          btnValue += `<button class="btn-owl-carousel" value="${btn}">${btn}</button>`;
          break;
        case "jquery":
          btnValue += `<button class="btn-jquery" value="${btn}">${btn}</button>`;
          break;
      }
      return btnValue;
    })
    .join("")}`;
};

const addWorkItem = (data) => {
  const divParentElement = (document.querySelector(
    ".work-experience-container"
  ).innerHTML = `${data.map(divTemplateItem).join("")}`);
};

// btn toggle --> see more
const btnToggle = () => {
  const btn = document.querySelector(".btn-more");
  const detailMore = document.querySelector(".sidebar-main-details");
  let btnClick = false;
  btn.addEventListener("click", () => {
    if (!btnClick) {
      btnClick = true;
      detailMore.classList.add("toggle-more");
      btn.innerHTML = `<i class="fas fa-angle-up"></i> Less More`;
    } else {
      btnClick = false;
      detailMore.classList.remove("toggle-more");
      btn.innerHTML = `<i class="fas fa-angle-down"></i> See More`;
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  });
};

btnToggle();

// Scroll to Top
const scrollTop = () => {
  window.addEventListener("scroll", () => {
    const btnToTop = document.querySelector(".btn-to-top");
    window.scrollY > 100
      ? btnToTop.classList.add("btn-to-top-active")
      : btnToTop.classList.remove("btn-to-top-active");
  });

  const btnToTop = document.querySelector(".btn-to-top");
  btnToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
};

scrollTop();
