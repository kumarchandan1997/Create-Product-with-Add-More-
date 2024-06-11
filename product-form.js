document.addEventListener("DOMContentLoaded", function () {
  populateDropDowns();
});

function populateDropDowns() {
  // Example data
  const categories = ["Electronics", "Clothing", "Home Appliances"];
  const subcategories = {
    Electronics: ["Mobile", "Laptops"],
    Clothing: ["Men", "Women"],
    "Home Appliances": ["Kitchen", "Living Room"],
  };
  const brands = ["Samsung", "Apple", "Sony"];

  // Populate categories
  const categorySelect = document.getElementById("category");
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.text = category;
    categorySelect.add(option);
  });

  // Populate subcategories based on selected category
  categorySelect.addEventListener("change", function () {
    const selectedCategory = this.value;
    const subcategorySelect = document.getElementById("subcategory");
    subcategorySelect.innerHTML =
      '<option value="">Select Subcategory</option>'; // Reset options

    if (subcategories[selectedCategory]) {
      subcategories[selectedCategory].forEach((subcategory) => {
        const option = document.createElement("option");
        option.value = subcategory;
        option.text = subcategory;
        subcategorySelect.add(option);
      });
    }
  });

  // Populate brands
  const brandSelect = document.getElementById("brand");
  brands.forEach((brand) => {
    const option = document.createElement("option");
    option.value = brand;
    option.text = brand;
    brandSelect.add(option);
  });
}

document.getElementById("addVariantRow").addEventListener("click", function () {
  const variantType = document.getElementById("variantType").value;
  const variantSection = document.getElementById("variantSection");

  if (variantType === "color") {
    addColorVariantRow(variantSection);
  } else if (variantType === "size") {
    addSizeVariantRow(variantSection);
  }
});

function addColorVariantRow(variantSection) {
  const colorOptions = ["Red", "Green", "Blue"];
  const sizeOptions = ["S", "M", "L", "XL"];

  const variantRow = document.createElement("div");
  variantRow.className = "variant-row form-group";

  // Color select
  const colorSelect = document.createElement("select");
  colorSelect.className = "form-control";
  colorSelect.required = true;
  colorOptions.forEach((color) => {
    const option = document.createElement("option");
    option.value = color;
    option.text = color;
    colorSelect.add(option);
  });

  // Size checkboxes
  const sizeCheckboxContainer = document.createElement("div");
  sizeOptions.forEach((size) => {
    const checkboxLabel = document.createElement("label");
    checkboxLabel.className = "checkbox-inline";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = size;
    checkboxLabel.appendChild(checkbox);
    checkboxLabel.appendChild(document.createTextNode(size));
    sizeCheckboxContainer.appendChild(checkboxLabel);
  });

  // Quantity input
  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.className = "form-control";
  quantityInput.placeholder = "Quantity";
  quantityInput.required = true;

  // Price input
  const priceInput = document.createElement("input");
  priceInput.type = "number";
  priceInput.className = "form-control";
  priceInput.placeholder = "Price";
  priceInput.required = true;

  // Selling price input
  const sellingPriceInput = document.createElement("input");
  sellingPriceInput.type = "number";
  sellingPriceInput.className = "form-control";
  sellingPriceInput.placeholder = "Selling Price";
  sellingPriceInput.required = true;

  // Discount input
  const discountInput = document.createElement("input");
  discountInput.type = "number";
  discountInput.className = "form-control";
  discountInput.placeholder = "Discount";
  discountInput.required = true;

  variantRow.appendChild(colorSelect);
  variantRow.appendChild(sizeCheckboxContainer);
  variantRow.appendChild(quantityInput);
  variantRow.appendChild(priceInput);
  variantRow.appendChild(sellingPriceInput);
  variantRow.appendChild(discountInput);

  variantSection.appendChild(variantRow);
}

function addSizeVariantRow(variantSection) {
  const sizeOptions = ["S", "M", "L", "XL"];

  const variantRow = document.createElement("div");
  variantRow.className = "variant-row form-group";

  // Size select
  const sizeSelect = document.createElement("select");
  sizeSelect.className = "form-control";
  sizeSelect.required = true;
  sizeOptions.forEach((size) => {
    const option = document.createElement("option");
    option.value = size;
    option.text = size;
    sizeSelect.add(option);
  });

  // Quantity input
  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.className = "form-control";
  quantityInput.placeholder = "Quantity";
  quantityInput.required = true;

  // Price input
  const priceInput = document.createElement("input");
  priceInput.type = "number";
  priceInput.className = "form-control";
  priceInput.placeholder = "Price";
  priceInput.required = true;

  // Selling price input
  const sellingPriceInput = document.createElement("input");
  sellingPriceInput.type = "number";
  sellingPriceInput.className = "form-control";
  sellingPriceInput.placeholder = "Selling Price";
  sellingPriceInput.required = true;

  // Discount input
  const discountInput = document.createElement("input");
  discountInput.type = "number";
  discountInput.className = "form-control";
  discountInput.placeholder = "Discount";
  discountInput.required = true;

  variantRow.appendChild(sizeSelect);
  variantRow.appendChild(quantityInput);
  variantRow.appendChild(priceInput);
  variantRow.appendChild(sellingPriceInput);
  variantRow.appendChild(discountInput);

  variantSection.appendChild(variantRow);
}

document
  .getElementById("productForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting the default way

    const productName = document.getElementById("productName").value;
    const category = document.getElementById("category").value;
    const subcategory = document.getElementById("subcategory").value;
    const brand = document.getElementById("brand").value;

    const variants = [];
    const variantRows = document.querySelectorAll(".variant-row");

    variantRows.forEach((row) => {
      const variantType = document.getElementById("variantType").value;
      let variantData = {};

      if (variantType === "color") {
        variantData.color = row.querySelector("select").value;
        variantData.sizes = Array.from(
          row.querySelectorAll('input[type="checkbox"]:checked')
        ).map((checkbox) => checkbox.value);
      } else if (variantType === "size") {
        variantData.size = row.querySelector("select").value;
      }

      variantData.quantity = row.querySelector(
        'input[placeholder="Quantity"]'
      ).value;
      variantData.price = row.querySelector('input[placeholder="Price"]').value;
      variantData.sellingPrice = row.querySelector(
        'input[placeholder="Selling Price"]'
      ).value;
      variantData.discount = row.querySelector(
        'input[placeholder="Discount"]'
      ).value;

      variants.push(variantData);
    });

    const productData = {
      productName,
      category,
      subcategory,
      brand,
      variants,
    };

    console.log("Product Data:", productData);
    // You can now send productData to your server using an AJAX request
  });
