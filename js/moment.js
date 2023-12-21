const city = document.getElementById("search-input");
city.addEventListener("change", () => {
  const APIlink = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&vn&appid=4269652c5e1b6a66a34f9d3d16ecc098`;
  // Gửi yêu cầu GET đến link API
  fetch(APIlink)
    .then((response) => {
      // Kiểm tra mã trạng thái của response
      if (response.ok) {
        // Response thành công, trả về một Promise chuyển đổi nội dung của response sang JSON
        return response.json();
      } else {
        // Response thất bại, ném ra một lỗi
        throw new Error("Lỗi: " + response.status);
      }
    })
    .then((data) => {
      // Nhận được nội dung của response dưới dạng JSON
      // In ra nội dung của response
      const x = data;
      console.log(x);
      const weather = document.getElementById("weather");
      const sunrise = document.getElementById("sunrise");
      const sunset = document.getElementById("sunset");
      const humidity = document.getElementById("humidity");
      const wind_speed = document.getElementById("wind-speed");
      const name = document.getElementById("city_name");
      const temp = document.getElementById("temp");
      const sunrise_time = () => {
        let AAA = new Date(x.sys.sunrise*1000);
        let Hours_sr = AAA.getHours();
        let Minutes_sr = AAA.getMinutes();
        let Seconds_sr = AAA.getSeconds();
        return Hours_sr+":"+Minutes_sr+":"+Seconds_sr;
      };
      const sunset_time = () => {
        let BBB = new Date(x.sys.sunset*1000);
        let Hours_ss = BBB.getHours();
        let Minutes_ss = BBB.getMinutes();
        let Seconds_ss = BBB.getSeconds();
        return Hours_ss+":"+Minutes_ss+":"+Seconds_ss;
      };
      console.log(
        sunrise_time() +
          "\n" +
          sunset_time() +
          "\n" +
          x.main.humidity +
          "\n" +
          x.wind.speed +
          "\n" +
          x.name +
          "\n" +
          (x.main.temp-273.15) +
          "\n" +
          x.weather[0].main+
          "\n"+
          x.weather[0].description
      );
      sunrise.innerText = sunrise_time();
      sunset.innerText = sunset_time();
      humidity.innerText = x.main.humidity;
      wind_speed.innerText = x.wind.speed;
      name.innerText = x.name;
      temp.innerText = x.main.temp - 273.15;
      weather.innerText=x.weather[0].main+"\n"+x.weather[0].description;
    })
    .catch((error) => {
      // Xử lý lỗi
      console.error(error);
    });
});
