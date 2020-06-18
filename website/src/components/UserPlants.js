import React, {useState , useEffect} from "react";
import "../App.css";
import { Container, Row, Col, Card, CardText, CardBody, CardTitle, Button , CardImg } from 'reactstrap';

const axios = require("axios").default;

function UserPlants(props) {
    let [plants, setPlants] = useState([]);

    useEffect(() => {
    async function fetchData() {
        let url = 'https://hdt-node-servers.herokuapp.com/NatureDex/api/v1/plants/user/' + props.user
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
            <Col xs={1} md={1} sm={{ size: 4 }} className="card-padding">          
                <Card className="plant-card" border="primary">
                    <CardBody>
                        <Row>
                            <CardTitle>
                            {plant.description.plant_details.common_names[0]
                                .split(" ")
                                .map(
                                    (item) => item.substring(0, 1).toUpperCase() + item.substring(1)
                                ) // capitalize all first letters
                                .join(" ")}
                            </CardTitle>
                        </Row>
                        <Row>
                            <Col>
                                <CardImg className="image" variant="top" src={plant.image} />
                            </Col>
                            <Col>
                                <CardText>Scientific Name: {plant.description.plant_name}</CardText>
                                <CardText>Class: {plant.description.plant_details.taxonomy.class}</CardText>
                                <CardText>{plant.description.plant_details.wiki_description.value}</CardText>
                                <CardText>Know More: 
                                    <a href={plant.description.plant_details.wiki_description.citation} target="_blank" rel="noopener noreferrer"> Click Here </a>
                                </CardText>
                            </Col>
                        </Row>
                        <Row>
                            <CardText>More Images:</CardText>
                            <Col>
                                <CardImg className="image" variant="top" src={plant.description.similar_images[0].url} />
                            </Col>
                            <Col>
                                <CardImg className="image" variant="top" src={plant.description.similar_images[1].url} />
                            </Col>
                        </Row>
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