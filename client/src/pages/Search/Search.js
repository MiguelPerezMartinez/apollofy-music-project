// React imports
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";

// HOC
import withAuth from "../../hoc/withAuth";
import BarsAndModal from "../../hoc/BarsAndModal";

// Components
import Track from "../../components/Track";
import Input from "../../components/Input";
import { SearchOutlined } from "@material-ui/icons";

// Reducer actions
import { setSearchQuery } from "../../redux/searchHandler/actions";

// Fetch Requests
import { getTrackByName } from "../../services/api/index";

function Search() {
  // Redux vars
  const { query } = useSelector((state) => state.searchHandler);
  const dispatch = useDispatch();

  // State vars
  const [searchTracks, setSearchTracks] = useState([]);
  const [timer, setTimer] = useState("");
  const [searching, setSearching] = useState(false);

  // Input handler
  function handleChange(e) {
    dispatch(setSearchQuery(e.target.value));
  }

  // Submit handler
  async function handleSubmit(e) {
    e.preventDefault();
    if (query.length > 0) {
      setSearching(true);
      getTrackByName(query).then((response) => {
        console.log(response.data.tracks);
        setSearchTracks(response.data.tracks);
        setSearching(false);
      });
    }
  }

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
      // console.log("clear", timer);
    }
    if (query.length > 0) {
      const timeoutId = setTimeout(() => {
        getTrackByName(query).then((response) => {
          setSearchTracks(response.data.tracks);
          // console.log("timeout execut", timeoutId);
        });
      }, 400);
      // console.log("timeoutID", timeoutId);

      setTimer(timeoutId);
    } else {
      setSearchTracks([]);
    }
    // eslint-disable-next-line
  }, [, query]);

  return (
    <main>
      <Container>
        <Row xs={2} md={4} lg="auto">
          <Col>
            <SearchOutlined fontSize="large" />
          </Col>
          <Col>
            <form onSubmit={handleSubmit}>
              <Input
                type="text"
                id="searchQuery"
                label=""
                value={query}
                placeholder="Type your search"
                handleChange={handleChange}
              />
            </form>
          </Col>
        </Row>
        {searching ? (
          <h1>searching...</h1>
        ) : (
          <>
            <Row>
              <h1>Tracks</h1>
              {searchTracks.length > 0 ? (
                searchTracks.map((track, index) => (
                  <Track dataTrack={track} key={index} />
                ))
              ) : (
                <p>No results</p>
              )}
            </Row>
            <Row>
              <h1>Tracks</h1>
              {searchTracks.length > 0 ? (
                searchTracks.map((track, index) => (
                  <Track dataTrack={track} key={index} />
                ))
              ) : (
                <p>No results</p>
              )}
            </Row>
          </>
        )}
      </Container>
    </main>
  );
}

export default withAuth(BarsAndModal(Search));
