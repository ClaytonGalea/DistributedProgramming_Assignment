import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Dashboard() {

    const [notifications, setNotifications] = useState([]);

    const user =
        JSON.parse(localStorage.getItem("user"));


    useEffect(() => {

        fetchNotifications();

    }, []);


    const fetchNotifications = async () => {

        try {

            const response = await axios.get(

                `http://localhost:5000/api/customers/notifications/${user.id}`

            );

            setNotifications(response.data);

        } catch (error) {

            console.log(error);

        }

    };


    return (

        <div>

            <h1>Dashboard</h1>

            <h2>
                Welcome {user.firstName}
            </h2>

            <br />

            <Link to="/bookings">

                <button>
                    Bookings
                </button>

            </Link>

            <br />
            <br />

            <Link to="/locations">

                <button>
                    Favourite Locations
                </button>

            </Link>

            <br />
            <br />

            <h2>Notifications</h2>

            {

                notifications.length === 0

                ?

                <p>
                    No notifications
                </p>

                :

                notifications.map((notification) => (

                    <div
                        key={notification._id}
                        style={{
                            border: "1px solid black",
                            padding: "10px",
                            marginBottom: "10px"
                        }}
                    >

                        <p>
                            {notification.message}
                        </p>

                    </div>

                ))

            }

        </div>

    );

}

export default Dashboard;