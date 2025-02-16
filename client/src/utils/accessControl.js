export const checkPageAccess = async (pageId) => {
  const roleId = localStorage.getItem('role_id');
  const entityCode = localStorage.getItem('entityCode');
  
  const response = await axios.get(`/api/page-access/${entityCode}/${roleId}/${pageId}`);
  return response.data;
};
