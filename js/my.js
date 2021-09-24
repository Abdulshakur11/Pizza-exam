
/*=============================== Arrays =======================================*/
var thicknessBreadArr = ["Yupqa", "O`rta", "Qalin"]; // Option items for select tag (thickness of Bread)
var sizeBreadArr = ["25sm", "30sm", "35sm"]; // Size of bread (radios)
var productsToTopArr = ["Pomidor", "Tuzlangan bodring", "Kurka go'shti", "Qo'ziqorin", "Zaytun", "Qazi"]; // Checkboxes
var addedProductsToTopArr = []; // Array for checked to top products
var addsArr = ["Achchiq", "Sosiskali"]; // Checkboxes for additional products
var addedAddsArr = []; // Array for checked additional products

/* =========================== HTML Elements ===================================*/
/* Input elements */
var elForm = document.querySelector('.js-form'); // Form
var elSelectBreadThickness = elForm.querySelector('.js-select'); // Select tag for selecting thickness of bread
var elRadiosBox = elForm.querySelector('.js-radios'); // Div box for radios for selecting size of bread
var elCheckboxesBoxOnTop = elForm.querySelector('.js-checkboxes'); // Div box for checkboxes for checking on top products
var elCheckboxesBoxAdds = elForm.querySelector('.js-checkboxes-adds'); // Div box for checkboxes for checking additional products


/* Output elements */
var elOutputBreadThickness = document.querySelector('.js-bread-type'); // span for output thickness of bread
var elOutputBreadSize = document.querySelector('.js-bread-size'); // span for output size of bread
var elOutputTopProducts = document.querySelector('.js-top-list'); // ul for output list of top products
var elOutputTopAddsProducts = document.querySelector('.js-adds-list'); // ul for output list of additional products

elOutputBreadThickness.textContent = thicknessBreadArr[0]; // Set Default Bread thickness

/* Generate option tags for select tag (Bread Thickness) */
for (let i = 0; i < thicknessBreadArr.length; i++) {
  var newOptionItem = document.createElement('option'); // Create option tag
  newOptionItem.value = newOptionItem.textContent = thicknessBreadArr[i]; // Generate value and text content for new option tag
  newOptionItem.selected = (i === 0) ? true : false; // Make selected first element

  elSelectBreadThickness.append(newOptionItem); // Add option tag to select tag
}

/* Generate radios for choosing size of bread */
for (let i = 0; i < sizeBreadArr.length; i++) {
  var wrapperDiv = document.createElement('div'); // Create div for wrapping input and label tags
  wrapperDiv.classList.add('form-check'); // add bootstrap class to div

  var radioItem = document.createElement('input'); // Create input tag
  radioItem.classList.add('btn-check'); // add bootstrap class to input
  radioItem.type = 'radio'; // set type of input
  radioItem.name = 'Bread-size'; // set name to input
  radioItem.id = `radio-${i}`; // set id to input
  radioItem.value = sizeBreadArr[i]; // set value to input

  if (i === 0) {
    wrapperDiv.classList.add('p-0'); // add bootstrap class to first div for removing left padding
    radioItem.checked = true; // For set "checked" attribute to first radio
  }

  var newLabel = document.createElement('label'); // Create label tag
  newLabel.classList.add('btn', 'btn-outline-dark', 'rounded-pill'); // add bootstrap classes to label
  newLabel.setAttribute('for', `radio-${i}`); // Set attribute "for" to label
  newLabel.textContent = sizeBreadArr[i]; // set text content to label

  wrapperDiv.append(radioItem); // Add input 
  wrapperDiv.append(newLabel); // and label tags to div tag

  elRadiosBox.append(wrapperDiv); // add wrapper div to parent div

  radioItem.addEventListener('change', function () {
    elOutputBreadSize.textContent = this.value;
  });
}

