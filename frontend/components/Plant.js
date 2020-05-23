import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet } from 'react-native';
import { Container, Body, Content, Header, Title, Text, Button  , Card, CardItem} from "native-base";

export default function Plant() {
    return(
        <Container>
        <Content>
            <Card>
                <CardItem header>
                        <Text>Rose</Text>
                </CardItem>
                <CardItem>
                    <Image
                        source={{
                        uri: 'https://d384u2mq2suvbq.cloudfront.net/public/spree/products/1693/original/Red-Rose-Fragrance-Oil.jpg',
                        }}
                    />
                </CardItem>
                <CardItem>
                    <Text>Scientific Name: Rosa</Text> 
                </CardItem>
                <CardItem>
                    <Text>First Seen On: Date</Text>                        
                </CardItem>
                <CardItem>
                    <Button title="Know More"/>
                </CardItem>
           </Card>
        </Content>
    </Container>
    )
}