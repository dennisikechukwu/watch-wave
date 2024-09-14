import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Box } from '@mui/material'
import {Typography} from '@mui/material'
import Videos from './Videos'
import { Api } from '../data/api'
import { useParams } from 'react-router-dom'

const SearchFeed = () => {
  const [videos, setVideos] = useState([]);
  const { searchTerm } = useParams()

  useEffect(() => {
    Api(`search?part=snippet&q=${searchTerm}`)
    .then((data) => setVideos(data.items))
  }, [searchTerm]);
  return (
    <Box p={4} sx={{ overflowY: "auto", height: "100vh", flex: 2 }}>
        <Typography variant='h4' fontWeight="bold" mb={3} sx={{ color: "white" }}>
          Search Results for:  <span style={{ color: "#2822d0" }}>{searchTerm}</span> videos
        </Typography>
        <Videos videos={videos} />
      </Box>
  )
}

export default SearchFeed