// pages/CreateLead.tsx

import { useState } from "react";

import DashboardLayout from "../layout/dashboard";

import { createLead } from "../services/lead.service";

import {
  CreateLeadInput,
  LeadSource,
} from "../types/lead.types";



const CreateLead = () => {
  const [formData, setFormData] =
    useState<CreateLeadInput>({
      name: "",
      email: "",
      source: "",
    });

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  // HANDLE CHANGE
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE SUBMIT
  const handleSubmit = async (
    e: React.SyntheticEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response =
        await createLead(formData);

      setMessage(response.message);

      // RESET FORM
      setFormData({
        name: "",
        email: "",
        source: "",
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
    <DashboardLayout>
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            Create Lead
          </h1>

          <p className="text-gray-500 mt-2">
            Add a new lead to the CRM
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* NAME */}
          <div>
            <label
              htmlFor="name"
              className="block mb-2 font-medium"
            >
              Lead Name
            </label>

            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter lead name"
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

          {/* SOURCE */}
          <div>
            <label
              htmlFor="source"
              className="block mb-2 font-medium"
            >
              Lead Source
            </label>

            <select
              id="source"
              name="source"
              value={formData.source}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
              required
            >
              <option value="">
                Select Source
              </option>

              <option
                value={
                  LeadSource.WEBSITE
                }
              >
                Website
              </option>

              <option
                value={
                  LeadSource.INSTAGRAM
                }
              >
                Instagram
              </option>

              <option
                value={
                  LeadSource.REFERRAL
                }
              >
                Referral
              </option>
            </select>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {loading
              ? "Creating..."
              : "Create Lead"}
          </button>
        </form>

        {/* MESSAGE */}
        {message && (
          <div className="mt-5 text-center">
            <p className="font-medium">
              {message}
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CreateLead;