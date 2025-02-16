
import React, { useState, useEffect } from "react";
import { Plus, ChevronLeft } from 'lucide-react';

import axios from "axios";

 const ManageSpecialSevas = () => {
  const [specialSevas, setSpecialSevas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [authData, setAuthData] = useState({
    entityCode: null,
    userId: null,
  });
  const [permissions, setPermissions] = useState([]);
  
  const [newSeva, setNewSeva] = useState({
    name: "",
    description: "",
    startDate: "",
    validity: "",
    isEnabled: "Enabled",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [editId, setEditId] = useState(null);

  const API_BASE_URL = "http://localhost:2002";

   useEffect(() => {
     // Get permissions alongside other initializations
     const storedPermissions = JSON.parse(
       localStorage.getItem("permissions") || "[]"
     );
     setPermissions(storedPermissions);

     // Get auth data from localStorage
     const entityCode = localStorage.getItem("entityCode");
     const userId = localStorage.getItem("userId");

     if (!entityCode || !userId) {
       setError("Authentication data missing. Please login again.");
       return;
     }

     setAuthData({ entityCode, userId });
     axios.defaults.headers.common["entity-code"] = entityCode;
     axios.defaults.headers.common["user-id"] = userId;

     fetchSpecialSevas();
   }, []);

  // Clear notification after 3 seconds
  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ message: "", type: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
  };

  const fetchSpecialSevas = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/special-sevas`);
      setSpecialSevas(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch special sevas");
      showNotification("Failed to load special sevas", "error");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (mode, seva = null) => {
    setModalMode(mode);
    if (seva) {
      setNewSeva({
        name: seva.name,
        description: seva.description,
        startDate: seva.startDate,
        validity: seva.validity,
        isEnabled: seva.isEnabled ? "Enabled" : "Disabled",
      });
      setEditId(seva.id);
    } else {
      setNewSeva({
        name: "",
        description: "",
        startDate: "",
        validity: "",
        isEnabled: "Enabled",
      });
      setEditId(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewSeva({
      name: "",
      description: "",
      startDate: "",
      validity: "",
      isEnabled: "Enabled",
    });
    setEditId(null);
  };

  const handleSave = async () => {
    if (!newSeva.name.trim() || !newSeva.startDate || !newSeva.validity) {
      showNotification("Please fill in all required fields", "error");
      return;
    }

    if (!authData.entityCode || !authData.userId) {
      showNotification("Authentication data missing. Please login again.", "error");
      return;
    }

    try {
      const sevaData = {
        ...newSeva,
        isEnabled: newSeva.isEnabled === "Enabled",
      };

      if (modalMode === "edit") {
        await axios.put(`${API_BASE_URL}/special-sevas/${editId}`, sevaData);
        showNotification("Special seva updated successfully");
      } else {
        await axios.post(`${API_BASE_URL}/special-sevas`, sevaData);
        showNotification("Special seva added successfully");
      }

      await fetchSpecialSevas();
      closeModal();
    } catch (err) {
      showNotification(
        modalMode === "edit" ? "Failed to update seva" : "Failed to add seva",
        "error"
      );
    }
  };

  const toggleSevaStatus = async (seva) => {
    try {
      await axios.patch(`${API_BASE_URL}/special-sevas/${seva.id}/toggle-status`);
      await fetchSpecialSevas();
      showNotification("Status updated successfully");
    } catch (err) {
      showNotification("Failed to update status", "error");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto bg-gradient-to-br from-orange-50 to-white min-h-screen">
      {/* Notification */}
      {notification.message && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
            notification.type === "error"
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          } transition-opacity duration-300`}
        >
          {notification.message}
        </div>
      )}

      {/* <div className="mb-8">
        <h1 className="text-3xl font-bold text-orange-600 mb-2">Manage Special Sevas</h1>
        <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-orange-600"/>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <button
        onClick={() => openModal("add")}
        className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium py-3 px-6 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mb-6"
      >
        Add New Special Seva
      </button> */}
      <div className="flex justify-between items-center mb-6">
  <div>
    <h1 className="text-3xl font-bold text-gray-800">Manage Special Sevas</h1>
    <p className="text-gray-600 mt-1">Add and manage temple special sevas</p>
  </div>
    {permissions.some(p => p.url === '/admin/manage/special-sevas' && p.access_to_add) && (
      
  <button
    onClick={() => openModal("add")}
    className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
  >
    <Plus className="w-5 h-5 mr-2" />
    Add Special Seva
  </button>)}
