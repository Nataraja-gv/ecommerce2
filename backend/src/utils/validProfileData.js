const validateProfileData = (req) => {
  const AllowedEditProfileData = ["name", "photo_url", "address"];

  const allowed_field = Object.keys(req.body).every((field) =>
    AllowedEditProfileData.includes(field)
  );

  return allowed_field;
};

module.exports = validateProfileData;
