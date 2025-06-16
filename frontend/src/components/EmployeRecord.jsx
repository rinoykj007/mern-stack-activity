import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getEmployees, deleteEmployee } from "../services/employeeService";

export default function EmployeRecord() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch employees");
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const navToPage = (url) => {
    navigate(url);
  };

  const handleEdit = (id) => {
    navigate(`EditEmployee/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this employee?")) {
      try {
        await deleteEmployee(id);

        setEmployees(employees.filter((emp) => emp._id !== id));
      } catch (err) {
        setError(err.message || "Failed to delete employee");
      }
    }
  };

  const headers = ["name", "position", "level", "action"];
  const cellClass = "text-[5px] px-6 py-1";

  if (loading) return <div className="p-4">Loading employees...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="p-4">
      <div className="flex flex-row gap-[7rem] m-3 ">
        <p>Employee details </p>
        <button
          className="px-2 py-[2.5px] rounded text-[10px] border"
          onClick={() => navToPage("/create")}
        >
          Create Employee
        </button>
      </div>
      <table className="border border-gray-300 ">
        <thead>
          <tr>
            {headers.map((key) => (
              <th key={key} className={cellClass}>
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id} className="border-b">
              {headers.map((key) => (
                <td key={key} className={`${cellClass} font-normal`}>
                  {key === "action" ? (
                    <div className="flex gap-2">
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                        onClick={() => handleEdit(employee._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        onClick={() => handleDelete(employee._id)}
                      >
                        Delete
                      </button>
                    </div>
                  ) : (
                    employee[key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
