import styled from "styled-components";
import SearchBar from "./Header/SearchBar";
import { NavLink, useNavigate } from "react-router-dom";
import { FiUser, FiShoppingCart, FiMenu } from "react-icons/fi";
import { useState } from "react";
import SideMenu from "./Header/SideMenu";

//this is the NavBar on top of header
const Navbar = () => {
    const [user,setUser] =useState(window.localStorage.getItem("user"));
    const [sideBar, setSideBar] = useState(false);
    const navigate=useNavigate();
    const showSideMenu = () => {
    setSideBar(!sideBar);
    }

    //handleClick handles the logout button by logging the user out
    const handleClick=()=>{
        window.localStorage.clear();
        navigate("/Home");
        window.location.reload();
    }

    //handleClick2 handle the onClick of the profile button to go to profile page
    const handleClick2=()=>{
        navigate("/profile")
    }
    //handleSignIn handle the onClick of the Sign In button to go to SignIn page
    const handleSignIn=()=>{
        navigate("/signin");
    }
    return (
        <Container>
            {sideBar && <SideMenu showSideMenu={showSideMenu}/>}
            <NavBar>
                <LeftPart>
                    <Button onClick={showSideMenu}><FiMenu size={20}/></Button>
                    <Nav to="/Home"><Logo>Prime Wear</Logo></Nav>
                </LeftPart>

                <SearchBar/>

                <List>

                    <Item>
                        <Nav to="/cart"><FiShoppingCart size={25}/></Nav>
                    </Item>

                    {user&&<Item>
                        <Button onClick={handleClick2}><FiUser size={25}/></Button>
                    </Item>}
                    {!user?<Item>
                        <Button_larger onClick={handleSignIn}>Sign In</Button_larger>
                    </Item>:
                    <Item>
                        <Button_larger onClick={handleClick}>Log Out</Button_larger>
                    </Item>}
                </List>
            </NavBar>
        </Container>
    )
}

const Container = styled.div`

`
const LeftPart = styled.div`
display: flex;
gap: 1rem;
justify-content: center;
align-items: center;
`
const Button = styled.button`
border-radius: 10px;
background: #162c35;
box-shadow:  5px 5px 10px #11232a,
            -5px -5px 10px #1b3540;
color: white;
border: none;
cursor: pointer;
height: 40px;
width: 40px;

&:hover{
    color: gray;
}

&.active {
    color: gray;
    border-radius: 10px;
    background: #162c35;
    box-shadow: inset 5px 5px 10px #11232a,
            inset -5px -5px 10px #1b3540;
}
`
const Button_larger = styled.button`
border-radius: 10px;
font-weight: bold;
font-size: 16px;
background: #162c35;
box-shadow:  5px 5px 10px #11232a,
            -5px -5px 10px #1b3540;
color: white;
border: none;
cursor: pointer;
height: 40px;
width: 5rem;

&:hover{
    color: gray;
}

&.active {
    color: gray;
    border-radius: 10px;
    background: #162c35;
    box-shadow: inset 5px 5px 10px #11232a,
            inset -5px -5px 10px #1b3540;
}
`
const Logo = styled.h1`
font-size: 24px;
color: white;

&:hover{
    color: gray;
}
`

const NavBar = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
padding: 1rem;
`
const List = styled.div`
display: flex;
text-decoration: none;
list-style: none;
align-items: center;

`
const Item = styled.li`
color: white;
text-decoration: none;
margin-left: 2rem;
font-weight: bold;
`

const Nav = styled(NavLink)`
display: flex;
align-items: center;
justify-content: center;
padding: 0.5rem;
border-radius: 10px;
background: #162c35;
box-shadow:  5px 5px 10px #11232a,
            -5px -5px 10px #1b3540;
text-decoration: none;
color: inherit;

&:hover{
    color: gray;
}
&:active {
    color: gray;
border-radius: 10px;
background: #162c35;
box-shadow: inset 5px 5px 10px #11232a,
            inset -5px -5px 10px #1b3540;
}
&.active {
    color: grey;
}
`
export default Navbar;