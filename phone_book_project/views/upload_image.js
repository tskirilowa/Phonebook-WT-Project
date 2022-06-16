
const image_input = document.querySelector("#image-input");

image_input.addEventListener("change", function() {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const uploaded_image = reader.result;
    document.querySelector("#display-image").src = window.URL.createObjectURL(this.files[0]);
  });
  reader.readAsDataURL(this.files[0]);
});