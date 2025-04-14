
import {
    Card,
    CardBody,
    CardHeader,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import Product_hero from"../../public/assets/Product_page_Hero.png"
import { Github } from "lucide-react";
import { Link } from "react-router-dom";

export default function LoginPage() {
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
                        <Button variant="outlined" className="flex items-center gap-3 justify-center">
                            <Github className="w-5 h-5" /> Sign in with Github
                        </Button>
                        <Button variant="outlined" className="flex items-center gap-3 justify-center">
                            <Github className="w-5 h-5" /> Sign in with Google
                        </Button>
                    </div>

                    <div className="flex items-center my-6">
                        <div className="h-px flex-1 bg-gray-300" />
                        <Typography className="mx-3 text-gray-400 text-sm">OR</Typography>
                        <div className="h-px flex-1 bg-gray-300" />
                    </div>

                    <form className="flex flex-col gap-4">
                        <Input label="Email Address" crossOrigin={"anonymous"} type="email" size="lg" required />
                        <Button fullWidth>SIGN IN/UP</Button>
                    </form>

                    <Typography className="mt-4 text-sm text-center text-gray-600">
                        Vous n'avez pas de compte ? <Link to="/register" className="text-blue-500 hover:underline">Créer un compte</Link>
                    </Typography>
                </div>
            </div>

            {/* Right side */}
            <div  style={{
                backgroundImage: `url(${Product_hero})`, // Corrected URL
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover", // or 'contain' if you prefer the image to be fully visible
                backgroundPosition: "center",
            }} className="hidden md:flex w-1/2 items-center justify-center p-8">

            </div>
        </div>
    );
}
