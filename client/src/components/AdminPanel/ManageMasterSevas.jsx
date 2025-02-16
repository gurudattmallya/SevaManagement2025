// //ManageMastersevas.jsx

// import React, { useState, useEffect } from 'react';
// import { Eye, Edit, Plus, X, ChevronLeft, CheckCircle, XCircle, Power } from 'lucide-react';
// import axios from 'axios';

// const Modal = ({ isOpen, onClose, children }) => {
//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50">
//       <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
//       <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 z-10">
//         {children}
//       </div>
//     </div>
//   );
// };

// const StatusBadge = ({ enabled }) => (
//   <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//     enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//   }`}>
//     {enabled ? (
//       <CheckCircle className="w-4 h-4 mr-1" />
//     ) : (
//       <XCircle className="w-4 h-4 mr-1" />
//     )}
//     {enabled ? 'Enabled' : 'Disabled'}
//   </span>
// );

// const ManageMasterSevas = () => {
//   const [masterSevas, setMasterSevas] = useState([]);
//   const [newSeva, setNewSeva] = useState({ name: '', description: '', isEnabled: 'Enabled', sevaType: 'SS' });
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [selectedSeva, setSelectedSeva] = useState(null);
//   const [editMode, setEditMode] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [userContext, setUserContext] = useState({
//     entityCode: '',
//     userId: ''
//   });

//   const sevaTypeLabels = {
//     'SS': 'SASHWATH SEVA',
//     'N': 'NITYANIDHI SEVA',
//     'O': 'OTHERS'
    
//   };

//   useEffect(() => {
//     const entityCode = localStorage.getItem('entityCode');
//     const userId = localStorage.getItem('userId');
//     setUserContext({ entityCode, userId });
//     fetchMasterSevas();
//   }, []);

//   const fetchMasterSevas = async () => {
//     try {
//       setLoading(true);
//       const entityCode = localStorage.getItem('entityCode');
//       const response = await axios.get(`http://localhost:2002/masterSevas?entityCode=${entityCode}`);
//       const transformedData = Array.isArray(response.data) ? response.data.map(seva => ({
//         id: seva.id,
//         name: seva.name,
//         description: seva.description,
//         isEnabled: seva.is_enabled === 1 || seva.is_enabled === true,
//         createdBy: seva.cr_by,
//         createdOn: seva.cr_on,
//         modifiedBy: seva.mo_by,
//         modifiedOn: seva.mo_on,
//         seva_type: seva.seva_type
//       })) : [];
//       setMasterSevas(transformedData);
//       setError(null);
//     } catch (error) {
//       console.error("Error fetching Master Sevas:", error);
//       setError("Failed to fetch master sevas");
//       setMasterSevas([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => {
//     setIsModalOpen(false);
//     setNewSeva({ name: '', description: '', isEnabled: 'Enabled', sevaType: 'SS' });
//     setEditMode(null);
//   };

//   const openViewModal = (seva) => {
//     setSelectedSeva(seva);
//     setIsViewModalOpen(true);
//   };

//   const closeViewModal = () => {
//     setSelectedSeva(null);
//     setIsViewModalOpen(false);
//   };

//   const addOrEditMasterSeva = async () => {
//     if (!newSeva.name.trim()) return;

//     const isEnabled = newSeva.isEnabled === 'Enabled';
//     const payload = {
//       name: newSeva.name,
//       description: newSeva.description,
//       isEnabled: isEnabled,
//       entityCode: userContext.entityCode,
//       userId: userContext.userId,
//       sevaType: newSeva.sevaType || 'O'
//     };

//     try {
//       if (editMode !== null) {
//         await axios.put(`http://localhost:2002/masterSevas/${editMode}`, payload);
//       } else {
//         await axios.post("http://localhost:2002/masterSevas", payload);
//       }
//       await fetchMasterSevas();
//       closeModal();
//     } catch (error) {
//       console.error("Error saving Master Seva:", error);
//       setError("Failed to save master seva");
//     }
//   };

