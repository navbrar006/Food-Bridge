const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiRequest(endpoint, method = "GET", body) {

  // 🔥 DEBUG CHECK
  if (!API_URL) {
    console.log("ENV ERROR: API_URL missing");
    throw new Error("NEXT_PUBLIC_API_URL missing");
  }

  const url = `${API_URL.replace(/\/$/, "")}${endpoint}`;

  try {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await res.json().catch(() => ({}));

console.log("STATUS:", res.status);
console.log("RESPONSE:", data);

if (!res.ok) {
  throw new Error(JSON.stringify(data));
}

    return data;

  } catch (err) {
    console.log("FETCH ERROR:", err.message);
    throw err;
  }
}