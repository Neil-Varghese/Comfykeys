//from boot strap copy pasted the valid - invalid success failure message  javascript code
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        // Add bootstrap validation classes to the form
        form.classList.add('was-validated')
      }, false)
    })
  })()



document.addEventListener("DOMContentLoaded", function () {   // Save search value before form submission
  const searchInput = document.querySelector(".search-inp");

  // Restore previous search value from localStorage
  if (localStorage.getItem("searchValue")) {
      searchInput.value = localStorage.getItem("searchValue");
  }

  // Save search value before form submission
  searchInput.form.addEventListener("submit", function () {
      localStorage.setItem("searchValue", searchInput.value);
  });
});




//NEW PAGE ----------------------------------------------------------------------------------------------------------


const dropdownButton = document.getElementById("categoriesDropdown"); // Dropdown button
        const checkboxes = document.querySelectorAll(".category-checkbox");     // Checkboxes for the categories
        const hiddenInputsContainer = document.getElementById("hidden-inputs-container");       // Hidden inputs container
    
        checkboxes.forEach(checkbox => {                         // For each checkbox
            checkbox.addEventListener("change", () => {         // Event listener for the change
                const { value, checked } = checkbox;            // Value and checked status of the checkbox
    
                if (checked) {                                               // If the checkbox is checked
                    const hiddenInput = document.createElement("input");    // Create a hidden input
                    hiddenInput.type = "hidden";                              // Set the type of the input
                    hiddenInput.name = "listing[categories][]";
                    hiddenInput.value = value;
                    hiddenInput.dataset.value = value;
                    hiddenInputsContainer.appendChild(hiddenInput);
                } else {                                          // If the checkbox is unchecked
                    const hiddenInputToRemove = hiddenInputsContainer.querySelector(`input[data-value="${value}"]`); // Find the hidden input to remove
                    if (hiddenInputToRemove) {                  // If the hidden input exists
                        hiddenInputToRemove.remove();
                    }
                }
    
                updateSelectedCategories();                    // Update the selected categories
            });
        });
    
        function updateSelectedCategories() {                  // Function to update the selected categories
            const selected = Array.from(checkboxes)            // Array of selected checkboxes
                .filter(checkbox => checkbox.checked)          // Filter the checkboxes that are checked
                .map(checkbox => checkbox.value);
    
            if (selected.length > 0) {                         // If there are selected categories
                dropdownButton.textContent = `${selected.length} Selected`;   // Display the number of selected categories
                dropdownButton.title = selected.join(", ");
                dropdownButton.classList.remove("is-invalid");
                dropdownButton.classList.add("is-valid");
            } else {                                           // If there are no selected categories
                dropdownButton.textContent = "Select categories";
                dropdownButton.title = "";
                dropdownButton.classList.remove("is-invalid");
                dropdownButton.classList.add("is-valid");
            }
        }
    
        // Prevent dropdown from closing when clicking inside
        const dropdownMenu = document.querySelector(".dropdown-menu");
        dropdownMenu.addEventListener("click", (event) => {
            event.stopPropagation();
        });
    
        // Update selected categories when the dropdown is hidden
        document.addEventListener("DOMContentLoaded", function () {
            const fileInput = document.getElementById("image");
            const allowedExtensions = ["png", "jpg", "jpeg"];
    
            // Validate the file input
            fileInput.addEventListener("change", function () {
                const file = fileInput.files[0];                                      // Get the file
    
                if (file) {                                                           // If the file exists
                    const fileName = file.name.toLowerCase();
                    const fileExtension = fileName.split('.').pop();
    
                    if (allowedExtensions.includes(fileExtension)) {                    // If the file extension is allowed
                        fileInput.classList.remove("is-invalid");
                        fileInput.classList.add("is-valid");
                    } else {                                                            // If the file extension is not allowed
                        fileInput.classList.remove("is-valid");
                        fileInput.classList.add("is-invalid");
                        alert("Invalid file type. Only PNG, JPG, or JPEG files are allowed.");
                        fileInput.value = ""; // Reset the file input
                    } 
                } else {                                                                 // If the file does not exist
                    fileInput.classList.remove("is-valid");
                    fileInput.classList.add("is-invalid");
                }
            });
        });


