import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import lona from '../image/lona.jpg'
import police_lona from '../image/police_lona.jpg'
import myWife from '../image/my_wife.jpg'
import CardMedia from '@material-ui/core/CardMedia';

function Example(props) {
    var items = [
        {
            name: "Who is this police girl?",
            img: police_lona
        },
        {
            name: "my wife",
            img: myWife
        }
    ]

    return (
        <Carousel height={1015} sx={{ width: 320, margin: '50px auto' }}>
            {
                items.map((item, i) => <Item key={i} item={item} />)
            }
        </Carousel>
    )
}

function Item({ item }) {
    return (
        <Paper>
            <h2>{item.name}</h2>
            {item.img ? <CardMedia image={item.img} style={{ height: 900 }} /> : null}

            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
    )
}

export default Example