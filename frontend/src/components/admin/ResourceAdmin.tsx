import { useEffect, useState } from "react";
import { getResources, createResource, deleteResource } from "../../api/resources";
import type { Resource } from "../../api/types";

const categoryColors: Record<string, string> = {
  Tools: "bg-indigo-900 text-indigo-300",
  Repos: "bg-green-900 text-green-300",
  Processes: "bg-amber-900 text-amber-300",
  HR: "bg-blue-900 text-blue-300",
};

function ResourceAdmin() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    getResources().then((data) => setResources(data));
  }, []);

  async function handleCreate() {
    const newResource = await createResource({ title, description, url, category });
    setResources((prev) => [...prev, newResource]);
    setTitle(""); setDescription(""); setUrl(""); setCategory("");
  }

  async function handleDelete(id: number) {
    await deleteResource(id);
    setResources((prev) => prev.filter((r) => r.id !== id));
  }

  const inputClass = "w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500";

  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
      <div className="flex flex-col gap-2 mb-6">
        {resources.map((r) => (
          <div key={r.id} className="flex items-center justify-between bg-gray-800 rounded-lg px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="text-white font-medium">{r.title}</span>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${categoryColors[r.category] || "bg-gray-700 text-gray-300"}`}>
                {r.category}
              </span>
              {r.url && (
                <a href={r.url} target="_blank" className="text-gray-400 hover:text-indigo-300 text-xs transition">
                  Open →
                </a>
              )}
            </div>
            <button onClick={() => handleDelete(r.id)} className="text-red-400 hover:text-red-300 text-sm transition">
              Delete
            </button>
          </div>
        ))}
      </div>
      <h4 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider mb-3">Add New Resource</h4>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <input className={inputClass} placeholder="Title" value={title} onChange={(ev) => setTitle(ev.target.value)} />
        <select className={inputClass} value={category} onChange={(ev) => setCategory(ev.target.value)}>
          <option value="" disabled>Select Category</option>
          <option value="Tools">Tools</option>
          <option value="Repos">Repos</option>
          <option value="Processes">Processes</option>
          <option value="HR">HR</option>
        </select>
        <input className={`${inputClass} col-span-2`} placeholder="URL (optional)" value={url} onChange={(ev) => setUrl(ev.target.value)} />
        <input className={`${inputClass} col-span-2`} placeholder="Description (optional)" value={description} onChange={(ev) => setDescription(ev.target.value)} />
      </div>
      <button onClick={handleCreate} className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg text-sm font-medium transition">
        Add Resource
      </button>
    </div>
  );
}

export default ResourceAdmin;