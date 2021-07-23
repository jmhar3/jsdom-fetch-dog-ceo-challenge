document.addEventListener('DOMContentLoaded', () => {
    fetchImages();
    fetchBreeds();
})

  function fetchImages() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    fetch(imgUrl)
      .then (resp => resp.json())
      .then (results => {
        results.message.forEach(image => addImage(image))
      });
  }

  function addImage(image) {
    let container = document.querySelector('#dog-image-container');
    let img = document.createElement('img');
    img.src = image;
    container.appendChild(img);
  }

  function fetchBreeds() {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    fetch(breedUrl)
      .then(resp => resp.json())
      .then(results => {
  
        breeds = Object.keys(results.message);
        updateBreedList(breeds);
        addBreedSelect();
      });
  }
  
  function updateBreedList(breeds) {
    let breedList = document.querySelector('#dog-breeds');
    removeChildren(breedList);
    breeds.forEach(breed => addBreed(breed));
  }
  
  function removeChildren(element) {
    let child = element.lastElementChild;
    while (child) {
      element.removeChild(child);
      child = element.lastElementChild;
    }
  }
  
  function breedsStartingWith(letter) {
    updateBreedList(breeds.filter(breed => breed.startsWith(letter)));
  }
  
  function addBreedSelect() {
    let breedDropdown = document.querySelector('#breed-dropdown');
    breedDropdown.addEventListener('change', function (event) {
      breedsStartingWith(event.target.value);
    });
  }
  
  function addBreed(breed) {
    let breedList = document.querySelector('#dog-breeds');
    let list = document.createElement('li');
    list.innerText = breed;
    breedList.appendChild(list);
    list.addEventListener('click', updateColor);
  }
  
  function updateColor(event) {
    event.target.style.color = 'pink';
  }