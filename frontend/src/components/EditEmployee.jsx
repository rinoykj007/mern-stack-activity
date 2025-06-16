import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEmployeeById, updateEmployee } from "../services/employeeService";

export default function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setformData] = useState({
    name: "",
    position: "",
    level: "Junior",
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await getEmployeeById(id);
        setformData({
          name: data.name,
          position: data.position,
          level: data.level,
        });
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch employee");
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({
      ...formData,
      [name]: value,
    });
  };

  const handleLevelChange = (e) => {
    setformData({
      ...formData,
      level: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await updateEmployee(id, formData);
      navigate("/");
      alert("Employee record updated!");
    } catch (err) {
      setError(err.message || "Failed to update employee");
      alert("Error updating employee: " + err.message);
    }
  };

  if (loading) return <div className="p-4">Loading employee data...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <>
      <div className="flex flex-row gap-10 w-[60%] border-b-4 border-b-gray-300 pb-4 mb-4 p-[1rem] border">
        <section className="text-start">
          <h1 className="font-bold">Employee Info</h1>
          <p className="font-inherit text-[13px] ">
            This Information will displayed public so be careful what you share{" "}
          </p>
        </section>
        <section className=" flex flex-col gap-5">
          <form className="flex flex-col text-left gap-5">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="First Last"
              className="border rounded-[5px] px-1"
              required
            />
            <label htmlFor="Position">Position</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="Developer Advocate"
              className="border rounded-[5px] px-1"
              required
            />
          </form>
          <div className="text-start">
            <p>Level:</p>
            <ul className="flex flex-row gap-3 justify-start">
              <li className="flex flex-row gap-3 justify-center align-middle">
                <input
                  type="radio"
                  name="level"
                  id="intern"
                  value="Entry"
                  checked={formData.level === "Entry"}
                  onChange={handleLevelChange}
                />
                <label htmlFor="intern">Entry</label>
              </li>
              <li className="flex flex-row gap-3 justify-center align-middle">
                <input
                  type="radio"
                  name="level"
                  id="junior"
                  value="Junior"
                  checked={formData.level === "Junior"}
                  onChange={handleLevelChange}
                />
                <label htmlFor="junior">Junior</label>
              </li>
              <li className="flex flex-row gap-3 justify-center align-middle">
                <input
                  type="radio"
                  name="level"
                  id="senior"
                  value="Senior"
                  checked={formData.level === "Senior"}
                  onChange={handleLevelChange}
                />
                <label htmlFor="senior">Senior</label>
              </li>
            </ul>
          </div>
        </section>
      </div>
      <div className="text-start">
        <button
          type="button"
          onClick={handleSubmit}
          className="border py-2 rounded-[5px] px-1 bg-blue-500 text-white hover:bg-blue-600"
        >
          Save Employee Record
        </button>
      </div>
    </>
  );
}
