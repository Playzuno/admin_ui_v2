import { Topbar } from './TopBar';

export function PageContainer({ children, title, subtitle, actionIcon }) {
  return (
    <div>
      <Topbar></Topbar>
      <div className="bg-light min-vh-100 primary-gradient-background">
        <div className="container-fluid py-4">
          <div className="card">
            <h2 className="main-container-box h4 py-1 text-purple">{title}</h2>
            <div style={{ margingTop: '-4px' }} className="card-header bg-white border-bottom">
              <div className="d-flex justify-content-between">
                <h4 className="h5 text-purple mb-0">{subtitle}</h4>
                {actionIcon}
              </div>
            </div>
            <div className="card-body">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
