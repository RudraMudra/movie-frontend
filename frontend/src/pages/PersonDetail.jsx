import {Box, Toolbar, Typography, Stack} from "@mui/material";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import PersonMediaGrid from "../components/common/PersonMediaGrid";
import tmdbConfigs from "../api/configs/tmdb.Configs";
import uiConfigs from "../configs/ui.config";
import Container from "../components/common/Container";
import personApi from "../api/modules/personal.api";
import {toast} from "react-toastify";
import { useDispatch } from "react-redux";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";

const PersonDetail = () => {
  const {personId} = useParams();
  const [person, setPerson] = useState(null);
  const dispatch = useDispatch();
  // const [profilePath, setProfilePath] = useState(null);

  useEffect(() => {
    const getPerson = async () => {
      dispatch(setGlobalLoading(true));
      const {response, err} = await personApi.detail({personId});
      dispatch(setGlobalLoading(false));

      if (err) toast.error(err.message);
      if (response) {
        setPerson(response);
        // setProfilePath(tmdbConfigs.profilePath(response.data.profile_path));
      }
    }
    getPerson();
  }, [personId, dispatch]);

  return (
    <>
      <Toolbar />
      {person && (
        <>
          <Box sx={{...uiConfigs.style.mainContent}}>
            <Box sx={{
              position: "relative",
              display: "flex",
              flexDirection: {xs: "column", md: "row"},
            }}>
              <Box sx={{
                width: {xs: "50%", md: "20%"},
              }}>
                <Box  sx={{
                  paddingTop: "160%",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: "darkgrey",
                  backgroundImage: `url(${tmdbConfigs.posterPath(person.profile_path)})`
                }}/>
              </Box>
              <Box sx={{
                display: "flex",
                flexDirection: "column",
                width: {xs: "100%", md: "80%"},
                padding: {xs: "1rem 0", md: "1rem 2rem"}
              }}>
                <Stack spacing={2}>
                  <Container>
                    {/* <Typography variant="h5" fontWeight="700">
                      {`${person.name} 
                      (${person.birthday.split("-")[0]} - 
                      ${person.deathday ? person.deathday.split("-")[0] : "Present"})`}
                    </Typography> */}
                    <Typography variant="h4" sx={{marginTop: 2}}>{person.name}</Typography>
                    {/* <Typography variant="subtitle1">{person.known_for_department}</Typography> */}
                    <Typography sx={{...uiConfigs.style.typoLines(10)}}>{person.biography}</Typography>
                  </Container>
                </Stack>
              </Box>
            </Box>
            <Container header="medias">
              <PersonMediaGrid personId={personId} />
            </Container>
          </Box>
        </>
      )}
    </>
  )
}

export default PersonDetail