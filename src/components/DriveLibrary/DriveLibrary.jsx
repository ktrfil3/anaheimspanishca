import React from "react";
import "./DriveLibrary.css";

const DriveLibrary = ({ materials }) => {
  if (!materials || materials.length === 0) {
    return (
      <div className="drive-library-empty">
        <p className="lg">No hay materiales descargables disponibles por el momento.</p>
      </div>
    );
  }

  const getIconUrl = (type) => {
    switch (type) {
      case "pdf":
        return "/icons/pdf-icon.svg"; // Fallback to a generic icon strategy if SVG doesn't exist
      case "document":
        return "/icons/doc-icon.svg";
      case "spreadsheet":
        return "/icons/xls-icon.svg";
      case "presentation":
        return "/icons/ppt-icon.svg";
      default:
        return "/icons/file-icon.svg";
    }
  };

  return (
    <div className="drive-library-container">
      <div className="drive-library-header">
        <h2>Materiales Escolar</h2>
        <p>Recursos conectados con Google Drive</p>
      </div>
      
      <div className="drive-library-grid">
        {materials.map((item) => (
          <a key={item.id} href={item.link} target="_blank" rel="noopener noreferrer" className="drive-file-card">
            <div className="drive-file-icon">
              {/* Using CSS shapes for icons instead of requiring SVGs to be present to prevent broken images. */}
              <div className={`file-icon-shape ${item.type}`} />
            </div>
            <div className="drive-file-info">
              <h4>{item.title}</h4>
              <p className="sm">Descargar / Ver</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default DriveLibrary;
