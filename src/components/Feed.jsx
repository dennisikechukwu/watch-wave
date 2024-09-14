import React, { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import SideBar from './SideBar';
import Videos from './Videos';
import { Api } from '../data/api';

const Feed = () => {
  const [choose, setChoose] = useState("New");
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    Api(`search?part=snippet&q=${choose}`)
    .then((data) => setVideos(data.items))
  }, [choose]);

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box sx={{ height: { sx: "auto", md: "100vh" }, borderRight: "1px solid #3d3d3d", px: { sx: 0, md: 2 } }}>
        <SideBar choose={choose} setChoose={setChoose} /> {/* Pass setChoose as a prop */}
        <Typography className='copyright' variant='body2' sx={{ mt: 1.5, color: "#fff" }}>
          Copyright 2024 WW media
        </Typography>
      </Box>
      <Box p={4} sx={{ overflowY: "auto", height: "100vh", flex: 2 }}>
        <Typography variant='h4' fontWeight="bold" mb={3} sx={{ color: "white" }}>
          {choose} <span style={{ color: "#2822d0" }}>videos</span>
        </Typography>
        <Videos videos={videos} />
      </Box>
    </Stack>
  );
};

export default Feed;
