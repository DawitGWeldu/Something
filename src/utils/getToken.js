
const endPoint =
  "https://prod-in2.100ms.live/hmsapi/dave-stream.app.100ms.live/";

export default async function getToken(role) {
  // Fix in endPoint and roomId
  const response = await fetch(`${endPoint}api/token`, {
    method: 'POST',
    body: JSON.stringify({
      user_id: '5fc62c5872909272bf9995e1', // User ID assigned by you (different from 100ms' assigned id)
      role: role, // listener , speaker , moderator
      room_id: "6513ea61cb39d57e8a5d232a"
    }),
  });

  const { token } = await response.json();

  return token;
}
