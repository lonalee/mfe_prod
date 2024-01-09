import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import lona from '../image/lona.jpg'
// import skyblue from '../image/skyblue.jpg'
import CardMedia from '@material-ui/core/CardMedia';

function Example(props)
{
    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!"
        },
        {
            name: "Random Name #2",
            description: "Hello World!",
            img: true
        }
    ]

    return (
        <Carousel height='160px' sx={{width:320, margin: '50px auto'}}>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}

function Item(props)
{
    return (
        <Paper style={{ height: '150px'}}>
            <h2>{props.item.name}</h2>
            {props.item.img ? <CardMedia image={lona} style={{height:150}} /> :null}
            <p>{props.item.description}</p>

            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
    )
}

export default Example