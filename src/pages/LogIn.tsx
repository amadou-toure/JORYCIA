import { Input, Button, Typography } from "@material-tailwind/react";
//import { GoogleLogin } from "@react-oauth/google";

import Product_hero from "../../public/assets/Product_page_Hero.png";

import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { loginModel } from "../models/User.model";
import { useUser } from "../contexts/user.context";
import { ErrorToast } from "../contexts/Toast";

export default function LoginPage() {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);
  const { login, user, isLoading } = useUser();
  const handleLogin = async () => {
    try {
      await login(form);
    } catch (error: any) {
      if (error.response?.status === 404) {
        ErrorToast("Utilisateur n'existe pas");
      } else {
        ErrorToast("Mot de passe incorrect");
      }
    }
  };
  useEffect(() => {
    user?.role === "admin"
      ? navigate("/admin")
      : user?.role == "user"
      ? navigate("/")
      : null;
  }, [isLoading]);
  const [form, setForm] = useState<loginModel>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen">
      {/* Left side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6">
        <div className="w-full max-w-md">
          <Typography variant="h4" color="blue-gray" className="mb-1">
            Sign In/Up
          </Typography>
          <Typography color="gray" className="mb-4">
            Enter your email address to get started
          </Typography>

          <form className="flex flex-col gap-4">
            <Input
              label="Email Address"
              crossOrigin={"anonymous"}
              type="email"
              size="lg"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <Input
              required
              size="lg"
              label="Password"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              type={passwordShown ? "text" : "password"}
              crossOrigin={""}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              icon={
                <i onClick={togglePasswordVisiblity}>
                  {passwordShown ? (
                    <EyeIcon className="h-5 w-5" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5" />
                  )}
                </i>
              }
            />
            <Button
              onClick={handleLogin}
              fullWidth
              loading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "SIGN IN/UP"}
            </Button>
          </form>

          <Typography className="mt-4 text-sm text-center text-gray-600">
            Vous n'avez pas de compte ?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Créer un compte
            </Link>
          </Typography>
        </div>
      </div>

      {/* Right side */}
      <div
        style={{
          backgroundImage: `url(${Product_hero})`, // Corrected URL
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover", // or 'contain' if you prefer the image to be fully visible
          backgroundPosition: "center",
        }}
        className="hidden md:flex w-1/2 items-center justify-center p-8 rounded-l-3xl"
      ></div>
    </div>
  );
}
