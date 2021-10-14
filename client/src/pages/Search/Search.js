import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Track from "../../components/Track";
import { Col, Container, Row } from "react-bootstrap";

import withAuth from "../../hoc/withAuth";
import BarsAndModal from "../../hoc/BarsAndModal";
import { SearchOutlined } from "@material-ui/icons";
import Input from "../../components/Input";

import { setSearchQuery } from "../../redux/searchHandler/actions";

import { getTrackByName } from "../../services/api/index";
function Search() {
  const { query } = useSelector((state) => state.searchHandler);
  const dispatch = useDispatch();
  const [searchTracks, setSearchTracks] = useState([]);

  function handleChange(e) {
    dispatch(setSearchQuery(e.target.value));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (query.length > 0) {
      getTrackByName(query).then((response) => {
        setSearchTracks(response.data.tracks);
      });
    }
  }

  useEffect(() => {
    if (query.length > 0) {
      getTrackByName(query).then((response) => {
        setSearchTracks(response.data.tracks);
      });
    } else {
      setSearchTracks([]);
    }
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
      </Container>
    </main>
  );
}

export default withAuth(BarsAndModal(Search));
