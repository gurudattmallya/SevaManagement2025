//ManageDeity.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Eye, Edit, Plus, X, ChevronLeft, CheckCircle, XCircle } from 'lucide-react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 z-10">
        {children}
      </div>
    </div>
  );
};

const StatusBadge = ({ enabled }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
    enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
  }`}>
    {enabled ? (
      <CheckCircle className="w-4 h-4 mr-1" />
    ) : (
      <XCircle className="w-4 h-4 mr-1" />
    )}
    {enabled ? 'Enabled' : 'Disabled'}
  </span>
);

const ManageDeity = () => {
  const [deities, setDeities] = useState([]);
  const entityCode = localStorage.getItem('entityCode');
  const userId = localStorage.getItem('userId');
  
  const [formData, setFormData] = useState({
    name: '',
    is_enabled: true,
    special_occasions: false
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedDeity, setSelectedDeity] = useState(null);
  const [editMode, setEditMode] = useState(null);
  const [permissions, setPermissions] = useState([]);



  
  useEffect(() => {
    // Get permissions from localStorage
    const storedPermissions = JSON.parse(
      localStorage.getItem("permissions") || "[]"
    );
    setPermissions(storedPermissions);
  }, []);

  useEffect(() => {
    const fetchDeities = async () => {
      try {
        const response = await axios.get(`http://localhost:2002/deities`, {
          params: { entityCode }
        });
        setDeities(response.data);
      } catch (error) {
        console.error("Error fetching deities:", error);
      }
    };

    if (entityCode) {
      fetchDeities();
    }
  }, [entityCode]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditMode(null);
    setFormData({
      name: '',
      is_enabled: true,
      special_occasions: false
    });
  };

  const openViewModal = (deity) => {
    setSelectedDeity(deity);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setSelectedDeity(null);
    setIsViewModalOpen(false);
  };

  

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else if (name === 'is_enabled') {
      setFormData(prev => ({
        ...prev,
        is_enabled: value === 'Enabled'
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleEdit = (id) => {
    const deityToEdit = deities.find((deity) => deity.id === id);
    if (deityToEdit) {
      setFormData({
        name: deityToEdit.name,
        is_enabled: deityToEdit.is_enabled,
        special_occasions: deityToEdit.special_occasions
      });
      setEditMode(id);
      setIsModalOpen(true);
    }
  };

  // const addOrEditDeity = async () => {
  //   if (!formData.name.trim()) return;

  //   try {
  //     const currentDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
      
  //     if (editMode !== null) {
  //       await axios.put(`http://localhost:2002/deities/${editMode}`, {
  //         name: formData.name,
  //         is_enabled: formData.is_enabled,
  //         special_occasions: formData.special_occasions,
  //         entityCode,
  //         mo_by: userId,
  //         mo_on: currentDateTime
  //       });
  //     } else {
  //       await axios.post("http://localhost:2002/deities", {
  //         name: formData.name,
  //         is_enabled: formData.is_enabled,
  //         special_occasions: formData.special_occasions,
  //         entityCode,
  //         cr_by: userId,
  //         cr_on: currentDateTime
  //       });
  //     }
  const addOrEditDeity = async () => {
    if (!formData.name.trim()) return;

    try {
      const currentDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
      
      if (editMode !== null) {
        await axios.put(`http://localhost:2002/deities/${editMode}`, {
          name: formData.name,
          is_enabled: formData.is_enabled,
          special_occasions: formData.special_occasions,
          entityCode,
          mo_by: userId,
          mo_on: currentDateTime
        });
      } else {
        await axios.post("http://localhost:2002/deities", {
          name: formData.name,
          is_enabled: formData.is_enabled,
          special_occasions: formData.special_occasions,
          entityCode,
          cr_by: userId,
          cr_on: currentDateTime
        });
      }
      
      const response = await axios.get("http://localhost:2002/deities", {
        params: { entityCode }
      });
      setDeities(response.data);
      closeModal();
    } catch (error) {
      console.error("Error saving deity:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Manage Deities</h1>
            <p className="text-gray-600 mt-1">Add and manage temple deities</p>
          </div>
          {/* <button
            onClick={openModal}
            className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Deity
          </button> */}
          {permissions.some(
            (p) => p.url === "/admin/manage/deity" && p.access_to_add
          ) && (
            <button
              onClick={openModal}
              className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Deity
            </button>
          )}
        </div>

        {/* Add/Edit Modal
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {editMode !== null ? 'Edit Deity' : 'Add New Deity'}
              </h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deity Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter deity name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="is_enabled"
                  value={formData.is_enabled.toString()}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="true">Enabled</option>
                  <option value="false">Disabled</option>
                </select>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="specialOccasions"
                  name="special_occasions"
                  checked={formData.special_occasions}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label htmlFor="specialOccasions" className="ml-2 block text-sm text-gray-700">
                  Associated with special occasions
                </label>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={addOrEditDeity}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                >
                  {editMode !== null ? 'Save Changes' : 'Add Deity'}
                </button>
              </div>
            </div>
          </div>
        </Modal> */}
        {/* Add/Edit Modal */}
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {editMode !== null ? "Edit Deity" : "Add New Deity"}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deity Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter deity name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="is_enabled"
                  value={formData.is_enabled ? "Enabled" : "Disabled"}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option>Enabled</option>
                  <option>Disabled</option>
                </select>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="specialOccasions"
                  name="special_occasions"
                  checked={formData.special_occasions}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="specialOccasions"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Associated with special occasions
                </label>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={addOrEditDeity}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                >
                  {editMode !== null ? "Save Changes" : "Add Deity"}
                </button>
              </div>
            </div>
          </div>
        </Modal>
        <Modal isOpen={isViewModalOpen} onClose={closeViewModal}>
          {selectedDeity && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  Deity Details
                </h2>
                <button
                  onClick={closeViewModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">ID</p>
                    <p className="font-medium">{selectedDeity.id}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{selectedDeity.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Status</p>
                    <StatusBadge enabled={selectedDeity.is_enabled} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Special Occasions</p>
                    <p className="font-medium">
                      {selectedDeity.special_occasions ? "Yes" : "No"}
                    </p>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Created By</p>
                      <p className="font-medium">{selectedDeity.cr_by}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Created On</p>
                      <p className="font-medium">{selectedDeity.cr_on}</p>
                    </div>
                    {selectedDeity.mo_by && (
                      <>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-500">Modified By</p>
                          <p className="font-medium">{selectedDeity.mo_by}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-500">Modified On</p>
                          <p className="font-medium">{selectedDeity.mo_on}</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <button
                  onClick={closeViewModal}
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </Modal>
        {/* Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-orange-600 text-white">
                  <th className="px-6 py-3 text-left text-sm font-medium">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium">
                    Special Occasions
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {deities.map((deity) => (
                  <tr key={deity.id} className="hover:bg-orange-50">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {deity.id}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {deity.name}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge enabled={deity.is_enabled} />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {deity.special_occasions ? "Yes" : "No"}
                    </td>
                    <td className="px-6 py-4 text-sm space-x-2">
                      <button
                        onClick={() => openViewModal(deity)}
                        className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </button>
                      {/* <button
                        onClick={() => handleEdit(deity.id)}
                        className="inline-flex items-center px-3 py-1 bg-orange-100 text-orange-700 rounded-md hover:bg-orange-200"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </button> */}
                     
                      {permissions.some(
                        (p) =>
                          p.url === "/admin/manage/deity" && p.access_to_update
                      ) && (
                        <button
                          onClick={() => handleEdit(deity.id)}
                          className="inline-flex items-center px-3 py-1 bg-orange-100 text-orange-700 rounded-md hover:bg-orange-200"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center mt-6 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Back
        </button>
      </div>
    </div>
  );
};

export default ManageDeity;