//   const handleEdit = (id) => {
//     const sevaToEdit = masterSevas.find((seva) => seva.id === id);
//     if (sevaToEdit) {
//       setNewSeva({
//         name: sevaToEdit.name,
//         description: sevaToEdit.description,
//         isEnabled: sevaToEdit.isEnabled ? 'Enabled' : 'Disabled',
//         sevaType: sevaToEdit.seva_type || 'O'
//       });
//       setEditMode(id);
//       openModal();
//     }
//   };

//   const handleEnableDisable = async (id) => {
//     try {
//       await axios.patch(`http://localhost:2002/masterSevas/${id}/toggle`, {
//         entityCode: userContext.entityCode,
//         userId: userContext.userId
//       });
//       await fetchMasterSevas();
//     } catch (error) {
//       console.error("Error toggling status:", error);
//       setError("Failed to toggle status");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-6 flex items-center justify-center">
//         <div className="text-center">Loading...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-6">
//         <div className="max-w-6xl mx-auto text-center">
//           <div className="text-red-500 text-xl mb-4">{error}</div>
//           <button
//             onClick={fetchMasterSevas}
//             className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-6">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800">Manage Master Sevas</h1>
//             <p className="text-gray-600 mt-1">Add and manage temple sevas</p>
//           </div>
//           <button
//             onClick={openModal}
//             className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
//           >
//             <Plus className="w-5 h-5 mr-2" />
//             Add Master Seva
//           </button>
//         </div>

//         {/* Table */}
//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="bg-orange-600 text-white">
//                   <th className="px-6 py-3 text-left text-sm font-medium">ID</th>
//                   <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
//                   <th className="px-6 py-3 text-left text-sm font-medium">Description</th>
//                   <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
//                   <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {masterSevas.map((seva) => (
//                   <tr key={seva.id} className="hover:bg-orange-50">
//                     <td className="px-6 py-4 text-sm text-gray-900">{seva.id}</td>
//                     <td className="px-6 py-4 text-sm font-medium text-gray-900">{seva.name}</td>
//                     <td className="px-6 py-4 text-sm text-gray-900">{seva.description}</td>
//                     <td className="px-6 py-4"><StatusBadge enabled={seva.isEnabled} /></td>
//                     <td className="px-6 py-4 text-sm space-x-2">
//                       <button
//                         onClick={() => openViewModal(seva)}
//                         className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
//                       >
//                         <Eye className="w-4 h-4 mr-1" />
//                         View
//                       </button>
//                       <button
//                         onClick={() => handleEdit(seva.id)}
//                         className="inline-flex items-center px-3 py-1 bg-orange-100 text-orange-700 rounded-md hover:bg-orange-200"
//                       >
//                         <Edit className="w-4 h-4 mr-1" />
//                         Edit
//                       </button>
//                       {/* <button
//                         onClick={() => handleEnableDisable(seva.id)}
//                         className={`inline-flex items-center px-3 py-1 rounded-md ${
//                           seva.isEnabled 
//                             ? 'bg-red-100 text-red-700 hover:bg-red-200' 
//                             : 'bg-green-100 text-green-700 hover:bg-green-200'
//                         }`}
//                       >
//                         <Power className="w-4 h-4 mr-1" />
//                         {seva.isEnabled ? 'Disable' : 'Enable'}
//                       </button> */}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Add/Edit Modal */}
//         <Modal isOpen={isModalOpen} onClose={closeModal}>
//           <div className="p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold text-gray-800">
//                 {editMode !== null ? 'Edit Master Seva' : 'Add New Master Seva'}
//               </h2>
//               <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
//                 <X className="w-5 h-5" />
//               </button>
//             </div>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Seva Name</label>
//                 <input
//                   type="text"
//                   value={newSeva.name}
//                   onChange={(e) => setNewSeva({ ...newSeva, name: e.target.value })}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//                   placeholder="Enter seva name"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                 <textarea
//                   value={newSeva.description}
//                   onChange={(e) => setNewSeva({ ...newSeva, description: e.target.value })}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 min-h-[100px]"
//                   placeholder="Enter description"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Seva Type</label>
//                 <select
//                   value={newSeva.sevaType}
//                   onChange={(e) => setNewSeva({ ...newSeva, sevaType: e.target.value })}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//                 >
//                   <option value="SS">SASHWATH SEVA</option>
//                   <option value="N">NITYANIDHI SEVA</option>
//                   <option value="O">OTHERS</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//                 <select
//                   value={newSeva.isEnabled}
//                   onChange={(e) => setNewSeva({ ...newSeva, isEnabled: e.target.value })}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//                 >
//                   <option>Enabled</option>
//                   <option>Disabled</option>
//                 </select>
//               </div>
//             </div>
//             <div className="flex justify-end space-x-2 mt-6">
//               <button
//                 onClick={closeModal}
//                 className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={addOrEditMasterSeva}
//                 className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
//               >
//                 {editMode !== null ? 'Save Changes' : 'Add Seva'}
//               </button>
//             </div>
//           </div>
//         </Modal>

