// pages/SalesUsers.tsx

import { useEffect, useState } from "react";

import DashboardLayout from "../layout/dashboard";

import { getSalesUser } from "../services/user.service";

interface SalesUser {
  _id: string;

  name: string;

  email: string;

  role: string;

  createdAt: string;
}

const SalesUsers = () => {
  const [salesUsers, setSalesUsers] =
    useState<SalesUser[]>([]);

  const [loading, setLoading] =
    useState(false);

  // FETCH SALES USERS
  const fetchSalesUsers =
    async () => {
      try {
        setLoading(true);

        const response =
          await getSalesUser();

        setSalesUsers(
          response.data
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchSalesUsers();
  }, []);

  return (
    <DashboardLayout >
      <div className="space-y-6">
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold">
            Sales Users
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all sales team
            members.
          </p>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">
                  Name
                </th>

                <th className="p-4 text-left">
                  Email
                </th>

                <th className="p-4 text-left">
                  Role
                </th>

                <th className="p-4 text-left">
                  Joined At
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center p-6"
                  >
                    Loading...
                  </td>
                </tr>
              ) : salesUsers.length ===
                0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center p-6"
                  >
                    No Sales Users Found
                  </td>
                </tr>
              ) : (
                salesUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="border-t"
                  >
                    {/* NAME */}
                    <td className="p-4">
                      {user.name}
                    </td>

                    {/* EMAIL */}
                    <td className="p-4">
                      {user.email}
                    </td>

                    {/* ROLE */}
                    <td className="p-4 capitalize">
                      {user.role}
                    </td>

                    {/* CREATED AT */}
                    <td className="p-4">
                      {new Date(
                        user.createdAt
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SalesUsers;