/* Generate checkboxes for choosing on-top products */
for (let i = 0; i < productsToTopArr.length; i++) {
  var wrapperDiv = document.createElement('div'); // Create div for wrapping input and label tags
  wrapperDiv.classList.add('form-check', 'col-6'); // add bootstrap classes to wrapper div

  var checkItem = document.createElement('input'); // Create input tag
  checkItem.classList.add('form-check-input'); // add bootstrap class to input
  checkItem.type = 'checkbox'; // set type of input
  checkItem.name = productsToTopArr[i]; // set name to input
  checkItem.id = `check-top-${i}`; // set id to input
  checkItem.value = productsToTopArr[i]; // set value to input

  var newLabel = document.createElement('label'); // Create label tag
  newLabel.classList.add('form-check-label'); // add bootstrap classes to label
  newLabel.setAttribute('for', `check-top-${i}`); // Set attribute "for" to label
  newLabel.textContent = productsToTopArr[i]; // set text content to label

  wrapperDiv.append(checkItem); // Add input
  wrapperDiv.append(newLabel); // and label tags to div tag

  elCheckboxesBoxOnTop.append(wrapperDiv); // add wrapper div to parent div

  checkItem.addEventListener('change', function () {
    var currentValue = this.value; // Read value of changed checkbox
    var index = addedProductsToTopArr.indexOf(currentValue); // Check output array for top product for including checked product. If includes read its index
    if (index > -1) {
      addedProductsToTopArr.splice(index, 1); // If includes remove this element
    }
    else {
      addedProductsToTopArr.push(currentValue); // if doesn't include, add new element
    }
    refreshAddedTopProducts(); // refresh output list to top products
  });
}

/* Generate checkboxes for choosing additional products */
for (let i = 0; i < addsArr.length; i++) {
  var wrapperDiv = document.createElement('div'); // Create div for wrapping input and label tags
  wrapperDiv.classList.add('form-check', 'col-6'); // add bootstrap classes to wrapper div

  var checkItem = document.createElement('input'); // Create input tag
  checkItem.classList.add('form-check-input'); // add bootstrap class to input
  checkItem.type = 'checkbox'; // set type of input
  checkItem.name = addsArr[i]; // set name to input
  checkItem.id = `check-adds-${i}`; // set id to input
  checkItem.value = addsArr[i]; // set value to input

  var newLabel = document.createElement('label'); // Create label tag
  newLabel.classList.add('form-check-label'); // add bootstrap classes to label
  newLabel.setAttribute('for', `check-adds-${i}`); // Set attribute "for" to label
  newLabel.textContent = addsArr[i]; // set text content to label

  wrapperDiv.append(checkItem); // Add input
  wrapperDiv.append(newLabel); // and label tags to div tag

  elCheckboxesBoxAdds.append(wrapperDiv); // add wrapper div to parent div

  checkItem.addEventListener('change', function () {
    var currentValue = this.value; // Read value of changed checkbox
    var index = addedAddsArr.indexOf(currentValue); // Check output array for adds product for including checked product. If includes read its index
    if (index > -1) {
      addedAddsArr.splice(index, 1); // If includes remove this element
    }
    else {
      addedAddsArr.push(currentValue); // if doesn't include, add new element
    }
    refreshAddedAddsProducts(); // refresh output list of additional products
  });
}

/* Function for select element */
elSelectBreadThickness.addEventListener('change', function () {
  elOutputBreadThickness.textContent = this.value;
});

/* Refresh function for to top products output list */
var refreshAddedTopProducts = function () {
  elOutputTopProducts.innerHTML = ''; // Clear content of ul tag
  for (var i = 0; i < addedProductsToTopArr.length; i++) {
    var itemLi = document.createElement('li'); // Create new li tag
    itemLi.textContent = `- ${addedProductsToTopArr[i]}`; // Set text content to li tag
    elOutputTopProducts.append(itemLi); // Add li tag to ul tag
  }
}

/* Refresh function for additional products output list */
var refreshAddedAddsProducts = function () {
  elOutputTopAddsProducts.innerHTML = ''; // Clear content of ul tag
  for (var i = 0; i < addedAddsArr.length; i++) {
    var itemLi = document.createElement('li'); // Create new li tag
    itemLi.textContent = `- ${addedAddsArr[i]}`; // Set text content to li tag
    elOutputTopAddsProducts.append(itemLi); // Add li tag to ul tag
  }
}



