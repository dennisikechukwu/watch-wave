import React, { useState } from 'react';
import { Stack } from '@mui/material';
import { categories } from '../data/constants';
import "../index.css";

const SideBar = ({ choose, setChoose }) => {  // Receive setChoose as a prop
  const [selectedCategory, setSelectedCategory] = useState(''); // Store selected category name

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setChoose(categoryName);  // Update the category in the parent component
  };

  return (
    <Stack 
      direction="row"
      sx={{
        overflowY: "auto",
        height: { sx: "auto", md: "94%" },
        flexDirection: { md: "column" }
      }}
    >
      {categories.map((category) => (
        <button 
          className='category-btn'
          style={{
            background: category.name === selectedCategory ? "#2822d0" : "", 
            color: category.name === selectedCategory ? "white" : "white"
          }}
          key={category.name}
          onClick={() => handleCategoryClick(category.name)}  // Handle the category click
        >
          <span className='blue-icon'>{category.icon}</span>
          <span>{category.name}</span>
        </button>
      ))}
    </Stack>
  );
};

export default SideBar;
