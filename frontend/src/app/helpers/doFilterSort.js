export function filterAndSortItems(items, filterOption, sortOption) {
  let filtered = [...items];

  if (filterOption) {
    if (filterOption.type === "category") {
      filtered = filtered.filter(item => item.category === filterOption.value);
    }
    if (filterOption.type === "rarity") {
      filtered = filtered.filter(item => item.rarity === filterOption.value);
    }
    if (filterOption.type === "quick") {
      if (filterOption.value === "under-10") {
        filtered = filtered.filter(item => item.price < 10);
      }
    }
  }

  if (sortOption === "price-low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortOption === "price-high") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortOption === "name-az") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === "name-za") {
    filtered.sort((a, b) => b.name.localeCompare(a.name));
  }

  return filtered;
}
