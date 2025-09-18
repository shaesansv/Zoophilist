import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import api from '../../api/axios';
import { useToast } from '../../hooks/use-toast';
import { Order } from '../../types';

const AdminCustomers: React.FC = () => {
  const { orders, refreshOrders } = useAppContext();
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState({
    from: '',
    to: '',
  });
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    refreshOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, dateRange]);

  const filterOrders = () => {
    let filtered = [...orders];

    if (dateRange.from) {
      filtered = filtered.filter(order => 
        new Date(order.createdAt) >= new Date(dateRange.from)
      );
    }

    if (dateRange.to) {
      filtered = filtered.filter(order => 
        new Date(order.createdAt) <= new Date(dateRange.to + 'T23:59:59')
      );
    }

    // Sort by most recent first
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    setFilteredOrders(filtered);
  };

  const handleExportCSV = async () => {
    setExporting(true);
    try {
      const params = new URLSearchParams();
      if (dateRange.from) params.append('from', new Date(dateRange.from).toISOString());
      if (dateRange.to) params.append('to', new Date(dateRange.to + 'T23:59:59').toISOString());

      const response = await api.get(`/orders/export?${params.toString()}`, {
        responseType: 'blob',
      });

      // Create download link
      const blob = new Blob([response.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `orders-${dateRange.from || 'all'}-${dateRange.to || 'latest'}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Export Complete",
        description: "Orders have been downloaded as CSV",
      });
    } catch (error: any) {
      toast({
        title: "Export Failed",
        description: error.response?.data?.message || 'Failed to export orders',
        variant: "destructive",
      });
    } finally {
      setExporting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatItems = (items: Order['items']) => {
    return items.map(item => `${item.name} (x${item.quantity})`).join(', ');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-foreground mb-8">Customer Orders</h1>

      {/* Filters and Export */}
      <div className="forest-card mb-8">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-foreground">From:</label>
            <input
              type="date"
              value={dateRange.from}
              onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
              className="forest-input"
            />
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-foreground">To:</label>
            <input
              type="date"
              value={dateRange.to}
              onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
              className="forest-input"
            />
          </div>

          <button
            onClick={() => setDateRange({ from: '', to: '' })}
            className="px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-accent transition-colors"
          >
            Clear Filters
          </button>

          <button
            onClick={handleExportCSV}
            disabled={exporting}
            className="forest-button ml-auto"
          >
            {exporting ? 'Exporting...' : 'Export CSV'}
          </button>
        </div>

        <div className="mt-4 text-sm text-forest-text">
          Showing {filteredOrders.length} of {orders.length} orders
        </div>
      </div>

      {/* Orders Table */}
      <div className="forest-card">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No Orders Found</h3>
            <p className="text-forest-text">
              {orders.length === 0 ? 'No orders have been placed yet' : 'No orders match your filters'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Customer</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Contact</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Address</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Items</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Total</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order._id} className="border-b border-border hover:bg-forest-medium/30 transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-medium text-foreground">{order.customerName}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-forest-text text-sm">
                        <div>{order.phone}</div>
                        {order.altPhone && (
                          <div className="text-xs">Alt: {order.altPhone}</div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-forest-text text-sm max-w-xs">
                        {order.address}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-forest-text text-sm max-w-xs">
                        {formatItems(order.items)}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="currency font-semibold text-forest-glow">
                        ₹{order.totalINR.toLocaleString('en-IN')}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-forest-text text-sm">
                        {formatDate(order.createdAt)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCustomers;