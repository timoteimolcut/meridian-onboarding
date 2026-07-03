import { useEffect, useState } from "react";
import { getResources, createResource, deleteResource } from "../../api/resources";
import type { Resource } from "../../api/types";

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

    return (
        <div>
            <h3>Resources</h3>
            <ul>
                {resources.map((r) => (
                    <li key={r.id}>
                        <strong>{r.title}</strong> [{r.category}]: {r.description}
                        {r.url && <> — <a href={r.url} target="_blank">Open</a></>}
                        <button onClick={() => handleDelete(r.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <h4>Add New Resource</h4>
            <input placeholder="Title" value={title} onChange={(ev) => setTitle(ev.target.value)} />
            <input placeholder="Description" value={description} onChange={(ev) => setDescription(ev.target.value)} />
            <input placeholder="URL" value={url} onChange={(ev) => setUrl(ev.target.value)} />
            <input placeholder="Category" value={category} onChange={(ev) => setCategory(ev.target.value)} />
            <button onClick={handleCreate}>Add Resource</button>
        </div>
    );
}

export default ResourceAdmin;