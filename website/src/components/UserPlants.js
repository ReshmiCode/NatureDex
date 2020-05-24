import React, {useState , useEffect} from "react";
import "../App.css";
const axios = require("axios").default;

function UserPlants(props) {
    let [plants, setPlants] = useState([]);

      useEffect(() => {
        async function fetchData() {
            let url = 'https://backyardhacks2020.wl.r.appspot.com/api/v1/plants/user/' + props.user
            const response = await axios(url);
            console.log(response);
            setPlants(response.data.data);
        }
        fetchData();
      }, []);

    return (
        <div>
            {
                console.log(plants)
            }
            {plants.length == 0 ? (
                <p>You don't have any plants, get looking!</p>
            ) : (
                //posts.reverse().map((post) => <Post post={post} key={post._id} />)
                <p>Your plants</p>
            )}
        </div>
    );
}

export default UserPlants;