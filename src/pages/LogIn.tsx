
import {
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import { GoogleLogin } from '@react-oauth/google';

import Product_hero from"../../public/assets/Product_page_Hero.png"

import { Link } from "react-router-dom";
import {EyeIcon, EyeSlashIcon} from "@heroicons/react/24/solid";
import {useState} from "react";


export default function LoginPage() {
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

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

                    <div className="flex flex-col gap-4">
                        {/*<Button*/}
                        {/*    variant="outlined"*/}
                        {/*    size="lg"*/}
                        {/*    className="mt-6 flex h-12 items-center justify-center gap-2"*/}
                        {/*    fullWidth*/}
                        {/*>*/}
                        {/*  */}
                        {/*    <img*/}
                        {/*        src={`https://www.material-tailwind.com/logos/logo-google.png`}*/}
                        {/*        alt="google"*/}
                        {/*        className="h-6 w-6"*/}
                        {/*    />{" "}*/}
                        {/*    sign in with google*/}
                        {/*</Button>*/}
                        <GoogleLogin
                            onSuccess={(credentialResponse) => {
                                console.log(credentialResponse);
                            }}
                            onError={() => {
                                console.log('Erreur lors de la connexion');
                            }}
                        />
                        <Button
                            variant="outlined"
                            size="lg"
                            className="flex h-12 items-center justify-center gap-2"
                            fullWidth
                        >
                            <img
                                src={`https://www.material-tailwind.com/logos/logo-facebook.png`}
                                alt="facebook"
                                className="h-6 w-6"
                            />{" "}
                            sign in with facebook
                        </Button>
                    </div>

                    <div className="flex items-center my-6">
                        <div className="h-px flex-1 bg-gray-300" />
                        <Typography className="mx-3 text-gray-400 text-sm">OR</Typography>
                        <div className="h-px flex-1 bg-gray-300" />
                    </div>

                    <form className="flex flex-col gap-4">
                        <Input label="Email Address" crossOrigin={"anonymous"} type="email" size="lg" required />
                        <Input
                            required
                            size="lg"
                            label="Password"
                            className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                            type={passwordShown ? "text" : "password"}
                            crossOrigin={""}
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
                        <Button fullWidth>SIGN IN/UP</Button>
                    </form>

                    <Typography className="mt-4 text-sm text-center text-gray-600">
                        Vous n'avez pas de compte ? <Link to="/SignUp" className="text-blue-500 hover:underline">Créer un compte</Link>
                    </Typography>
                </div>
            </div>

            {/* Right side */}
            <div  style={{
                backgroundImage: `url(${Product_hero})`, // Corrected URL
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover", // or 'contain' if you prefer the image to be fully visible
                backgroundPosition: "center",
            }} className="hidden md:flex w-1/2 items-center justify-center p-8 rounded-l-3xl">

            </div>
        </div>
    );
}
