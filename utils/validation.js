import * as Yup from "yup";

export const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(3, "Minimum character should be 3")
    .required("Name is required!"),
  email: Yup.string()
    .email("Invaid email!")
    .trim()
    .required("Email is required!"),
  password: Yup.string()
    .trim()
    .min(8, "Password is too short - should be 8 chars minimum.")
    // .matches(
    //   /^^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    //   "password should Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
    // )
    .required("Passowrd is required!"),
  confirmPassword: Yup.string()
    .required("Please retype your password.")
    .oneOf([Yup.ref("password")], "Your passwords do not match."),
});
