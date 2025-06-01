import { useState } from "react";
import { useNavigate } from "react-router-dom";

import UserService from "../services/User.service";
import { UserCreate } from "../models/User.model";

const Register = () => {
  const [form, setForm] = useState<Partial<UserCreate>>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: "user",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!/\S+@\S+\.\S+/.test(form.email || ""))
      newErrors.email = "Adresse email invalide.";
    if ((form.password || "").length < 6)
      newErrors.password = "Le mot de passe doit faire au moins 6 caractères.";
    if ((form.phone || "").length < 8)
      newErrors.phone = "Numéro de téléphone invalide.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await UserService.register(form as UserCreate);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-[#f8f5f1] flex items-center justify-center py-12 pt-[15%]">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-sm p-10 w-full max-w-[90%] space-y-6 border border-gray-200"
      >
        <h2 className="text-3xl font-serif font-semibold text-gray-800 text-center">
          Créer un compte
        </h2>
        <div className="flex flex-col lg:flex-row lg:flex-wrap lg:justify-between lg:items-start">
          {[
            "firstName",
            "lastName",
            "email",
            "phone",
            "password",
            "address",
          ].map((field) => (
            <div className=" lg:w-[45%] m-2 " key={field}>
              <label
                htmlFor={field}
                className="block text-gray-700 font-medium mb-1 capitalize "
              >
                {field}
              </label>
              <input
                id={field}
                name={field}
                type={field === "password" ? "password" : "text"}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={(form as any)[field] || ""}
                onChange={handleChange}
                required
                className="w-full bg-white text-gray-800 border border-gray-200 rounded-xl px-4 py-2 f shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
              {errors[field] && (
                <p className="text-red-600 text-sm mt-1">{errors[field]}</p>
              )}
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded-xl hover:bg-gray-800 transition "
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
