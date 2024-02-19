import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import SearchResults from './components/SerachResults/SearchResults';

export const BASE_URL = "http://localhost:9000"

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterData, setFilterData] = useState(null);
  const [selectedButton, setSelectedButton] = ("all");


  useEffect(() => {
    const fetchedFoodData = async () => {
      setLoading(true);
      try {
        const response = await fetch(BASE_URL);
        const json = await response.json();

        setData(json);
        setFilterData(json)
        setLoading(false);
      } catch (error) {
        setError("Unable to fetch data");
      }
    };
    fetchedFoodData();
  }, []);

  const searchFood = (e) => {
    const searchValue = e.target.value;
    if (searchValue === "") {
      setFilterData(null);
    }

    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase()));
    setFilterData(filter);
    
  }

  const filterFood = (type) => {
    if(type === "all"){
      setFilterData(data)
      setSelectedButton("all");
      return;
    }

    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase()));
    setFilterData(filter);
    setSelectedButton(type)

  }


  if (error) return <div>{error}</div>
  if (loading) return <div>loading...</div>


  return (
    <Container>
      <TopContainer>
        <div className="logo">
          <img src="./logo.svg" alt="logo" />
        </div>

        <div className="search">
          <input
            onChange={searchFood}
            placeholder='Serach Food'
            type="text" />
        </div>
      </TopContainer>

      <FilterContainer>
        <Button onClick={() => filterFood("all")}>All</Button>
        <Button onClick={() => filterFood("Breakfast")}>Breakfast</Button>
        <Button onClick={() => filterFood("Lunch")}>Lunch</Button>
        <Button onClick={() => filterFood("Dinner")}>Dinner</Button>
      </FilterContainer>

      {/* card component */}
      <SearchResults data={filterData} />

    </Container>

  )
}

export default App

const Container = styled.div`
  max-width: 1600px;
  margin: 0 auto;
`;
const TopContainer = styled.section`
  min-height: 110px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;

  .search{
    input{
      background-color: transparent;
      border: 1px solid red;
      padding: 0 10px;
      border-radius: 5px;
      width: 100%;
      height: 40px;
      font-size: 16px;
      color: white;
    }
   
  }

`;

const FilterContainer = styled.section`
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-bottom: 20px;
`;

export const Button = styled.button`
padding: 6px 12px;
background: #FF4343;
border-radius: 5px;
border: none;
color: white;
cursor: pointer;
transition: 0.5s;
&:hover{
  background-color: #ffffff;
  color: #FF4343;
}
&:active{
  background-color: #700000;
  color: white;
  
}
`;


