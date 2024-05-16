let url = "https://api.genderize.io?name=";
let wrapper = document.getElementById("wrapper");

let predictGender = () => {
  let name = document.getElementById("name").value;
  let error = document.getElementById("error");
  let loading = document.getElementById("loading");

  let finalURL = url + name;
  wrapper.innerHTML = "";
  error.innerHTML = "";

  if (name.length > 0 && /^[A-Za-z]+$/.test(name)) {
    loading.style.display = "block"; // Show loading animation

    fetch(finalURL)
      .then((res) => res.json())
      .then((data) => {
        let div = document.createElement("div");
        div.setAttribute("id", "info");
        div.innerHTML = `<h2 id="result-name">${data.name}</h2><img src="" id="gender-icon"/> <h1 id="gender">${data.gender}</h1><h4 id="prob">Probability: ${data.probability}</h4>`;
        wrapper.append(div);

        if (data.gender == "male") {
          div.classList.add("male");
          document
            .getElementById("gender-icon")
            .setAttribute("src", "./assets/male.png");
        } else if (data.gender == "female") {
          div.classList.add("female");
          document
            .getElementById("gender-icon")
            .setAttribute("src", "./assets/female.png");
        }
        else{
            div.classList.add("null");
          document
            .getElementById("gender-icon")
            .setAttribute("src", "./assets/null.png");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        error.innerHTML = "An error occurred while fetching data.";
      })
      .finally(() => {
        loading.style.display = "none"; // Hide loading animation
      });
    document.getElementById("name").value = "";
  } else {
    error.innerHTML = "Oops! Please type a valid name...";
  }
};

document.querySelector(".predict__btn").addEventListener("click", predictGender);
