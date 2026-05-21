// pages/Leads.tsx

import { useEffect, useState } from "react";

import DashboardLayout from "../layout/dashboard";

import { useDebounce } from "use-debounce";

import { CSVLink } from "react-csv";

import {
  deleteLead,
  getLeads,
  updateLead,
} from "../services/lead.service";

import {
  Lead,
  LeadSource,
  LeadStatus,
} from "../types/lead.types";

const Leads = () => {
  const [leads, setLeads] =
    useState<Lead[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [
    editingLeadId,
    setEditingLeadId,
  ] = useState<string | null>(
    null
  );

  const [
    editFormData,
    setEditFormData,
  ] = useState<Partial<Lead>>(
    {}
  );

  // FILTER STATES
  const [status, setStatus] =
    useState("");

  const [source, setSource] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [debouncedSearch] =
    useDebounce(search, 500);

  const [sort, setSort] =
    useState<
      "latest" | "oldest"
    >("latest");

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  // CSV EXPORT DATA
  const csvData = leads.map(
    (lead) => ({
      Name: lead.name,

      Email: lead.email,

      Status: lead.status,

      Source: lead.source,

      "Created By":
        lead.createdBy?.name,

      "Created At":
        new Date(
          lead.createdAt!
        ).toLocaleDateString(),
    })
  );

  // START EDIT
  const handleEdit = (
    lead: Lead
  ) => {
    setEditingLeadId(
      lead._id!
    );

    setEditFormData({
      name: lead.name,
      email: lead.email,
      source: lead.source,
      status: lead.status,
    });
  };

  // HANDLE EDIT CHANGE
  const handleEditChange = (
    e: React.ChangeEvent<
      | HTMLInputElement
      | HTMLSelectElement
    >
  ) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]:
        e.target.value,
    });
  };

  // UPDATE LEAD
  const handleUpdateLead =
    async (id: string) => {
      try {
        await updateLead(
          id,
          editFormData
        );

        setEditingLeadId(
          null
        );

        fetchLeads();
      } catch (error) {
        console.log(error);
      }
    };

  // FETCH LEADS
  const fetchLeads =
    async () => {
      try {
        setLoading(true);

        const query = `?page=${page}&limit=10&status=${status}&source=${source}&search=${debouncedSearch}&sort=${sort}`;

        const response =
          await getLeads(
            query
          );

        setLeads(
          response.data.leads
        );

        setTotalPages(
          response.data
            .pagination
            .totalPages
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchLeads();
  }, [
    status,
    source,
    debouncedSearch,
    sort,
    page,
  ]);

  // DELETE LEAD
  const handleDelete =
    async (id: string) => {
      try {
        await deleteLead(id);

        fetchLeads();
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            Leads Management
          </h1>

          {/* EXPORT BUTTON */}
          <CSVLink
            data={csvData}
            filename="leads.csv"
            className="
              bg-black
              text-white
              px-4
              py-3
              rounded-lg
              hover:opacity-90
              transition
            "
          >
            Export CSV
          </CSVLink>
        </div>

        {/* FILTERS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-4 rounded-xl shadow">
          {/* SEARCH */}
          <input
            aria-label="Search leads"
            type="text"
            placeholder="Search by name/email"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="border p-3 rounded-lg"
          />

          {/* STATUS */}
          <select
            aria-label="Filter by status"
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value
              )
            }
            className="border p-3 rounded-lg"
          >
            <option value="">
              All Status
            </option>

            <option
              value={
                LeadStatus.NEW
              }
            >
              New
            </option>

            <option
              value={
                LeadStatus.CONTACTED
              }
            >
              Contacted
            </option>

            <option
              value={
                LeadStatus.QUALIFIED
              }
            >
              Qualified
            </option>

            <option
              value={
                LeadStatus.LOST
              }
            >
              Lost
            </option>
          </select>

          {/* SOURCE */}
          <select
            aria-label="Filter by source"
            value={source}
            onChange={(e) =>
              setSource(
                e.target.value
              )
            }
            className="border p-3 rounded-lg"
          >
            <option value="">
              All Sources
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

          {/* SORT */}
          <select
            aria-label="Sort leads"
            value={sort}
            onChange={(e) =>
              setSort(
                e.target
                  .value as
                  | "latest"
                  | "oldest"
              )
            }
            className="border p-3 rounded-lg"
          >
            <option value="latest">
              Latest
            </option>

            <option value="oldest">
              Oldest
            </option>
          </select>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">
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
                  Status
                </th>

                <th className="p-4 text-left">
                  Source
                </th>

                <th className="p-4 text-left">
                  Created At
                </th>

                <th className="p-4 text-left">
                  Created By
                </th>

                <th className="p-4 text-left">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center p-6"
                  >
                    Loading...
                  </td>
                </tr>
              ) : leads.length ===
                0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center p-6"
                  >
                    No Leads Found
                  </td>
                </tr>
              ) : (
                leads.map(
                  (lead) => {
                    const isEditing =
                      editingLeadId ===
                      lead._id;

                    return (
                      <tr
                        key={
                          lead._id
                        }
                        className="border-t"
                      >
                        {/* NAME */}
                        <td className="p-4">
                          {isEditing ? (
                            <input
                              type="text"
                              name="name"
                              value={
                                editFormData.name ||
                                ""
                              }
                              onChange={
                                handleEditChange
                              }
                              className="border p-2 rounded-lg"
                            />
                          ) : (
                            lead.name
                          )}
                        </td>

                        {/* EMAIL */}
                        <td className="p-4">
                          {isEditing ? (
                            <input
                              type="email"
                              name="email"
                              value={
                                editFormData.email ||
                                ""
                              }
                              onChange={
                                handleEditChange
                              }
                              className="border p-2 rounded-lg"
                            />
                          ) : (
                            lead.email
                          )}
                        </td>

                        {/* STATUS */}
                        <td className="p-4">
                          {isEditing ? (
                            <select
                              name="status"
                              value={
                                editFormData.status
                              }
                              onChange={
                                handleEditChange
                              }
                              className="border p-2 rounded-lg"
                            >
                              <option
                                value={
                                  LeadStatus.NEW
                                }
                              >
                                New
                              </option>

                              <option
                                value={
                                  LeadStatus.CONTACTED
                                }
                              >
                                Contacted
                              </option>

                              <option
                                value={
                                  LeadStatus.QUALIFIED
                                }
                              >
                                Qualified
                              </option>

                              <option
                                value={
                                  LeadStatus.LOST
                                }
                              >
                                Lost
                              </option>
                            </select>
                          ) : (
                            lead.status
                          )}
                        </td>

                        {/* SOURCE */}
                        <td className="p-4">
                          {isEditing ? (
                            <select
                              name="source"
                              value={
                                editFormData.source
                              }
                              onChange={
                                handleEditChange
                              }
                              className="border p-2 rounded-lg"
                            >
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
                          ) : (
                            lead.source
                          )}
                        </td>

                        {/* CREATED AT */}
                        <td className="p-4">
                          {new Date(
                            lead.createdAt!
                          ).toLocaleDateString()}
                        </td>

                        {/* CREATED BY */}
                        <td className="p-4">
                          {lead
                            .createdBy
                            ?.name ||
                            "N/A"}
                        </td>

                        {/* ACTIONS */}
                        <td className="p-4 flex gap-2">
                          {isEditing ? (
                            <>
                              <button
                                onClick={() =>
                                  handleUpdateLead(
                                    lead._id!
                                  )
                                }
                                className="bg-green-500 text-white px-4 py-2 rounded-lg"
                              >
                                Save
                              </button>

                              <button
                                onClick={() =>
                                  setEditingLeadId(
                                    null
                                  )
                                }
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() =>
                                  handleEdit(
                                    lead
                                  )
                                }
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                              >
                                Edit
                              </button>

                              <button
                                onClick={() =>
                                  handleDelete(
                                    lead._id!
                                  )
                                }
                                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  }
                )
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex items-center justify-center gap-4">
          <button
            disabled={page === 1}
            onClick={() =>
              setPage(
                (prev) =>
                  prev - 1
              )
            }
            className="bg-black text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            Prev
          </button>

          <p>
            Page {page} of{" "}
            {totalPages}
          </p>

          <button
            disabled={
              page ===
              totalPages
            }
            onClick={() =>
              setPage(
                (prev) =>
                  prev + 1
              )
            }
            className="bg-black text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Leads;