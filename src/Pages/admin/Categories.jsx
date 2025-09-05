'use client';

import { useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import { fetchAllCategories } from '../../Redux/slices/categorySlice';
import { useSelector , useDispatch } from "react-redux";
import { fetchSubcategoryById } from '../../Redux/slices/subcategorySlice';

export default function CategoriesPage() {
  const dispatch = useDispatch();
   useEffect(()=>{
        dispatch(fetchAllCategories());
      },[dispatch])
    const categories  = useSelector((state) => state?.ctegory?.categories);
    const subcategoryById  = useSelector((state) => state?.subcategory?.subcategoryData?.data);
    // console.log("subcategory",subcategory)
  // const [categories, setCategories] = useState([
  //   {
  //     id: 1,
  //     name: 'Electronics',
  //     slug: 'electronics',
  //     description: 'Digital devices and electronic gadgets',
  //     status: 'Active',
  //     image: 'https://readdy.ai/api/search-image?query=modern%20electronics%20category%20icon%20with%20smartphones%20laptops%20headphones%20on%20clean%20white%20background%2C%20minimal%20design%2C%20tech%20products%20arrangement&width=60&height=60&seq=cat1&orientation=squarish',
  //     subcategories: 5,
  //     productsCount: 24
  //   },
  //   {
  //     id: 2,
  //     name: 'Accessories',
  //     slug: 'accessories',
  //     description: 'Phone cases, cables, and tech accessories',
  //     status: 'Active',
  //     image: 'https://readdy.ai/api/search-image?query=tech%20accessories%20category%20icon%20with%20cables%20cases%20chargers%20on%20clean%20white%20background%2C%20minimal%20design%2C%20organized%20layout&width=60&height=60&seq=cat2&orientation=squarish',
  //     subcategories: 3,
  //     productsCount: 18
  //   },
  //   {
  //     id: 3,
  //     name: 'Office Supplies',
  //     slug: 'office-supplies',
  //     description: 'Desk accessories and office equipment',
  //     status: 'Active',
  //     image: 'https://readdy.ai/api/search-image?query=office%20supplies%20category%20icon%20with%20desk%20accessories%20laptop%20stand%20notebooks%20on%20clean%20white%20background%2C%20minimal%20design%2C%20professional%20layout&width=60&height=60&seq=cat3&orientation=squarish',
  //     subcategories: 4,
  //     productsCount: 12
  //   },
  //   {
  //     id: 4,
  //     name: 'Gaming',
  //     slug: 'gaming',
  //     description: 'Gaming peripherals and accessories',
  //     status: 'Inactive',
  //     image: 'https://readdy.ai/api/search-image?query=gaming%20category%20icon%20with%20gaming%20mouse%20keyboard%20headset%20on%20clean%20white%20background%2C%20minimal%20design%2C%20gaming%20setup&width=60&height=60&seq=cat4&orientation=squarish',
  //     subcategories: 2,
  //     productsCount: 8
  //   },
  //   {
  //     id: 5,
  //     name: 'Home & Garden',
  //     slug: 'home-garden',
  //     description: 'Smart home devices and garden tools',
  //     status: 'Active',
  //     image: 'https://readdy.ai/api/search-image?query=home%20garden%20category%20icon%20with%20smart%20home%20devices%20plants%20tools%20on%20clean%20white%20background%2C%20minimal%20design%2C%20household%20items&width=60&height=60&seq=cat5&orientation=squarish',
  //     subcategories: 6,
  //     productsCount: 15
  //   }
  // ]);

  const [subcategories, setSubcategories] = useState([
    { id: 1, name: 'Smartphones', slug: 'smartphones', description: 'Mobile phones and accessories', status: 'Active', parentCategoryId: 1, parentCategoryName: 'Electronics', productsCount: 12, image: 'https://readdy.ai/api/search-image?query=smartphone%20subcategory%20icon%20modern%20mobile%20phone%20on%20clean%20white%20background%2C%20minimal%20design&width=40&height=40&seq=sub1&orientation=squarish' },
    { id: 2, name: 'Laptops', slug: 'laptops', description: 'Portable computers and notebooks', status: 'Active', parentCategoryId: 1, parentCategoryName: 'Electronics', productsCount: 8, image: 'https://readdy.ai/api/search-image?query=laptop%20subcategory%20icon%20modern%20notebook%20computer%20on%20clean%20white%20background%2C%20minimal%20design&width=40&height=40&seq=sub2&orientation=squarish' },
    { id: 3, name: 'Headphones', slug: 'headphones', description: 'Audio devices and earphones', status: 'Active', parentCategoryId: 1, parentCategoryName: 'Electronics', productsCount: 15, image: 'https://readdy.ai/api/search-image?query=headphones%20subcategory%20icon%20modern%20audio%20device%20on%20clean%20white%20background%2C%20minimal%20design&width=40&height=40&seq=sub3&orientation=squarish' },
    { id: 4, name: 'Tablets', slug: 'tablets', description: 'Tablet computers and accessories', status: 'Inactive', parentCategoryId: 1, parentCategoryName: 'Electronics', productsCount: 6, image: 'https://readdy.ai/api/search-image?query=tablet%20subcategory%20icon%20modern%20tablet%20device%20on%20clean%20white%20background%2C%20minimal%20design&width=40&height=40&seq=sub4&orientation=squarish' },
    { id: 5, name: 'Smart Watches', slug: 'smart-watches', description: 'Wearable technology devices', status: 'Active', parentCategoryId: 1, parentCategoryName: 'Electronics', productsCount: 9, image: 'https://readdy.ai/api/search-image?query=smartwatch%20subcategory%20icon%20modern%20wearable%20device%20on%20clean%20white%20background%2C%20minimal%20design&width=40&height=40&seq=sub5&orientation=squarish' },
    { id: 6, name: 'Phone Cases', slug: 'phone-cases', description: 'Protective cases for smartphones', status: 'Active', parentCategoryId: 2, parentCategoryName: 'Accessories', productsCount: 25, image: 'https://readdy.ai/api/search-image?query=phone%20case%20subcategory%20icon%20protective%20smartphone%20cover%20on%20clean%20white%20background%2C%20minimal%20design&width=40&height=40&seq=sub6&orientation=squarish' },
    { id: 7, name: 'Cables', slug: 'cables', description: 'Charging and data cables', status: 'Active', parentCategoryId: 2, parentCategoryName: 'Accessories', productsCount: 18, image: 'https://readdy.ai/api/search-image?query=cable%20subcategory%20icon%20charging%20data%20cord%20on%20clean%20white%20background%2C%20minimal%20design&width=40&height=40&seq=sub7&orientation=squarish' },
    { id: 8, name: 'Chargers', slug: 'chargers', description: 'Power adapters and wireless chargers', status: 'Active', parentCategoryId: 2, parentCategoryName: 'Accessories', productsCount: 12, image: 'https://readdy.ai/api/search-image?query=charger%20subcategory%20icon%20power%20adapter%20on%20clean%20white%20background%2C%20minimal%20design&width=40&height=40&seq=sub8&orientation=squarish' }
  ]);
    
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [expandedRows, setExpandedRows] = useState([]);
  
  // Subcategory states
  const [showSubcategoryModal, setShowSubcategoryModal] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [showSubcategoryDeleteConfirm, setShowSubcategoryDeleteConfirm] = useState(false);
  const [subcategoryToDelete, setSubcategoryToDelete] = useState(null);
  const [subcategorySearchTerm, setSubcategorySearchTerm] = useState('');
  const [subcategoryStatusFilter, setSubcategoryStatusFilter] = useState('');

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase())
                          
    const matchesStatus = statusFilter === '' || category.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getSubcategoriesForCategory = (categoryId) => {
  return subcategoryById?.filter(sub => {
    const belongsToCategory = sub.categoryId === categoryId;
    const matchesSearch = sub.name.toLowerCase().includes(subcategorySearchTerm.toLowerCase()) ||
                         sub.description.toLowerCase().includes(subcategorySearchTerm.toLowerCase());
    const matchesStatus = subcategoryStatusFilter === '' || sub.status === subcategoryStatusFilter;
    return belongsToCategory && matchesSearch && matchesStatus;
  });
};


  const toggleCategoryStatus = (id) => {
    setCategories(prev => prev.map(cat => 
      cat.id === id 
        ? { ...cat, status: cat.status === 'Active' ? 'Inactive' : 'Active' }
        : cat
    ));
  };
   
  const toggleSubcategoryStatus = (id) => {
    setSubcategories(prev => prev.map(sub => 
      sub.id === id 
        ? { ...sub, status: sub.status === 'Active' ? 'Inactive' : 'Active' }
        : sub
    ));
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setShowEditModal(true);
  };

  const handleEditSubcategory = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setShowSubcategoryModal(true);
  };

  const handleDelete = (id) => {
    setCategoryToDelete(id);
    setShowDeleteConfirm(true);
  };

  const handleDeleteSubcategory = (id) => {
    setSubcategoryToDelete(id);
    setShowSubcategoryDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (categoryToDelete) {
      setCategories(prev => prev.filter(cat => cat.id !== categoryToDelete));
      setShowDeleteConfirm(false);
      setCategoryToDelete(null);
    }
  };

  const confirmSubcategoryDelete = () => {
    if (subcategoryToDelete) {
      setSubcategories(prev => prev.filter(sub => sub.id !== subcategoryToDelete));
      // Update category subcategories count
      const deletedSub = subcategories.find(sub => sub.id === subcategoryToDelete);
      if (deletedSub) {
        setCategories(prev => prev.map(cat => 
          cat.id === deletedSub.parentCategoryId 
            ? { ...cat, subcategories: cat.subcategories - 1 }
            : cat
        ));
      }
      setShowSubcategoryDeleteConfirm(false);
      setSubcategoryToDelete(null);
    }
  };
  
    const toggleSubcategories = (categoryId) => {
    if (!expandedRows.includes(categoryId)) {
      dispatch(fetchSubcategoryById(categoryId));
    }
    setExpandedRows((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };


  const getStatusColor = (status) => {
    return status ==1 
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';
  };
  
  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Categories</h2>
            <p className="text-gray-600">Manage product categories and subcategories</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                setSelectedSubcategory(null);
                setShowSubcategoryModal(true);
              }}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center whitespace-nowrap cursor-pointer"
            >
              <i className="ri-add-line mr-2"></i>
              Add Subcategory
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center whitespace-nowrap cursor-pointer"
            >
              <i className="ri-add-line mr-2"></i>
              Add Category
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8"
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Categories Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Category</th>
                  {/* <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Description</th> */}
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Products</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Subcategories</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCategories.map((category) => (
                  <>
                    <tr key={category.id} className="hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          {category?.image && (
                            <img
                              src={category?.image}
                              alt={category?.name}
                              className="w-12 h-12 rounded-lg object-cover object-top mr-4"
                            />
                          )}
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">{category?.name}</h4>
                            {/* <p className="text-sm text-gray-500">/{category.slug}</p> */}
                          </div>
                        </div>
                      </td>
                      {/* <td className="py-4 px-4 text-sm text-gray-700 max-w-xs">
                        <div className="truncate">{category.description}</div>
                      </td> */}
                      <td className="py-4 px-4">
                        <button
                          onClick={() => toggleCategoryStatus(category.id)}
                          className={`px-2 py-1 rounded-full text-xs font-medium cursor-pointer ${getStatusColor(category.status)}`}
                        >
                          {category?.status==1?'Active':'Inactive'}
                        </button>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-700">{category.productsCount}</td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => toggleSubcategories(category.id)}
                          className="flex items-center text-sm text-blue-600 hover:text-blue-700 cursor-pointer"
                        >
                          {category.subcategories}
                          <i className={`ri-arrow-down-s-line ml-1 transition-transform ${
                            expandedRows.includes(category.id) ? 'rotate-180' : ''
                          }`}></i>
                        </button>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => handleEdit(category)}
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-blue-600 cursor-pointer"
                          >
                            <i className="ri-edit-line"></i>
                          </button>
                          <button 
                            onClick={() => handleDelete(category.id)}
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-red-600 cursor-pointer"
                          >
                            <i className="ri-delete-bin-line"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                    
                    {/* Subcategories Row */}
                    {expandedRows.includes(category.id) && (
                      <tr>
                        <td colSpan={6} className="py-4 px-4 bg-gray-50">
                          <div className="ml-16">
                            <div className="flex items-center justify-between mb-4">
                              <h5 className="text-sm font-medium text-gray-700">Subcategories for {category.name}</h5>
                              <button
                                onClick={() => {
                                  setSelectedSubcategory({
                                    id: 0,
                                    name: '',
                                    slug: '',
                                    description: '',
                                    status: 'Active',
                                    parentCategoryId: category.id,
                                    parentCategoryName: category.name,
                                    productsCount: 0
                                  });
                                  setShowSubcategoryModal(true);
                                }}
                                className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition-colors flex items-center text-sm cursor-pointer"
                              >
                                <i className="ri-add-line mr-1"></i>
                                Add Subcategory
                              </button>
                            </div>

                            {/* Subcategory Filters */}
                            <div className="flex flex-col sm:flex-row gap-3 mb-4">
                              <input
                                type="text"
                                placeholder="Search subcategories..."
                                value={subcategorySearchTerm}
                                onChange={(e) => setSubcategorySearchTerm(e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                              />
                              <select
                                value={subcategoryStatusFilter}
                                onChange={(e) => setSubcategoryStatusFilter(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8"
                              >
                                <option value="">All Status</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                              </select>
                            </div>

                            {/* Subcategories Table */}
                            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                              <table className="w-full text-sm">
                                <thead className="bg-gray-100">
                                  <tr>
                                    <th className="text-left py-2 px-3 text-xs font-medium text-gray-600">Subcategory</th>
                                    {/* <th className="text-left py-2 px-3 text-xs font-medium text-gray-600">Description</th> */}
                                    <th className="text-left py-2 px-3 text-xs font-medium text-gray-600">Status</th>
                                    <th className="text-left py-2 px-3 text-xs font-medium text-gray-600">Products</th>
                                    <th className="text-left py-2 px-3 text-xs font-medium text-gray-600">Actions</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                  {getSubcategoriesForCategory(category.id).map((subcategory) => (
                                    <tr key={subcategory.id} className="hover:bg-gray-50">
                                      <td className="py-3 px-3">
                                        <div className="flex items-center">
                                          {subcategory?.image && (
                                            <img
                                              src={subcategory?.image}
                                              alt={subcategory?.name}
                                              className="w-8 h-8 rounded-md object-cover object-top mr-3"
                                            />
                                          )}
                                          <div>
                                            <h6 className="text-sm font-medium text-gray-900">{subcategory.name}</h6>
                                            {/* <p className="text-xs text-gray-500">/{subcategory.slug}</p> */}
                                          </div>
                                        </div>
                                      </td>
                                      {/* <td className="py-3 px-3 text-sm text-gray-700 max-w-xs">
                                        <div className="truncate">{subcategory.description}</div>
                                      </td> */}
                                      <td className="py-3 px-3">
                                        <button
                                          onClick={() => toggleSubcategoryStatus(subcategory.id)}
                                          className={`px-2 py-1 rounded-full text-xs font-medium cursor-pointer ${getStatusColor(subcategory.status)}`}
                                        >
                                          {subcategory.status==1?'Active':'Inactive'}
                                        </button>
                                      </td>
                                      <td className="py-3 px-3 text-sm text-gray-700">{subcategory.productsCount}</td>
                                      <td className="py-3 px-3">
                                        <div className="flex items-center space-x-1">
                                          <button 
                                            onClick={() => handleEditSubcategory(subcategory)}
                                            className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-blue-600 cursor-pointer"
                                          >
                                            <i className="ri-edit-line text-sm"></i>
                                          </button>
                                          <button 
                                            onClick={() => handleDeleteSubcategory(subcategory.id)}
                                            className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-red-600 cursor-pointer"
                                          >
                                            <i className="ri-delete-bin-line text-sm"></i>
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                              
                              {getSubcategoriesForCategory(category.id).length === 0 && (
                                <div className="p-8 text-center text-gray-500">
                                  <i className="ri-folder-open-line text-3xl mb-2"></i>
                                  <p className="text-sm">No subcategories found</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">Showing {filteredCategories.length} of {categories.length} categories</p>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-500 cursor-pointer">Previous</button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm cursor-pointer">1</button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">2</button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Category Modal */}
      {(showAddModal || showEditModal) && (
        <CategoryModal
          category={selectedCategory}
          onClose={() => {
            setShowAddModal(false);
            setShowEditModal(false);
            setSelectedCategory(null);
          }}
          onSave={(categoryData) => {
            if (showEditModal && selectedCategory) {
              setCategories(prev => prev.map(cat => 
                cat.id === selectedCategory.id ? { ...cat, ...categoryData } : cat
              ));
            } else {
              const newCategory = {
                id: Date.now(),
                subcategories: 0,
                productsCount: 0,
                ...categoryData
              };
              setCategories(prev => [...prev, newCategory]);
            }
            setShowAddModal(false);
            setShowEditModal(false);
            setSelectedCategory(null);
          }}
        />
      )}

      {/* Add/Edit Subcategory Modal */}
      {showSubcategoryModal && (
        <SubcategoryModal
          subcategory={selectedSubcategory}
          categories={categories}
          onClose={() => {
            setShowSubcategoryModal(false);
            setSelectedSubcategory(null);
          }}
          onSave={(subcategoryData) => {
            if (selectedSubcategory && selectedSubcategory.id > 0) {
              // Edit existing subcategory
              setSubcategories(prev => prev.map(sub => 
                sub.id === selectedSubcategory.id ? { ...sub, ...subcategoryData } : sub
              ));
            } else {
              // Add new subcategory
              const newSubcategory = {
                id: Date.now(),
                productsCount: 0,
                ...subcategoryData
              };
              setSubcategories(prev => [...prev, newSubcategory]);
              
              // Update category subcategories count
              setCategories(prev => prev.map(cat => 
                cat.id === subcategoryData.parentCategoryId 
                  ? { ...cat, subcategories: cat.subcategories + 1 }
                  : cat
              ));
            }
            setShowSubcategoryModal(false);
            setSelectedSubcategory(null);
          }}
        />
      )}

      {/* Delete Category Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Category</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this category? This action cannot be undone and will also delete all subcategories.</p>
            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Subcategory Confirmation Modal */}
      {showSubcategoryDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Subcategory</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this subcategory? This action cannot be undone.</p>
            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setShowSubcategoryDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmSubcategoryDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Category Modal Component


function CategoryModal({ category, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: category?.name || '',
    slug: category?.slug || '',
    description: category?.description || '',
    status: category?.status || 'Active',
    image: category?.image || ''
  });

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleNameChange = (value) => {
    setFormData(prev => ({
      ...prev,
      name: value,
      slug: generateSlug(value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {category ? 'Edit Category' : 'Add New Category'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              placeholder="Enter category name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              placeholder="category-slug"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Auto-generated from name or enter custom slug</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              maxLength={500}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
              placeholder="Category description..."
            />
            <p className="text-xs text-gray-500 mt-1">{formData.description.length}/500 characters</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category Image (Optional)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <i className="ri-image-add-line text-2xl text-gray-400 mb-2"></i>
              <p className="text-sm text-gray-500">Upload category image</p>
              <p className="text-xs text-gray-400">PNG, JPG up to 2MB</p>
              <input
                type="file"
                accept="image/*"
                className="mt-2 text-sm"
              />
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              {category ? 'Update' : 'Create'} Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function SubcategoryModal({ subcategory, categories, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: subcategory?.name || '',
    slug: subcategory?.slug || '',
    description: subcategory?.description || '',
    status: subcategory?.status || 'Active',
    image: subcategory?.image || '',
    parentCategoryId: subcategory?.parentCategoryId || (categories.length > 0 ? categories[0].id : 0),
    parentCategoryName: subcategory?.parentCategoryName || (categories.length > 0 ? categories[0].name : '')
  });

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleNameChange = (value) => {
    setFormData(prev => ({
      ...prev,
      name: value,
      slug: generateSlug(value)
    }));
  };

  const handleParentCategoryChange = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    setFormData(prev => ({
      ...prev,
      parentCategoryId: categoryId,
      parentCategoryName: category?.name || ''
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {subcategory && subcategory.id > 0 ? 'Edit Subcategory' : 'Add New Subcategory'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Parent Category</label>
            <select
              value={formData.parentCategoryId}
              onChange={(e) => handleParentCategoryChange(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8"
              required
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              placeholder="Enter subcategory name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              placeholder="subcategory-slug"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Auto-generated from name or enter custom slug</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              maxLength={500}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
              placeholder="Subcategory description..."
            />
            <p className="text-xs text-gray-500 mt-1">{formData.description.length}/500 characters</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory Image (Optional)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <i className="ri-image-add-line text-2xl text-gray-400 mb-2"></i>
              <p className="text-sm text-gray-500">Upload subcategory image</p>
              <p className="text-xs text-gray-400">PNG, JPG up to 2MB</p>
              <input
                type="file"
                accept="image/*"
                className="mt-2 text-sm"
              />
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              {subcategory && subcategory.id > 0 ? 'Update' : 'Create'} Subcategory
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}