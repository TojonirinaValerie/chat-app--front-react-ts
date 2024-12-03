import * as Yup from "yup";

export const passwordErrorMessage = {
  minMessage: "Au moins 8 caractères",
  minisculeMessage:
    "Le mot de passe doit contenir au moins une lettre minuscule",
  majusculeMessage:
    "Le mot de passe doit contenir au moins une lettre majuscule",
  numberMessage: "Le mot de passe doit contenir au moins un chiffre",
};

export const firstnameValidationSchema = Yup.string()
  .required("Nom obligatoire")
  .matches(/^[ A-Za-zÀ-ÖØ-öø-ÿ]+$/, "Le nom ne doit contenir que des lettres");

export const lastnameValidationSchema = Yup.string()
  .required("Prénom obligatoire")
  .matches(
    /^[ A-Za-zÀ-ÖØ-öø-ÿ]+$/,
    "Ce prénom ne doit contenir que des lettres"
  );

export const pseudoValidationSchema = Yup.string()
  .required("Pseudo obligatoire")
  .min(4, "Au moins 4 caractères");

export const passwordValidationSchema = Yup.string()
  .required("Mot de passe obligatoire")
  .min(8, passwordErrorMessage.minMessage)
  .matches(/[a-z]/, passwordErrorMessage.minisculeMessage)
  .matches(/[A-Z]/, passwordErrorMessage.majusculeMessage)
  .matches(/[0-9]/, passwordErrorMessage.numberMessage);
export const confirmPasswordSchema = Yup.string()
  .oneOf(
    [Yup.ref("password")],
    "Les mots de passe doivent correspondre au mot de passe"
  )
  .required("La confirmation du mot de passe est requise");

export const registerValidationSchema = Yup.object({
  firstName: firstnameValidationSchema,
  lastName: lastnameValidationSchema,
  pseudo: pseudoValidationSchema,
  password: passwordValidationSchema,
  confirmPassword: confirmPasswordSchema,
  agreeToTerms: Yup.boolean()
    .oneOf([true], "Vous devez accepter les termes et conditions")
    .required(),
});
