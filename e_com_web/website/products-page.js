document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector("#all-products"),
    search = document.querySelector("#product-search"),
    category = document.querySelector("#category-filter"),
    sort = document.querySelector("#sort-filter"),
    count = document.querySelector("#results-count"),
    empty = document.querySelector("#no-results");
  CATEGORIES.forEach((c) => {
    const option = document.createElement("option");
    option.value = c.name;
    option.textContent = c.name;
    category.appendChild(option);
  });
  const params = new URLSearchParams(location.search);
  if (CATEGORIES.some((c) => c.name === params.get("category")))
    category.value = params.get("category");
  function render() {
    let list = [...PRODUCTS];
    const q = search.value.trim().toLowerCase();
    if (q)
      list = list.filter((p) =>
        (p.name + " " + p.category + " " + p.description)
          .toLowerCase()
          .includes(q),
      );
    if (category.value !== "All")
      list = list.filter((p) => p.category === category.value);
    if (sort.value === "low-high") list.sort((a, b) => a.price - b.price);
    if (sort.value === "high-low") list.sort((a, b) => b.price - a.price);
    if (sort.value === "rating") list.sort((a, b) => b.rating - a.rating);
    grid.innerHTML = list.map(productCard).join("");
    count.textContent = `${list.length} product${list.length === 1 ? "" : "s"}`;
    empty.classList.toggle("hidden", list.length !== 0);
    grid.classList.toggle("hidden", list.length === 0);
  }
  [search, category, sort].forEach((el) =>
    el.addEventListener(el === search ? "input" : "change", render),
  );
  document.querySelector("#reset-filters").addEventListener("click", () => {
    search.value = "";
    category.value = "All";
    sort.value = "featured";
    render();
  });
  render();
});
