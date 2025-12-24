import { Button, Checkbox, Divider, Input } from "@mantine/core";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { FacebookIcon, GoogleIcon } from "../assets";
import { Link } from "react-router-dom";
import NavigationRoute from "../NavigationRoute";
import { useRegisterForm } from "../lib/authLib";

const Register = () => {
  const [showPassword, setshowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { formik, isLoading } = useRegisterForm();

  return (
    <div className="w-full h-full flex flex-row items-center justify-center bg-bg-ligth">
      <Helmet>
        <title>S'inscrire' à chat</title>
      </Helmet>
      <div className="bg-bg-dark p-6 py-10 rounded-[10px] w-[max-content] flex flex-col">
        <h1 className="text-white text-[2.2rem] font-[600]">Créer un compte</h1>
        <p className="text-sm mt-[-2px]">
          Vous avez déjà un compte ?{" "}
          <Link to={NavigationRoute.LOGIN} className="text-blue-ligth">
            Se connecter
          </Link>
        </p>
        <form
          action=""
          className="flex flex-col mt-8 mb-2"
          onSubmit={formik.handleSubmit}
        >
          <div className="flex flex-row my-2">
            <Input.Wrapper
              className="w-1/2 mr-2"
              error={formik.touched.firstName && formik.errors.firstName}
            >
              <Input
                classNames={{
                  input:
                    "bg-input-bg text-white border-input-bg focus:border-blue-ligth text-bas placeholder:text-grey",
                }}
                placeholder="Nom"
                {...formik.getFieldProps("firstName")}
              />
            </Input.Wrapper>
            <Input.Wrapper
              className="w-1/2 ml-2"
              error={formik.touched.lastName && formik.errors.lastName}
            >
              <Input
                classNames={{
                  input:
                    "bg-input-bg text-white border-input-bg focus:border-blue-ligth text-bas placeholder:text-grey",
                }}
                placeholder="Prenom"
                {...formik.getFieldProps("lastName")}
              />
            </Input.Wrapper>
          </div>
          <Input.Wrapper
            className="w-full my-2"
            error={formik.touched.pseudo && formik.errors.pseudo}
          >
            <Input
              classNames={{
                input:
                  "bg-input-bg text-white border-input-bg focus:border-blue-ligth text-bas placeholder:text-grey",
              }}
              placeholder="Pseudo"
              {...formik.getFieldProps("pseudo")}
            />
          </Input.Wrapper>
          <Input.Wrapper
            className="w-full my-2 relative"
            error={formik.touched.password && formik.errors.password}
          >
            <div
              className="absolute buttom-0 cursor-pointer z-50 right-0 text-grey mt-[10px] mr-2"
              onClick={() => setshowPassword(!showPassword)}
            >
              {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </div>
            <Input
              classNames={{
                input:
                  "bg-input-bg text-white border-input-bg focus:border-blue-ligth text-bas placeholder:text-grey",
              }}
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
              {...formik.getFieldProps("password")}
            />
          </Input.Wrapper>
          <Input.Wrapper
            className="w-full my-2 relative"
            error={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          >
            <div
              className="absolute buttom-0 cursor-pointer z-50 right-0 text-grey mt-[10px] mr-2"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </div>
            <Input
              classNames={{
                input:
                  "bg-input-bg text-white border-input-bg focus:border-blue-ligth text-bas placeholder:text-grey",
              }}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Mot de passe"
              {...formik.getFieldProps("confirmPassword")}
            />
          </Input.Wrapper>
          <div className="my-2">
            <Checkbox
              size="sm"
              label={
                <p>
                  j'accepte les{" "}
                  <span className="text-blue-ligth">termes et conditions</span>
                </p>
              }
              name="agreeToTerms"
              checked={formik.values.agreeToTerms}
              onChange={(event) =>
                formik.setFieldValue(
                  "agreeToTerms",
                  event.currentTarget.checked
                )
              }
              onBlur={formik.handleBlur}
              error={formik.touched.agreeToTerms && formik.errors.agreeToTerms}
            />
          </div>
          <Button
            type="submit"
            className="mt-8 mb-2"
            color="#6b8afd"
            classNames={{ label: "font-[500] text-base py-8", root: "py-5" }}
            disabled={!formik.isValid}
            loading={isLoading}
          >
            S'inscrire
          </Button>
          {/* <Divider
            my="xs"
            label={<p className="text-grey">Ou s'inscrire avec</p>}
            labelPosition="center"
            color="#a9aeba"
          />
          <div className="flex flex-row w-full mt-2">
            <Button className="w-1/2 mr-2" variant="outline" color="#a9aeba">
              <img src={GoogleIcon} className="w-[20px] mr-2" />
              <span className="font-[500] text-white">Google</span>
            </Button>
            <Button className="w-1/2 ml-2" variant="outline" color="#a9aeba">
              <img src={FacebookIcon} className="w-[20px] mr-2" />
              <span className="font-[500] text-white">Facebook</span>
            </Button>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default Register;
