import { useState, useEffect } from "react"
import "./App.css"
import axios from "axios"


function App() {

  const[search, setSearch] = useState("")
  const [allData, setAllData] = useState({
    city:'',
    country:'',
    temperature:'',
    humidity: '',
    minTemp: '',
    weatherIcons: ''
  })

  useEffect(() => {
    fetchData()

  }, [])

  const fetchData = async (city) => {
    try{
      const APIKEY = "2da3c77709f823dc1c925c4164fc8ee5"

      const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`)
      await setAllData({
        city: result.data.name,
        country: result.data.sys.country,
        temperature: result.data.main.temp,
        humidity: result.data.main.humidity,
        minTemp: result.data.main.temp_min,
        weatherIcons: result.data.weather[0].icon
      })
    } catch(e) {
      console.log("API not loaded correctly or loaded fo the first time")
    }
  }

  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  const handleSubmit = (event) => {
    console.log(search)
    event.preventDefault()
    fetchData(search)
  }

  return (
    // the section tag in react for sections and the main tag for the main build
    // under main we will have sections for the form and for displaying results
    <main>
    <div className="form">
      <form onSubmit={handleSubmit}>
        <input
        value={search}
        type='text'
        name='city'
        placeholder='Location'
        onChange={handleChange}
        />
        <button for='city'>Search</button>
      </form>
        <section>
          <div className='header-div'>
            <div>
              <div className='data'>
          <img src={'https://openweathermap.org/img/wn/' 
            + allData.weatherIcons +'@2x.png'}/>

        <h1 className='title'>
          {allData.city}</h1>
        <h2 className='location'>
          {allData.country}</h2> 

        <div className='weather-description'>
        <div>
        <h3>HUMIDITY</h3>
        <p>{allData.humidity}%</p>
        </div>
        <div>
        <h3>TEMPERATURE</h3>
        <p>{allData.temperature}°C</p>
        </div>
        <div>
            <h3>MIN TEMPERATURE</h3>
              <p>{allData.minTemp}°C</p>
                 </div>
               </div>
             </div>
            </div>
          </div>
        </section>
    </div>
    </main>
  );
}

export default App 
