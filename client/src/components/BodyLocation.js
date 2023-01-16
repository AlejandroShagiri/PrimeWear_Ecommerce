import styled from "styled-components";
import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import LoadingPage from "./LoadingPage";

const BodyLocation = () => {

const [items, setItems] = useState([]);
const [location, setLocation] = useState([]);
const [loaded, setLoaded] = useState(false);


//function that is fired when chosing the category
    const handleChange = (e) => {
        setLocation(e.target.value);
    };

//fetching all items 
    useEffect(() => {
        fetch(`/api/get-items/`)
        .then(res => res.json())
        .then(data => {
            setItems(data.data);
            setLoaded(true)
        })
    }, []);

//gives me an array of all body locations
const bodyLoc = Object.values(items.reduce((object, {body_location})=>{
    object[body_location]={body_location}
    return object;
},{}))

//filters items by body location
const bodyItems = items.filter((item) => item.body_location === location);

return (
    <>
    {
        !loaded ?
        <LoadingPage/>
        :
        <>
            <Container>{!items ? <></> :
            <div>
                <Title>By Body Location:</Title>

                <Select onChange={handleChange}>
                    <Option value="">Select a category</Option>
                    {bodyLoc.map((location) => {
                        return (
                            <Option key={location.body_location}>{location.body_location}</Option>
                        )
                    })}
                </Select>

                <ItemCards> {!location ? <SelectCat>Please Select a category</SelectCat> : 
                <>
                    {bodyItems.map((object) => {
                        return (
                            <Nav key={object.name} to={`/item/${object._id}`}>
                                <Img src={object.imageSrc} alt="Product Image"/>
                                <Info>
                                    <List>
                                        <SmolItem><Name>{object.name}</Name></SmolItem>
                                        <SmolItem>{object.category}</SmolItem>
                                        <SmolItem><Price>{object.price}</Price></SmolItem>
                                    </List>
                                </Info>
                            </Nav>
                        )
                })}
                </>
                        }
                </ItemCards>
            </div> 
            }
            </Container>
        </>
    }
    </>
)
};


// --- STYLING ---
const Loading = styled.h1`
color: white;
font-size: 26px;
height: 80vh;
`
const SelectCat = styled.h1`
color: white;
font-size: 26px;
height: 100%;
`
const Container = styled.div`
padding: 1rem;
display: flex;
flex: wrap;
gap: 3rem;
flex-direction: column;
height: 80vh;
`
const Title = styled.h1`
font-size: 24px;
color: white;
`

const Select = styled.select`
color: white;
padding: 5px;
margin-top: 10px;
border-radius: 3px;
font-size: 18px;
font-weight: bold;
border: none;
border-radius: 10px;
background: #162c35;
box-shadow:  5px 5px 10px #11232a,
            -5px -5px 10px #1b3540;
`

const Option = styled.option`
//not much we can do here ...
`

const ItemCards = styled.div`
display: flex;
align-items: center;
gap: 2rem;
margin-top: 10px;
flex-wrap: wrap;
`
const List = styled.ul`

`
const Name = styled.span`
font-weight: bold;
color: white;
`
const Price = styled.span`
font-size: 20px;
font-weight: bold;
`
const Img = styled.img`
height: 100%;
display: flex;
border-radius: 20px;
padding: 0.5rem;
box-shadow: inset 5px 5px 10px #11232a,
        inset -5px -5px 10px #1b3540;
`
const Nav = styled(NavLink)`
color: white;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
padding: 0.5rem;
border-radius: 10px;
background: #162c35;
box-shadow:  5px 5px 10px #11232a,
        -5px -5px 10px #1b3540;
text-decoration: none;
width: 20%;
min-height: 20rem;
flex-wrap: wrap;

&:hover{
color: gray;
}
&:active {
color: gray;
border-radius: 10px;
background: #162c35;
box-shadow: inset 5px 5px 10px #11232a,
        inset -5px -5px 10px #1b3540;
}`

const Info = styled.div`
display: flex;
align-items: center;
justify-content: center;
border-radius: 10px;
background: #162c35;
box-shadow: inset 5px 5px 10px #11232a,
        inset -5px -5px 10px #1b3540;
width: 100%;
height: 40%;
`

const SmolItem = styled.li`
color: gray;
font-size: 14px;
text-align: center;
padding: 0.3rem;
`
export default BodyLocation;