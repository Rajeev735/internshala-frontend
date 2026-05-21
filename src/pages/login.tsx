import { useState } from "react";

import {
  useNavigate,
} from "react-router-dom";

import { loginUser } from "../services/auth.service";

import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [loading, setLoading] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  // HANDLE CHANGE
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // HANDLE SUBMIT
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      setErrorMessage("");

      const response =
        await loginUser(formData);

      // SAVE TOKEN
      login(
  response.data.token,
  response.data.user
);

      // REDIRECT
      navigate("/");
    } catch (error: any) {
      setErrorMessage(
        error.response?.data
          ?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gray-100
        px-4
      "
    >
      <div
        className="
          w-full
          max-w-md
          bg-white
          p-8
          rounded-2xl
          shadow-lg
        "
      >
        {/* HEADER */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold">
            Smart CRM
          </h1>

          <p className="text-gray-500 mt-2">
            Login to continue
          </p>
        </div>

        {/* ERROR */}
        {errorMessage && (
          <div
            className="
              bg-red-100
              text-red-600
              p-3
              rounded-lg
              mb-4
            "
          >
            {errorMessage}
          </div>
        )}

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* EMAIL */}
          <div>
            <label
              htmlFor="email"
              className="
                block
                mb-2
                font-medium
              "
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              className="
                w-full
                border
                p-3
                rounded-lg
                outline-none
                focus:ring-2
                focus:ring-black
              "
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label
              htmlFor="password"
              className="
                block
                mb-2
                font-medium
              "
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="
                w-full
                border
                p-3
                rounded-lg
                outline-none
                focus:ring-2
                focus:ring-black
              "
              required
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-black
              text-white
              py-3
              rounded-lg
              hover:opacity-90
              transition
              disabled:opacity-50
            "
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;