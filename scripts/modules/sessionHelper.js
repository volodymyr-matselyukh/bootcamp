const SelectedCategoryIdKey = "selectedCategoryIdKey";

let setCurrentCategory = (categoryId) => {
    sessionStorage.setItem(SelectedCategoryIdKey, categoryId);
}

let getCurrentCategory = () => {
    let currentCategory = sessionStorage.getItem(SelectedCategoryIdKey);
    return Number.parseInt(currentCategory);
}

export { setCurrentCategory, getCurrentCategory }