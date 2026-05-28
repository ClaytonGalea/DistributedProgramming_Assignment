import { useEffect, useState } from "react";
import axios from "axios";

function Bookings() {

    const user =
        JSON.parse(localStorage.getItem("user"));

    const [pickup, setPickup] = useState("");
    const [destination, setDestination] = useState("");

    const [bookingDate, setBookingDate] = useState("");
    const [bookingTime, setBookingTime] = useState("");

    const [passengers, setPassengers] = useState(1);

    const [cabType, setCabType] =
        useState("Economic");

    const [estimatedFare, setEstimatedFare] =
        useState(null);

    const [bookings, setBookings] =
        useState([]);


    useEffect(() => {

        fetchBookings();

    }, []);


    const fetchBookings = async () => {

        try {

            const response = await axios.get(

                `http://localhost:5000/api/bookings/current/${user.id}`

            );

            setBookings(response.data);

        } catch (error) {

            console.log(error);

        }

    };


    // ESTIMATE FARE
    const estimateFare = async () => {

        try {

            const response = await axios.get(

                `http://localhost:5000/api/fare/estimate-fare?pickup=${pickup}&destination=${destination}`

            );

            setEstimatedFare(
                response.data.estimatedFare
            );

        } catch (error) {

            console.log(error);

        }

    };


    // CREATE BOOKING + PAYMENT
    const createBooking = async () => {

        try {

            // CREATE BOOKING
            const bookingResponse = await axios.post(

                "http://localhost:5000/api/bookings/create",

                {
                    userId: user.id,

                    pickupLocation: pickup,
                    destinationLocation: destination,

                    bookingDate,
                    bookingTime,

                    passengers,

                    cabType
                }

            );

            const booking =
                bookingResponse.data.booking;


            // PROCESS PAYMENT
            await axios.post(

                "http://localhost:5000/api/payments/pay",

                {
                    bookingId: booking._id,

                    userId: user.id,

                    cabFare: estimatedFare,

                    cabType,

                    bookingTime,

                    passengers,

                    discountUnlocked: false
                }

            );

            alert("Booking created successfully");

            fetchBookings();

        } catch (error) {

            console.log(error);

        }

    };


    return (

        <div>

            <h1>Bookings</h1>

            <br />

            <input
                type="text"
                placeholder="Pickup Location"
                value={pickup}
                onChange={(e) =>
                    setPickup(e.target.value)
                }
            />

            <br />
            <br />

            <input
                type="text"
                placeholder="Destination"
                value={destination}
                onChange={(e) =>
                    setDestination(e.target.value)
                }
            />

            <br />
            <br />

            <input
                type="date"
                value={bookingDate}
                onChange={(e) =>
                    setBookingDate(e.target.value)
                }
            />

            <br />
            <br />

            <input
                type="time"
                value={bookingTime}
                onChange={(e) =>
                    setBookingTime(e.target.value)
                }
            />

            <br />
            <br />

            <input
                type="number"
                placeholder="Passengers"
                value={passengers}
                onChange={(e) =>
                    setPassengers(e.target.value)
                }
            />

            <br />
            <br />

            <select
                value={cabType}
                onChange={(e) =>
                    setCabType(e.target.value)
                }
            >

                <option>
                    Economic
                </option>

                <option>
                    Premium
                </option>

                <option>
                    Executive
                </option>

            </select>

            <br />
            <br />

            <button onClick={estimateFare}>

                Estimate Fare

            </button>

            <br />
            <br />

            {

                estimatedFare && (

                    <h3>

                        Estimated Fare:
                        €{estimatedFare}

                    </h3>

                )

            }

            <button onClick={createBooking}>

                Create Booking

            </button>

            <hr />

            <h2>Current Bookings</h2>

            {

                bookings.map((booking) => (

                    <div
                        key={booking._id}
                        style={{
                            border: "1px solid black",
                            padding: "10px",
                            marginBottom: "10px"
                        }}
                    >

                        <p>
                            Pickup:
                            {booking.pickupLocation}
                        </p>

                        <p>
                            Destination:
                            {booking.destinationLocation}
                        </p>

                        <p>
                            Cab Type:
                            {booking.cabType}
                        </p>

                    </div>

                ))

            }

        </div>

    );

}

export default Bookings;