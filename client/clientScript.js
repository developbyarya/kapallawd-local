const form = document.getElementById("form");
const BASE_URL = "localhost:3000/";
let started = false;

form.addEventListener("submit", (ev) => {
  ev.preventDefault();
  if (started) {
    fetch("/stop-mission", {
      method: "post",
    }).then((res) => {
      if (res.status == 200) {
        started = false;
        form.getElementsByTagName("button")[0].innerText = "Start mission";
        form.querySelectorAll("input").forEach((el) => {
          el.removeAttribute("disabled");
        });
      }
    });
    return;
  }

  const formData = new FormData(form);
  formData.append("mission_started", true);

  fetch("/mission", {
    method: "post",
    body: JSON.stringify(Object.fromEntries(formData)),
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    if (res.status == 200) {
      started = true;
      form.getElementsByTagName("button")[0].innerText =
        "Mission Started (stop)";
      form.querySelectorAll("input").forEach((el) => {
        el.setAttribute("disabled", true);
      });
    }
  });
});
