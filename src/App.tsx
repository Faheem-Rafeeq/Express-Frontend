import axios from 'axios';
import React, { useEffect, useState } from 'react';

const App = () => {
  const [list, setList] = useState<any[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [result, setResult] = useState<any | null>(null);

  const api = "http://localhost:3000/api/users";


  const handleSearch = async () => {
    setLoading(true);
    setError(false);
    setResult(null);

    try {
      const res = await axios.get(api);
      setList(res.data);

      // Find the user by name (case-insensitive)
      const match = res.data.find((user: any) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      );

      if (match) {
        setResult(match);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>User Search</h2>

      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Enter name"
        style={{ padding: '8px', width: '200px' }}
      />
      <button onClick={handleSearch} style={{ padding: '8px 12px', marginLeft: '10px' }}>
        Search
      </button>

      {loading && <p>Loading...</p>}
      {error && <p>No user found.</p>}

      {result && (
        <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
          <img src={result.image} alt={result.name} width="100" style={{ borderRadius: '50%' }} />
          <h3>{result.name}</h3>
          <p>Email: {result.email}</p>
          <p>Age: {result.age}</p>
          <p>Status: {result.isActive ? 'Active' : 'Inactive'}</p>
        </div>
      )}
    </div>
  );
};

export default App;
