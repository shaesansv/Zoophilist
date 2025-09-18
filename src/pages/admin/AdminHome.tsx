import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import api from '../../api/axios';
import { useToast } from '../../hooks/use-toast';
import { Shop } from '../../types';

const AdminHome: React.FC = () => {
  const { shop, refreshShop } = useAppContext();
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  const [shopData, setShopData] = useState<Shop>({
    description: '',
    youtubeUrl: '',
    owner: {
      name: '',
      phone: '',
      email: '',
      address: '',
    },
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    refreshShop();
  }, []);

  useEffect(() => {
    if (shop) {
      setShopData(shop);
    }
  }, [shop]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put('/shop', shopData);
      await refreshShop();
      setEditing(false);
      toast({
        title: "Shop Settings Updated",
        description: "Changes are now live on the website",
      });
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.response?.data?.message || 'Failed to update shop settings',
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (shop) {
      setShopData(shop);
    }
    setEditing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-foreground mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Shop Description */}
        <div className="forest-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-forest-glow">Shop Description</h2>
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="forest-button text-sm px-4 py-2"
              >
                Edit
              </button>
            )}
          </div>

          {editing ? (
            <div className="space-y-4">
              <textarea
                rows={4}
                value={shopData.description}
                onChange={(e) => setShopData(prev => ({ ...prev, description: e.target.value }))}
                className="forest-input w-full resize-none"
                placeholder="Enter shop description that will appear on the homepage"
              />
              <div className="flex space-x-3">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="forest-button flex-1"
                >
                  {saving ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-accent transition-colors flex-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="text-forest-text">
              {shop?.description || 'No description set yet'}
            </p>
          )}
        </div>

        {/* YouTube URL */}
        <div className="forest-card">
          <h2 className="text-xl font-bold text-forest-glow mb-6">Featured Video</h2>
          
          {editing ? (
            <div className="space-y-4">
              <input
                type="url"
                value={shopData.youtubeUrl}
                onChange={(e) => setShopData(prev => ({ ...prev, youtubeUrl: e.target.value }))}
                className="forest-input w-full"
                placeholder="https://www.youtube.com/watch?v=..."
              />
              <p className="text-sm text-forest-text">
                Paste a YouTube URL to display on the homepage
              </p>
            </div>
          ) : (
            <div>
              {shop?.youtubeUrl ? (
                <div className="space-y-3">
                  <p className="text-forest-text break-all">{shop.youtubeUrl}</p>
                  <div className="aspect-video bg-forest-medium rounded-lg overflow-hidden">
                    <iframe
                      src={shop.youtubeUrl.replace('watch?v=', 'embed/')}
                      className="w-full h-full"
                      title="Featured Video"
                    />
                  </div>
                </div>
              ) : (
                <p className="text-forest-text">No video URL set</p>
              )}
            </div>
          )}
        </div>

        {/* Owner Information */}
        <div className="forest-card lg:col-span-2">
          <h2 className="text-xl font-bold text-forest-glow mb-6">Owner Information</h2>
          
          {editing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Owner Name
                </label>
                <input
                  type="text"
                  value={shopData.owner.name}
                  onChange={(e) => setShopData(prev => ({
                    ...prev,
                    owner: { ...prev.owner, name: e.target.value }
                  }))}
                  className="forest-input w-full"
                  placeholder="Enter owner name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={shopData.owner.phone}
                  onChange={(e) => setShopData(prev => ({
                    ...prev,
                    owner: { ...prev.owner, phone: e.target.value }
                  }))}
                  className="forest-input w-full"
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={shopData.owner.email}
                  onChange={(e) => setShopData(prev => ({
                    ...prev,
                    owner: { ...prev.owner, email: e.target.value }
                  }))}
                  className="forest-input w-full"
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Shop Address
                </label>
                <textarea
                  rows={3}
                  value={shopData.owner.address}
                  onChange={(e) => setShopData(prev => ({
                    ...prev,
                    owner: { ...prev.owner, address: e.target.value }
                  }))}
                  className="forest-input w-full resize-none"
                  placeholder="Enter complete shop address"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Owner Name</h3>
                <p className="text-forest-text">{shop?.owner?.name || 'Not set'}</p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Phone Number</h3>
                <p className="text-forest-text">{shop?.owner?.phone || 'Not set'}</p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Email Address</h3>
                <p className="text-forest-text">{shop?.owner?.email || 'Not set'}</p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Shop Address</h3>
                <p className="text-forest-text">{shop?.owner?.address || 'Not set'}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;