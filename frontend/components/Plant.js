import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet , TouchableOpacity , Linking} from 'react-native';
import { Container, Body, Content, Header, Title, Text , Card, CardItem} from "native-base";

export default function Plant(props) {
    const image = props.image;

    return(
        <Container>
        <Content>
            <Card>
                <CardItem header>
                    <Text>{props.title}</Text>
                </CardItem>
                <CardItem>
                    <Text>Scientific Name: {props.name}</Text> 
                </CardItem>
                <CardItem>
                    <Text>First Seen On: {props.date}</Text>                        
                </CardItem>
                <CardItem>
                    <TouchableOpacity onPress={() => Linking.openURL(props.link)}>
                        <Text> Know More </Text>
                    </TouchableOpacity>
                </CardItem>
           </Card>
        </Content>
    </Container>
    )
}