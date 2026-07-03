import { useEffect, useState } from "react";
import { getResources } from "../api/resources";
import type { Resource } from "../api/types";

const categoryColors: Record<string, string> = {
  Tools: "bg-indigo-900 text-indigo-300",
  Repos: "bg-green-900 text-green-300",
  Processes: "bg-amber-900 text-amber-300",
  HR: "bg-blue-900 text-blue-300",
};

function ResourceHub() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    getResources()
      .then((data) => setResources(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const categories = ["All", "Tools", "Repos", "Processes", "HR"];
  const filtered = filter === "All" ? resources : resources.filter((r) => r.category === filter);

  if (loading) return <p className="text-gray-400">Loading resources...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Resources Hub</h2>
      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              filter === cat
                ? "bg-indigo-600 text-white"
                : "bg-gray-800 text-gray-400 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((r) => (
          <div key={r.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-white">{r.title}</h3>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${categoryColors[r.category] || "bg-gray-800 text-gray-300"}`}>
                {r.category}
              </span>
            </div>
            {r.description && <p className="text-gray-400 text-sm mb-3">{r.description}</p>}
            {r.url && (
                <a href={r.url} target="_blank" className="text-indigo-400 hover:text-indigo-300 text-sm transition"> Open → </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResourceHub;