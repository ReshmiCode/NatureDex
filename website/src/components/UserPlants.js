import React, {useState} from "react";
import "../App.css";

function UserPlants() {
    let [plants, setPlants] = useState([]);

    return (
        <div>
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