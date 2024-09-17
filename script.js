//filter toggle stuff
const toggleButton = document.getElementById('toggleButton');
const filterForm = document.getElementById('filterForm');

//year select stuff
const currentYear = new Date().getFullYear();
const select = document.getElementById('releaseDate');
const selectedTagsContainer = document.getElementById('selectedTags');

//generate years
for (let year = currentYear; year >= currentYear - 200; year--) {
  const option = document.createElement('option');
  option.value = year;
  option.textContent = year;
  select.appendChild(option);
}

//toggle Filter Form
toggleButton.addEventListener('click', function () {
  if (filterForm.classList.contains('hidden')) {
    filterForm.classList.remove('hidden');
    filterForm.classList.add('visible');
    toggleButton.textContent = 'Hide Filters';
  } else {
    filterForm.classList.remove('visible');
    filterForm.classList.add('hidden');
    toggleButton.textContent = 'Show Filters';
  }
});

// Function to create and append a tag for the selected option
function createTag(selectElement, value, text) {
  const tag = document.createElement('div');
  tag.classList.add('badge', 'bg-dark', 'me-2', 'mb-2', 'd-flex', 'align-items-center');
  tag.textContent = text;

  // Create (X) button
  const removeButton = document.createElement('button');
  removeButton.classList.add('btn-close', 'btn-close-white', 'ms-2');
  removeButton.style.fontSize = '0.8rem';
  removeButton.style.lineHeight = 'inherit';

  // Remove the tag and reset the select option when 'X' is clicked
  removeButton.addEventListener('click', function () {
    tag.remove();
    selectElement.value = '';
  });

  tag.appendChild(removeButton);
  selectedTagsContainer.appendChild(tag);
}

// Function to handle filter selection and tag creation
function handleSelectChange(event) {
  const selectElement = event.target;
  const selectedValue = selectElement.value;
  const selectedText = selectElement.options[selectElement.selectedIndex].text;

  // Avoid creating tag for placeholder options (disabled ones)
  if (selectedValue) {
    // Check if a tag for the same filter already exists
    const existingTags = Array.from(selectedTagsContainer.children);
    const existingTag = existingTags.find(tag => tag.textContent.includes(selectedText));

    if (!existingTag) {
      createTag(selectElement, selectedValue, selectedText);
    }
  }
}
// Attach event listeners to select elements
document.getElementById('genre').addEventListener('change', handleSelectChange);
document.getElementById('length').addEventListener('change', handleSelectChange);
document.getElementById('releaseDate').addEventListener('change', handleSelectChange);

//alert function
window.onload = () => {
  // for(let i=0; i<=2; i++){
  //   let forcedTags = ['genre', 'length', 'releaseDate'];
  //   let forcedTagTexts = ['Action', 'less than an hour', '1997'];
  //   let selectElement = document.getElementById(forcedTags[i]);
  //   let selectedValue = selectElement.value;
  //   let selectedText = forcedTagTexts[i];
  //   createTag(selectElement, selectedValue, selectedText);
  // }
  
  //alert('Reminder: set previously selected filters through session.');
}

//validate filters
function validateFilters(event) {
  if($('#selectedTags').is(':empty')) {
    let validationMsg = document.createElement('p');
    validationMsg.classList.add('d-flex', 'text-danger', 'me-1');
    validationMsg.textContent = 'Please select at least one filter.';
    document.getElementById('searchFormContainer').appendChild(validationMsg);
    event.preventDefault();
  }
}
//Attach listener to searchbutton
document.getElementById('searchButton').addEventListener('click', validateFilters);
