import { useState } from 'react';
import { Search, Filter, Plus, RefreshCw } from 'lucide-react';
import { useOrders } from '../../hooks/useOrders.js';
import { useTables } from '../../hooks/useTables.js';
import CreateOrderModal from '../../components/modals/createOrderModal/CreateOrderModal.jsx';
import OrderCard from '../../components/cards/orderCard/OrderCard.jsx';
import styles from './Orders.module.css';

export default function Orders() {
  const { orders, loading, error, refetch, updateStatus, markComplete, createOrder } = useOrders();
  const { tables } = useTables();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTable, setSearchTable] = useState('');

  const tableNumberById = new Map((tables || []).map(t => [t.id, t.number]));

  const ordersWithTableNumber = orders.map((order) => ({
    ...order,
    tableNumber: order.tableNumber ?? tableNumberById.get(order.tableId),
  }));

  const filteredOrders = ordersWithTableNumber.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const tableNum = order.tableNumber ?? '';
    const matchesTable = !searchTable || tableNum.toString().includes(searchTable);
    return matchesStatus && matchesTable;
  });

  const activeCount = orders.filter(o => ['pending', 'preparing'].includes(o.status)).length;
  const totalToday = orders.reduce((sum, o) => sum + (o.totalPrice || o.total || 0), 0);
  const pendingCount = orders.filter(o => o.status === 'pending').length;
  const preparingCount = orders.filter(o => o.status === 'preparing').length;
  const readyCount = orders.filter(o => o.status === 'ready').length;

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <h1 className={styles.title}>Orders</h1>
          <p className={styles.subtitle}>Order management</p>
        </div>
        <div className={styles.loading}>
          Loading orders...
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Orders</h1>
          <p className={styles.subtitle}>
            {activeCount} active orders • ${totalToday.toFixed(2)} today
          </p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.iconBtn} onClick={refetch} title="Refresh">
            <RefreshCw size={18} />
          </button>
          <button className={styles.newOrderBtn} onClick={() => setIsModalOpen(true)}>
            <Plus size={18} /> New Order
          </button>
        </div>
      </div>

      <div className={styles.statCards}>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Pending</div>
          <div className={styles.statValue}>{pendingCount}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Preparing</div>
          <div className={styles.statValue}>{preparingCount}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Ready</div>
          <div className={styles.statValue}>{readyCount}</div>
        </div>
      </div>

      <div className={styles.filters}>
        <div className={styles.searchWrapper}>
          <Search className={styles.searchIcon} size={18} />
          <input
            type="text"
            placeholder="Search by table number..."
            value={searchTable}
            onChange={(e) => setSearchTable(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <div className={styles.filterBtns}>
          <button 
            className={`${styles.filterBtn} ${filterStatus === 'all' ? styles.active : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            <Filter size={16} /> All
          </button>
          <button 
            className={`${styles.filterBtn} ${filterStatus === 'pending' ? styles.active : ''}`}
            onClick={() => setFilterStatus('pending')}
          >
            Pending <span className={styles.pill}>{pendingCount}</span>
          </button>
          <button 
            className={`${styles.filterBtn} ${filterStatus === 'preparing' ? styles.active : ''}`}
            onClick={() => setFilterStatus('preparing')}
          >
            Preparing <span className={styles.pill}>{preparingCount}</span>
          </button>
          <button 
            className={`${styles.filterBtn} ${filterStatus === 'ready' ? styles.active : ''}`}
            onClick={() => setFilterStatus('ready')}
          >
            Ready <span className={styles.pill}>{readyCount}</span>
          </button>
        </div>
      </div>

      {error && (
        <div className={styles.error}>
          Error: {error}. <button onClick={refetch}>Retry</button>
        </div>
      )}

      {showSuccess && (
        <div className={styles.successToast}>
          ✅ Order created successfully! Refreshing...
        </div>
      )}

      {filteredOrders.length === 0 ? (
        <div className={styles.empty}>
          <h3>No orders match your filters</h3>
          <p>Try adjusting your search or status filter.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onUpdateStatus={updateStatus}
              onComplete={markComplete}
              isUpdating={false}
            />
          ))}
        </div>
      )}

      <CreateOrderModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setShowSuccess(false);
        }} 
        onCreate={async (orderData) => {
          try {
            await createOrder(orderData);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
          } catch (err) {
            console.error('Order creation failed', err);
          }
        }} 
      />
    </div>
  );
}
