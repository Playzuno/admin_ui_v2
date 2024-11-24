import React from 'react';
import CustomTable from '../../components/Table/CustomTable';
import { useBusinessInfo } from '/src/hooks/useBusinessContext';
import { useState, useEffect } from 'react';
import axios from '/src/utils/axios';
import { PageContainer } from '/src/components/PageContainer.jsx';
function Products() {
  const businessInfo = useBusinessInfo();
  const [products, setProducts] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!businessInfo.orgId) return;
    setLoading(true);
    axios
      .get(`/api/v1/business/${businessInfo.orgId}/products`)
      .then(res => {
        // console.log(res.data);
        setProducts(res.data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [businessInfo]);

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
      rows.push({
        id: i,
        category1: columns[0].items.pop(),
        category2: columns[1].items.pop(),
        category3: columns[2].items.pop(),
        category4: columns[3].items.pop(),
        category5: columns[4].items.pop(),
      });
    }
    console.log(rows);
    setData(rows);
  }, [products]);

  // const categories = {
  //   category1: 'Category 1',
  //   category2: 'Category 2',
  //   category3: 'Category 3',
  //   category4: 'Category 4',
  //   category5: 'Category 5',
  // };

  return (
    <PageContainer subtitle="Products" title="Products">
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <CustomTable columns={columns} data={data} setData={setData} />
        </div>
      </div>
    </PageContainer>
  );
}

export default Products;
