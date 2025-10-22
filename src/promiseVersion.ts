import https from "https";

const CITY = "capetown";

interface Post {
  id: number;
  title: string;
  body: string;
//   userId: number;
//   tags: string[];
//   reactions: number;
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

function getCoordinates(city: string): Promise<{ lat: number; lon: number }> {
  return fetchJSON(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      city
    )}`
  ).then((data) => {
    if (!data.results || data.results.length === 0)
      throw new Error("City not found");
    return { lat: data.results[0].latitude, lon: data.results[0].longitude };
  });
}

function getWeather(lat: number, lon: number) {
  return fetchJSON(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
  ).then((data) => data.current_weather);
}

function getNews(): Promise<Post[]> {
  return fetchJSON("https://dummyjson.com/posts").then((data) => {
    const shuffled: Post[] = data.posts.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  });
}

// Chain promises
getCoordinates(CITY)
  .then((coords) => {
    // Run both requests simultaneously using Promise.all
    return Promise.all([getWeather(coords.lat, coords.lon), getNews()]).then(
      ([weather, news]) => ({ coords, weather, news })
    );
  })
  .then(({ weather, news }) => {
    console.log(`Weather in ${CITY}:`);
    console.log(`Temperature: ${weather.temperature}°C`);
    console.log(`Windspeed: ${weather.windspeed} km/h`);
    console.log(`Time: ${weather.time}\n`);

    console.log("Latest Posts:");
    news.forEach((post: Post, i: number) => {
      console.log(`${i + 1}. ${post.title}`);
      console.log(`   ${post.body}\n`);
    });

    // Promise.race example
    return Promise.race([getWeather(0, 0), getNews()]); // dummy coords for race demo
  })
  .then((fastest) => {
    console.log(
      "Fastest response type:",
      Array.isArray(fastest) ? "News" : "Weather"
    );
  })
  .catch((err) => console.error("Error:", err.message));
