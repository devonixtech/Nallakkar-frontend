
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllCategories, createCategory, deleteCategory, updateCategory } from '../../Redux/slices/categorySlice';
import { useSelector, useDispatch } from "react-redux";
import { fetchAllSubcategories, createSubcategory, deleteSubcategory, updateSubcategory } from '../../Redux/slices/subcategorySlice';

export default function CategoriesPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllCategories());
    dispatch(fetchAllSubcategories());
  }, [dispatch])
  const categories = useSelector((state) => state?.ctegory?.categories);
  const allSubcategories = useSelector((state) => state?.subcategory?.subcategories);


  const [subcategories, setSubcategories] = useState([
    { id: 1, name: 'Smartphones', slug: 'smartphones', description: 'Mobile phones and accessories', status: 'Active', categoryId: 1, parentCategoryName: 'Electronics', productsCount: 12, image: 'https://readdy.ai/api/search-image?query=smartphone%20subcategory%20icon%20modern%20mobile%20phone%20on%20clean%20white%20background%2C%20minimal%20design&width=40&height=40&seq=sub1&orientation=squarish' },
    { id: 2, name: 'Laptops', slug: 'laptops', description: 'Portable computers and notebooks', status: 'Active', categoryId: 1, parentCategoryName: 'Electronics', productsCount: 8, image: 'https://readdy.ai/api/search-image?query=laptop%20subcategory%20icon%20modern%20notebook%20computer%20on%20clean%20white%20background%2C%20minimal%20design&width=40&height=40&seq=sub2&orientation=squarish' },
    { id: 3, name: 'Headphones', slug: 'headphones', description: 'Audio devices and earphones', status: 'Active', categoryId: 1, parentCategoryName: 'Electronics', productsCount: 15, image: 'https://readdy.ai/api/search-image?query=headphones%20subcategory%20icon%20modern%20audio%20device%20on%20clean%20white%20background%2C%20minimal%20design&width=40&height=40&seq=sub3&orientation=squarish' },
    { id: 4, name: 'Tablets', slug: 'tablets', description: 'Tablet computers and accessories', status: 'Inactive', categoryId: 1, parentCategoryName: 'Electronics', productsCount: 6, image: 'https://readdy.ai/api/search-image?query=tablet%20subcategory%20icon%20modern%20tablet%20device%20on%20clean%20white%20background%2C%20minimal%20design&width=40&height=40&seq=sub4&orientation=squarish' },
    { id: 5, name: 'Smart Watches', slug: 'smart-watches', description: 'Wearable technology devices', status: 'Active', categoryId: 1, parentCategoryName: 'Electronics', productsCount: 9, image: 'https://readdy.ai/api/search-image?query=smartwatch%20subcategory%20icon%20modern%20wearable%20device%20on%20clean%20white%20background%2C%20minimal%20design&width=40&height=40&seq=sub5&orientation=squarish' },
    { id: 6, name: 'Phone Cases', slug: 'phone-cases', description: 'Protective cases for smartphones', status: 'Active', categoryId: 2, parentCategoryName: 'Accessories', productsCount: 25, image: 'https://readdy.ai/api/search-image?query=phone%20case%20subcategory%20icon%20protective%20smartphone%20cover%20on%20clean%20white%20background%2C%20minimal%20design&width=40&height=40&seq=sub6&orientation=squarish' },
    { id: 7, name: 'Cables', slug: 'cables', description: 'Charging and data cables', status: 'Active', categoryId: 2, parentCategoryName: 'Accessories', productsCount: 18, image: 'https://readdy.ai/api/search-image?query=cable%20subcategory%20icon%20charging%20data%20cord%20on%20clean%20white%20background%2C%20minimal%20design&width=40&height=40&seq=sub7&orientation=squarish' },
    { id: 8, name: 'Chargers', slug: 'chargers', description: 'Power adapters and wireless chargers', status: 'Active', categoryId: 2, parentCategoryName: 'Accessories', productsCount: 12, image: 'https://readdy.ai/api/search-image?query=charger%20subcategory%20icon%20power%20adapter%20on%20clean%20white%20background%2C%20minimal%20design&width=40&height=40&seq=sub8&orientation=squarish' }
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
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const filteredCategories = categories?.filter(category => {
    const matchesSearch = (category?.name || "").toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === '' || category?.status == statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getSubcategoriesForCategory = (categoryId) => {
    return allSubcategories?.filter(sub => {
      const belongsToCategory = sub.categoryId === categoryId;
      const matchesSearch = (sub.name || "").toLowerCase().includes(subcategorySearchTerm.toLowerCase()) ||
        (sub.description || "").toLowerCase().includes(subcategorySearchTerm.toLowerCase());
      const matchesStatus = subcategoryStatusFilter === '' || sub.status === subcategoryStatusFilter;
      return belongsToCategory && matchesSearch && matchesStatus;
    });
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
    if (window.confirm("Are you sure you want to delete this subcategory?")) {
      dispatch(deleteSubcategory(id))
        .unwrap()
        .then(() => {
          // ✅ refresh subcategory list after delete
          dispatch(fetchAllSubcategories());
        })
        .catch((err) => {
          console.error("Delete failed:", err);
        });
    }
  };

  const confirmDelete = () => {
    if (categoryToDelete) {
      dispatch(deleteCategory(categoryToDelete))
        .unwrap()
        .then(() => {
          setShowDeleteConfirm(false);
          setCategoryToDelete(null);
        })
        .catch(err => console.error("Delete failed:", err));
    }
  };

  const confirmSubcategoryDelete = () => {
    if (subcategoryToDelete) {
      setSubcategories(prev => prev.filter(sub => sub.id !== subcategoryToDelete));
      // Update category subcategories count
      const deletedSub = subcategories.find(sub => sub.id === subcategoryToDelete);
      if (deletedSub) {
        // setCategories(prev => prev.map(cat => 
        //   cat.id === deletedSub.categoryId 
        //     ? { ...cat, subcategories: cat.subcategories - 1 }
        //     : cat
        // ));
      }
      setShowSubcategoryDeleteConfirm(false);
      setSubcategoryToDelete(null);
    }
  };

  const toggleSubcategories = (categoryId) => {
    setSelectedCategoryId(categoryId);
    // Don't fetch here, just toggle. All subcategories are already loaded.
    setExpandedRows((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };


  const getStatusColor = (status) => {
    return status == 1
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
                {filteredCategories?.map((category) => (
                  < React.Fragment key={category.id}>
                    <tr className="hover:bg-gray-50">
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
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(category?.status)}`}
                        >
                          {category?.status == 1 ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-700">{category?.productsCount}</td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => toggleSubcategories(category?.id)}
                          className="flex items-center text-sm text-blue-600 hover:text-blue-700 cursor-pointer"
                        >
                          {category?.subcategories?.length || 0}
                          <i
                            className={`ri-arrow-down-s-line ml-1 transition-transform ${expandedRows.includes(category?.id) ? "rotate-180" : ""
                              }`}
                          ></i>
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
                            onClick={() => handleDelete(category?.id)}
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-red-600 cursor-pointer"
                          >
                            <i className="ri-delete-bin-line"></i>
                          </button>
                        </div>
                      </td>
                    </tr>

                    {expandedRows?.includes(category?.id) && (
                      <tr>
                        <td colSpan={6} className="py-4 px-4 bg-gray-50">
                          <div className="ml-16">
                            <div className="flex items-center justify-between mb-4">
                              <h5 className="text-sm font-medium text-gray-700">Subcategories for {category?.name}</h5>
                              <button
                                onClick={() => {
                                  setSelectedSubcategory(null);
                                  setShowSubcategoryModal(true);
                                }}
                                className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition-colors flex items-center text-sm cursor-pointer"
                              >
                                <i className="ri-add-line mr-1"></i>
                                Add Subcategory
                              </button>
                            </div>

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

                            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                              <table className="w-full text-sm">
                                <thead className="bg-gray-100">
                                  <tr>
                                    <th className="text-left py-2 px-3 text-xs font-medium text-gray-600">Subcategory</th>
                                    <th className="text-left py-2 px-3 text-xs font-medium text-gray-600">Status</th>
                                    <th className="text-left py-2 px-3 text-xs font-medium text-gray-600">Products</th>
                                    <th className="text-left py-2 px-3 text-xs font-medium text-gray-600">Actions</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                  {getSubcategoriesForCategory(category?.id)?.map((subcategory) => (
                                    <tr key={subcategory?.id} className="hover:bg-gray-50">
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
                                            <h6 className="text-sm font-medium text-gray-900">{subcategory?.name}</h6>
                                          </div>
                                        </div>
                                      </td>

                                      <td className="py-3 px-3">
                                        <span
                                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(subcategory?.status)}`}
                                        >
                                          {subcategory?.status == 1 ? 'Active' : 'Inactive'}
                                        </span>
                                      </td>
                                      <td className="py-3 px-3 text-sm text-gray-700">{subcategory?.productsCount}</td>
                                      <td className="py-3 px-3">
                                        <div className="flex items-center space-x-1">
                                          <button
                                            onClick={() => handleEditSubcategory(subcategory)}
                                            className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-blue-600 cursor-pointer"
                                          >
                                            <i className="ri-edit-line text-sm"></i>
                                          </button>
                                          <button
                                            onClick={() => handleDeleteSubcategory(subcategory?.id)}
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

                              {getSubcategoriesForCategory(category?.id)?.length === 0 && (
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
                  </React.Fragment>
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
              // setCategories(prev => prev.map(cat => 
              //   cat.id === selectedCategory.id ? { ...cat, ...categoryData } : cat
              // ));
            } else {
              const newCategory = {
                id: Date.now(),
                subcategories: 0,
                productsCount: 0,
                ...categoryData
              };
              // setCategories(prev => [...prev, newCategory]);
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
              // setCategories(prev => prev.map(cat => 
              //   cat.id === subcategoryData.categoryId 
              //     ? { ...cat, subcategories: cat.subcategories + 1 }
              //     : cat
              // ));
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
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: category?.name || "",
    status: category?.status === 1 || category?.status === 'Active' ? 'Active' : 'Inactive',
    image: category?.image || null,
  });

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0], // Save file object
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("status", formData.status === "Active" ? 1 : 0);
    if (formData.image) {
      data.append("image", formData.image);
    }
    setLoading(true)
    if (category?.id) {
      // ✅ Update existing category
      dispatch(updateCategory({ id: category.id, data }))
        .unwrap()
        .then(() => {
          onClose();
        })
        .catch((err) => console.error("Failed to update category:", err))
        .finally(() => setLoading(false));

    } else {
      // ✅ Create new category
      dispatch(createCategory(data))
        .unwrap()
        .then(() => {
          onClose();
        })
        .catch((err) => console.error("Failed to create category:", err))
        .finally(() => setLoading(false));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {category ? "Edit Category" : "Add New Category"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Enter category name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, status: e.target.value }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-2 text-sm"
            />
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 text-white rounded-lg ${loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              {loading
                ? "Saving..."
                : category
                  ? "Update Category"
                  : "Create Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function SubcategoryModal({ subcategory, categories, onClose }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    categoryId: subcategory?.categoryId || (categories?.[0]?.id ?? ""),
    name: subcategory?.name || "",
    status: subcategory?.status === 1 || subcategory?.status === "Active" ? "Active" : "Inactive",
    image: null,
  });

  const [filters, setFilters] = useState(
    subcategory?.filters
      ? Object.entries(subcategory.filters).map(([key, values]) => ({
        key,
        values: values.join(", "),
      }))
      : []
  );

  // Add new filter row
  const addFilter = () => setFilters([...filters, { key: "", values: "" }]);

  // Update filter row
  const updateFilter = (index, field, value) => {
    const newFilters = [...filters];
    newFilters[index][field] = value;
    setFilters(newFilters);
  };

  // Remove filter row
  const removeFilter = (index) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert filters to object { key: [values] }
    const filtersObject = {};
    filters.forEach((f) => {
      if (f.key && f.values) {
        filtersObject[f.key] = f.values.split(",").map((v) => v.trim());
      }
    });

    const data = new FormData();
    data.append("categoryId", formData.categoryId);
    data.append("name", formData.name);
    data.append("status", formData.status === "Active" ? 1 : 0);
    data.append("filters", JSON.stringify(filtersObject));

    if (formData.image) {
      data.append("image", formData.image);
    }

    // ✅ If editing, call updateSubcategory, else create
    if (subcategory) {
      data.append("id", subcategory.id); // assuming backend expects id
      dispatch(updateSubcategory({ id: subcategory.id, data }))
        .unwrap()
        .then(() => {
          dispatch(fetchAllSubcategories());
          onClose();
        })
        .catch((err) => console.error("Failed to update subcategory:", err));
    } else {
      dispatch(createSubcategory(data))
        .unwrap()
        .then(() => {
          dispatch(fetchAllSubcategories());
          onClose();
        })
        .catch((err) => console.error("Failed to create subcategory:", err));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {subcategory ? "Edit Subcategory" : "Add New Subcategory"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Parent Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Parent Category
            </label>
            <select
              value={formData.categoryId}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  categoryId: Number(e.target.value),
                }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
              required
            >
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subcategory Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
              required
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, status: e.target.value }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Filters Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filters
            </label>
            {filters.map((filter, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Filter Name (e.g. gender)"
                  value={filter.key}
                  onChange={(e) => updateFilter(index, "key", e.target.value)}
                  className="flex-1 px-3 py-2 border rounded text-sm"
                />
                <input
                  type="text"
                  placeholder="Values (comma separated)"
                  value={filter.values}
                  onChange={(e) => updateFilter(index, "values", e.target.value)}
                  className="flex-1 px-3 py-2 border rounded text-sm"
                />
                <button
                  type="button"
                  onClick={() => removeFilter(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addFilter}
              className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
            >
              + Add Filter
            </button>
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subcategory Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-2 text-sm"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {subcategory ? "Update" : "Create"} Subcategory
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

