import API from "../api/axios"


export const getSalesUser=async()=>{
  const response=await API.get("/api/users/sales");
  return response.data;
}