const base_speed_input = document.getElementById("base-speed");
const base_speed_btn = document.getElementById("update-base-speed");
const trim_input_1 = document.getElementById("trim-1");
const trim_input_2 = document.getElementById("trim-2");
const trim_btn = document.getElementById("update-trim");

const BASE_URL = "http://localhost:3000";

base_speed_btn.addEventListener("click", async (ev) => {
  const value = base_speed_input.value;
  ev.target.innerText = "loading";
  ev.target.setAttribute("disabled", true);
  const res = await fetch(BASE_URL + "/base-speed", {
    headers: {
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ value }), // Convert the object to a JSON string
  });

  ev.target.removeAttribute("disabled");
  ev.target.innerText = "Update";
});
