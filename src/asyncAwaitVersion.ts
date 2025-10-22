import https from "https";

const CITY = "Durban";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: number;
}

function fetchJSON(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch (err) {
            reject(err);
          }
        });
      })
      .on("error", reject);
  });
}

async function getCoordinates(city: string) {
  const data = await fetchJSON(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      city
    )}`
  );
  if (!data.results || data.results.length === 0)
    throw new Error("City not found");
  return { lat: data.results[0].latitude, lon: data.results[0].longitude };
}

async function getWeather(lat: number, lon: number) {
  const data = await fetchJSON(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
  );
  return data.current_weather;
}

async function getNews(): Promise<Post[]> {
  const data = await fetchJSON("https://dummyjson.com/posts");
  const shuffled: Post[] = data.posts.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 5);
}

async function main() {
  try {
    const coords = await getCoordinates(CITY);

    // Promise.all: fetch weather + news in parallel
    const [weather, news] = await Promise.all([
      getWeather(coords.lat, coords.lon),
      getNews(),
    ]);

    console.log(`Weather in ${CITY}:`);
    console.log(`Temperature: ${weather.temperature}°C`);
    console.log(`Windspeed: ${weather.windspeed} km/h`);
    console.log(`Time: ${weather.time}\n`);

    console.log("Latest Posts:");
    news.forEach((post: Post, i: number) => {
      console.log(`${i + 1}. ${post.title}`);
      console.log(`   ${post.body}\n`);
    });

    // Promise.race: determine fastest response
    const fastest = await Promise.race([
      getWeather(coords.lat, coords.lon),
      getNews(),
    ]);
    console.log(
      "Fastest response type:",
      Array.isArray(fastest) ? "News" : "Weather"
    );
  } catch (err: any) {
    console.error("Error:", err.message);
  }
}

main();
