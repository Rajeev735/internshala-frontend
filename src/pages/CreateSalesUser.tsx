import { useState } from "react";
import { createSalesUser } from "../services/auth.service";
import DashboardLayout from "../layout/dashboard";



const CreateSalesUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.SyntheticEvent<HTMLFormElement>

  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response =
        await createSalesUser(formData);

      setMessage(response.message);

      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error: any) {
      setMessage(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout >
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-6">
      <h1 className="text-2xl font-bold mb-6">
        Create Sales User
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {/* NAME */}
        <div>
          <label
            htmlFor="name"
            className="block mb-2 font-medium"
          >
            Name
          </label>

          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name"
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        {/* EMAIL */}
        <div>
          <label
            htmlFor="email"
            className="block mb-2 font-medium"
          >
            Email
          </label>

          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        {/* PASSWORD */}
        <div>
          <label
            htmlFor="password"
            className="block mb-2 font-medium"
          >
            Password
          </label>

          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90 transition"
        >
          {loading
            ? "Creating..."
            : "Create Sales User"}
        </button>
      </form>

      {/* MESSAGE */}
      {message && (
        <div className="mt-4 text-center">
          <p>{message}</p>
        </div>
      )}
    </div>
     </DashboardLayout>
  );
 
};

export default CreateSalesUser;