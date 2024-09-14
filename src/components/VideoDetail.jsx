import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Typography, Box, Stack } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import ReactPlayer from 'react-player';
import Videos from './Videos'; 
import { Api } from '../data/api';

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    // Fetch video details
    Api(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => setVideoDetail(data?.items[0]))
      .catch((err) => console.error('Error fetching video details:', err));

    // Fetch related videos
    Api(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data) => setVideos(data?.items))
      .catch((err) => console.error('Error fetching related videos:', err));
  }, [id]);

  if (!videoDetail) return <Typography>Loading...</Typography>;

  const channelId = videoDetail?.snippet?.channelId;
  const viewCount = videoDetail?.statistics?.viewCount;
  const likeCount = videoDetail?.statistics?.likeCount;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: 'column', md: 'row' }}>
        <Box flex={1}>
          <Box
            sx={{
              width: '100%',
              position: 'sticky',
              top: '86px',
            }}
          >
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            <Typography variant="h5" fontWeight="bold" p={2} color="#fff">
              {videoDetail?.snippet?.title}
            </Typography>
            <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff" }} py={1} px={2}>
              {channelId && (
                <Link to={`/channel/${channelId}`} style={{ color: 'white', textDecoration: 'none' }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {videoDetail?.snippet?.channelTitle}
                    <CheckCircle sx={{ fontSize: '12px', color: 'gray', ml: '5px' }} />
                  </Typography>
                </Link>
              )}
              <Stack direction="row" gap="20px" alignItems="center">
                {viewCount && (
                  <Typography variant='body1' sx={{ opacity: "0.7" }}>
                    {parseInt(viewCount).toLocaleString()} views
                  </Typography>
                )}
                {likeCount && (
                  <Typography variant='body1' sx={{ opacity: "0.7" }}>
                    {parseInt(likeCount).toLocaleString()} likes
                  </Typography>
                )}
              </Stack>
            </Stack>
          </Box>
        </Box>

        {/* Display related videos */}
        <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center">
          <Videos videos={videos} direction= "column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
