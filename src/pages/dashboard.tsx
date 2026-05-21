// pages/Dashboard.tsx

import DashboardLayout from "../layout/dashboard";

const Dashboard = () => {
  return (
    <DashboardLayout >
      <div className="space-y-8">
        {/* HEADER */}
        <div>
          <h1 className="text-4xl font-bold">
            Smart CRM Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Manage leads, sales teams,
            and customer relationships
            efficiently.
          </p>
        </div>

        {/* OVERVIEW CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* LEADS */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-gray-500 text-sm">
              Lead Management
            </h2>

            <p className="text-2xl font-bold mt-3">
              Create & Track Leads
            </p>

            <p className="text-gray-500 mt-2 text-sm">
              Manage customer leads with
              filtering, searching, and
              status updates.
            </p>
          </div>

          {/* SALES */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-gray-500 text-sm">
              Sales Team
            </h2>

            <p className="text-2xl font-bold mt-3">
              Role Based Access
            </p>

            <p className="text-gray-500 mt-2 text-sm">
              Admin can create and manage
              sales users securely.
            </p>
          </div>

          {/* AUTH */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-gray-500 text-sm">
              Authentication
            </h2>

            <p className="text-2xl font-bold mt-3">
              Secure JWT Login
            </p>

            <p className="text-gray-500 mt-2 text-sm">
              Protected routes with role
              based authorization using
              JWT authentication.
            </p>
          </div>

          {/* FILTER */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-gray-500 text-sm">
              Advanced Features
            </h2>

            <p className="text-2xl font-bold mt-3">
              Search & Filter
            </p>

            <p className="text-gray-500 mt-2 text-sm">
              Search leads, filter by
              status/source, pagination,
              and sorting support.
            </p>
          </div>
        </div>

        {/* PLATFORM DETAILS */}
        <div className="bg-white rounded-2xl shadow p-8">
          <h2 className="text-3xl font-bold mb-6">
            Platform Overview
          </h2>

          <div className="space-y-5 text-gray-700 leading-7">
            <p>
              Smart CRM is a full-stack
              customer relationship
              management platform built
              using React, TypeScript,
              Node.js, Express, MongoDB,
              and JWT authentication.
            </p>

            <p>
              The platform supports
              complete lead lifecycle
              management including lead
              creation, updating,
              filtering, searching,
              sorting, and deletion.
            </p>

            <p>
              Admin users can create and
              manage sales users while
              maintaining secure
              role-based access control.
            </p>

            <p>
              The application follows a
              scalable architecture with
              reusable components,
              protected routes, backend
              validation, and RESTful API
              design.
            </p>
          </div>
        </div>

        {/* TECH STACK */}
        <div className="bg-white rounded-2xl shadow p-8">
          <h2 className="text-3xl font-bold mb-6">
            Tech Stack
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <div className="border rounded-xl p-5 text-center font-medium">
              React
            </div>

            <div className="border rounded-xl p-5 text-center font-medium">
              TypeScript
            </div>

            <div className="border rounded-xl p-5 text-center font-medium">
              Node.js
            </div>

            <div className="border rounded-xl p-5 text-center font-medium">
              Express.js
            </div>

            <div className="border rounded-xl p-5 text-center font-medium">
              MongoDB
            </div>

            <div className="border rounded-xl p-5 text-center font-medium">
              JWT Auth
            </div>

            <div className="border rounded-xl p-5 text-center font-medium">
              Tailwind CSS
            </div>

            <div className="border rounded-xl p-5 text-center font-medium">
              REST APIs
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;