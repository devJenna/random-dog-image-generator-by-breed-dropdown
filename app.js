const breedOption = document.querySelector("select");
const generateButton = document.querySelector(".generate-button");
const imageContainer = document.querySelector(".image-container");
const errorContainer = document.querySelector(".error-container");

// load all the breed options in dropdown list
window.addEventListener("load", getBreedList);

// to display images when breen option is changed without clicking generate button
breedOption.addEventListener("change", fetchImages);

generateButton.addEventListener("click", fetchImages);

breedOption.addEventListener("keydown", enterKey);

function enterKey(e) {
    e.preventDefault();
    // console.log("entered");
    fetchImages(e);
}

// get all the breed options
function getBreedList() {
    fetch("https://dog.ceo/api/breeds/list/all")
        .then(response => response.json())
        .then(function (data) {
            // console.log(data.message);
            createBreedList(data.message);
        })
        .catch(error => console.log(error))
}
// getBreedList();

function createBreedList(breedList) {
    // console.log(breedList); 
    const options = Object.keys(breedList);
    console.log(options);
    // console.log(options.length); // 95

    for (let i = 0; i < options.length; i++) {
        // console.log(breedOption.innerHTML);

        const option = options[i];
        const optionElement = document.createElement("option");
        optionElement.innerHTML = option;
        optionElement.value = option;
        breedOption.appendChild(optionElement);

        // // another way to create the list
        // console.log(breedOption);
        // breedOption.innerHTML += `<option value="${options[i]}">${options[i]}</option>`;

    }

}

// fetch images 
function fetchImages() {
    // get selected breed value
    breedSelected = breedOption.value;
    fetch(`https://dog.ceo/api/breed/${breedSelected}/images/random`)
        .then(response => response.json())
        .then(function (data) {
            // console.log(data);
            displayImages(data);
        })
        .catch(error => console.log(error))
    imageContainer.innerHTML = "Loading..."
}

// display images
function displayImages(data) {
    if (data.status != "error") {
        // console.log(data);
        let image = data.message;
        console.log(image);
        errorContainer.innerHTML = "";
        imageContainer.innerHTML = `<img src="${image}" class="generated"></img>`;
        generateButton.innerHTML = `Get more <span class="selected-breed">${breedSelected}</span> pics!`

    } else {
        // console.log(data);
        imageContainer.innerHTML = `<img class="default-image" src="./src/dog-face-android8.0.png" alt="Dog Icon"></img>`;
        // imageContainer.insertAdjacentHTML("afterend", "Please choose a breed!");

        // const errorContainer = document.createElement("div");
        // errorContainer.innerHTML = "Please choose a breed!";
        // document.querySelector(".container").appendChild(errorContainer);

        errorContainer.style.display = "block";
        errorContainer.innerHTML = "Please choose a breed!"
        generateButton.innerHTML = "Generate";
    }
}


