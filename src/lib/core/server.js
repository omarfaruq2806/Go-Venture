// "use server";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const serverMutation = (path, data, method) => {
  // console.log(data , 'from ..');
  const res = fetch(`${baseUrl}${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res;
};

export const serverFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`);
  const data = await res.json();
  return data;
};
