import React from 'react';

const SkeletonItem: React.FC<{ level?: number }> = ({ level = 2 }) => (
  <div className={`custom-control custom-checkbox indent-level-${level} animate-pulse`}>
    <div className="flex items-center">
      <div className="h-4 w-4 bg-gray-200 rounded"></div>
      <div className="ml-3 h-4 w-48 bg-gray-200 rounded"></div>
    </div>
  </div>
);

const SkeletonSection: React.FC = () => (
  <div className="permission-section">
    <div className="flex items-center mb-4">
      <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
      <div className="ml-2 h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
    </div>
    <div className="space-y-4">
      <SkeletonItem />
      <SkeletonItem level={3} />
      <SkeletonItem level={3} />
      <SkeletonItem level={2} />
    </div>
  </div>
);

const PermissionSkeleton: React.FC = () => {
  console.log('skeleton loading');
  return (
    <div className="loading-dim-container">
      {/* <h3>loading...</h3> */}
      {/* <div className="pulse-bar"></div> */}
      {/* <div className="permission-card p-6">
        <div className="permission-grid">
          <div>
            <SkeletonSection />
            <SkeletonSection />
          </div>
          <div>
            <SkeletonSection />
            <SkeletonSection />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default PermissionSkeleton;