//         {/* View Modal */}
//         <Modal isOpen={isViewModalOpen} onClose={closeViewModal}>
//           {selectedSeva && (
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-bold text-gray-800">Master Seva Details</h2>
//                 <button onClick={closeViewModal} className="text-gray-500 hover:text-gray-700">
//                   <X className="w-5 h-5" />
//                 </button>
//               </div>
//               <div className="space-y-4">
//                 <div>
//                   <label className="text-sm font-medium text-gray-500">Seva Name</label>
//                   <p className="text-gray-900 font-medium">{selectedSeva.name}</p>
//                 </div>
//                 <div>
//                   <label className="text-sm font-medium text-gray-500">Description</label>
//                   <p className="text-gray-900">{selectedSeva.description}</p>
//                 </div>
//                 <div>
//                   <label className="text-sm font-medium text-gray-500">Seva Type</label>
//                   <p className="text-gray-900">{sevaTypeLabels[selectedSeva.seva_type] || 'OTHERS'}</p>
//                 </div>
//                 <div>
//                   <label className="text-sm font-medium text-gray-500">Status</label>
//                   <StatusBadge enabled={selectedSeva.isEnabled} />
//                 </div>
//                 <div>
//                   <label className="text-sm font-medium text-gray-500">Created By</label>
//                   <p className="text-gray-900">{selectedSeva.createdBy}</p>
//                 </div>
//                 <div>
//                   <label className="text-sm font-medium text-gray-500">Created On</label>
//                   <p className="text-gray-900">{new Date(selectedSeva.createdOn).toLocaleString()}</p>
//                 </div>
//                 {selectedSeva.modifiedBy && (
//                   <>
//                     <div>
//                       <label className="text-sm font-medium text-gray-500">Modified By</label>
//                       <p className="text-gray-900">{selectedSeva.modifiedBy}</p>
//                     </div>
//                     <div>
//                       <label className="text-sm font-medium text-gray-500">Modified On</label>
//                       <p className="text-gray-900">{new Date(selectedSeva.modifiedOn).toLocaleString()}</p>
//                     </div>
//                   </>
//                 )}
//               </div>
//               <div className="mt-6 flex justify-end">
//                 <button
//                   onClick={closeViewModal}
//                   className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center"
//                 >
//                   <ChevronLeft className="w-4 h-4 mr-1" />
//                   Back
//                 </button>
//               </div>
//             </div>
//           )}
//         </Modal>
//          <button
//                   onClick={() => window.history.back()}
//                   className="flex items-center mt-6 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
//                 >
//                   <ChevronLeft className="w-5 h-5 mr-2" />
//                   Back
//                 </button>
//       </div>
//     </div>
//   );
// };

// export default ManageMasterSevas;

//ManageMastersevas.jsx

import React, { useState, useEffect } from 'react';
import { Eye, Edit, Plus, X, ChevronLeft, CheckCircle, XCircle } from 'lucide-react';
import axios from 'axios';

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

