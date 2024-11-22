import React, { useState } from 'react';
import '/src/assets/scss/components/dialog.scss';

interface NewRoleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (roleName: string, status: boolean) => void;
}

const NewRoleDialog: React.FC<NewRoleDialogProps> = ({ isOpen, onClose, onSubmit }) => {
  const [roleName, setRoleName] = useState('');
  const [status, setStatus] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(roleName, status);
    setRoleName('');
    setStatus(true);
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <h2 className="zuno-h2 mb-4">Add New Role</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="roleName" className="form-label">
              Role Name<span className="colon">:</span>
            </label>
            <input
              type="text"
              id="roleName"
              className="form-control"
              value={roleName}
              onChange={e => setRoleName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="status" className="form-label">
              Status<span className="colon">:</span>
            </label>
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="status"
                checked={status}
                readOnly
                onChange={() => setStatus(!status)}
              />
              <label className="custom-control-label" htmlFor="status"></label>
            </div>
          </div>
          <div className="dialog-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={!roleName}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewRoleDialog;
