import React, { useState, useEffect } from 'react';
import { Menu, X, BarChart3, Users, Calendar, Filter, Search, ChevronDown, FileText, Bookmark, ChevronLeft } from 'lucide-react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { CSVLink } from 'react-csv';
import Papa from 'papaparse';


const ManageStatistics = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState("statistics");
  const [searchTerm, setSearchTerm] = useState("");
  const [previousView, setPreviousView] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(null);
  const [sevadhars, setSevadhars] = useState([]);
  const [maasaOptions, setMaasaOptions] = useState([]);
  const [tithiOptions, setTithiOptions] = useState([]);
  const [panchangaDetails, setPanchangaDetails] = useState(null);
  const [selectedReportType, setSelectedReportType] = useState("seva");
  const [permissions,setPermissions]=useState([]);

  // Add new state variables
  const [reportConfig, setReportConfig] = useState({
    sevaType: "all",
    startDate: "",
    endDate: "",
    format: "pdf",
    sevadharId: "",
    sevadharSevaType: "",
    sevadharStartDate: "",
    sevadharEndDate: "",
    sevadharFormat: "pdf"
  });
  const [reportData, setReportData] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const [statistics, setStatistics] = useState({
    overview: null,
    trends: null
  });
  const [selectedDevotee, setSelectedDevotee] = useState(null);
  // Add these state variables at the top with other state declarations
  const [monthFilter, setMonthFilter] = useState("");
  const [dateRange, setDateRange] = useState({
    filterType: "gregorian", // or 'panchanga'
    dd: "",
    mm: "",
    maasa: "",
    paksha: "",
    tithi: ""
  });

  // Add this function to fetch panchanga details



  const fetchPanchangaDetails = async (date) => {
    try {
      const response = await axios.get(
        `http://localhost:2002/api/panchanga/details/${date}`
      );
      console.log("Panchanga response:", response.data);
      setPanchangaDetails(response.data);
    } catch (error) {
      console.error("Error fetching panchanga details:", error);
    }
  };

  const [sevadarSearchTerm, setSevadarSearchTerm] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [showSevaDropdown, setShowSevaDropdown] = useState(false);
  const [selectedSevaType, setSelectedSevaType] = useState(null);
  const [showDateFilter, setShowDateFilter] = useState(false);

  const [sevas, setSevas] = useState([]);

  const [nityanidhiSevas, setNityanidhiSevas] = useState([]);
  const [hoveredDevotee, setHoveredDevotee] = useState(null);
  const [shashwathSevas, setShashwathSevas] = useState([]);
  // Add state
  const [otherSevas, setOtherSevas] = useState([]);

  // Existing user context and form data state
  const [userContext, setUserContext] = useState({
    entityCode: "",
    userId: ""
  });
  const [formData, setFormData] = useState({
    CUST_NAME: "",
    CUST_GENDER: "M",
    CUST_MOBILE_NUM1: "",
    CUST_EMAIL_ID1: "",
    CUST_RES_ADDRESS1: "",
    CUST_RES_CITY: "",
    is_enabled: true
  });

  // Seva types
  const sevaTypes = ["Sashwath Seva", "Nityanidhi Seva", "Other Seva"];

  // Add useEffect to fetch statistics when component mounts
  useEffect(() => {
    if (activeView === "statistics") {
      fetchStatistics();
    }
  }, [activeView]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [maasaResponse, tithiResponse] = await Promise.all([
          axios.get("http://localhost:2002/maasa"),
          axios.get("http://localhost:2002/tithi")
        ]);
        setMaasaOptions(maasaResponse.data);
        setTithiOptions(tithiResponse.data);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };
    fetchOptions();
  }, []);

  useEffect(()=>{
const storedPermissions=JSON.parse(localStorage.getItem("permissions")||[]);
setPermissions(storedPermissions);
  },[]);

  useEffect(() => {
    const entityCode = localStorage.getItem("entityCode");
    const userId = localStorage.getItem("userId");
    setUserContext({ entityCode, userId });
  }, []);
  // Add console logs in the search effect
  useEffect(() => {
    const fetchFilteredSevadars = async () => {
      console.log("Fetching with search term:", sevadarSearchTerm);
      setIsLoading(true);
      if (userContext.entityCode) {
        try {
          const response = await axios.get(
            `http://localhost:2002/api/sevadhar`,
            {
              params: {
                entityCode: userContext.entityCode,
                searchTerm: sevadarSearchTerm
              }
            }
          );
          console.log("Received filtered data:", response.data);
          setSevadhars(response.data);
        } catch (error) {
          console.error("Error fetching sevadhars:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchFilteredSevadars();
  }, [sevadarSearchTerm, userContext.entityCode]);

  useEffect(() => {
    const fetchPanchangaData = async () => {
      console.log("Date Range Changed:", dateRange);

      if (
        dateRange.filterType === "gregorian" &&
        dateRange.dd &&
        dateRange.mm
      ) {
        const year = new Date().getFullYear();
        const fullDate = `${year}-${dateRange.mm
          .toString()
          .padStart(2, "0")}-${dateRange.dd.toString().padStart(2, "0")}`;
        console.log("Fetching panchanga for date:", fullDate);
        await fetchPanchangaDetails(fullDate);
      } else if (
        dateRange.filterType === "panchanga" &&
        dateRange.maasa &&
        dateRange.paksha &&
        dateRange.tithi
      ) {
        console.log("Fetching ritual date for:", {
          maasa: dateRange.maasa,
          paksha: dateRange.paksha,
          tithi: dateRange.tithi
        });
        await fetchRitualDate(
          dateRange.maasa,
          dateRange.paksha,
          dateRange.tithi
        );
      }
    };

    fetchPanchangaData();
  }, [dateRange]);

  useEffect(() => {
    if (selectedSevaType && searchTerm) {
      const fetchFilteredSevas = async () => {
        try {
          if (selectedSevaType === "Nityanidhi Seva") {
            const response = await axios.get(
              `http://localhost:2002/api/nityanidhi`,
              {
                params: {
                  entityCode: userContext.entityCode,
                  searchTerm,
                  startDate: dateRange.start,
                  endDate: dateRange.end
                }
              }
            );
            setNityanidhiSevas(response.data);
          } else if (selectedSevaType === "Sashwath Seva") {
            const response = await axios.get(
              `http://localhost:2002/api/shashwath`,
              {
                params: {
                  entityCode: userContext.entityCode,
                  searchTerm,
                  month: dateRange.month
                }
              }
            );
            setShashwathSevas(response.data);
          } else if (selectedSevaType === "Other Seva") {
            const response = await axios.get(
              `http://localhost:2002/api/other`,
              {
                params: {
                  entityCode: userContext.entityCode,
                  searchTerm,
                  startDate: dateRange.start,
                  endDate: dateRange.end
                }
              }
            );
            setOtherSevas(response.data);
          }
        } catch (error) {
          console.error("Error fetching filtered sevas:", error);
        }
      };

      const timeoutId = setTimeout(() => {
        fetchFilteredSevas();
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, [searchTerm, selectedSevaType, userContext.entityCode, dateRange]);

  useEffect(() => {
    const fetchSevadhars = async () => {
      if (userContext.entityCode) {
        try {
          const response = await axios.get(
            `http://localhost:2002/api/sevadhar`,
            {
              params: { entityCode: userContext.entityCode }
            }
          );
          setSevadhars(response.data);
        } catch (error) {
          console.error("Error fetching sevadhars:", error);
        }
      }
    };

    fetchSevadhars();
  }, [userContext.entityCode]);

  const handleApplyFilter = async () => {
    if (selectedSevaType === "Sashwath Seva") {
      const filters =
        dateRange.filterType === "gregorian"
          ? {
              dd: dateRange.dd,
              mm: dateRange.mm
            }
          : {
              maasa: dateRange.maasa,
              paksha: dateRange.paksha,
              tithi: dateRange.tithi
            };

      const response = await axios.get(`http://localhost:2002/api/shashwath`, {
        params: {
          entityCode: userContext.entityCode,
          ...filters
        }
      });
      setShashwathSevas(response.data);
    } else if (selectedSevaType === "Nityanidhi Seva") {
      const response = await axios.get(`http://localhost:2002/api/nityanidhi`, {
        params: {
          entityCode: userContext.entityCode,
          startDate: dateRange.start,
          endDate: dateRange.end
        }
      });
      setNityanidhiSevas(response.data);
    } else if (selectedSevaType === "Other Seva") {
      const response = await axios.get(`http://localhost:2002/api/other`, {
        params: {
          entityCode: userContext.entityCode,
          startDate: dateRange.start,
          endDate: dateRange.end
        }
      });
      setOtherSevas(response.data);
    }
  };

  const fetchStatistics = async () => {
    try {
      const [overviewRes, trendsRes] = await Promise.all([
        axios.get(`http://localhost:2002/api/stats/overview`, {
          params: { entityCode: userContext.entityCode }
        }),
        axios.get(`http://localhost:2002/api/stats/trends`, {
          params: { entityCode: userContext.entityCode }
        })
      ]);
      setStatistics({
        overview: overviewRes.data,
        trends: trendsRes.data
      });
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  const fetchNityanidhiSevas = async () => {
    try {
      const response = await axios.get(`http://localhost:2002/api/nityanidhi`, {
        params: { entityCode: userContext.entityCode }
      });
      setNityanidhiSevas(response.data);
    } catch (error) {
      console.error("Error fetching Nityanidhi sevas:", error);
    }
  };

  // Add fetch function
  const fetchShashwathSevas = async () => {
    try {
      const response = await axios.get(`http://localhost:2002/api/shashwath`, {
        params: { entityCode: userContext.entityCode }
      });
      setShashwathSevas(response.data);
    } catch (error) {
      console.error("Error fetching Shashwath sevas:", error);
    }
  };

  // Add fetch function
  const fetchOtherSevas = async () => {
    try {
      const response = await axios.get(`http://localhost:2002/api/other`, {
        params: { entityCode: userContext.entityCode }
      });
      setOtherSevas(response.data);
    } catch (error) {
      console.error("Error fetching Other sevas:", error);
    }
  };
  // Existing handler functions
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditMode(null);
    setFormData({
      CUST_NAME: "",
      CUST_GENDER: "M",
      CUST_MOBILE_NUM1: "",
      CUST_EMAIL_ID1: "",
      CUST_RES_ADDRESS1: "",
      CUST_RES_CITY: "",
      is_enabled: true
    });
  };

  const addOrEditSevadhar = async (e) => {
    e.preventDefault();

    const payload = {
      CUST_NAME: formData.CUST_NAME,
      CUST_GENDER: formData.CUST_GENDER,
      CUST_MOBILE_NUM1: formData.CUST_MOBILE_NUM1,
      CUST_EMAIL_ID1: formData.CUST_EMAIL_ID1,
      CUST_RES_ADDRESS1: formData.CUST_RES_ADDRESS1,
      CUST_RES_CITY: formData.CUST_RES_CITY,
      ENTITY_CODE: Number(userContext.entityCode),
      is_enabled: 1
    };

    try {
      if (editMode) {
        const updatePayload = {
          ...payload,
          MO_BY: userContext.userId,
          MO_ON: new Date().toISOString()
        };
        await axios.put(
          `http://localhost:2002/api/sevadhar/${userContext.entityCode}/${editMode}`,
          updatePayload
        );
      } else {
        payload.CR_BY = userContext.userId;
        payload.CR_ON = new Date().toISOString();
        await axios.post("http://localhost:2002/api/sevadhar", payload);
      }

      const response = await axios.get(
        `http://localhost:2002/api/sevadhar?entityCode=${userContext.entityCode}`
      );
      setSevadhars(response.data);
      closeModal();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const generateReport = async () => {
    setIsGenerating(true);
    try {
      const response = await axios.get(
        `http://localhost:2002/api/reports/combined`,
        {
          params: {
            entityCode: userContext.entityCode,
            startDate: reportConfig.startDate,
            endDate: reportConfig.endDate,
            sevaType: reportConfig.sevaType.toLowerCase()
          }
        }
      );
      setReportData(response.data);
    } catch (error) {
      console.error("Error generating report:", error);
    }
    setIsGenerating(false);
  };

  // Add async keyword to make it an async function

  const handleEdit = (custCode) => {
    const sevadhar = sevadhars.find((s) => s.CUST_CODE === custCode);
    if (sevadhar) {
      setFormData({
        CUST_NAME: sevadhar.CUST_NAME,
        CUST_GENDER: sevadhar.CUST_GENDER,
        CUST_MOBILE_NUM1: sevadhar.CUST_MOBILE_NUM1,
        CUST_EMAIL_ID1: sevadhar.CUST_EMAIL_ID1,
        CUST_RES_ADDRESS1: sevadhar.CUST_RES_ADDRESS1,
        CUST_RES_CITY: sevadhar.CUST_RES_CITY
      });
      setEditMode(custCode);
      setIsModalOpen(true);
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleNavigate = (view) => {
    setPreviousView(activeView);
    setActiveView(view);
    if (view === "sevas") {
      setSelectedSevaType(null);
    }
  };

  const renderMonthlyTrends = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-orange-600 text-white">
            <tr>
              <th className="p-3 text-left">Month</th>
              <th className="p-3 text-left">Total Bookings</th>
              <th className="p-3 text-left">Total Revenue</th>
            </tr>
          </thead>
          <tbody>
            {statistics.trends?.map((trend, index) => (
              <tr key={index} className="border-b">
                <td className="p-3">
                  {new Date(trend.month + "-01").toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric"
                  })}
                </td>
                <td className="p-3">{trend.total_bookings}</td>
                <td className="p-3">₹{trend.total_revenue.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );


   const downloadSevadharPDF = (data) => {
    const doc = new jsPDF();
    const selectedSevadhar = sevadhars.find(
      (s) => s.CUST_CODE === parseInt(reportConfig.sevadharId)
    );

    // Header
    doc.setFontSize(16);
    doc.text("Sevadhar Seva Report", 14, 15);

    // Sevadhar Details
    doc.setFontSize(12);
    doc.text(`Name: ${selectedSevadhar?.CUST_NAME || ""}`, 14, 25);
    doc.text(`Mobile: ${selectedSevadhar?.CUST_MOBILE_NUM1 || ""}`, 14, 35);
    doc.text(
      `Period: ${reportConfig.sevadharStartDate} to ${reportConfig.sevadharEndDate}`,
      14,
      45
    );

    // Table data
    const columns = ["Seva Name", "Amount", "Date", "Status"];
    const rows = data.map((item) => [
      item.SEVA_NAME,
      `₹${item.NSD_TOT_SEVA_AMT || item.SSD_TOT_SEVA_AMT}`,
      new Date(item.NSD_SEVA_DATE || item.SSD_RECPT_DATE).toLocaleDateString(),
      item.NSD_CLEARING_DATE || item.SSD_CLEARING_DATE ? "Cleared" : "Pending"
    ]);

    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 55,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [241, 90, 35] }
    });

    doc.save(`sevadhar-report-${selectedSevadhar?.CUST_NAME}.pdf`);
  };

  // Update handleSevaTypeSelect
  const handleSevaTypeSelect = async (sevaType) => {
    setSelectedSevaType(sevaType);
    setShowSevaDropdown(false);
    if (sevaType === "Sashwath Seva") {
      await fetchShashwathSevas();
    } else if (sevaType === "Nityanidhi Seva") {
      await fetchNityanidhiSevas();
    } else if (sevaType === "Other Seva") {
      await fetchOtherSevas();
    }
  };

const downloadPDF = () => {
  const doc = new jsPDF();

  // Simple header
  doc.setFontSize(12);
  doc.text("Temple Seva Report", 14, 15);
  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 22);
  doc.text(
    `Period: ${reportConfig.startDate} to ${reportConfig.endDate}`,
    14,
    29
  );

  // Table configuration
  const columns = [
    "Seva Type",
    "Devotee",
    "Seva Name",
    "Amount",
    "Date",
    "Status"
  ];

  const data = reportData.map((item) => [
    item.seva_type,
    item.CUST_NAME,
    item.SEVA_NAME,
    `₹${item.NSD_TOT_SEVA_AMT}`,
    new Date(item.SEVA_DATE).toLocaleDateString(),
    item.NSD_CLEARING_DATE ? "Cleared" : "Pending"
  ]);

  // Generate table with simple styling
  doc.autoTable({
    head: [columns],
    body: data,
    startY: 35,
    styles: {
      fontSize: 8,
      cellPadding: 2,
      lineColor: [0, 0, 0],
      lineWidth: 0.1
    },
    headStyles: {
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      fontStyle: "bold"
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245]
    }
  });

  doc.save("temple-seva-report.pdf");
};


  const fetchRitualDate = async (maasa, paksha, tithi) => {
    try {
      const response = await axios.get(
        `http://localhost:2002/api/panchanga/ritual`,
        {
          params: {
            maasa,
            paksha,
            tithi
          }
        }
      );
      setPanchangaDetails(response.data);
    } catch (error) {
      console.error("Error fetching ritual date:", error);
    }
  };

  // Add this JSX in your statistics section
  const renderReportSection = () => (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h3 className="text-xl font-bold text-gray-800 mb-6">
        Seva Report Generator
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Seva Type
          </label>

          <select
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            value={reportConfig.sevaType}
            onChange={(e) =>
              setReportConfig({ ...reportConfig, sevaType: e.target.value })
            }
          >
            <option value="all">All Sevas</option>
            <option value="Shashwath">Shashwath Seva</option>
            <option value="Nityanidhi">Nityanidhi Seva</option>
            <option value="Other">Other Seva</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Start Date
          </label>
          <input
            type="date"
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            value={reportConfig.startDate}
            onChange={(e) =>
              setReportConfig({ ...reportConfig, startDate: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            End Date
          </label>
          <input
            type="date"
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            value={reportConfig.endDate}
            onChange={(e) =>
              setReportConfig({ ...reportConfig, endDate: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Report Format
          </label>
          <select
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            value={reportConfig.format}
            onChange={(e) =>
              setReportConfig({ ...reportConfig, format: e.target.value })
            }
          >
            <option value="pdf">PDF Report</option>
            <option value="csv">CSV Export</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          onClick={generateReport}
          disabled={isGenerating}
          className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isGenerating ? "Generating..." : "Generate Report"}
        </button>
        {permissions.some(p=>p.url=='/admin/manage/statistics'&&p.access_to_update)&&( 
        <div>
        {reportData.length > 0 &&
          (reportConfig.format === "pdf" ? (
            <button
              onClick={downloadPDF}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Download PDF
            </button>
          ) : (
            <CSVLink
              data={reportData}
              filename="temple-seva-report.csv"
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-center"
            >
              Download CSV
            </CSVLink>
              
          ))}
          </div>
          )} 
      </div>
     

      {reportData.length > 0 && (
        <div className="mt-8">
          <h4 className="text-lg font-semibold mb-4">Preview</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Seva Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Devotee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Seva Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reportData.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.seva_type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.CUST_NAME}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.SEVA_NAME}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      ₹{item.NSD_TOT_SEVA_AMT}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(item.SEVA_DATE).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          item.NSD_CLEARING_DATE
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {item.NSD_CLEARING_DATE ? "Cleared" : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );

  const renderDateFilter = () => {
    if (selectedSevaType === "Sashwath Seva") {
      return (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-500">From:</span>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) =>
                setDateRange((prev) => ({ ...prev, start: e.target.value }))
              }
              className="border border-gray-200 rounded-lg px-4 py-2"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">To:</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) =>
                setDateRange((prev) => ({ ...prev, end: e.target.value }))
              }
              className="border border-gray-200 rounded-lg px-4 py-2"
            />
          </div>

          <select
            value={dateRange.maasa || ""}
            onChange={(e) =>
              setDateRange((prev) => ({ ...prev, maasa: e.target.value }))
            }
            className="border rounded-lg px-4 py-2"
          >
            <option value="">Select Maasa</option>
            {maasaOptions.map((maasa) => (
              <option key={maasa.RASHI_CODE} value={maasa.RASHI_CODE}>
                {maasa.RASHI_DESC}
              </option>
            ))}
          </select>
          <select
            value={dateRange.paksha || ""}
            onChange={(e) =>
              setDateRange((prev) => ({ ...prev, paksha: e.target.value }))
            }
            className="border rounded-lg px-4 py-2"
          >
            <option value="">Select Paksha</option>
            <option value="S">Shukla Paksha</option>
            <option value="K">Krishna Paksha</option>
          </select>
          <select
            value={dateRange.tithi || ""}
            onChange={(e) =>
              setDateRange((prev) => ({ ...prev, tithi: e.target.value }))
            }
            className="border rounded-lg px-4 py-2"
          >
            <option value="">Select Tithi</option>
            {tithiOptions.map((tithi) => (
              <option key={tithi.TITHI_CODE} value={tithi.TITHI_CODE}>
                {tithi.TITHI_DESC}
              </option>
            ))}
          </select>
          <button
            onClick={handleApplyFilter}
            className="bg-orange-600 text-white px-6 py-2.5 rounded-lg hover:bg-orange-700"
          >
            Apply Filter
          </button>
          {panchangaDetails && (
            <div className="mt-4 p-6 bg-orange-50 rounded-lg shadow-sm">
              <h4 className="font-semibold text-orange-800 mb-4 text-lg">
                Panchanga Details for Selected Date
              </h4>
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <span className="text-gray-600 block mb-1">Maasa:</span>
                  <span className="font-medium text-lg">
                    {panchangaDetails.MAASA}
                  </span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <span className="text-gray-600 block mb-1">Tithi:</span>
                  <span className="font-medium text-lg">
                    {panchangaDetails.TITHI}
                  </span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <span className="text-gray-600 block mb-1">Paksha:</span>
                  <span className="font-medium text-lg">
                    {panchangaDetails.PAKSHA === "S" ? "Shukla" : "Krishna"}
                  </span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <span className="text-gray-600 block mb-1">Nakshatra:</span>
                  <span className="font-medium text-lg">
                    {panchangaDetails.NAKSHATRA}
                  </span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <span className="text-gray-600 block mb-1">Ayana:</span>
                  <span className="font-medium text-lg">
                    {panchangaDetails.AAYANA}
                  </span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <span className="text-gray-600 block mb-1">Day:</span>
                  <span className="font-medium text-lg">
                    {panchangaDetails.DAY}
                  </span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm col-span-3">
                  <span className="text-gray-600 block mb-1">Date:</span>
                  <span className="font-medium text-lg">
                    {new Date(panchangaDetails.CAL_DATE).toLocaleDateString(
                      "en-IN",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      }
                    )}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-4">
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) =>
              setDateRange((prev) => ({ ...prev, start: e.target.value }))
            }
            className="border rounded-lg px-4 py-2"
          />
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) =>
              setDateRange((prev) => ({ ...prev, end: e.target.value }))
            }
            className="border rounded-lg px-4 py-2"
          />
          <button
            onClick={handleApplyFilter}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
          >
            Apply Filter
          </button>
        </div>
      );
    }
  };

  const renderOtherSevaTable = () => {
    const filteredSevas = filterSevasBySearch(otherSevas, searchTerm);
    return (
      <div className="mt-6">
        <table className="w-full bg-white rounded-lg shadow">
          <thead className="bg-orange-600 text-white">
            <tr>
              <th className="p-3 text-left">Customer Name</th>
              <th className="p-3 text-left">Mobile</th>
              <th className="p-3 text-left">Seva Names</th>
              <th className="p-3 text-left">Deity Names</th>
              <th className="p-3 text-left">Seva Date</th>
              <th className="p-3 text-left">Total Amount</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {otherSevas.map((seva) => (
              <tr
                key={`${seva.NSD_CUST_CODE}-${seva.NSD_CODE}`}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-3">
                  <span
                    onClick={() => setSelectedDevotee(seva)}
                    className="cursor-pointer text-blue-600 hover:text-blue-800"
                  >
                    {seva.CUST_NAME}
                  </span>
                </td>
                <td className="p-3">{seva.CUST_MOBILE_NUM1}</td>
                <td className="p-3">{seva.SEVA_NAME}</td>
                <td className="p-3">{seva.DEITY_NAME}</td>
                <td className="p-3">
                  {new Date(seva.NSD_SEVA_DATE).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                  })}
                </td>
                <td className="p-3">₹{seva.TOTAL_AMOUNT}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      seva.CLEARING_DATES
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {seva.CLEARING_DATES ? "Cleared" : "Pending"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderSevadharsTable = () => {
    const filteredData = sevadhars.filter((sevadhar) => {
      const searchTerm = sevadarSearchTerm.toLowerCase();
      return (
        sevadhar.CUST_NAME.toLowerCase().includes(searchTerm) ||
        (sevadhar.CUST_MOBILE_NUM1 &&
          sevadhar.CUST_MOBILE_NUM1.toString().includes(searchTerm)) ||
        (sevadhar.CUST_EMAIL_ID1 &&
          sevadhar.CUST_EMAIL_ID1.toLowerCase().includes(searchTerm)) ||
        (sevadhar.CUST_RES_CITY &&
          sevadhar.CUST_RES_CITY.toLowerCase().includes(searchTerm))
      );
    });

    return (
      <div className="overflow-x-auto">
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, mobile, email or city..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={sevadarSearchTerm}
              onChange={(e) => setSevadarSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <table className="w-full">
          <thead className="bg-orange-600 text-white">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Mobile</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">City</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((sevadhar) => (
                <tr key={sevadhar.CUST_CODE} className="border-b">
                  <td className="p-2">{sevadhar.CUST_NAME}</td>
                  <td className="p-2">{sevadhar.CUST_MOBILE_NUM1}</td>
                  <td className="p-2">{sevadhar.CUST_EMAIL_ID1}</td>
                  <td className="p-2">{sevadhar.CUST_RES_CITY}</td>
                  <td className="p-2">
                    {permissions.some(p=>p.url==='/admin/manage/statistics' && p.access_to_update)&&(
                    <button
                      onClick={() => handleEdit(sevadhar.CUST_CODE)}
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600 transition-colors"
                    >
                      Edit
                    </button>)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No sevadhars found matching your search criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };
  const renderStatisticsOverview = () => (
    <div className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {statistics.overview?.map((stat) => (
          <div
            key={stat.seva_type}
            className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-orange-600">
                {stat.seva_type} Seva
              </h3>
              {stat.seva_type === "Nityanidhi" && (
                <Calendar className="w-6 h-6 text-orange-500" />
              )}
              {stat.seva_type === "Shashwath" && (
                <Bookmark className="w-6 h-6 text-orange-500" />
              )}
              {stat.seva_type === "Other" && (
                <FileText className="w-6 h-6 text-orange-500" />
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Total Sevas</p>
                <p className="text-3xl font-bold text-orange-600">
                  {stat.total_sevas}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                  <p className="text-xl font-semibold text-gray-800">
                    ₹{stat.total_amount?.toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Unique Devotees</p>
                  <p className="text-xl font-semibold text-gray-800">
                    {stat.unique_devotees}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderShashwathSevaTable = () => {
    const filteredSevas = filterSevasBySearch(shashwathSevas, searchTerm);
    return (
      <div className="mt-6">
        <table className="w-full bg-white rounded-lg shadow">
          <thead className="bg-orange-600 text-white">
            <tr>
              <th className="p-3 text-left">Customer Name</th>
              <th className="p-3 text-left">In Memory</th>
              <th className="p-3 text-left">Seva Name</th>
              <th className="p-3 text-left">Deity Name</th>
              <th className="p-3 text-left">Date/Month</th>
              <th className="p-3 text-left">Maasa</th>
              <th className="p-3 text-left">Thithi</th>
              <th className="p-3 text-left">Paksha</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {shashwathSevas.map((seva) => (
              <tr
                key={`${seva.SS_CUST_CODE}-${seva.SS_CODE}`}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-3">
                  <span
                    className="cursor-pointer text-blue-600 hover:text-blue-800"
                    onClick={() => setSelectedDevotee(seva)}
                  >
                    {seva.CUST_NAME}
                  </span>
                </td>
                <td className="p-3">{seva.SS_IN_MEMORY}</td>
                <td className="p-3">{seva.SEVA_NAME}</td>
                <td className="p-3">{seva.DEITY_NAME}</td>
                {/* <td className="p-3">{seva.SSD_DD}/{seva.SSD_MM}</td> */}
                <td className="p-3">
                  {seva.SSD_DD?.toString().padStart(2, "0")}/
                  {seva.SSD_MM?.toString().padStart(2, "0")}
                </td>

                <td className="p-3">{seva.MAASA_NAME}</td>
                <td className="p-3">{seva.TITHI_NAME}</td>

                <td className="p-3">
                  {seva.SSD_PAKSHA === "S"
                    ? "Shukla Paksha"
                    : seva.SSD_PAKSHA === "K"
                    ? "Krishna Paksha"
                    : "-"}
                </td>

                <td className="p-3">₹{seva.SSD_TOT_SEVA_AMT}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      seva.SSD_CLEARING_DATE
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {seva.SSD_CLEARING_DATE ? "Cleared" : "Pending"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const filterSevadhars = (sevadhars, searchTerm) => {
    if (!searchTerm) return sevadhars;

    const searchLower = searchTerm.toLowerCase();
    return sevadhars.filter(
      (sevadhar) =>
        sevadhar.CUST_NAME.toLowerCase().includes(searchLower) ||
        (sevadhar.CUST_MOBILE_NUM1 &&
          sevadhar.CUST_MOBILE_NUM1.toLowerCase().includes(searchLower)) ||
        (sevadhar.CUST_EMAIL_ID1 &&
          sevadhar.CUST_EMAIL_ID1.toLowerCase().includes(searchLower)) ||
        (sevadhar.CUST_RES_CITY &&
          sevadhar.CUST_RES_CITY.toLowerCase().includes(searchLower))
    );
  };

  const filterSevasBySearch = (sevas, searchTerm) => {
    if (!searchTerm) return sevas;
    const lowerSearchTerm = searchTerm.toLowerCase();

    return sevas.filter(
      (seva) =>
        seva.CUST_NAME?.toLowerCase().includes(lowerSearchTerm) ||
        seva.CUST_MOBILE_NUM1?.includes(searchTerm) ||
        seva.SEVA_NAME?.toLowerCase().includes(lowerSearchTerm) ||
        seva.DEITY_NAME?.toLowerCase().includes(lowerSearchTerm)
    );
  };

  const DevoteeCard = ({ devotee, onClose }) => {
    const getAllDetails = () => {
      const details = `
Devotee Details:
----------------
Name: ${devotee.CUST_NAME}

Contact Information:
------------------
Mobile: ${devotee.CUST_MOBILE_NUM1 || "N/A"}
Email: ${devotee.CUST_EMAIL_ID1 || "N/A"}

Address:
--------
${devotee.CUST_RES_ADDRESS1 || ""}
${devotee.CUST_RES_ADDRESS2 || ""}
${devotee.CUST_RES_ADDRESS3 || ""}
${[
  devotee.CUST_RES_CITY,
  devotee.CUST_RES_STATE,
  devotee.CUST_RES_COUNTRY,
  devotee.CUST_RES_PIN_NUM
]
  .filter(Boolean)
  .join(", ")}
      `.trim();

      navigator.clipboard.writeText(details);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-2xl p-8 w-[500px] relative max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-2xl text-orange-600">
              {devotee.CUST_NAME}
            </h3>
            <div className="flex gap-2">
              <button
                onClick={getAllDetails}
                className="bg-orange-100 text-orange-600 px-4 py-2 rounded-lg hover:bg-orange-200 transition-colors flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Copy All Details
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-700 mb-3">
                Contact Details
              </h4>
              <div className="space-y-2">
                <p>
                  <span className="text-gray-600">Mobile:</span>{" "}
                  {devotee.CUST_MOBILE_NUM1 || "N/A"}
                </p>
                <p>
                  <span className="text-gray-600">Email:</span>{" "}
                  {devotee.CUST_EMAIL_ID1 || "N/A"}
                </p>
              </div>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-700 mb-3">Address</h4>
              <div className="space-y-1">
                <p>{devotee.CUST_RES_ADDRESS1}</p>
                <p>{devotee.CUST_RES_ADDRESS2}</p>
                <p>{devotee.CUST_RES_ADDRESS3}</p>
                <p className="text-gray-600">
                  {[
                    devotee.CUST_RES_CITY,
                    devotee.CUST_RES_STATE,
                    devotee.CUST_RES_COUNTRY,
                    devotee.CUST_RES_PIN_NUM
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderNityanidhiTable = () => {
    const filteredSevas = filterSevasBySearch(nityanidhiSevas, searchTerm);
    return (
      <div className="mt-6">
        <table className="w-full bg-white rounded-lg shadow">
          <thead className="bg-orange-600 text-white">
            <tr>
              <th className="p-3 text-left">Customer Name</th>
              <th className="p-3 text-left">Mobile</th>
              <th className="p-3 text-left">Seva Names</th>
              <th className="p-3 text-left">Deity Names</th>
              <th className="p-3 text-left">Seva Date</th>
              <th className="p-3 text-left">Total Amount</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {nityanidhiSevas.map((seva) => (
              <tr
                key={`${seva.NS_CUST_CODE}-${seva.NS_CODE}`}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-3">
                  <span
                    onClick={() => setSelectedDevotee(seva)}
                    className="cursor-pointer text-blue-600 hover:text-blue-800"
                  >
                    {seva.CUST_NAME}
                  </span>
                </td>
                <td className="p-3">{seva.CUST_MOBILE_NUM1}</td>
                <td className="p-3">{seva.SEVA_NAME}</td>
                <td className="p-3">{seva.DEITY_NAME}</td>
                <td className="p-3">
                  {new Date(seva.NS_SEVA_DATE).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                  })}
                </td>
                <td className="p-3">₹{seva.TOTAL_AMOUNT}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      seva.CLEARING_DATES
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {seva.CLEARING_DATES ? "Cleared" : "Pending"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  // Add this function in the component
  const generateSevadharReport = async () => {
    setIsGenerating(true);
    try {
      console.log("Sending request with params:", {
        entityCode: userContext.entityCode,
        sevadharId: reportConfig.sevadharId,
        sevaType: reportConfig.sevadharSevaType,
        startDate: reportConfig.sevadharStartDate,
        endDate: reportConfig.sevadharEndDate
      });

      const response = await axios.get(
        `http://localhost:2002/api/reports/sevadhar`,
        {
          params: {
            entityCode: userContext.entityCode,
            sevadharId: reportConfig.sevadharId,
            sevaType: reportConfig.sevadharSevaType,
            startDate: reportConfig.sevadharStartDate,
            endDate: reportConfig.sevadharEndDate
          }
        }
      );

      console.log("API Response:", response.data);
      if (Array.isArray(response.data)) {
        setReportData(response.data);
      } else {
        setReportData([]);
      }
    } catch (error) {
      console.error("Error generating sevadhar report:", error);
      setReportData([]);
    }
    setIsGenerating(false);
  };

  // Add this helper function for PDF generation
const generateSevadharPDF = (data) => {
  const doc = new jsPDF();
  const selectedSevadhar = sevadhars.find(s => s.CUST_CODE === parseInt(reportConfig.sevadharId));

  // Simple header
  doc.setFontSize(12);
  doc.text("Sevadhar Report", 14, 15);
  
  // Sevadhar info
  doc.setFontSize(10);
  doc.text(`Name: ${selectedSevadhar?.CUST_NAME || ""}`, 14, 25);
  doc.text(`Mobile: ${selectedSevadhar?.CUST_MOBILE_NUM1 || ""}`, 14, 32);
  doc.text(`Period: ${reportConfig.sevadharStartDate} to ${reportConfig.sevadharEndDate}`, 14, 39);

  // Table configuration
  const columns = ["Seva Name", "Amount", "Date", "Status"];
  const rows = data.map(item => [
    item.SEVA_DESC,
    `₹${item.TOTAL_AMOUNT}`,
    new Date(item.SSD_RECPT_DATE || item.NSD_RECPT_DATE).toLocaleDateString(),
    item.CLEARING_DATE ? "Cleared" : "Pending"
  ]);

  // Generate table with simple styling
  doc.autoTable({
    head: [columns],
    body: rows,
    startY: 45,
    styles: {
      fontSize: 8,
      cellPadding: 2,
      lineColor: [0, 0, 0],
      lineWidth: 0.1
    },
    headStyles: {
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      fontStyle: 'bold'
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245]
    }
  });

  doc.save(`sevadhar-report-${selectedSevadhar?.CUST_NAME}.pdf`);
};


  // Add this helper function for CSV download
  const downloadSevadharCSV = (data) => {
    const csvData = data.map((item) => ({
      "Seva Name": item.SEVA_NAME,
      Amount: item.NSD_TOT_SEVA_AMT || item.SSD_TOT_SEVA_AMT,
      Date: new Date(
        item.NSD_SEVA_DATE || item.SSD_RECPT_DATE
      ).toLocaleDateString(),
      Status:
        item.NSD_CLEARING_DATE || item.SSD_CLEARING_DATE ? "Cleared" : "Pending"
    }));

    const csvLink = document.createElement("a");
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv" });
    csvLink.href = window.URL.createObjectURL(blob);
    csvLink.download = `sevadhar-report-${new Date().toISOString()}.csv`;
    csvLink.click();
  };
  const renderSevadharReportSection = () => (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h3 className="text-xl font-bold text-gray-800 mb-6">
        Sevadhar Report Generator
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Sevadhar
          </label>
          <select
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            value={reportConfig.sevadharId || ""}
            onChange={(e) =>
              setReportConfig({ ...reportConfig, sevadharId: e.target.value })
            }
          >
            <option value="">Select Sevadhar</option>
            {sevadhars.map((sevadhar) => (
              <option key={sevadhar.CUST_CODE} value={sevadhar.CUST_CODE}>
                {sevadhar.CUST_NAME}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Seva Type
          </label>
          <select
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            value={reportConfig.sevadharSevaType || "Shashwath"}
            onChange={(e) =>
              setReportConfig({
                ...reportConfig,
                sevadharSevaType: e.target.value
              })
            }
          >
            <option value="Shashwath">Shashwath Seva</option>
            <option value="Nityanidhi">Nityanidhi Seva</option>
            <option value="Other">Other Seva</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Start Date
          </label>
          <input
            type="date"
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            value={reportConfig.sevadharStartDate || ""}
            onChange={(e) =>
              setReportConfig({
                ...reportConfig,
                sevadharStartDate: e.target.value
              })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            End Date
          </label>
          <input
            type="date"
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            value={reportConfig.sevadharEndDate || ""}
            onChange={(e) =>
              setReportConfig({
                ...reportConfig,
                sevadharEndDate: e.target.value
              })
            }
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          onClick={generateSevadharReport}
          disabled={isGenerating}
          className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isGenerating ? "Generating..." : "Show Details"}
        </button>
      </div>

      {reportData.length > 0 && (
        <div className="mt-8">
          <h4 className="text-lg font-semibold mb-4">
            Sevadhar Report Details
          </h4>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-orange-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Seva Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Deity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Receipt Date
                  </th>
                  {reportConfig.sevadharSevaType === "Shashwath" && (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Maasa
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Paksha
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Thithi
                      </th>
                    </>
                  )}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reportData.map((item, index) => (
                  <tr key={index} className="hover:bg-orange-50">
                    <td className="px-6 py-4">{item.SEVA_DESC}</td>
                    <td className="px-6 py-4">{item.DEITY_NAME}</td>
                    <td className="px-6 py-4">₹{item.TOTAL_AMOUNT}</td>
                    <td className="px-6 py-4">
                      {new Date(
                        item.SSD_RECPT_DATE || item.NSD_RECPT_DATE
                      ).toLocaleDateString()}
                    </td>
                    {reportConfig.sevadharSevaType === "Shashwath" && (
                      <>
                        <td className="px-6 py-4">{item.SSD_MAASA}</td>
                        <td className="px-6 py-4">
                          {item.SSD_PAKSHA === "S" ? "Shukla" : "Krishna"}
                        </td>
                        <td className="px-6 py-4">{item.SSD_THITHI}</td>
                      </>
                    )}
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          item.CLEARING_DATE
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {item.CLEARING_DATE ? "Cleared" : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
  {permissions.some(p=>p.url==='\admin\manage\statistics'&&p.access_to_update)&&(
          <div className="mt-6 flex justify-end space-x-4">
           
            <button
              onClick={() => downloadSevadharPDF(reportData)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Download PDF
            </button>
            <button
              onClick={() => downloadSevadharCSV(reportData)}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Download CSV
            </button>
          </div>
           )}
        </div>
      )}
    </div>
  );
  const renderReportSelector = () => (
    <div className="mb-6">
      <div className="inline-flex rounded-lg border border-gray-200 p-1">
        <button
          onClick={() => setSelectedReportType("seva")}
          className={`px-4 py-2 rounded-md ${
            selectedReportType === "seva"
              ? "bg-orange-600 text-white"
              : "hover:bg-gray-50"
          }`}
        >
          Seva Report
        </button>
        <button
          onClick={() => setSelectedReportType("sevadhar")}
          className={`px-4 py-2 rounded-md ${
            selectedReportType === "sevadhar"
              ? "bg-orange-600 text-white"
              : "hover:bg-gray-50"
          }`}
        >
          Sevadhar Report
        </button>
      </div>
    </div>
  );

  const renderSevasView = () => (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          {/* Top Row - Seva Type and Search */}
          <div className="flex items-center gap-6">
            {/* Seva Type Dropdown */}
            <div className="relative min-w-[200px]">
              <button
                onClick={() => setShowSevaDropdown(!showSevaDropdown)}
                className="w-full bg-white px-4 py-2.5 rounded-lg border border-gray-200 flex items-center justify-between hover:border-orange-300 transition-colors"
              >
                <span className="flex items-center">
                  <Bookmark className="w-4 h-4 mr-2 text-orange-500" />
                  {selectedSevaType || "Select Seva Type"}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {showSevaDropdown && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white rounded-lg shadow-lg z-10 border border-gray-100">
                  {sevaTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => handleSevaTypeSelect(type)}
                      className="w-full px-4 py-2.5 text-left hover:bg-orange-50 flex items-center space-x-2"
                    >
                      <Bookmark className="w-4 h-4 text-orange-500" />
                      <span>{type}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by name, mobile, seva or deity..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Bottom Row - Date Filters */}
          <div className="flex items-center gap-4">
            {/* Date Filter Button */}
            <button
              onClick={() => setShowDateFilter(!showDateFilter)}
              className={`flex items-center px-4 py-2.5 rounded-lg border transition-colors ${
                showDateFilter
                  ? "bg-orange-50 border-orange-200 text-orange-600"
                  : "border-gray-200 hover:border-orange-300"
              }`}
            >
              <Calendar className="w-4 h-4 mr-2" />
              <span>Date Filter</span>
            </button>

            {showDateFilter &&
              (selectedSevaType === "Sashwath Seva" ? (
                <div className="flex gap-4 animate-fadeIn mt-4">
                  {/* Gregorian Calendar */}
                  <div className="flex-1 bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
                    <label className="inline-flex items-center mb-4">
                      <input
                        type="radio"
                        name="filterType"
                        value="gregorian"
                        checked={dateRange.filterType === "gregorian"}
                        onChange={() =>
                          setDateRange((prev) => ({
                            filterType: "gregorian",
                            dd: prev.dd,
                            mm: prev.mm
                          }))
                        }
                        className="text-orange-600"
                      />
                      <span className="ml-2 text-gray-700 font-medium">
                        Gregorian Calendar
                      </span>
                    </label>

                    <div className="flex gap-3">
                      <select
                        disabled={dateRange.filterType !== "gregorian"}
                        value={dateRange.dd || ""}
                        onChange={(e) =>
                          setDateRange((prev) => ({
                            ...prev,
                            dd: e.target.value
                          }))
                        }
                        className="w-24 border rounded-lg px-2 py-1.5 disabled:bg-gray-50"
                      >
                        <option value="">Day</option>
                        {[...Array(31)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {String(i + 1).padStart(2, "0")}
                          </option>
                        ))}
                      </select>
                      <select
                        disabled={dateRange.filterType !== "gregorian"}
                        value={dateRange.mm || ""}
                        onChange={(e) =>
                          setDateRange((prev) => ({
                            ...prev,
                            mm: e.target.value
                          }))
                        }
                        className="w-32 border rounded-lg px-2 py-1.5 disabled:bg-gray-50"
                      >
                        <option value="">Month</option>
                        {[...Array(12)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {new Date(2024, i, 1).toLocaleString("default", {
                              month: "long"
                            })}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Panchanga Calendar */}
                  <div className="flex-1 bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
                    <label className="inline-flex items-center mb-4">
                      <input
                        type="radio"
                        name="filterType"
                        value="panchanga"
                        checked={dateRange.filterType === "panchanga"}
                        onChange={() =>
                          setDateRange((prev) => ({
                            filterType: "panchanga",
                            maasa: prev.maasa,
                            paksha: prev.paksha,
                            tithi: prev.tithi
                          }))
                        }
                        className="text-orange-600"
                      />
                      <span className="ml-2 text-gray-700 font-medium">
                        Panchanga Calendar
                      </span>
                    </label>

                    <div className="flex gap-3">
                      <select
                        disabled={dateRange.filterType !== "panchanga"}
                        value={dateRange.maasa || ""}
                        onChange={(e) =>
                          setDateRange((prev) => ({
                            ...prev,
                            maasa: e.target.value
                          }))
                        }
                        className="flex-1 border rounded-lg px-2 py-1.5 disabled:bg-gray-50"
                      >
                        <option value="">Maasa</option>
                        {maasaOptions.map((maasa) => (
                          <option
                            key={maasa.RASHI_CODE}
                            value={maasa.RASHI_CODE}
                          >
                            {maasa.RASHI_DESC}
                          </option>
                        ))}
                      </select>
                      <select
                        disabled={dateRange.filterType !== "panchanga"}
                        value={dateRange.paksha || ""}
                        onChange={(e) =>
                          setDateRange((prev) => ({
                            ...prev,
                            paksha: e.target.value
                          }))
                        }
                        className="w-32 border rounded-lg px-2 py-1.5 disabled:bg-gray-50"
                      >
                        <option value="">Paksha</option>
                        <option value="S">Shukla</option>
                        <option value="K">Krishna</option>
                      </select>
                      <select
                        disabled={dateRange.filterType !== "panchanga"}
                        value={dateRange.tithi || ""}
                        onChange={(e) =>
                          setDateRange((prev) => ({
                            ...prev,
                            tithi: e.target.value
                          }))
                        }
                        className="flex-1 border rounded-lg px-2 py-1.5 disabled:bg-gray-50"
                      >
                        <option value="">Tithi</option>
                        {tithiOptions.map((tithi) => (
                          <option
                            key={tithi.TITHI_CODE}
                            value={tithi.TITHI_CODE}
                          >
                            {tithi.TITHI_DESC}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={handleApplyFilter}
                    className="self-end bg-orange-600 text-white px-4 py-1.5 rounded-lg hover:bg-orange-700 flex items-center gap-2"
                  >
                    <Filter className="w-4 h-4" />
                    Apply
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-4 animate-fadeIn mt-4">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">From:</span>
                    <input
                      type="date"
                      value={dateRange.start}
                      onChange={(e) =>
                        setDateRange((prev) => ({
                          ...prev,
                          start: e.target.value
                        }))
                      }
                      className="border rounded-lg px-4 py-2"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">To:</span>
                    <input
                      type="date"
                      value={dateRange.end}
                      onChange={(e) =>
                        setDateRange((prev) => ({
                          ...prev,
                          end: e.target.value
                        }))
                      }
                      className="border rounded-lg px-4 py-2"
                    />
                  </div>
                  <button
                    onClick={handleApplyFilter}
                    className="bg-orange-600 text-white px-6 py-2.5 rounded-lg hover:bg-orange-700 flex items-center gap-2"
                  >
                    <Filter className="w-4 h-4" />
                    Apply Filter
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Seva Tables */}
      {selectedSevaType === "Sashwath Seva" &&
        (shashwathSevas.length > 0 ? (
          renderShashwathSevaTable()
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <p className="text-gray-500">No Sashwath sevas found.</p>
          </div>
        ))}
      {selectedSevaType === "Other Seva" &&
        (otherSevas.length > 0 ? (
          renderOtherSevaTable()
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <p className="text-gray-500">No Other sevas found.</p>
          </div>
        ))}
      {selectedSevaType === "Nityanidhi Seva" &&
        (nityanidhiSevas.length > 0 ? (
          renderNityanidhiTable()
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <p className="text-gray-500">No Nityanidhi sevas found.</p>
          </div>
        ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <nav className="bg-white shadow-md p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="h-6 w-6" />
            </button>

            <h1 className="text-xl font-bold text-gray-800">
              Temple Dashboard
            </h1>
          </div>
        </div>
      </nav>

      <div className="flex">
        <aside
          className={`${
            isSidebarOpen ? "block" : "hidden"
          } bg-white w-64 min-h-screen shadow-md`}
        >
          <nav className="p-4">
            <div className="space-y-2">
              <button
                onClick={() => handleNavigate("sevadars")}
                className={`w-full flex items-center px-4 py-2 rounded-lg ${
                  activeView === "sevadars"
                    ? "bg-orange-100 text-orange-600"
                    : "hover:bg-gray-100"
                }`}
              >
                <Users className="w-5 h-5 mr-3" />
                Sevadars
              </button>

              <button
                onClick={() => handleNavigate("statistics")}
                className={`w-full flex items-center px-4 py-2 rounded-lg ${
                  activeView === "statistics"
                    ? "bg-orange-100 text-orange-600"
                    : "hover:bg-gray-100"
                }`}
              >
                <BarChart3 className="w-5 h-5 mr-3" />
                Statistics
              </button>

              <button
                onClick={() => handleNavigate("sevas")}
                className={`w-full flex items-center px-4 py-2 rounded-lg ${
                  activeView === "sevas"
                    ? "bg-orange-100 text-orange-600"
                    : "hover:bg-gray-100"
                }`}
              >
                <Bookmark className="w-5 h-5 mr-3" />
                Sevas
              </button>
            </div>
          </nav>
        </aside>

        <main className="flex-1">
          {activeView === "sevadars" && (
            <div className="p-6">
              <div className="bg-white rounded-lg shadow-md">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Sevadar Management</h2>
                    {permissions.some(p=>p.url==='/admin/manage/statistics'&&p.access_to_update)&&(
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
                    >
                      Add New Sevadar
                    </button>)
                     }
                  </div>
                  {renderSevadharsTable()}
                </div>
              </div>
            </div>
          )}

          {activeView === "sevas" && renderSevasView()}

          {/* {activeView === "statistics" && (
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">
                Seva Statistics Overview
              </h2>
              {statistics.overview ? (
                <>
                  {renderStatisticsOverview()}
                  {renderReportSection()}
                  {renderSevadharReportSection()}
                </>
              ) : (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
                </div>
              )}
            </div>
          )} */}
          {activeView === "statistics" && (
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">
                Seva Statistics Overview
              </h2>
              {statistics.overview ? (
                <>
                  {renderStatisticsOverview()}
                  {renderReportSelector()}
                  {selectedReportType === "seva"
                    ? renderReportSection()
                    : renderSevadharReportSection()}
                </>
              ) : (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
                </div>
              )}
            </div>
          )}

          <button
            onClick={() => window.history.back()}
            className="flex items-center mt-6 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back
          </button>
        </main>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {editMode ? "Edit Sevadar" : "Add Sevadar"}
            </h2>
            <div className="space-y-4">
              <input
                className="w-full p-2 border rounded"
                placeholder="Name"
                name="CUST_NAME"
                value={formData.CUST_NAME}
                onChange={handleInputChange}
              />
              <select
                className="w-full p-2 border rounded"
                name="CUST_GENDER"
                value={formData.CUST_GENDER}
                onChange={handleInputChange}
              >
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
              <input
                className="w-full p-2 border rounded"
                placeholder="Mobile Number"
                name="CUST_MOBILE_NUM1"
                value={formData.CUST_MOBILE_NUM1}
                onChange={handleInputChange}
              />
              <input
                className="w-full p-2 border rounded"
                placeholder="Email"
                name="CUST_EMAIL_ID1"
                value={formData.CUST_EMAIL_ID1}
                onChange={handleInputChange}
              />
              <input
                className="w-full p-2 border rounded"
                placeholder="Address"
                name="CUST_RES_ADDRESS1"
                value={formData.CUST_RES_ADDRESS1}
                onChange={handleInputChange}
              />
              <input
                className="w-full p-2 border rounded"
                placeholder="City"
                name="CUST_RES_CITY"
                value={formData.CUST_RES_CITY}
                onChange={handleInputChange}
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={addOrEditSevadhar}
                  className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
                >
                  {editMode ? "Save Changes" : "Add Sevadar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedDevotee && (
        <DevoteeCard
          devotee={selectedDevotee}
          onClose={() => setSelectedDevotee(null)}
        />
      )}
    </div>
  );
}
export default ManageStatistics;

