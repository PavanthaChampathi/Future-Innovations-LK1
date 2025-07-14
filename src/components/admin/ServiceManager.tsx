import React, { useState } from 'react';
import { Settings, Plus, Edit, Trash2, Save, X } from 'lucide-react';

const ServiceManager = () => {
  const [editingService, setEditingService] = useState<string | null>(null);
  const [services, setServices] = useState([
    {
      id: '3d-printing-pla',
      name: '3D Printing - PLA+',
      category: '3D Printing',
      material: 'PLA+',
      price: 50,
      unit: 'gram',
      description: 'High-quality PLA+ printing with excellent surface finish',
      active: true
    },
    {
      id: '3d-printing-abs',
      name: '3D Printing - ABS',
      category: '3D Printing',
      material: 'ABS',
      price: 60,
      unit: 'gram',
      description: 'Durable ABS printing for functional parts',
      active: true
    },
    {
      id: '3d-printing-etpu',
      name: '3D Printing - eTU-95A',
      category: '3D Printing',
      material: 'eTU-95A',
      price: 75,
      unit: 'gram',
      description: 'Flexible eTU-95A for rubber-like applications',
      active: true
    },
    {
      id: 'laser-wood',
      name: 'Laser Cutting - Wood',
      category: 'Laser Cutting',
      material: 'Wood',
      price: 100,
      unit: 'minute',
      description: 'Precision wood cutting with smooth edges',
      active: true
    },
    {
      id: 'laser-acrylic',
      name: 'Laser Cutting - Acrylic',
      category: 'Laser Cutting',
      material: 'Acrylic',
      price: 120,
      unit: 'minute',
      description: 'Clean acrylic cutting with polished edges',
      active: true
    },
    {
      id: 'laser-cardboard',
      name: 'Laser Cutting - Cardboard',
      category: 'Laser Cutting',
      material: 'Cardboard',
      price: 80,
      unit: 'minute',
      description: 'Fast cardboard cutting for prototyping',
      active: true
    }
  ]);

  const [newService, setNewService] = useState({
    name: '',
    category: '3D Printing',
    material: '',
    price: 0,
    unit: 'gram',
    description: '',
    active: true
  });

  const [showAddForm, setShowAddForm] = useState(false);

  const handleEdit = (serviceId: string) => {
    setEditingService(serviceId);
  };

  const handleSave = (serviceId: string, updatedData: any) => {
    setServices(services.map(service => 
      service.id === serviceId ? { ...service, ...updatedData } : service
    ));
    setEditingService(null);
  };

  const handleDelete = (serviceId: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter(service => service.id !== serviceId));
    }
  };

  const handleAddService = () => {
    const id = `${newService.category.toLowerCase().replace(' ', '-')}-${newService.material.toLowerCase()}`;
    setServices([...services, { ...newService, id }]);
    setNewService({
      name: '',
      category: '3D Printing',
      material: '',
      price: 0,
      unit: 'gram',
      description: '',
      active: true
    });
    setShowAddForm(false);
  };

  const toggleServiceStatus = (serviceId: string) => {
    setServices(services.map(service => 
      service.id === serviceId ? { ...service, active: !service.active } : service
    ));
  };

  const ServiceRow = ({ service }: { service: any }) => {
    const [editData, setEditData] = useState(service);
    const isEditing = editingService === service.id;

    if (isEditing) {
      return (
        <tr className="bg-blue-50">
          <td className="py-4 px-6">
            <input
              type="text"
              value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </td>
          <td className="py-4 px-6">
            <select
              value={editData.category}
              onChange={(e) => setEditData({ ...editData, category: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="3D Printing">3D Printing</option>
              <option value="Laser Cutting">Laser Cutting</option>
            </select>
          </td>
          <td className="py-4 px-6">
            <input
              type="text"
              value={editData.material}
              onChange={(e) => setEditData({ ...editData, material: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </td>
          <td className="py-4 px-6">
            <div className="flex items-center space-x-2">
              <span className="text-sm">LKR</span>
              <input
                type="number"
                value={editData.price}
                onChange={(e) => setEditData({ ...editData, price: parseInt(e.target.value) })}
                className="w-20 p-2 border rounded"
              />
              <span className="text-sm">/{editData.unit}</span>
            </div>
          </td>
          <td className="py-4 px-6">
            <input
              type="text"
              value={editData.description}
              onChange={(e) => setEditData({ ...editData, description: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </td>
          <td className="py-4 px-6">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleSave(service.id, editData)}
                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              >
                <Save className="h-4 w-4" />
              </button>
              <button
                onClick={() => setEditingService(null)}
                className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </td>
        </tr>
      );
    }

    return (
      <tr className="hover:bg-gray-50">
        <td className="py-4 px-6">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${service.active ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="font-medium text-gray-900">{service.name}</span>
          </div>
        </td>
        <td className="py-4 px-6">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {service.category}
          </span>
        </td>
        <td className="py-4 px-6 text-gray-600">{service.material}</td>
        <td className="py-4 px-6">
          <span className="text-lg font-semibold text-gray-900">
            LKR {service.price}/{service.unit}
          </span>
        </td>
        <td className="py-4 px-6 text-gray-600 max-w-xs truncate">{service.description}</td>
        <td className="py-4 px-6">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => toggleServiceStatus(service.id)}
              className={`p-2 rounded-lg transition-colors ${
                service.active 
                  ? 'text-red-600 hover:bg-red-50' 
                  : 'text-green-600 hover:bg-green-50'
              }`}
              title={service.active ? 'Deactivate' : 'Activate'}
            >
              <Settings className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleEdit(service.id)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleDelete(service.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Service Manager</h1>
          <p className="text-gray-600">Manage your services and pricing</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Service</span>
        </button>
      </div>

      {/* Add Service Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Service</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Service Name</label>
              <input
                type="text"
                value={newService.name}
                onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Premium 3D Printing"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={newService.category}
                onChange={(e) => setNewService({ ...newService, category: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="3D Printing">3D Printing</option>
                <option value="Laser Cutting">Laser Cutting</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Material</label>
              <input
                type="text"
                value={newService.material}
                onChange={(e) => setNewService({ ...newService, material: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., PLA+, ABS, Wood"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price (LKR)</label>
              <input
                type="number"
                value={newService.price}
                onChange={(e) => setNewService({ ...newService, price: parseInt(e.target.value) })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
              <select
                value={newService.unit}
                onChange={(e) => setNewService({ ...newService, unit: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="gram">per gram</option>
                <option value="minute">per minute</option>
                <option value="piece">per piece</option>
                <option value="hour">per hour</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={newService.description}
              onChange={(e) => setNewService({ ...newService, description: e.target.value })}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Service description..."
            />
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleAddService}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Add Service
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Services Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Service Name</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Category</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Material</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Price</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Description</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {services.map((service) => (
                <ServiceRow key={service.id} service={service} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {services.length === 0 && (
        <div className="text-center py-12">
          <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No services found. Add your first service to get started.</p>
        </div>
      )}
    </div>
  );
};

export default ServiceManager;