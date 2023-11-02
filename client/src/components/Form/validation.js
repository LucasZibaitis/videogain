export function validate(formData) {
  const ratingPattern = /^\d+(\.\d+)?$/;
  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
  const errors = {};
  if (!formData.name) {
    errors.name = "Name is required";
  }
  if (formData.name.length > 255) {
    errors.name = "Name must be 255 characters or less";
  }
  if (!formData.image) {
    errors.image = "Image is required";
  }
  if (!urlPattern.test(formData.image)) {
    errors.image = "Image must be a valid URL";
  }
  if (!formData.description) {
    errors.description = "Description is required";
  }
  if (!formData.released) {
    errors.released = "Release Date is required";
  }
  if (!formData.rating) {
    errors.rating = "Rating is required";
  }
  if (!ratingPattern.test(formData.rating)) {
    errors.rating = "Rating must be a number o decimal";
  }
  if (parseFloat(formData.rating) > 5) {
    errors.rating = "Rating must be less than or equal to 5";
  }
  return errors;
}

export function validatePlatforms(selectedPlatforms) {
  const errors = {};
  if (selectedPlatforms.length === 0 || !selectedPlatforms) {
    errors.platforms = "At least one platform is required";
  }
  return errors;
}
