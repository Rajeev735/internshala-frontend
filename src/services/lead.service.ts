import API from "../api/axios";
import { CreateLeadInput, Lead } from "../types/lead.types";


export const createLead=async(data:CreateLeadInput)=>{
  const response=await API.post("/api/leads/create-lead",data);

  return response.data
};

export const updateLead=async(id:string,data:Partial<Lead>)=>{
  const response=await API.put(`/api/leads/${id}`,data);

  return response.data;
};

export const deleteLead=async(id:string)=>{

  const response=await API.delete(`/api/leads/${id}`);
  return response.data;

}
export const getLeads = async (
  query = ""
) => {
  const response = await API.get(
    `api/leads${query}`
  );

  return response.data;
};
