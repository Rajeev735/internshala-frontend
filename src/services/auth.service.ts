import API from "../api/axios";

export interface RegisterINput{
  name:string;
  email:string;
  password:string;
}

export interface LoginInput{
  email:string;
  password:string;
}



export const loginUser=async(data:LoginInput)=>{
   const response=await API.post("/api/auth/login",data);

   return response.data;
}

export const createSalesUser = async (
  data: {
    name: string;
    email: string;
    password: string;
  }
) => {
  const response = await API.post(
    "/api/auth/create-sales",
    data
  );

  return response.data;
};