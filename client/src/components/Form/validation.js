export default function validate(formData, selectedPlatforms) {
  const ratingPattern = /^\d+(\.\d+)?$/;
  const urlPattern = /^https?:\/\/\S+$/;
  const errors = {};
  if (!formData.name) {
    errors.name = "Name is required";
  }
  if (!formData.background_image) {
    errors.background_image = "Image is required";
  }
  if (!urlPattern.test(formData.background_image)) {
    errors.background_image = "Image must be a valid URL";
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
  if (!selectedPlatforms || selectedPlatforms.length === 0) {
    errors.platforms = "At least one platform is required";
  } else {
    errors.platforms = "";
  }
  return errors;
}
