import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEmployee } from "../services/employeeService";

export default function CreateEmployee() {
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    level: "Junior",
  });

  const navigate = useNavigate();

  const handleFormChange = (e, directValue = null) => {
    const name = e.target ? e.target.name : e;
    const value = directValue !== null ? directValue : e.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createEmployee({
        name: formData.name,
        position: formData.position,
        level: formData.level,
      });

      navigate("/");
      alert("Employee created successfully!");
    } catch (err) {
      setError(err.message || "Failed to create employee");
      alert("Error creating employee: " + err.message);
    }
  };

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
          <form
            onSubmit={handleSubmit}
            className="flex flex-col text-left gap-5"
          >
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              placeholder="First Last"
              className="border rounded-[5px] px-1"
              required
            />
            <label htmlFor="Position">Position</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleFormChange}
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
                  id="entry"
                  checked={formData.level === "Entry"}
                  onChange={() => handleFormChange("level", "Entry")}
                />
                <label htmlFor="entry">Entry</label>
              </li>
              <li className="flex flex-row gap-3 justify-center align-middle">
                <input
                  type="radio"
                  name="level"
                  id="junior"
                  checked={formData.level === "Junior"}
                  onChange={() => handleFormChange("level", "Junior")}
                />
                <label htmlFor="junior">Junior</label>
              </li>
              <li className="flex flex-row gap-3 justify-center align-middle">
                <input
                  type="radio"
                  name="level"
                  id="senior"
                  checked={formData.level === "Senior"}
                  onChange={() => handleFormChange("level", "Senior")}
                />
                <label htmlFor="senior">Senior</label>
              </li>
            </ul>
          </div>
        </section>
      </div>
      <div className="text-start">
        <button
          type="submit"
          onClick={handleSubmit}
          className="border py-2 rounded-[5px] px-1 bg-blue-500 text-white hover:bg-blue-600"
        >
          Save Employee Record
        </button>
      </div>
    </>
  );
}
