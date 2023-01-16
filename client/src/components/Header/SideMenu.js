import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Navbar from "../Navbar";

//side menu to show the categories and filters
//each navlink will redirect the user to another path
const SideMenu = ({showSideMenu}) => {
    return (
        <Container>
            <Subtitle>Categories:</Subtitle>
            <List>
                <Item>
                    <Nav to={"/items"} onClick={showSideMenu}>
                        All items
                    </Nav>
                </Item>
                <Item>
                    <Nav to={"/company"} onClick={showSideMenu}>
                        By company
                    </Nav>
                </Item>
                <Item>
                    <Nav to={"/category"} onClick={showSideMenu}>
                        Category
                    </Nav>
                </Item>
                <Item>
                    <Nav to={"/bodyLocation"} onClick={showSideMenu}>
                        Body Location
                    </Nav>
                </Item>
                <Item>
                    <Nav to={"/about"} onClick={showSideMenu}>
                        About us
                    </Nav>
                </Item>
            </List>
        </Container>
    )
}
//--- Styling ---

const Container = styled.div`
position: absolute;
top: 5rem;
left: 1rem;
color: white;
border-radius: 15px;
background: #162c35;
box-shadow:  5px 5px 10px #11232a,
            -5px -5px 10px #1b3540;
padding: 0.5rem;
z-index: 1000;
width: 20vw;
`

const List = styled.ul`

`
const Subtitle = styled.h1`
margin: 0.5rem;
`
const Nav = styled(NavLink)`
display: flex;
align-items: center;
justify-content: center;
border-radius: 10px;
background: #162c35;
box-shadow:  5px 5px 10px #11232a,
            -5px -5px 10px #1b3540;
text-decoration: none;
color: inherit;
padding: 1rem;

&:hover {
    color: gray;
}

/* this will gray out the active class when the path will be set correctly */
&.active {
    color: gray;
    border-radius: 10px;
    background: #162c35;
    box-shadow: inset 5px 5px 10px #11232a,
            inset -5px -5px 10px #1b3540;
}
`
const Item = styled.li`
text-align: center;
margin: 1.5rem;
color: white;
font-weight: bold;
`
export default SideMenu;