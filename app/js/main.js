

const searchBtn = document.getElementById('search-btn');
const searchResult = document.getElementById('search-result');
const searchResultList = document.getElementById('search-result-list');
const searchForm = document.getElementById('search-form');


searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(searchForm);
  const searchParams = new URLSearchParams();

  searchParams.set('q', formData.get('search'));
  searchParams.set('to', 50);

  const res = await fetch(`/api/search?${searchParams}`);
  if (res.ok) {
    const results = await res.json();
    console.log(results);
    showResults(results.hits);
  }
});

function showResults(data) {
  const list = data.map(item => {
    const { recipe } = item;
    const li = document.createElement("li");
    const a = document.createElement("a");

    const hrefParams = new URLSearchParams();
    hrefParams.set('id', recipe.uri);

    a.setAttribute('href', `/recipe.html?${hrefParams}`);
    const text = document.createTextNode(recipe.label);

    a.appendChild(text);
    li.appendChild(a);
    return li;
  });

  list.forEach(liElement => {
    searchResultList.appendChild(liElement);
  });
}