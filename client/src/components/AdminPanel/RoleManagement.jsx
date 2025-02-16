import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronLeft } from 'lucide-react';

const RoleManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [pages, setPages] = useState([]);
  const [roles, setRoles] = useState([]);
const [error, setError] = useState(null);
const [isLoading, setIsLoading] = useState(false);
const [isViewModalOpen, setIsViewModalOpen] = useState(false);
const [viewingRole, setViewingRole] = useState(null);
  const [permissions, setPermissions] = useState([]);


  const entityCode = localStorage.getItem('entityCode');

  // Add handler for view button
const handleViewRole = (role) => {
  setViewingRole(role);
  setIsViewModalOpen(true);
};

  const [editingRole, setEditingRole] = useState(null);
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: {} // Will be populated with page_id as keys
  });
    useEffect(() => {
      const storedPermissions = JSON.parse(
        localStorage.getItem("permissions") || "[]"
      );
      setPermissions(storedPermissions);
      fetchPages();
      fetchRoles();
    }, []);
  useEffect(() => {
    fetchPages();
    fetchRoles();
    return () => {
      setRoles([]);
      setPages([]);
      resetForm();
    };
  }, []);

  // When fetching pages, initialize permissions
  useEffect(() => {
    if (pages.length > 0) {
      const initialPermissions = {};
      pages.forEach(page => {
        initialPermissions[page.page_id] = {
          access_to_add: false,
          access_to_update: false,
          access_to_delete: false
        };
      });
      setNewRole(prev => ({
        ...prev,
        permissions: initialPermissions
      }));
    }
  }, [pages]);

  const fetchPages = async () => {
    try {
      const response = await axios.get('http://localhost:2002/api/pages');
      setPages(response.data);
    } catch (error) {
      console.error('Error fetching pages:', error);
    }
  };

  const fetchRoles = async () => {
    setIsLoading(true);
    try {
        const response = await axios.get(`http://localhost:2002/api/roles/${entityCode}`);
        console.log('Fetched roles:', response.data);
        setRoles(response.data);
    } catch (error) {
        setError('Failed to fetch roles');
        console.error('Error:', error);
    } finally {
        setIsLoading(false);
    }
};
  // Add validation before submit
const validateRole = () => {
  if (!newRole.name.trim()) {
    setError('Role name is required');
    return false;
  }
  return true;
};


  const handleAddRole = async () => {
    if (!validateRole()) return;
    setError(null);
    try {
      const response = await axios.post(`http://localhost:2002/api/roles`, {
        entityId: entityCode,
        roleName: newRole.name,
        description: newRole.description,
        permissions: newRole.permissions,
        crBy: localStorage.getItem('userId')
      });
      
      fetchRoles(); // Refresh roles list
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error adding role:', error);
    }
  };


//  const handleUpdateRole = async () => {
//     if (!validateRole()) return;
//     setError(null);
//     try {
//         await axios.put(`http://localhost:2002/api/roles/${entityCode}/${editingRole.roleId}`, {
//             roleName: newRole.name,
//             permissions: newRole.permissions, // This will now include both selected and deselected permissions
//             moBy: localStorage.getItem('userId')
//         });
        
//         await fetchRoles();
//         resetForm();
//     } catch (error) {
//         setError('Failed to update role');
//         console.error('Error:', error);
//     }
// };

const handleUpdateRole = async () => {
  if (!validateRole()) return;
  setError(null);
  try {
    await axios.put(
      `http://localhost:2002/api/roles/${entityCode}/${editingRole.roleId}`,
      {
        roleName: newRole.name,
        permissions: newRole.permissions, // This will now include both selected and deselected permissions
        moBy: localStorage.getItem("userId")
      }
    );

    await fetchRoles();
    resetForm();
  } catch (error) {
    setError("Failed to update role");
    console.error("Error:", error);
  }
};


  // Add reset form function
const resetForm = () => {
  setIsModalOpen(false);
  setIsEditMode(false);
  setEditingRole(null);
  setNewRole({
    name: '',
    description: '',
    permissions: {}
  });
};

