const errorHandler = (err) => {
  console.log(err.message);
  const errors = {
    // firstname:'',
    // lastname: '',
    // username: '',
    // phone: '',
    // email: '',
    // password: ''
  };
  if (err.message === "incorrect email") {
    errors.email = err.message;
  }

  if (err.message === "incorrect password") {
    errors.password = err.message;
  }

  if (err.code === 11000) {
    // console.log(err.code)
    console.log(err.keyValue);
    if (err.keyValue.email) {
      errors.email = "email is already exists";
    }
    if (err.keyValue.username) {
      errors.username = "username is already exists";
    }
    if (err.keyValue.phone) {
      errors.phone = "phone numer is already exists";
    }
  }

  if (err.message.includes("blog validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }


  return errors;
};

module.exports = errorHandler;
