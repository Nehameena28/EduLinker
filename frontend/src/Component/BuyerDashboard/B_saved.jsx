// import { useSavedNotes } from "../context/SavedNotesContext";

const B_Saved = () => {
  const { savedNotes } = useSavedNotes();

  return (
    <div className="saved-notes-page">
      <h1>Saved Notes</h1>
      {savedNotes.length === 0 ? (
        <p>No notes saved yet.</p>
      ) : (
        <div className="grid">
          {savedNotes.map((note, index) => (
            <div key={index} className="note-card">
              <h2>{note.title}</h2>
              <p>{note.description}</p>
              {/* Optional: show price, category, etc. */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


export default B_Saved ;