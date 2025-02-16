import React, { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import axios from 'axios';
import md5 from 'md5';
const UserManagement = () => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const entityCode = localStorage.getItem('entityCode');
  const [newUser, setNewUser] = useState({
    userId: '',
    userName: '',
    password: '',
    confirmPassword: '',
    roleId: ''
});
const [isViewModalOpen, setIsViewModalOpen] = useState(false);
const [viewingUser, setViewingUser] = useState(null);
 const [permissions, setPermissions] = useState([]);
const handleViewUser = (user) => {
    setViewingUser(user);
    setIsViewModalOpen(true);
};


  const [editingUser, setEditingUser] = useState(null);
  const [passwordError, setPasswordError] = useState('');

 useEffect(() => {
   const storedPermissions = JSON.parse(
     localStorage.getItem("permissions") || "[]"
   );
   setPermissions(storedPermissions);
   fetchUsers();
   fetchRoles();
 }, []);


  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:2002/api/tusers/${entityCode}`);
      setUsers(response.data);
    } catch (error) {
      setError('Failed to fetch users');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get(`http://localhost:2002/api/roles/${entityCode}`);
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const validatePassword = () => {
    if (newUser.password !== newUser.confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    if (newUser.password && newUser.password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return false;
    }
    setPasswordError('');
    return true;
  };
// Update handleAddUser
const handleAddUser = async () => {
  if (!validatePassword()) return;
  
  try {
      const userData = {
          entityId: entityCode,
          userId: newUser.userId.trim(),
          userName: newUser.userName,
          password: md5(newUser.password),
          roleId: parseInt(newUser.roleId),
          crBy: localStorage.getItem('userId')
      };
console.log("sending the user data",userData);
      await axios.post('http://localhost:2002/api/tusers', userData);
      fetchUsers();
      resetForm();
  } catch (error) {
      setError('Failed to add user');
      console.error('Error:', error);
  }
};

// const handleUpdateUser = async () => {
//   if (newUser.password && !validatePassword()) return;

//   try {
//       const userData = {
//         entityId: entityCode, 
//           userId: newUser.userId,
//           userName: newUser.userName,
//           roleId: parseInt(newUser.roleId),
//           moBy: localStorage.getItem('userId')
//       };

//       if (newUser.password) {
//           userData.password = md5(newUser.password);
//       }

//       await axios.put(`http://localhost:2002/api/tusers/${entityCode}/${editingUser.userId}`, userData);
//       fetchUsers();
//       resetForm();
//   } catch (error) {
//       setError('Failed to update user');
//       console.error('Error:', error);
//   }
// };

//  const handleEditUser = (user) => {
//   console.log("Editing user:", user);
//     setIsEditMode(true);
//     setIsModalOpen(true);
//     setEditingUser(user);
//     setNewUser({
//         userId: user.USER_ID,
//         userName: user.USER_NAME,
//         password: '',
//         confirmPassword: '',
//         roleId: user.ROLE_ID.toString()
//     });
// };
const handleEditUser = (user) => {
    console.log("Editing user:", user); // Add this to debug
    setIsEditMode(true);
    setIsModalOpen(true);
    setEditingUser(user);
    setNewUser({
        userId: user.USER_ID,
        userName: user.USER_NAME,
        password: '',
        confirmPassword: '',
        roleId: user.ROLE_ID
    });
};

const handleUpdateUser = async () => {
    if (newUser.password && !validatePassword()) return;

    try {
        const userData = {
            entityId: entityCode,
            userId: editingUser.USER_ID, // Use the original user ID
            userName: newUser.userName,
            roleId: parseInt(newUser.roleId),
            moBy: localStorage.getItem('userId'),
            userActive: editingUser.USER_ACTIVE // Preserve active status
        };

        if (newUser.password && newUser.password.length > 0) {
            userData.password = md5(newUser.password);
        }

        console.log("Updating user with data:", userData); // Add this to debug

        const response = await axios.put(`http://localhost:2002/api/tusers/${entityCode}/${editingUser.USER_ID}`, userData);
        console.log("Update response:", response); // Add this to debug
        
        await fetchUsers(); // Refresh the users list
        setIsModalOpen(false);
        resetForm();
    } catch (error) {
        setError('Failed to update user');
        console.error('Error updating user:', error);
    }
};


  const resetForm = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditingUser(null);
    setNewUser({
        userId: '',
        userName: '',
        password: '',
        confirmPassword: '',
        roleId: ''
    });
    setPasswordError('');
};
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-orange-800">User Management</h1>
        {/* <button
          onClick={() => {
            setIsModalOpen(true);
            setIsEditMode(false);
          }}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
        >
          Add New User
        </button> */}
        {permissions.some(
          (p) => p.url === "/admin/manage/users" && p.access_to_add
        ) && (
          <button
            onClick={() => {
              setIsModalOpen(true);
              setIsEditMode(false);
            }}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
          >
            Add New User
          </button>
        )}
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-orange-100">
        <table className="min-w-full divide-y divide-orange-200">
          <thead className="bg-orange-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider">
                Full Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider">
                Last Login
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-orange-100">
            {users.map((user) => (
              <tr key={user.USER_ID} className="hover:bg-orange-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {user.USER_NAME}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{user.USER_ID}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                    {user.role_name}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.USER_REG_DATE}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.USER_ACTIVE === "Y"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.USER_ACTIVE === "Y" ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {/* <button
                    onClick={() => handleEditUser(user)}
                    className="text-orange-600 hover:text-orange-900 mr-4"
                  >
                    Edit
                  </button> */}
                  {permissions.some(
                    (p) => p.url === "/admin/manage/users" && p.access_to_update
                  ) && (
                    <button
                      onClick={() => handleEditUser(user)}
                      className="text-orange-600 hover:text-orange-900 mr-4"
                    >
                      Edit
                    </button>
                  )}

                  <button
                    onClick={() => handleViewUser(user)}
                    className="text-blue-600 hover:text-blue-900"
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
      {/* View User Modal */}
      {isViewModalOpen && viewingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-orange-800">
              User Details
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <p className="mt-1 p-2 bg-gray-50 rounded-lg">
                  {viewingUser.USER_NAME}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  User ID
                </label>
                <p className="mt-1 p-2 bg-gray-50 rounded-lg">
                  {viewingUser.USER_ID}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <p className="mt-1 p-2 bg-gray-50 rounded-lg">
                  {viewingUser.role_name}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <p className="mt-1 p-2 bg-gray-50 rounded-lg">
                  {viewingUser.USER_ACTIVE === "Y" ? "Active" : "Inactive"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Registration Date
                </label>
                <p className="mt-1 p-2 bg-gray-50 rounded-lg">
                  {viewingUser.USER_REG_DATE}
                </p>
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

      {/* Add/Edit User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-orange-800">
              {isEditMode ? "Edit User" : "Add New User"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={newUser.userName}
                  onChange={(e) =>
                    setNewUser({ ...newUser, userName: e.target.value })
                  }
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  User ID( same id used used in the login page)
                </label>
                <input
                  type="text"
                  value={newUser.userId}
                  onChange={(e) =>
                    setNewUser({ ...newUser, userId: e.target.value })
                  }
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  required={!isEditMode}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={newUser.confirmPassword}
                  onChange={(e) =>
                    setNewUser({ ...newUser, confirmPassword: e.target.value })
                  }
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  required={!isEditMode}
                />
                {passwordError && (
                  <p className="mt-1 text-sm text-red-600">{passwordError}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                {/* <select
        value={newUser.roleId}
        onChange={(e) => setNewUser({ ...newUser, roleId: e.target.value })}
        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
        required
      >
        <option value="">Select a role</option>
        {roles.map(role => (
          <option key={role.roleId} value={role.roleId}>
            {role.roleName}
          </option>
        ))}
      </select> */}
                <select
                  value={newUser.roleId}
                  onChange={(e) =>
                    setNewUser({ ...newUser, roleId: e.target.value })
                  }
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                  required
                >
                  <option value="">Select a role</option>
                  {roles.map((role) => (
                    <option key={role.roleId} value={role.roleId}>
                      {role.roleName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={resetForm}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={isEditMode ? handleUpdateUser : handleAddUser}
                  className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700"
                >
                  {isEditMode ? "Update User" : "Add User"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default UserManagement;