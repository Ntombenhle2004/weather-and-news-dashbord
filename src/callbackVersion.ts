import https from "https";

// Hardcoded city
const CITY = "Durban";

// Define Post type
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: number;
}

// Helper function to fetch JSON
function fetchJSON(
  url: string,
  callback: (err: Error | null, data?: any) => void
) {
  https
    .get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          callback(null, json);
        } catch (err: any) {
          callback(err);
        }
      });
    })
    .on("error", (err) => callback(err));
}

// Get coordinates
function getCoordinates(
  city: string,
  callback: (err: Error | null, coords?: { lat: number; lon: number }) => void
) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    city
  )}`;
  fetchJSON(url, (err, data) => {
    if (err) return callback(err);
    if (!data.results || data.results.length === 0)
      return callback(new Error("City not found"));
    callback(null, {
      lat: data.results[0].latitude,
      lon: data.results[0].longitude,
    });
  });
}

// Get weather
function getWeather(
  lat: number,
  lon: number,
  callback: (err: Error | null, weather?: any) => void
) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
  fetchJSON(url, (err, data) => {
    if (err) return callback(err);
    callback(null, data.current_weather);
  });
}

// Get news
function getNews(callback: (err: Error | null, news?: Post[]) => void) {
  const url = "https://dummyjson.com/posts";
  fetchJSON(url, (err, data) => {
    if (err) return callback(err);
    const shuffled: Post[] = data.posts.sort(() => 0.5 - Math.random());
    callback(null, shuffled.slice(0, 5));
  });
}

// Callback hell to fetch everything
getCoordinates(CITY, (err, coords) => {
  if (err || !coords)
    return console.error("Error fetching coordinates:", err?.message);

  getWeather(coords.lat, coords.lon, (err, weather) => {
    if (err || !weather)
      return console.error("Error fetching weather:", err?.message);

    getNews((err, news) => {
      if (err || !news)
        return console.error("Error fetching news:", err?.message);

      console.log(`Weather in ${CITY}:`);
      console.log(`Temperature: ${weather.temperature}°C`);
      console.log(`Windspeed: ${weather.windspeed} km/h`);
      console.log(`Time: ${weather.time}\n`);

      console.log("Latest Posts:");
      news.forEach((post: Post, i: number) => {
        console.log(`${i + 1}. ${post.title}`);
        console.log(`   ${post.body}\n`);
      });
    });
  });
});