const ManageMasterSevas = () => {
  const [masterSevas, setMasterSevas] = useState([]);
  const [newSeva, setNewSeva] = useState({
    name: "",
    description: "",
    isEnabled: "Enabled",
    sevaType: "SS"
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedSeva, setSelectedSeva] = useState(null);
  const [editMode, setEditMode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userContext, setUserContext] = useState({
    entityCode: "",
    userId: ""
  });
  // Add permissions state
  const [permissions, setPermissions] = useState([]);
  const sevaTypeLabels = {
    SS: "SASHWATH SEVA",
    N: "NITYANIDHI SEVA",
    O: "OTHERS"
  };

  useEffect(() => {
    const entityCode = localStorage.getItem("entityCode");
    const userId = localStorage.getItem("userId");
    setUserContext({ entityCode, userId });
    fetchMasterSevas();
  }, []);
    useEffect(() => {
      const storedPermissions = JSON.parse(
        localStorage.getItem("permissions") || "[]"
      );
      setPermissions(storedPermissions);
      fetchMasterSevas();
    }, []);

  const fetchMasterSevas = async () => {
    try {
      setLoading(true);
      const entityCode = localStorage.getItem("entityCode");
      const response = await axios.get(
        `http://localhost:2002/masterSevas?entityCode=${entityCode}`
      );
      const transformedData = Array.isArray(response.data)
        ? response.data.map((seva) => ({
            id: seva.id,
            name: seva.name,
            description: seva.description,
            isEnabled: seva.is_enabled === 1 || seva.is_enabled === true,
            createdBy: seva.cr_by,
            createdOn: seva.cr_on,
            modifiedBy: seva.mo_by,
            modifiedOn: seva.mo_on,
            seva_type: seva.seva_type
          }))
        : [];
      setMasterSevas(transformedData);
      setError(null);
    } catch (error) {
      console.error("Error fetching Master Sevas:", error);
      setError("Failed to fetch master sevas");
      setMasterSevas([]);
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setNewSeva({
      name: "",
      description: "",
      isEnabled: "Enabled",
      sevaType: "SS"
    });
    setEditMode(null);
  };

  const openViewModal = (seva) => {
    setSelectedSeva(seva);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setSelectedSeva(null);
    setIsViewModalOpen(false);
  };

  // const addOrEditMasterSeva = async () => {
  //   if (!newSeva.name.trim()) return;

  //   const isEnabled = newSeva.isEnabled === 'Enabled';
  //   const payload = {
  //     name: newSeva.name,
  //     description: newSeva.description,
  //     isEnabled: isEnabled,
  //     entityCode: userContext.entityCode,
  //     userId: userContext.userId,
  //     sevaType: newSeva.sevaType || 'O'
  //   };

  //   try {
  //     if (editMode !== null) {
  //       await axios.put(`http://localhost:2002/masterSevas/${editMode}`, payload);
  //     } else {
  //       await axios.post("http://localhost:2002/masterSevas", payload);
  //     }
  //     await fetchMasterSevas();
  //     closeModal();
  //   } catch (error) {
  //     console.error("Error saving Master Seva:", error);
  //     setError("Failed to save master seva");
  //   }
  // };

  const addOrEditMasterSeva = async () => {
    if (!newSeva.name.trim()) return;

    const isEnabled = newSeva.isEnabled === "Enabled";
    const payload = {
      name: newSeva.name,
      description: newSeva.description,
      isEnabled: isEnabled,
      entityCode: userContext.entityCode,
      userId: userContext.userId,
      sevaType: newSeva.sevaType,
      duration: newSeva.sevaType === "SS" ? parseInt(newSeva.duration) : null
    };

    console.log("Payload:", payload); // Add this log

    try {
      if (editMode !== null) {
        await axios.put(
          `http://localhost:2002/masterSevas/${editMode}`,
          payload
        );
      } else {
        await axios.post("http://localhost:2002/masterSevas", payload);
      }
      await fetchMasterSevas();
      closeModal();
    } catch (error) {
      console.error("Error saving Master Seva:", error);
      setError("Failed to save master seva");
    }
  };

  const handleEdit = (id) => {
    const sevaToEdit = masterSevas.find((seva) => seva.id === id);
    if (sevaToEdit) {
      setNewSeva({
        name: sevaToEdit.name,
        description: sevaToEdit.description,
        isEnabled: sevaToEdit.isEnabled ? "Enabled" : "Disabled",
        sevaType: sevaToEdit.seva_type || "O"
      });
      setEditMode(id);
      openModal();
    }
  };

  const handleEnableDisable = async (id) => {
    try {
      await axios.patch(`http://localhost:2002/masterSevas/${id}/toggle`, {
        entityCode: userContext.entityCode,
        userId: userContext.userId
      });
      await fetchMasterSevas();
    } catch (error) {
      console.error("Error toggling status:", error);
      setError("Failed to toggle status");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-6 flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-red-500 text-xl mb-4">{error}</div>
          <button
            onClick={fetchMasterSevas}
            className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Manage Master Sevas
            </h1>
            <p className="text-gray-600 mt-1">Add and manage temple sevas</p>
          </div>
          {permissions.some(p => p.url === '/admin/manage/master-sevas' && p.access_to_add) && (
          <button
            onClick={openModal}
            className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Master Seva
          </button>)}
        </div>

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
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {masterSevas.map((seva) => (
                  <tr key={seva.id} className="hover:bg-orange-50">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {seva.id}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {seva.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {seva.description}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge enabled={seva.isEnabled} />
                    </td>
                    <td className="px-6 py-4 text-sm space-x-2">
                      <button
                        onClick={() => openViewModal(seva)}
                        className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </button>
                      {permissions.some(p => p.url === '/admin/manage/master-sevas' && p.access_to_update) && (
                      <button
                        onClick={() => handleEdit(seva.id)}
                        className="inline-flex items-center px-3 py-1 bg-orange-100 text-orange-700 rounded-md hover:bg-orange-200"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </button>)}
                      {/* <button
                        onClick={() => handleEnableDisable(seva.id)}
                        className={`inline-flex items-center px-3 py-1 rounded-md ${
                          seva.isEnabled 
                            ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        <Power className="w-4 h-4 mr-1" />
                        {seva.isEnabled ? 'Disable' : 'Enable'}
                      </button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Modal */}
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {editMode !== null ? "Edit Master Seva" : "Add New Master Seva"}
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
                  Seva Name
                </label>
                <input
                  type="text"
                  value={newSeva.name}
                  onChange={(e) =>
                    setNewSeva({ ...newSeva, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter seva name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newSeva.description}
                  onChange={(e) =>
                    setNewSeva({ ...newSeva, description: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 min-h-[100px]"
                  placeholder="Enter description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Seva Type
                </label>
                <select
                  value={newSeva.sevaType}
                  onChange={(e) =>
                    setNewSeva({ ...newSeva, sevaType: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="SS">SASHWATH SEVA</option>
                  <option value="N">NITYANIDHI SEVA</option>
                  <option value="O">OTHERS</option>
                </select>
              </div>

              {/* Duration field only appears for SASHWATH SEVA */}
              {newSeva.sevaType === "SS" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (Years)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={newSeva.duration || ""}
                    onChange={(e) =>
                      setNewSeva({ ...newSeva, duration: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required={newSeva.sevaType === "SS"}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={newSeva.isEnabled}
                  onChange={(e) =>
                    setNewSeva({ ...newSeva, isEnabled: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option>Enabled</option>
                  <option>Disabled</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={closeModal}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={addOrEditMasterSeva}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                {editMode !== null ? "Save Changes" : "Add Seva"}
              </button>
            </div>
          </div>
        </Modal>

        {/* View Modal */}
        <Modal isOpen={isViewModalOpen} onClose={closeViewModal}>
          {selectedSeva && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  Master Seva Details
                </h2>
                <button
                  onClick={closeViewModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Seva Name
                  </label>
                  <p className="text-gray-900 font-medium">
                    {selectedSeva.name}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Description
                  </label>
                  <p className="text-gray-900">{selectedSeva.description}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Seva Type
                  </label>
                  <p className="text-gray-900">
                    {sevaTypeLabels[selectedSeva.seva_type] || "OTHERS"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Status
                  </label>
                  <StatusBadge enabled={selectedSeva.isEnabled} />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Created By
                  </label>
                  <p className="text-gray-900">{selectedSeva.createdBy}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Created On
                  </label>
                  <p className="text-gray-900">
                    {new Date(selectedSeva.createdOn).toLocaleString()}
                  </p>
                </div>
                {selectedSeva.modifiedBy && (
                  <>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Modified By
                      </label>
                      <p className="text-gray-900">{selectedSeva.modifiedBy}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Modified On
                      </label>
                      <p className="text-gray-900">
                        {new Date(selectedSeva.modifiedOn).toLocaleString()}
                      </p>
                    </div>
                  </>
                )}
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeViewModal}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back
                </button>
              </div>
            </div>
          )}
        </Modal>
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

export default ManageMasterSevas;