const validate = require("validator");

const ValidationSignUp = (req) => {
  const { name, email, password, address } = req.body;
  if (!name || !email || !password || !address) {
    throw new Error("All fields are required!!!");
  }

  if(!validate.isEmail(email)){
    throw new Error("Email inValid!!!")
  }

  if (!validate.isStrongPassword(password)){
    throw new Error("password should be strong!!!!")
  }
};


module.exports=ValidationSignUp;
