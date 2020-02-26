const header = document.getElementsByTagName('header')[0];
const main = document.getElementsByTagName('main')[0];
const headerH1 = document.querySelector('header h1');


async function fetchRecipe() {
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  
  const reqParams = new URLSearchParams();
  reqParams.set('r', id);

  const res = await fetch(`/api/search?${reqParams}`);
  console.log(res);
  if (res.ok) {
    const data = await res.json();
    console.log(data);
    if (data && data.length > 0) {
      render(data[0]);
    }
  }
};

function createImg(image) {
  const img = document.createElement('img');
  img.setAttribute('src', image);
  return img;
}

function createIngredientLines(list) {
  const ul = document.createElement('ul');
  list.map(item => {
    const li = document.createElement('li');
    li.innerText = item;
    return li;
  }).forEach(elem => {
    ul.appendChild(elem);
  });
  return ul;
}

function render(recipe) {
  const {
    label,
    image,
    healthLabels,
    ingredientLines,
    calories,
    totalWeight,
  } = recipe;
  const h1 = document.createElement('h1');
  const text = document.createTextNode(label);
  h1.appendChild(text);

  if (header) {
    header.replaceChild(h1, headerH1);
  }

  if (main) {
    main.appendChild(createImg(image));
    main.appendChild(createIngredientLines(ingredientLines));
  }
}

fetchRecipe();