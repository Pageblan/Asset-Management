import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useState } from "react";

export function DepartmentList() {
  const departments = useQuery(api.departments.list);
  const createDepartment = useMutation(api.departments.create);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await createDepartment({ name, code });
    setName("");
    setCode("");
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Departments</h2>
      
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 rounded border p-2"
        />
        <input
          type="text"
          placeholder="Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-24 rounded border p-2"
        />
        <button
          type="submit"
          disabled={!name || !code}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Add
        </button>
      </form>

      <ul className="divide-y">
        {departments?.map((dept) => (
          <li key={dept._id} className="py-2">
            {dept.name} ({dept.code})
          </li>
        ))}
      </ul>
    </div>
  );
}
