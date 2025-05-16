import React, { useState, useEffect } from "react";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState({ title: "", body: "" });
  const [editingId, setEditingId] = useState(null);

  // Load notes and draft when page loads
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(storedNotes);

    const storedDraft = localStorage.getItem("draft");
    if (storedDraft) {
      setFormData(JSON.parse(storedDraft));
    }
  }, []);

  // Save draft in localStorage whenever user types
  useEffect(() => {
    if (formData.title.trim() !== "" || formData.body.trim() !== "") {
      localStorage.setItem("draft", JSON.stringify(formData));
    }
  }, [formData]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.body.trim())
      return alert("Both fields required");

    if (editingId) {
      const updatedNotes = notes.map((note) =>
        note.id === editingId
          ? { ...note, ...formData, updatedAt: new Date().toISOString() }
          : note
      );
      setNotes(updatedNotes);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      setEditingId(null);
    } else {
      const newNote = {
        id: Date.now(),
        title: formData.title,
        body: formData.body,
        createdAt: new Date().toISOString(),
      };
      const updatedNotes = [newNote, ...notes];
      setNotes(updatedNotes);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
    }

    // After submit, reset form and clear draft
    setFormData({ title: "", body: "" });
    localStorage.removeItem("draft");
  };

  const handleEdit = (note) => {
    setFormData({ title: note.title, body: note.body });
    setEditingId(note.id);
  };

  const handleDelete = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const formatDate = (isoString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(isoString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Notes / Journal</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />
        <textarea
          name="body"
          placeholder="Write your note..."
          value={formData.body}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg h-32"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {editingId ? "Update Note" : "Add Note"}
        </button>
      </form>

      {/* Notes List */}
      {notes.length === 0 ? (
        <p className="text-center text-gray-500">No notes yet.</p>
      ) : (
        <div className="grid gap-6">
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-white shadow p-6 rounded-lg relative"
            >
              <h3 className="text-xl font-semibold mb-2">{note.title}</h3>
              <p className="text-gray-700 mb-4 whitespace-pre-wrap">
                {note.body}
              </p>
              <div className="text-sm text-gray-400 mb-4">
                {note.updatedAt
                  ? `Updated: ${formatDate(note.updatedAt)}`
                  : `Created: ${formatDate(note.createdAt)}`}
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleEdit(note)}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(note.id)}
                  className="text-red-600 hover:text-red-800 font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Notes;
