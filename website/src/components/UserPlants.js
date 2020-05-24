import React, {useState , useEffect} from "react";
import "../App.css";
import { Container, Row, Col, Card, CardText, CardBody, CardTitle, Button } from 'reactstrap';

const axios = require("axios").default;

function UserPlants(props) {
    let [plants, setPlants] = useState([]);

    useEffect(() => {
    async function fetchData() {
        let url = 'https://backyardhacks2020.wl.r.appspot.com/api/v1/plants/user/' + props.user
        const response = await axios(url);
        //console.log(response);
        setPlants(response.data.data);
    }
    fetchData();
    }, []);

    const Plant = (props) => {
        const plant = props.plant;
        console.log(plant);
        return (
            <Col sm={{ size: 4 }} className="card-padding">          
                <Card className="plant-card" border="light">
                    <CardBody>
                        <CardTitle>
                        {plant.description.plant_name
                            .split(" ")
                            .map(
                                (item) => item.substring(0, 1).toUpperCase() + item.substring(1)
                            ) // capitalize all first letters
                            .join(" ")}
                        </CardTitle>
                        {/* <CardTitle>{project.organization}</CardTitle>
                        <CardText>{project.date}</CardText>
                        <CardText>{project.description}</CardText>
                        <CardText>{project.contribution}</CardText>
                        <CardText>More Information: 
                            <a href={project.portfolio} target="_blank" rel="noopener noreferrer"> Click Here</a>
                        </CardText>
                        <CardText>Source Code: 
                            <a href={project.code} target="_blank" rel="noopener noreferrer"> Click Here </a>
                        </CardText> */}
                    </CardBody>
                </Card>
            </Col>
        );
    }

    return (
        <div>
            {
                //console.log(plants)
            }
            {plants.length == 0 ? (
                <p>You don't have any plants, get looking!</p>
            ) : (
                plants.map((plant) => <Plant plant={plant} key={plant._id} />)
            )}
        </div>
    );
}

export default UserPlants;