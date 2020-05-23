import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet , TouchableOpacity , Linking} from 'react-native';
import { Container, Body, Content, Header, Title, Text , Card, CardItem} from "native-base";

export default function Plant(props) {

    console.log(props.plant.description[0]);

    return(
        <Container>
        <Content>
            <Card>
                <CardItem header>
                    <Text>{props.plant.description[0]}</Text>
                </CardItem>
                <Image
                    source={{
                    uri: props.plant.image,
                    }}
                />
                <CardItem>
                    <Text>Scientific Name: {props.plant.description[1]}</Text> 
                </CardItem>
                <CardItem>
                    <Text>First Seen On: {props.plant.date_added}</Text>                        
                </CardItem>
                <CardItem>
                    <TouchableOpacity onPress={() => Linking.openURL(props.plant.description[2])}>
                        <Text> Know More </Text>
                    </TouchableOpacity>
                </CardItem>
           </Card>
        </Content>
    </Container>
    )
}