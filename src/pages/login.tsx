import { Button, Divider, Input } from "@mantine/core";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { FacebookIcon, GoogleIcon } from "../assets";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import NavigationRoute from "../NavigationRoute";
import { useLoginAuth } from "../lib/authLib";

const Login = () => {
  const [showPassword, setshowPassword] = useState(false);

  const { formikLogin, isLoading } = useLoginAuth();

  return (
    <div className="w-full h-full flex flex-row items-center justify-center bg-bg-ligth">
      <Helmet>
        <title>Se connecter' à chat</title>
      </Helmet>
      <div className="bg-bg-dark p-8 py-10 rounded-[10px] w-[max-content] flex flex-col">
        <h1 className="text-white text-[2.2rem] font-[600]">Connectez-vous</h1>
        <p className="text-sm mt-[-2px]">
          Vous n'avez pas de compte ?{" "}
          <Link to={NavigationRoute.REGISTER} className="text-blue-ligth">
            Creer un compte
          </Link>
        </p>
        <form
          action=""
          className="flex flex-col mt-8 mb-2"
          onSubmit={formikLogin.handleSubmit}
        >
          <Input.Wrapper className="w-full my-2">
            <Input
              classNames={{
                input:
                  "bg-input-bg text-white border-input-bg focus:border-blue-ligth text-bas placeholder:text-grey",
              }}
              placeholder="Pseudo"
              {...formikLogin.getFieldProps("pseudo")}
            />
          </Input.Wrapper>
          <Input.Wrapper className="w-full my-2 relative">
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
              rightSectionWidth={40}
              rightSection={<p></p>}
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
              {...formikLogin.getFieldProps("password")}
            />
          </Input.Wrapper>

          <Button
            className="mt-8 mb-2"
            color="#6b8afd"
            classNames={{ label: "font-[500] text-base py-8", root: "py-5" }}
            type="submit"
            loading={isLoading}
          >
            Se connecter
          </Button>
          {/* <Divider
            my="xs"
            label={<p className="text-grey">Ou se connecter avec</p>}
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

export default Login;
