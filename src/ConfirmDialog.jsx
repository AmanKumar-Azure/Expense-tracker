import { useEffect, useRef } from 'react'

function ConfirmDialog({ message, onConfirm, onCancel }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    dialogRef.current.showModal();
  }, []);

  const handleCancel = (e) => {
    e.preventDefault();
    onCancel();
  };

  return (
    <dialog ref={dialogRef} className="confirm-dialog" onCancel={handleCancel}>
      <p>{message}</p>
      <div className="confirm-actions">
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
        <button type="button" className="confirm-btn" onClick={onConfirm}>
          Delete
        </button>
      </div>
    </dialog>
  );
}

export default ConfirmDialog
