import { useEffect, useState } from "react";
import axios from "axios";

function Locations() {

    const user =
        JSON.parse(localStorage.getItem("user"));

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");

    const [locations, setLocations] =
        useState([]);

    const [weather, setWeather] =
        useState(null);


    useEffect(() => {

        fetchLocations();

    }, []);


    // GET LOCATIONS
    const fetchLocations = async () => {

        try {

            const response = await axios.get(

                `https://api-gateway-gn00.onrender.com/api/locations/${user.id}`

            );

            setLocations(response.data);

        } catch (error) {

            console.log(error);

        }

    };


    // ADD LOCATION
    const addLocation = async () => {

        try {

            await axios.post(

                "https://api-gateway-gn00.onrender.com/api/locations/add",

                {
                    userId: user.id,
                    name,
                    address
                }

            );

            alert("Location added");

            fetchLocations();

        } catch (error) {

            console.log(error);

        }

    };


    // GET WEATHER
    const getWeather = async (city) => {

        try {

            const response = await axios.get(

                `https://api-gateway-gn00.onrender.com/api/locations/weather/${city}`

            );

            setWeather(response.data);

        } catch (error) {

            console.log(error);

        }

    };


    return (

        <div>

            <h1>Favourite Locations</h1>

            <br />

            <input
                type="text"
                placeholder="Location Name"
                value={name}
                onChange={(e) =>
                    setName(e.target.value)
                }
            />

            <br />
            <br />

            <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) =>
                    setAddress(e.target.value)
                }
            />

            <br />
            <br />

            <button onClick={addLocation}>

                Add Location

            </button>

            <hr />

            <h2>Saved Locations</h2>

            {

                locations.map((location) => (

                    <div
                        key={location._id}
                        style={{
                            border: "1px solid black",
                            padding: "10px",
                            marginBottom: "10px"
                        }}
                    >

                        <p>
                            Name:
                            {location.name}
                        </p>

                        <p>
                            Address:
                            {location.address}
                        </p>

                        <button
                            onClick={() =>
                                getWeather(
                                    location.address
                                )
                            }
                        >

                            Get Weather

                        </button>

                    </div>

                ))

            }

            <hr />

            {

                weather && (

                    <div>

                        <h2>Weather</h2>

                        <p>
                            City:
                            {weather.location.name}
                        </p>

                        <p>
                            Temperature:
                            {weather.current.temp_c}°C
                        </p>

                        <p>
                            Condition:
                            {weather.current.condition.text}
                        </p>

                    </div>

                )

            }

        </div>

    );

}

export default Locations;