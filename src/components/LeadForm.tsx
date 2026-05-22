import { useState } from "react";

import { createLead } from "../services/lead.service";
import { Lead, LeadSource, LeadStatus } from "../types/lead.types";


  const LeadForm = ({
  fetchLeads,
}: {
  fetchLeads: () => void;
}) => {
  const [formData, setFormData] = useState<Lead>({
    name: "",
    email: "",
    source: LeadSource.WEBSITE,
    status:LeadStatus.NEW
  });

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
  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await createLead(formData);

      fetchLeads();

      setFormData({
        name: "",
        email: "",
         source: LeadSource.WEBSITE,
         status:LeadStatus.NEW
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
   
      <form
            onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg shadow space-y-3"
    >
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        className="w-full border p-3 rounded"
      />

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full border p-3 rounded"
      />

      <label htmlFor="source">
  Lead Source
</label>

<select
  id="source"
  name="source"
  value={formData.source}
  onChange={handleChange}
  className="w-full border p-3 rounded"
>
  <option value="">
    Select Source
  </option>

  <option value="Website">
    Website
  </option>

  <option value="Instagram">
    Instagram
  </option>

  <option value="Referral">
    Referral
  </option>
</select>

      <button className="bg-black text-white px-4 py-3 rounded w-full">
        Create Lead
      </button>
    </form>
   
    
  );
};

export default LeadForm;