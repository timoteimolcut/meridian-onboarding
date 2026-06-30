import { useEffect, useState } from "react";
import { getResources } from "../api/resources";
import type { Resource } from "../api/types";


function ResourceHub() {
    const [resources, setResources] = useState<Resource[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getResources()
          .then((data) => setResources(data))
          .catch((err) => console.error(err))
          .finally(() => setLoading(false));
      }, []);

    if (loading) return <p>Loading resources...</p>;

    return (
        <div>
        <h2>The resources you need</h2>
        <ul>
            {resources.map((resource) => (
            <li key={resource.id}>
                <strong>{resource.title}</strong> / {resource.category}: {resource.description}
                {resource.url && <> — <a href={resource.url} target="_blank">Open</a></>}
            </li>
            ))}
        </ul>
        </div>
    );

}

export default ResourceHub;