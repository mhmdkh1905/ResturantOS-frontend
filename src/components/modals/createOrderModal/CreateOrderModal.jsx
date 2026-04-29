import { useState, useMemo, useCallback } from 'react';
import { X, Plus, Trash2, Search, Users, Minus, Image as ImageIcon } from 'lucide-react';
import { useMenu } from '../../../hooks/useMenu.js';
import { useTables } from '../../../hooks/useTables.js';
import styles from './CreateOrderModal.module.css';

export default function CreateOrderModal({ isOpen, onClose, onCreate }) {
  const [selectedTableId, setSelectedTableId] = useState('');
  const [menuSearch, setMenuSearch] = useState('');
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [currentQty, setCurrentQty] = useState(1);
  const [orderItems, setOrderItems] = useState([]);
  const [notes, setNotes] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { menuItems } = useMenu();
  const { tables } = useTables();

  // Reset form on modal open using key re-mount
  const subtotal = useMemo(() => orderItems.reduce((sum, item) => sum + (item.qty * item.price), 0), [orderItems]);
  const grandTotal = useMemo(() => subtotal * (1 - discount / 100), [subtotal, discount]);

  const filteredMenu = useMemo(() => 
    menuItems.filter(item => item.name.toLowerCase().includes(menuSearch.toLowerCase()))
  , [menuItems, menuSearch]);

  const updateCurrentQty = useCallback((delta) => {
    setCurrentQty(prev => Math.max(1, prev + delta));
  }, []);

  const addItem = useCallback(() => {
    if (selectedMenuItem && currentQty > 0) {
      setOrderItems(prev => [...prev, { ...selectedMenuItem, qty: currentQty }]);
      setMenuSearch('');
      setSelectedMenuItem(null);
      setCurrentQty(1);
    }
  }, [selectedMenuItem, currentQty]);

  const updateOrderItemQty = useCallback((index, delta) => {
    setOrderItems(prev => prev.map((item, i) => 
      i === index ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    ));
  }, []);

  const removeItem = useCallback((index) => {
    setOrderItems(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTableId || orderItems.length === 0) return;

    // Slim payload per spec: IDs + quantities only (prices/names frontend display)
    const orderData = {
      tableId: selectedTableId,
      items: orderItems.map(i => ({
        menuItemId: i.id,
        quantity: i.qty
      })),
      notes
    };

    setIsSubmitting(true);
    try {
      await onCreate(orderData);
      // Reset form
      setSelectedTableId('');
      setOrderItems([]);
      setNotes('');
      setDiscount(0);
      onClose();
    } catch (error) {
      console.error('Order creation failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div key={`modal-${isOpen}`} className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>New Order</h2>
          <button onClick={onClose} className={styles.closeBtn}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Table Select */}
          <div className={styles.field}>
            <label>Table</label>
            <div className={styles.selectWrapper}>
              <Users size={16} />
              <select 
                value={selectedTableId} 
                onChange={(e) => setSelectedTableId(e.target.value)}
                required
              >
                <option value="">Select table</option>
                {tables.map(table => {
                  const safeStatus = table.status?.name || table.status || 'free';
                  return (
                    <option key={table.id} value={table.id}>
                      Table #{table.number ?? '—'} {safeStatus === 'occupied' ? '(Occupied)' : '(Free)'}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* Menu Search & Grid */}
          <div className={styles.field}>
            <label>Menu Items</label>
            <div className={styles.itemSearch}>
              <Search size={16} />
              <input
                placeholder="Search menu items..."
                value={menuSearch}
                onChange={(e) => setMenuSearch(e.target.value)}
              />
            </div>
            <div className={styles.menuGrid}>
              {filteredMenu.length === 0 ? (
                <div className={styles.emptyMenu}>No items found</div>
              ) : (
                filteredMenu.slice(0, 8).map(item => (
                  <div 
                    key={item.id}
                    className={styles.menuItemCard}
                    onClick={() => setSelectedMenuItem(item)}
                  >
                    <div className={styles.itemImage}>
                      <ImageIcon size={24} />
                    </div>
                    <div className={styles.itemDetails}>
                      <div className={styles.itemName}>{item.name}</div>
                      <div className={styles.itemPrice}>${item.price?.toFixed(2)}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Current Selection Stepper */}
          {selectedMenuItem && (
            <div className={styles.selectionPanel}>
              <div className={styles.selectionInfo}>
                <div className={styles.itemImageSmall}>
                  <ImageIcon size={20} />
                </div>
                <div>
                  <div className={styles.itemName}>{selectedMenuItem.name}</div>
                  <div className={styles.itemPrice}>${selectedMenuItem.price?.toFixed(2)}</div>
                </div>
              </div>
              <div className={styles.stepper}>
                <button type="button" onClick={() => updateCurrentQty(-1)} className={styles.stepBtn}>
                  <Minus size={16} />
                </button>
                <span className={styles.qtyDisplay}>{currentQty}</span>
                <button type="button" onClick={() => updateCurrentQty(1)} className={styles.stepBtn}>
                  <Plus size={16} />
                </button>
              </div>
              <button type="button" onClick={addItem} className={styles.addBtnLarge}>
                Add {currentQty > 1 && `x${currentQty}`} - ${(currentQty * selectedMenuItem.price).toFixed(2)}
              </button>
            </div>
          )}

          {/* Order Items List */}
          {orderItems.length > 0 && (
            <div className={styles.itemsList}>
              <h4>Order Items ({orderItems.reduce((sum, i) => sum + i.qty, 0)} items)</h4>
              {orderItems.map((item, index) => (
                <div key={index} className={styles.orderItemRow}>
                  <div className={styles.orderItemInfo}>
                    <div className={styles.itemName}>{item.name}</div>
                    <div className={styles.lineTotal}>${(item.qty * item.price).toFixed(2)}</div>
                  </div>
                  <div className={styles.orderItemControls}>
                    <div className={styles.stepperSmall}>
                      <button type="button" onClick={() => updateOrderItemQty(index, -1)} className={styles.stepBtnSmall}>
                        <Minus size={14} />
                      </button>
                      <span>{item.qty}</span>
                      <button type="button" onClick={() => updateOrderItemQty(index, 1)} className={styles.stepBtnSmall}>
                        <Plus size={14} />
                      </button>
                    </div>
                    <button type="button" onClick={() => removeItem(index)} className={styles.removeBtn}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Totals Panel */}
          <div className={styles.totalsPanel}>
            <div className={styles.totalRow}>
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className={styles.field}>
              <label>Discount (%)</label>
              <input 
                type="number" 
                min="0" 
                max="100" 
                value={discount} 
                onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                className={styles.discountInput}
              />
            </div>
            <div className={styles.field}>
              <label>Notes</label>
              <textarea 
                placeholder="Special instructions..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className={styles.notesTextarea}
                rows={3}
              />
            </div>
            <div className={styles.grandTotalRow}>
              <span>Total:</span>
              <span className={styles.grandTotal}>${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>
              Cancel
            </button>
            <button type="submit" disabled={!selectedTableId || orderItems.length === 0 || isSubmitting} className={styles.createBtn}>
              {isSubmitting ? 'Placing...' : 'Place Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
