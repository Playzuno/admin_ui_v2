import React, { useRef } from 'react';
import CustomTable from '../../components/Table/CustomTable';
import { useBusinessInfo } from '/src/hooks/useBusinessContext';
import { useState, useEffect } from 'react';
import axios from '/src/utils/axios';
import { PageContainer } from '/src/components/PageContainer.jsx';
import Loader from '/src/components/Loader';
import ResizableContainer from '/src/components/ResizableContainer.jsx';
import FileUpload from '../../components/FileUpload';
import ProductUploadForm from '../../components/ProductUploadForm';
function Products() {
  const businessInfo = useBusinessInfo();
  const [products, setProducts] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fileUploadLoading, setFileUploadLoading] = useState(false);
  const [fileUploadWidth, setFileUploadWidth] = useState(0);

  useEffect(() => {
    if (!businessInfo.orgId) return;
    getProducts();
  }, [businessInfo]);

  const getProducts = async () => {
    setLoading(true);
    axios
      .get(`/api/v1/business/${businessInfo.orgId}/products`)
      .then(res => {
        // console.log(res.data);
        setProducts(res.data || []);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };
  const columns = [
    { header: 'Category 1', accessor: 'category1', id: 1, items: [] },
    { header: 'Category 2', accessor: 'category2', id: 2, items: [] },
    { header: 'Category 3', accessor: 'category3', id: 3, items: [] },
    { header: 'Category 4', accessor: 'category4', id: 4, items: [] },
    { header: 'Category 5', accessor: 'category5', id: 5, items: [] },
  ];

  useEffect(() => {
    products.forEach(product => {
      if (product.categoryId == 1) {
        columns[0].items.push(product);
      }
      if (product.categoryId == 2) {
        columns[1].items.push(product);
      }
      if (product.categoryId == 3) {
        columns[2].items.push(product);
      }
      if (product.categoryId == 4) {
        columns[3].items.push(product);
      }
      if (product.categoryId == 5) {
        columns[4].items.push(product);
      }
    });
    console.log(columns);
    const rows = [];
    for (let i = 0; i < products.length; i++) {
      let idx = i % 5;
      const row = {
        id: i,
        category1: columns[0].items.pop(),
        category2: columns[1].items.pop(),
        category3: columns[2].items.pop(),
        category4: columns[3].items.pop(),
        category5: columns[4].items.pop(),
      };
      if (!row.category1 && !row.category2 && !row.category3 && !row.category4 && !row.category5) {
        break;
      }
      rows.push(row);
    }
    console.log(rows);
    setData(rows);
  }, [products]);

  let ququeEventSource;
  const queueSource = () => {
    if (!businessInfo.orgId) return;
    if (ququeEventSource) return;
    ququeEventSource = new EventSource(
      `${import.meta.env.VITE_API_URL}/api/v1/business/${businessInfo.orgId}/parser/queue`,
      { withCredentials: true }
    );
    ququeEventSource.onmessage = function (event) {
      console.log('even:', event.data);
      const data = JSON.parse(event.data);
      if (data.Status == '100') {
        setFileUploadLoading(true);
      }
      if (data.Status == '200') {
        setFileUploadLoading(false);
        getProducts();
      }
    };
    ququeEventSource.onerror = function (event) {
      console.log('error3:', event.data);
      setFileUploadLoading(false);
      ququeEventSource && ququeEventSource.close();
      ququeEventSource = null;
    };
  };
  useEffect(() => {
    if (ququeEventSource) {
      ququeEventSource.close();
      ququeEventSource = null;
    }
    queueSource();
    //   axios
    //     .get(`/api/v1/business/${businessInfo.orgId}/parser/queue`)
    //     .then(res => {
    //       console.log(res.data);
    //       setFileUploadLoading(res.data?.status == '100');
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     })
    //     .finally(() => setLoading(false));
    // }, [businessInfo]);
  }, [businessInfo]);

  // const categories = {
  //   category1: 'Category 1',
  //   category2: 'Category 2',
  //   category3: 'Category 3',
  //   category4: 'Category 4',
  //   category5: 'Category 5',
  // };

  const handleFileUpload = file => {
    console.log(file);

    const formData = new FormData();
    formData.append('input_file', file);
    setFileUploadLoading(true);

    axios
      .post(`/api/v1/business/${businessInfo.orgId}/ai/pdf/tesseract/menu`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        console.log('File uploaded successfully:', response.data);
        // getProducts();
        // setFileUploadLoading(false);
        queueSource();
      })
      .catch(error => {
        console.error('Error uploading file:', error);
        setFileUploadLoading(false);
      });
  };

  const handleManualEntry = () => {
    console.log('manual entry');
    setShowProductUploadForm(true);
  };
  const [tableWidth, setTableWidth] = useState(0);
  const tableRef = useRef(null);
  useEffect(() => {
    if (!tableRef.current) return;
    const pixelWidth = tableRef.current.getBoundingClientRect().width;
    // console.log(`Width in pixels: ${pixelWidth}`);
    setTableWidth(pixelWidth - 100);
  }, [tableRef]);

  const [showProductUploadForm, setShowProductUploadForm] = useState(false);

  const handleProductUploadFormSubmit = (category, menu) => {
    setLoading(true);
    axios
      .post(`/api/v1/business/${businessInfo.orgId}/products`, {
        categoryId: Number(category),
        name: menu,
        orgId: businessInfo.orgId,
      })
      .then(res => {
        // console.log(res);
        setProducts([...products, res.data]);
        handleProductUploadFormCancel();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setLoading(false));
    // setShowProductUploadForm(false);
  };

  const handleProductUploadFormCancel = () => {
    setShowProductUploadForm(false);
    // setTableWidth(v => v - 0.01);
    tableRef.current.style.width = `${tableWidth + 100}px`;
  };

  return (
    <PageContainer subtitle="Products" title="Products">
      {loading && <Loader></Loader>}
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto d-flex" style={{ overflowX: 'scroll', maxWidth: '100%' }}>
          <div
            ref={tableRef}
            style={{ width: `calc(100% - ${fileUploadWidth}px)` }}
            className="mr-3"
          >
            <ResizableContainer fullWidth={tableWidth}>
              <CustomTable columns={columns} data={data} setData={setData} />
            </ResizableContainer>
          </div>
          {showProductUploadForm ? (
            <ProductUploadForm
              onCancel={handleProductUploadFormCancel}
              onSubmit={handleProductUploadFormSubmit}
            />
          ) : (
            <FileUpload
              onExpandEvent={() => {
                setFileUploadWidth(420);
                tableRef.current.style.width = `calc(100% - ${fileUploadWidth}px)`;
              }}
              onFileUpload={handleFileUpload}
              onManualEntry={handleManualEntry}
              isLoading={fileUploadLoading}
            />
          )}
        </div>
      </div>
    </PageContainer>
  );
}

export default Products;
