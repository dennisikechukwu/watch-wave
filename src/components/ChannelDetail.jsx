import React, { useState, useEffect } from 'react';
import Videos from './Videos';
import ChannelCard from './ChannelCard';
import { Api } from '../data/api';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    Api(`channels?part=snippet&id=${id}`)
      .then((data) => setChannelDetail(data?.items[0]));

    Api(`search?channelId=${id}&part=snippet&order=date`)
      .then((data) => setVideos(data?.items));
  }, [id]);

  return (
    <Box minHeight="100vh">
        <Box>
        <div style={{
          height:'300px',
          background: 'linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%, rgba(0,212,255,1) 100%)',
          zIndex: 10,
        }} />
        
        </Box>
        <Box sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "-100px"
        }}>
        <ChannelCard channelDetail={channelDetail} />
        </Box>
        <Box display="flex" flexWrap="wrap" py="5px" px="8px">
          <Box sx={{ mr: { sm: '110px' },
          ml: { sm: '125px' },
        }}
          >
            <Videos videos={videos}/>
          </Box>
        </Box>
        
    </Box>
  );
};

export default ChannelDetail;