</div>


      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all">
            <h2 className="text-2xl font-bold mb-6 text-orange-600 border-b border-orange-200 pb-2">
              {modalMode === "view" ? "View Special Seva" : modalMode === "edit" ? "Edit Special Seva" : "Add New Special Seva"}
            </h2>
            <div className="space-y-5">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Seva Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newSeva.name}
                  onChange={(e) => setNewSeva({ ...newSeva, name: e.target.value })}
                  className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  disabled={modalMode === "view"}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Description</label>
                <textarea
                  value={newSeva.description}
                  onChange={(e) => setNewSeva({ ...newSeva, description: e.target.value })}
                  className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent min-h-[100px]"
                  disabled={modalMode === "view"}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={newSeva.startDate}
                    onChange={(e) => setNewSeva({ ...newSeva, startDate: e.target.value })}
                    className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    disabled={modalMode === "view"}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Valid Until <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={newSeva.validity}
                    onChange={(e) => setNewSeva({ ...newSeva, validity: e.target.value })}
                    className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    disabled={modalMode === "view"}
                  />
                </div>
              </div>
              {modalMode !== "view" && (
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Status</label>
                  <select
                    value={newSeva.isEnabled}
                    onChange={(e) => setNewSeva({ ...newSeva, isEnabled: e.target.value })}
                    className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option>Enabled</option>
                    <option>Disabled</option>
                  </select>
                </div>
              )}

              <div className="flex justify-end space-x-3 mt-8">
                <button
                  onClick={closeModal}
                  className="px-6 py-2 border border-orange-200 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors"
                >
                  Close
                </button>
                {modalMode !== "view" && (
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all"
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-orange-100">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gradient-to-r from-orange-50 to-orange-100">
              <th className="px-6 py-4 text-left text-orange-700 font-semibold">ID</th>
              <th className="px-6 py-4 text-left text-orange-700 font-semibold">Name</th>
              <th className="px-6 py-4 text-left text-orange-700 font-semibold">Start Date</th>
              <th className="px-6 py-4 text-left text-orange-700 font-semibold">Validity</th>
              <th className="px-6 py-4 text-left text-orange-700 font-semibold">Status</th>
              <th className="px-6 py-4 text-left text-orange-700 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-orange-100">
            {specialSevas.map((seva) => (
              <tr key={seva.id} className="hover:bg-orange-50 transition-colors">
                <td className="px-6 py-4">{seva.id}</td>
                <td className="px-6 py-4 font-medium text-orange-700">{seva.name}</td>
                <td className="px-6 py-4">{formatDate(seva.startDate)}</td>
                <td className="px-6 py-4">{formatDate(seva.validity)}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleSevaStatus(seva)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      seva.isEnabled 
                        ? "bg-green-100 text-green-700" 
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {seva.isEnabled ? "Enabled" : "Disabled"}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="space-x-2">
                    <button
                      onClick={() => openModal("view", seva)}
                      className="px-4 py-1.5 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-colors"
                    >
                      View
                    </button>
                     {permissions.some(p => p.url === '/admin/manage/special-sevas' && p.access_to_update) && (
        
                    <button
                      onClick={() => openModal("edit", seva)}
                      className="px-4 py-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      Edit
                    </button>)}
                  </div>
                </td>
              </tr>
            ))}
            {specialSevas.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  No Special Sevas Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* <div className="mt-6">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          Back
        </button>
      </div> */}
      <button
  onClick={() => window.history.back()}
  className="flex items-center mt-6 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
>
  <ChevronLeft className="w-5 h-5 mr-2" />
  Back
</button>

    </div>
  );
};
export default ManageSpecialSevas;
