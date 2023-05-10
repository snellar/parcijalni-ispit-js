
const textInput = document.querySelector("input[type='text']");

textInput.addEventListener("input", () => {
    const searchTerm = textInput.value;
    const apiURL = `https://api.tvmaze.com/search/shows?q=${searchTerm}`;

    fetch(apiURL)
        .then((response) => response.json())
        .then((data) => {
            const tbody = document.querySelector(".results tbody");
            tbody.innerHTML = "";
            if (data.length === 0) {
                const message = document.createElement("p");
                message.innerText = "No result."
                tbody.appendChild(message);
            }
            data.forEach((element) => {
                const row = document.createElement("tr");
                const nameElement = document.createElement("td");
                nameElement.innerText = element.show.name;
                const ratingElement = document.createElement("td");
                ratingElement.innerText = element.show.rating.average || "";
                const genreElement = document.createElement("td");
                genreElement.innerText = element.show.genres ? element.show.genres.join(", ") : "";
                const descriptionElement = document.createElement("td");
                descriptionElement.innerHTML = element.show.summary ? element.show.summary : "";

                row.appendChild(nameElement);
                row.appendChild(ratingElement);
                row.appendChild(genreElement);
                row.appendChild(descriptionElement);

                tbody.appendChild(row);
            });
        })
        .catch((error) => console.error(error));
});