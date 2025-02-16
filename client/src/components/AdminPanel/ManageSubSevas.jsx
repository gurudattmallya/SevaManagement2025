//ManageSubSevas.jsx

import React, { useState, useEffect } from 'react';
import { Eye, Edit, Plus, ChevronLeft } from 'lucide-react';


import axios from 'axios';

const ManageSubSevas = () => {
  const [subSevas, setSubSevas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewSubSeva, setViewSubSeva] = useState(null);
  const [modalMode, setModalMode] = useState("add");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [parentSevas, setParentSevas] = useState([]);
  const [deities, setDeities] = useState([]);
  const [selectedSevaType, setSelectedSevaType] = useState('');
    const [permissions, setPermissions] = useState([]);
  const sevaTypeLabels = {
    'SS': 'SASHWATH SEVA',
    'N': 'NITYANIDHI SEVA',
    'O': 'OTHERS'
  };

  // Get auth data from localStorage
  // const entityCode = localStorage.getItem('entityCode');
  // const userId = localStorage.getItem('userId');


  const entityCode = localStorage.getItem('entityCode');
    const userId = localStorage.getItem('userId');
  const API_BASE_URL = "http://localhost:2002";

  // Add auth headers for axios requests
  const authHeaders = {
    headers: {
      'Entity-Code': entityCode,
      'User-Id': userId
    }
  };

  const [newSubSeva, setNewSubSeva] = useState({
    parent_seva_id: '',
    deity_id: '',
    name: '',
    price: '',
    is_enabled: true,
    seva_type: '',
   
  });

  // useEffect(() => {
  //   console.log('Entity Code from localStorage:', entityCode);
  //   // Check for authentication
  //   if (!entityCode || !userId) {
  //     setError("Authentication required");
  //     return;
  //   }
  //   fetchSubSevas();
  //   fetchParentSevas();
 
  // }, [entityCode, userId]);
  useEffect(() => {
    // Get permissions alongside other initializations
    const storedPermissions = JSON.parse(
      localStorage.getItem("permissions") || "[]"
    );
    setPermissions(storedPermissions);

    console.log("Entity Code from localStorage:", entityCode);
    if (!entityCode || !userId) {
      setError("Authentication required");
      return;
    }
    fetchSubSevas();
    fetchParentSevas();
  }, [entityCode, userId]);

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

  const fetchSubSevas = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/sub-sevas`, authHeaders);
      setSubSevas(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch sub sevas");
      showNotification("Failed to load sub sevas", "error");
    } finally {
      setLoading(false);
    }
  };

  
const fetchParentSevas = async () => {
  try {
    // Log the entity code before making the request
    console.log('Entity Code being sent:', entityCode);

    const response = await axios.get(`${API_BASE_URL}/sub-sevas/parent-sevas/list`, {
      headers: {
        'Entity-Code': entityCode,
        'User-Id': userId,
        'Content-Type': 'application/json'
      }
    });

    // Log the response
    console.log('API Response:', response.data);
    
    // Handle the response
    const sevas = response.data|| [];
    setParentSevas(sevas);
  } catch (err) {
    console.error('Error details:', err.response?.data || err.message);
    setParentSevas([]);
    showNotification("Failed to load parent sevas", "error");
  }
};


  
  const fetchDeities = async (sevaType) => {
    try {
      console.log('Fetching deities for seva type:', sevaType);
      
      const response = await axios.get(`${API_BASE_URL}/sub-sevas/deities/${sevaType}`, {
        headers: {
          'Entity-Code': entityCode,
          'User-Id': userId,
          'Content-Type': 'application/json'
        }
      });
  
      // Extract data from response
      const deitiesData = response.data.data;
      
      // Transform data based on seva type
      const transformedDeities = Array.isArray(deitiesData) ? deitiesData : [deitiesData];
      
      console.log(`Deities for ${sevaType} seva:`, transformedDeities);
      setDeities(transformedDeities);
  
    } catch (err) {
      console.log('Deity fetch error:', err);
      setDeities([]);
    }
  };
  
  
  

  const transformSevaForSubmission = (seva) => {
    return {
      ...seva,
      parent_seva_id: parseInt(seva.parent_seva_id), // Convert to number
      deity_id: parseInt(seva.deity_id), // Convert to number
      seva_type: seva.seva_type,
      is_enabled: seva.is_enabled ? 'Y' : 'N',
      entity_code: entityCode,
      user_id: userId
    };
  };

  
  
  const addOrEditSubSeva = async () => {
    // Validate required fields
    if (!newSubSeva.parent_seva_id || !newSubSeva.deity_id || !newSubSeva.name || !newSubSeva.price) {
      showNotification("Please fill all required fields", "error");
      return;
    }
  
    try {
      // Get parent seva details
      const selectedParentSeva = parentSevas.find(seva => seva.id === newSubSeva.parent_seva_id);
      
      // Transform data for API
      const sevaData = {
        parent_seva_id: newSubSeva.parent_seva_id,
        deity_id: parseInt(newSubSeva.deity_id),
        name: newSubSeva.name,
        price: parseFloat(newSubSeva.price),
        is_enabled: newSubSeva.is_enabled,
        seva_type: selectedParentSeva?.seva_type || 'master',
        parent_seva_name: selectedParentSeva?.name
      };
  
      const headers = {
        'Entity-Code': entityCode,
        'User-Id': userId,
        'Content-Type': 'application/json'
      };
  
      if (modalMode === "edit") {
        const response = await axios.put(
          `${API_BASE_URL}/sub-sevas/${editId}`, 
          sevaData, 
          { headers }
        );
        console.log('Update response:', response.data);
        showNotification("Sub seva updated successfully");
      } else {
        const response = await axios.post(
          `${API_BASE_URL}/sub-sevas`, 
          sevaData, 
          { headers }
        );
        console.log('Create response:', response.data);
        showNotification("Sub seva added successfully");
      }
  
      await fetchSubSevas();
      closeModal();
    } catch (err) {
      console.error('Operation details:', err);
      const errorMessage = err.response?.data?.message || "Operation failed";
      showNotification(errorMessage, "error");
    }
  };
  



  const handleEdit = async (seva) => {
    try {
      console.log('Selected seva for edit:', seva);
      
      // Since we already have the seva data, we can use it directly
      const transformedData = {
        parent_seva_id: `${seva.PARENT_SEVA_TYPE === 'master' ? 'M' : 'S'}${seva.PARENT_SEVA_ID}`,
        deity_id: seva.DEITY_ID,
        name: seva.SEVA_DESC,
        price: seva.SEVA_AMOUNT,
        is_enabled: seva.SEVA_ACTIVE === 'Y',
        seva_type: seva.PARENT_SEVA_TYPE
      };
  
      // Fetch deities for the selected seva type
      await fetchDeities(seva.PARENT_SEVA_TYPE);
      
      // Update form state
      setNewSubSeva(transformedData);
      setSelectedSevaType(seva.PARENT_SEVA_TYPE);
      setEditId(seva.SEVA_CODE);
      setModalMode("edit");
      setIsModalOpen(true);
  
    } catch (err) {
      console.error('Edit operation details:', err);
      showNotification("Please try editing again", "error");
    }
  };
  
  const handleParentSevaChange = async (e) => {
    const selectedId = e.target.value;
    const selectedParentSeva = parentSevas.find(seva => seva.id === selectedId);
    
    if (selectedParentSeva) {
      setSelectedSevaType(selectedParentSeva.seva_type);
      setNewSubSeva({
        ...newSubSeva,
        parent_seva_id: selectedId,
        deity_id: '',
        seva_type: selectedParentSeva.seva_type
      });
      await fetchDeities(selectedParentSeva.seva_type);
    }
  };
  
  
  
  const openModal = () => {
    setModalMode("add");
    setNewSubSeva({
      parent_seva_id: '',
      deity_id: '',
      name: '',
      price: '',
      is_enabled: true,
      seva_type: ''
    });
    setSelectedSevaType('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewSubSeva({
      parent_seva_id: '',
      deity_id: '',
      name: '',
      price: '',
      is_enabled: true,
      seva_type: ''
    });
    setSelectedSevaType('');
  };

  const openViewModal = (subSeva) => {
    setViewSubSeva(subSeva);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setViewSubSeva(null);
  };
  useEffect(() => {
    fetchParentSevas();
    fetchSubSevas();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gradient-to-br from-orange-50 to-white min-h-screen">
      {/* Notification */}
      {notification.message && (
        <div className={`fixed top-4 right-4 p-4 rounded-md shadow-lg ${
          notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'
        } text-white z-50 transition-opacity duration-300`}>
          {notification.message}
        </div>
      )}

      {/* <div className="mb-8">
        <h1 className="text-3xl font-bold text-orange-600 mb-2">Manage Sub-Sevas</h1>
        <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-orange-600"/>
      </div>

      <button
        onClick={openModal}
        className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium py-3 px-6 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mb-6"
      >
        Add New Sub-Seva
      </button>
       */}
       <div className="flex justify-between items-center mb-6">
  <div>
    <h1 className="text-3xl font-bold text-gray-800">Manage Sub-Sevas</h1>
    <p className="text-gray-600 mt-1">Add and manage temple sub-sevas</p>
  </div>
   {permissions.some(p => p.url === '/admin/manage/sub-sevas' && p.access_to_add) && (
  <button
    onClick={openModal}
    className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
  >
    <Plus className="w-5 h-5 mr-2" />
    Add Sub-Seva
  </button>)}
</div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all">
            <h2 className="text-2xl font-bold mb-6 text-orange-600 border-b border-orange-200 pb-2">
              {modalMode === "edit" ? "Edit Sub-Seva" : "Add New Sub-Seva"}
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Select Parent Seva <span className="text-red-500">*</span>
                </label>
    
<select
  value={newSubSeva.parent_seva_id || ''}
  onChange={handleParentSevaChange}
  className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
  required
>
  <option value="">--Select--</option>
  {Array.isArray(parentSevas) && parentSevas.length > 0 ? (
    parentSevas.map((seva) => (
      <option key={seva.id} value={seva.id}>
        {seva.name} ({seva.type})
      </option>
    ))
  ) : (
    <option value="" disabled>No parent sevas available</option>
  )}
</select>

              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Select Deity <span className="text-red-500">*</span>
                </label>
               
<select
  value={newSubSeva.deity_id || ''}
  onChange={(e) => setNewSubSeva({ ...newSubSeva, deity_id: e.target.value })}
  className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
  required
  disabled={!selectedSevaType}
>
  <option value="">--Select Deity--</option>
  {Array.isArray(deities) && deities.length > 0 && deities.map((deity) => (
    <option key={deity.id} value={deity.id}>
      {deity.name}
    </option>
  ))}
</select>



              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Sub-Seva Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter sub-seva name"
                  value={newSubSeva.name}
                  onChange={(e) => setNewSubSeva({ ...newSubSeva, name: e.target.value })}
                  className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  placeholder="Enter price"
                  value={newSubSeva.price}
                  onChange={(e) => setNewSubSeva({ ...newSubSeva, price: e.target.value })}
                  className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                  min="0"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Status</label>
                <select
                  value={newSubSeva.is_enabled}
                  onChange={(e) => setNewSubSeva({ ...newSubSeva, is_enabled: e.target.value === "true" })}
                  className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="true">Enabled</option>
                  <option value="false">Disabled</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 mt-8">
                <button
                  onClick={closeModal}
                  className="px-6 py-2 border border-orange-200 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addOrEditSubSeva}
                  className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all"
                >
                  {modalMode === "edit" ? "Save Changes" : "Add Sub-Seva"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {isViewModalOpen && viewSubSeva && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-orange-600 border-b border-orange-200 pb-2">
        Sub-Seva Details
      </h2>
      <div className="space-y-4">
        <p><span className="font-medium">Seva Code:</span> {viewSubSeva.SEVA_CODE}</p>
        <p><span className="font-medium">Parent Seva:</span> {viewSubSeva.PARENT_SEVA_NAME}</p>
        <p><span className="font-medium">Deity:</span> {viewSubSeva.deity_name}</p>
        <p><span className="font-medium">Name:</span> {viewSubSeva.SEVA_DESC}</p>
        <p><span className="font-medium">Price:</span> ₹{viewSubSeva.SEVA_AMOUNT}</p>
        <p><span className="font-medium">Status:</span> {viewSubSeva.SEVA_ACTIVE === 'Y' ? "Enabled" : "Disabled"}</p>
        <p><span className="font-medium">Seva Type:</span> {viewSubSeva.PARENT_SEVA_TYPE === 'master' ? 'Master Seva' : 'Special Seva'}</p>

        {viewSubSeva.MO_BY && (
          <>
            <p><span className="font-medium">Modified By:</span> {viewSubSeva.MO_BY}</p>
            <p><span className="font-medium">Modified On:</span> {new Date(viewSubSeva.MO_ON).toLocaleString()}</p>
          </>
        )}
      </div>
      <div className="mt-6 text-right">
        <button
          onClick={closeViewModal}
          className="px-6 py-2 border border-orange-200 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}




      {/* Sub-Sevas Table */}
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center py-8">
          {error}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-orange-600 text-white">
                <th className="px-6 py-3 text-left text-sm font-medium">ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Parent Seva</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Deity</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Price</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Type</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {subSevas.map((subSeva) => (
                <tr key={subSeva.SEVA_CODE} className="hover:bg-orange-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{subSeva.SEVA_CODE}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{subSeva.PARENT_SEVA_NAME}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{subSeva.deity_name}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{subSeva.SEVA_DESC}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">₹{subSeva.SEVA_AMOUNT}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 inline-flex items-center rounded-full text-xs font-medium ${
                      subSeva.SEVA_ACTIVE === 'Y' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {subSeva.SEVA_ACTIVE === 'Y' ? 'Enabled' : 'Disabled'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {subSeva.PARENT_SEVA_TYPE === 'master' ? 'Master Seva' : 'Special Seva'}
                  </td>
                  <td className="px-6 py-4 text-sm space-x-2">
                    <button
                      onClick={() => openViewModal(subSeva)}
                      className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </button>
                     {permissions.some(p => p.url === '/admin/manage/sub-sevas' && p.access_to_update) && (
                    <button
                      onClick={() => handleEdit(subSeva)}
                      className="inline-flex items-center px-3 py-1 bg-orange-100 text-orange-700 rounded-md hover:bg-orange-200"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </button>)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>  
      )}
      {/* Back Button */}
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

export default ManageSubSevas;







