import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingButton } from '@mui/lab';
import { useEffect, useState } from 'react';
import {Box, Button, Grid} from "@mui/material";
import { useDispatch } from "react-redux";
import {toast} from "react-toastify";
import MediaItem from "../components/common/MediaItem";
import Container from '../components/common/Container';
import uiConfigs from '../configs/ui.config';
import favoriteApi from '../api/modules/favorite.api';
import { setGlobalLoading } from '../redux/features/globalLoadingSlice';
import { removeFavorite } from '../redux/features/userSlice';

const FavoriteItem = ({media, onRemoved}) => {
  const dispatch = useDispatch();

  const [onRequest, setOnRequest] = useState(false);

  const onRemove = async () => {
    if (onRequest) return;
    setOnRequest(true);
    const {response, err} = await favoriteApi.remove({favoriteId: media.id});
    setOnRequest(false);

    if(err) toast.error(err.message);
    if (response){
      dispatch(removeFavorite({mediaId: media.id}));
      onRemoved();
      toast.success('Removed from favorite list');
    }
  }

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Box>
        <MediaItem media={media} mediaType={media.mediaType}/>
        <Button
        fullWidth
          variant="contained"
          color="error"
          startIcon={<DeleteIcon/>}
          onClick={onRemove}
          disabled={onRequest}
        >
          Remove
        </Button>
      </Box>
    </Grid>
  )
};

const FavoriteList = () => {

  const [medias, setMedias] = useState([]);
  const [filteredMedias, setFilteredMedias] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const dispatch = useDispatch();

  const skip = 8;

  useEffect(() => {
    const getFavorites = async () => {
      dispatch(setGlobalLoading(true));
      const {response, err} = await favoriteApi.getList();
      dispatch(setGlobalLoading(false));

      if(err) toast.error(err.message);
      if(response){
        setCount(response.length);
        setMedias([...response]);
        setFilteredMedias([...response.splice(0, skip)])
      }
    }
    getFavorites();
  }, [dispatch]);

  const handleLoadMore = () => {
    const newPage = page + 1;
    const newSkip = newPage * skip;
    setFilteredMedias([...filteredMedias, ...[...medias].splice(newSkip, skip)]);
    setPage(newPage);
  }

  const onRemoved = (id) => {
    const newMedias = [...medias].filter(e => e.id !== id);
    setMedias(newMedias);
    setFilteredMedias([...newMedias].splice(0, page * skip));
    setCount(count - 1);
  }

  return (
    <Box sx={{...uiConfigs.style.mainContent}}>
      <Container header={`Your favorites (${count})`}>
        <Box>
          <Grid container spacing={2}>
            {filteredMedias.map((media) => (
              <FavoriteItem key={media.id} media={media} onRemoved={onRemoved}/>
            ))}
          </Grid>
          {count > filteredMedias.length && (
            <Box mt={2}>
              <LoadingButton
                variant="contained"
                color="primary"
                onClick={handleLoadMore}
                loading={false}
              >
                Load more
              </LoadingButton>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  )
}

export default FavoriteList;