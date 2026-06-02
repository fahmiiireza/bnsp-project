import React from 'react';

// Fetch the catalog (Server Component)
async function getCatalog() {
  try {
    const res = await fetch('http://localhost:3000/library/catalog', { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  } catch (err) {
    console.error(err);
    // Return dummy data on failure so the UI still shows up
    return [
      { id: 1, title: 'Clean Code', author: 'Robert C. Martin', isAvailable: true },
      { id: 2, title: 'Design Patterns', author: 'Gang of Four', isAvailable: false },
    ];
  }
}

export default async function CatalogPage() {
  const books = await getCatalog();

  return (
    <div>
      <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Public Catalog</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {books.map((book: any) => (
          <div key={book.id} style={{ 
            backgroundColor: 'white', 
            padding: '1.5rem', 
            borderRadius: '8px', 
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s ease',
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>{book.title}</h3>
            {book.author && <p style={{ margin: '0 0 1rem 0', color: '#7f8c8d' }}>By {book.author}</p>}
            <span style={{ 
              display: 'inline-block',
              padding: '0.25rem 0.5rem',
              borderRadius: '4px',
              fontSize: '0.875rem',
              backgroundColor: book.isAvailable ? '#e8f8f5' : '#fadbd8',
              color: book.isAvailable ? '#1abc9c' : '#e74c3c',
            }}>
              {book.isAvailable ? 'Available' : 'Borrowed'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
