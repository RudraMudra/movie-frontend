import {Button, Grid} from '@mui/material';
import {useEffect, useState} from 'react';
import tmdbConfigs from '../../api/configs/tmdb.Configs';
import personApi from '../../api/modules/personal.api'
import MediaItem from './MediaItem';
import { toast } from 'react-toastify';

const PersonMediaGrid = ({personId}) => {
    const [medias, setMedias] = useState([]);
    const [filteredMedias, setFilteredMedias] = useState([]);
    const [page, setPage] = useState(1);
    const skip = 4;

    useEffect(() => {
        const getMedias = async () => {
            const {response, err} = await personApi.medias({personId});

            if (err) toast.error(err.message);
            if (response) {
                 const mediasSorted = response.cast.sort((a,b) => 
                 getReleaseDate(b) - getReleaseDate(a));
                    setMedias([...mediasSorted]);
                    setFilteredMedias([...mediasSorted.slice(0, skip * page)]);
            }
        }
        getMedias();
    }, [personId, page]);

    const getReleaseDate = (media) => {
        const date = media.media_type === tmdbConfigs.mediaType.movie ?
        new Date(media.release_date) : new Date(media.first_air_date);
        return date.getTime();
    }

    const handleLoadMore = () => {
        setPage(page + 1);
        setFilteredMedias([...filteredMedias, ...[...medias].splice(page * skip, skip)]);
    }

    return(
       <>
        <Grid container spacing={2}>
            {filteredMedias.map((media, index) => (
                <Grid item key={index} xs={6} sm={4} md={3}>
                    <MediaItem media={media} mediaType={media.media_type} />
                </Grid>
            ))}
        </Grid>
        {filteredMedias.length < medias.length && (
            <Button onClick={handleLoadMore} variant="contained" color="primary">Load More</Button>
        )}
       </> 
    );
}

export default PersonMediaGrid;