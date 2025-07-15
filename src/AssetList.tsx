import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useState } from "react";

export function AssetList() {
  const assets = useQuery(api.assets.list, {});
  const createAsset = useMutation(api.assets.create);
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [value, setValue] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await createAsset({
      name,
      model,
      serialNumber,
      value: parseFloat(value),
    });
    setName("");
    setModel("");
    setSerialNumber("");
    setValue("");
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Assets</h2>
      
      <form onSubmit={handleSubmit} className="mb-4 grid grid-cols-2 gap-2">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded border p-2"
        />
        <input
          type="text"
          placeholder="Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="rounded border p-2"
        />
        <input
          type="text"
          placeholder="Serial Number"
          value={serialNumber}
          onChange={(e) => setSerialNumber(e.target.value)}
          className="rounded border p-2"
        />
        <input
          type="number"
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="rounded border p-2"
        />
        <button
          type="submit"
          disabled={!name || !model || !serialNumber || !value}
          className="col-span-2 bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Add Asset
        </button>
      </form>

      <ul className="divide-y">
        {assets?.map((asset) => (
          <li key={asset._id} className="py-2">
            <div className="font-semibold">{asset.name}</div>
            <div className="text-sm text-gray-600">
              {asset.model} - {asset.serialNumber}
            </div>
            <div className="text-sm text-gray-600">
              Value: ${asset.value.toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
