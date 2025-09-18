// You can expand this later for all API calls, this is a simple example.

export const fetchTestMessage = async () => {
  const res = await fetch('http://localhost:5000/api/test');
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
};
