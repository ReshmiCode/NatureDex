import React, {useState} from "react";
import "../App.css";

function UserPlants(props) {
    let [plants, setPlants] = useState([]);

    return (
        <div>
            {
                console.log("Google ID", props.user)
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