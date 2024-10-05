import { useEffect, useRef, useState } from 'react';

export function ColumnName({ title }) {
  const [columnName, setColumnName] = useState(title);
  const [showTextArea, setShowTextArea] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (showTextArea && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [showTextArea]);

  //todo - update group in store

  return (
    <div role="textbox" className="name" onClick={() => setShowTextArea(true)}>
      {showTextArea ? (
        <textarea
          rows="1"
          ref={textareaRef}
          onBlur={() => setShowTextArea(false)}
          value={columnName}
          maxLength="512"
          onChange={(e) => setColumnName(e.target.value)}
        />
      ) : (
        <h2>{columnName}</h2>
      )}
    </div>
  );
}
