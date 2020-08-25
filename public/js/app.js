// fetch browser tool

// fetch("http://puzzle.mead.io/puzzle").then((res) => {
//   res.json().then((data) => {
//     console.log(data.puzzle);
//   });
// });

const weatherForm = document.querySelector("form");
const input = document.querySelector("input");
const forecastMessage = document.querySelector(".forecastMessage");
forecastMessage.textContent = "";

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value !== "") {
    fetch(
      `/weather?address=${encodeURIComponent(input.value)}`
    ).then((res) => {
      res.json().then((data) => {
        if (data.error) {
          forecastMessage.textContent = data.error;
        } else {
          forecastMessage.textContent = `${data.location}. ${data.forecast.temperature} Celsius.`;
          input.value = "";
        }
      });
    });
  }
});
