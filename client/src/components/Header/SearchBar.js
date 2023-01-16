import { NavLink } from "react-router-dom";
import styled from "styled-components";

import React, {useState, useEffect, useRef} from 'react'

import { useNavigate } from "react-router-dom";

const SearchBar = (
    ) => {
        
        const [loaded, setLoaded] = useState(false)
        const [items, setItems] = useState([])
        const [isSearchContainerOpen, setIsSearchContainerOpen] = useState(false)
        const [input, setInput] = useState('')
        const [selectedState, setSelectedState] = useState(null)
        // const [isOpen, setIsOpen] = useState(false)

        const navigate = useNavigate()

    useEffect(() => {
        if(!loaded){
            const itemsArr = []
            fetch('/api/search')
            .then(res => res.json())
            .then(data => {
                data.data.forEach(el => {
                    const temp = {
                        name: el.name,
                        _id: el._id
                    }
    
                    itemsArr.push(temp)
                });
            }).then(()=>{
                setItems(itemsArr)
                setLoaded(true)
            })
        }
    },[])    

    useEffect(() => {

        if(input.length !== 0){
            setIsSearchContainerOpen(true)
        }else{
            setIsSearchContainerOpen(false)
        }
    
    }, [input])

    const checkMatch = (e) =>  {
        setInput(e.target.value)
    }


    const handleClick = (id) => {
        navigate(`/item/${id}`)
        setInput('')

    }

return (
    <Wrapper>
        <div>
        <Input 
        value={input} 
        onChange={checkMatch}
        placeholder="Search..." 
        />
        </div>
        { isSearchContainerOpen
        ?
        <SearchContainer>
            <ContainerDiv>
                {items.length !== 0
                ?
                items.map((item) => {
                    if(item.name.toLowerCase().includes(input.toLocaleLowerCase())){
                    return <SearchItem onClick={()=> {handleClick(item._id)}}>
                        {item.name}
                    </SearchItem>
                    }
                })
                :
                <SearchItem disabled >no items...</SearchItem>
                }
                
            </ContainerDiv>
        </SearchContainer>
        :
        <></>
        }
        

    </Wrapper>
)
}

//----- STYLING -----

const ContainerDiv = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow-y: scroll;
    width: 100%;
    `
    
    const SearchItem = styled.button`
    display: inline-block;
    height: 50px;
    min-height: 50px;
    width: 100%;
    border-radius: 5px;
    color: black;
    background-color: inherit;
    overflow-wrap: break-word;

    &:hover{
        background-color: #366C81;
        color: white;
    }

`

const SearchContainer = styled.div`
    max-height: 300px;
    width: 100%;
    background-color: white;
    position: absolute;
    border-radius: 5px;
    overflow: hidden;
    z-index: 100;
    overflow-y: scroll;

`
const Input = styled.input`
    color: white;
    padding: 1rem;
    font-size: 16px;
    width: 15rem;
    border: none;
    width: 25rem;
    margin: 0 2rem;
    border-radius: 10px;
    background: #162c35;
    box-shadow:  5px 5px 10px #11232a,
                -5px -5px 10px #1b3540;

    &:focus {
    outline: none;
    border-radius: 10px;
    background: #162c35;
    box-shadow: inset 5px 5px 10px #11232a,
                inset -5px -5px 10px #1b3540;
    }
    &::placeholder {
        color: gray;
    }
`
const Wrapper = styled.div`
    position: relative;
    
    button{
        border-radius: 3px;
        padding: 5px 5px;
        border-style: none;
        cursor: pointer;
    }
`


export default SearchBar;