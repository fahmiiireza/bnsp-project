'use client';

import React, { useState } from 'react';

export default function StaffDashboard() {
  const [memberId, setMemberId] = useState('');
  const [itemId, setItemId] = useState('');
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleBorrow = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    try {
      const res = await fetch('http://localhost:3000/library/borrow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ memberId: Number(memberId), itemId: Number(itemId) }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Failed to borrow item');
      }

      const data = await res.json();
      setStatus({ 
        type: 'success', 
        message: `Success! Item expected return date is exactly 7 days later: ${new Date(data.expectedReturnDate).toLocaleDateString()}` 
      });
      setMemberId('');
      setItemId('');
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message });
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Staff Dashboard</h2>
      
      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', maxWidth: '500px' }}>
        <h3 style={{ margin: '0 0 1.5rem 0' }}>Record New Borrow</h3>
        
        {status && (
          <div style={{ 
            padding: '1rem', 
            marginBottom: '1rem', 
            borderRadius: '4px',
            backgroundColor: status.type === 'success' ? '#e8f8f5' : '#fadbd8',
            color: status.type === 'success' ? '#1abc9c' : '#e74c3c',
          }}>
            {status.message}
          </div>
        )}

        <form onSubmit={handleBorrow}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Member ID</label>
            <input 
              type="number" 
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              required
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Book/Item ID</label>
            <input 
              type="number" 
              value={itemId}
              onChange={(e) => setItemId(e.target.value)}
              required
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          <button 
            type="submit" 
            style={{ 
              backgroundColor: '#3498db', 
              color: 'white', 
              border: 'none', 
              padding: '0.75rem 1.5rem', 
              borderRadius: '4px', 
              cursor: 'pointer',
              fontWeight: 'bold',
              width: '100%'
            }}
          >
            Process Borrow
          </button>
        </form>
      </div>
    </div>
  );
}