// Add edit role handler
const handleEditRole = (role) => {
  setEditingRole(role);
  setNewRole({
      name: role.roleName,  // Match the database field name
      permissions: role.permissions || {}
  });
  setIsModalOpen(true);
  setIsEditMode(true);
};
// Update permission toggle function
const togglePermission = (pageId, permissionType) => {
  setNewRole(prev => ({
    ...prev,
    permissions: {
      ...prev.permissions,
      [pageId]: {
        ...prev.permissions[pageId],
        [permissionType]: !prev.permissions[pageId][permissionType]
      }
    }
  }));
};

  const handleSelectAll = () => {
    const allSelected = Object.values(newRole.permissions).every(value => value);
    const newPermissions = {};
    Object.keys(newRole.permissions).forEach(key => {
      newPermissions[key] = !allSelected;
    });
    setNewRole(prev => ({
      ...prev,
      permissions: newPermissions
    }));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-orange-800">
            Temple Role Management
          </h1>
          <p className="text-gray-600 text-sm">
            Manage temple staff and seva roles
          </p>
        </div>
        {/* <button
        onClick={() => {
          setIsModalOpen(true);
          setIsEditMode(false);
        }}
        className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
      >
        Add New Temple Role
      </button> */}
        {permissions.some(
          (p) => p.url === "/admin/manage/roles" && p.access_to_add
        ) && (
          <button
            onClick={() => {
              setIsModalOpen(true);
              setIsEditMode(false);
            }}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
          >
            Add New Temple Role
          </button>
        )}
      </div>

      {/* Roles Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-orange-100">
        <table className="min-w-full divide-y divide-orange-200">
          <thead className="bg-orange-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider">
                Role Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider">
                Assigned Responsibilities
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          {/* <tbody className="bg-white divide-y divide-gray-200">
            {roles.length === 0 ? (
    <tr>
        <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
            No roles found
        </td>
    </tr>
):roles.map(role => (
              <tr key={role.roleId} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{role.name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500">{role.description}</div>
                </td>
                <td className="px-6 py-4">
                <div className="text-sm text-gray-500">
    {Object.entries(role.permissions)
      .filter(([pageId, perms]) => perms.access_to_add || perms.access_to_update || perms.access_to_delete)
      .map(([pageId]) => pages.find(page => page.page_id === parseInt(pageId))?.name)
      .join(', ')}
  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => handleEditRole(role)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                   
                    className="text-red-600 hover:text-red-900"
                  >
                  view
                  </button>
                </td>
              </tr>
            ))}
          </tbody> */}
          <tbody className="bg-white divide-y divide-gray-200">
            {roles.map((role) => (
              <tr key={role.roleId} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {role.roleName}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500">
                    {role.isAdmin
                      ? "Admin"
                      : role.isStaff
                      ? "Staff"
                      : "Regular"}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500">
                    {console.log("Role:", role)}
                    {console.log("Pages:", pages)}
                    {console.log("Permissions:", role.permissions)}
                    {pages
                      .filter((page) => {
                        console.log(
                          "Checking page:",
                          page.page_id,
                          role.permissions[page.page_id]
                        );
                        const pagePermissions =
                          role.permissions && role.permissions[page.page_id];
                        return (
                          pagePermissions &&
                          (pagePermissions.access_to_add ||
                            pagePermissions.access_to_update ||
                            pagePermissions.access_to_delete)
                        );
                      })
                      .map((page) => page.name || page.page_name)
                      .join(", ")}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {/* <button
                    onClick={() => handleEditRole(role)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </button> */}

                  {permissions.some(
                    (p) => p.url === "/admin/manage/roles" && p.access_to_update
                  ) && (
                    <button
                      onClick={() => handleEditRole(role)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleViewRole(role)}
                    className="text-red-600 hover:text-red-900"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={() => window.history.back()}
        className="flex items-center mt-6 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
      >
        <ChevronLeft className="w-5 h-5 mr-2" />
        Back
      </button>
      {isViewModalOpen && viewingRole && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl border-2 border-orange-200">
            <h2 className="text-xl font-bold mb-4 text-orange-800">
              Role Details
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role Name
                </label>
                <div className="mt-1 text-gray-900">{viewingRole.roleName}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role Type
                </label>
                <div className="mt-1 text-gray-900">
                  {viewingRole.isAdmin
                    ? "Admin"
                    : viewingRole.isStaff
                    ? "Staff"
                    : "Regular"}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Page Permissions
                </label>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  {pages.map((page) => {
                    const permissions = viewingRole.permissions[page.page_id];
                    if (!permissions) return null;
                    return (
                      <div
                        key={page.page_id}
                        className="p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="font-medium">{page.name}</div>
                        <div className="text-sm text-gray-500">
                          {permissions.access_to_add && <span>Add </span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Role Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl border-2 border-orange-200 m-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-orange-800 sticky top-0 bg-white pb-4">
              {isEditMode ? "Edit Role" : "Add New Role"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role Name
                </label>
                <input
                  type="text"
                  value={newRole.name}
                  onChange={(e) =>
                    setNewRole({ ...newRole, name: e.target.value })
                  }
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={newRole.description}
                  onChange={(e) =>
                    setNewRole({ ...newRole, description: e.target.value })
                  }
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  rows={3}
                />
              </div>

              {/* Page Permissions */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Page Access
                  </label>
                  <button
                    onClick={handleSelectAll}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    {Object.values(newRole.permissions).every((value) => value)
                      ? "Deselect All"
                      : "Select All"}
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {pages.map((page) => (
                    <div
                      key={page.page_id}
                      className="flex flex-col p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="text-sm font-medium text-gray-900">
                        {page.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {page.description}
                      </div>
                      <div className="mt-2 space-y-2">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={
                              newRole.permissions[page.page_id]
                                ?.access_to_add || false
                            }
                            onChange={() =>
                              togglePermission(page.page_id, "access_to_add")
                            }
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <span className="text-sm">Add</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={
                              newRole.permissions[page.page_id]
                                ?.access_to_update || false
                            }
                            onChange={() =>
                              togglePermission(page.page_id, "access_to_update")
                            }
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <span className="text-sm">Update</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setIsEditMode(false);
                    setEditingRole(null);
                    setNewRole({
                      name: "",
                      description: "",
                      permissions: {
                        dashboard: false,
                        devotees: false,
                        donations: false,
                        rituals: false,
                        inventory: false,
                        reports: false,
                        settings: false
                      }
                    });
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={isEditMode ? handleUpdateRole : handleAddRole}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  {isEditMode ? "Update Role" : "Add Role"}
                </button>
              </div>
            </div>
            {/* <button
                    onClick={() => window.history.back()}
                    className="flex items-center mt-6 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                    <ChevronLeft className="w-5 h-5 mr-2" />
                    Back
                </button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleManagement;