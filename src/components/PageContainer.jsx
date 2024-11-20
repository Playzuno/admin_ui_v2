import { Topbar } from './TopBar';

export function PageContainer({ children, title, subtitle }) {
  return (
    <div>
      <Topbar></Topbar>
      <div className="bg-light min-vh-100">
        <div className="container-fluid py-4">
          <div className="card">
            <h2 className="main-container-box h4 py-1 text-purple">{title}</h2>
            <div className="card-header bg-white border-bottom">
              <h4 className="h5 text-purple mb-0">{subtitle}</h4>
            </div>
            <div className="card-body">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
