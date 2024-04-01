import React from 'react'
import HeroSlide from '../components/common/HeroSlide';
import tmdbConfigs from '../api/configs/tmdb.Configs';
import { Box } from '@mui/material';
import uiConfigs from '../configs/ui.config';
import Container from '../components/common/Container';
import MediaSlide from '../components/common/MediaSlide';

const homepage = () => {
  return (
    <>
      <HeroSlide 
        mediaType={tmdbConfigs.mediaType.movie}
        mediaCategory={tmdbConfigs.mediaCategory.popular}
      />

      <Box marginTop="-4rem" sx={{...uiConfigs.style.mainContent}}>
        <Container header="Trending Movies">
          <MediaSlide mediaType={tmdbConfigs.mediaType.movie} 
          mediaCategory={tmdbConfigs.mediaCategory.popular} />
        </Container>

        <Container header="Must-Watch Series">
          <MediaSlide mediaType={tmdbConfigs.mediaType.tv} 
          mediaCategory={tmdbConfigs.mediaCategory.popular} />
        </Container>

        <Container header="Hot Right Now">
          <MediaSlide mediaType={tmdbConfigs.mediaType.movie} 
          mediaCategory={tmdbConfigs.mediaCategory.top_rated} />
        </Container>

        <Container header="Binge-Worthy Series">
          <MediaSlide mediaType={tmdbConfigs.mediaType.tv} 
          mediaCategory={tmdbConfigs.mediaCategory.top_rated} />
        </Container>
      </Box>
    </>
  );
};

export default homepage;