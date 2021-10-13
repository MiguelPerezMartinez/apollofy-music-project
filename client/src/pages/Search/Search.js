import React, { useEffect, useState } from "react";

import Track from "../../components/Track";
import { Col, Container, Row } from "react-bootstrap";

import withAuth from "../../hoc/withAuth";
import BarsAndModal from "../../hoc/BarsAndModal";
import { SearchOutlined } from "@material-ui/icons";
import Input from "../../components/Input";

function Search() {
  const [query, setQuery] = useState("");

  let searchTracks = JSON.parse(localStorage.getItem("trackHistory"));

  function handleChange(e) {
    setQuery(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("form submitted ", query);
  }

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
        <h1>Tracks</h1>
        {searchTracks.length > 0 &&
          searchTracks.map((track, index) => (
            <Track dataTrack={track} key={index} />
          ))}
      </Container>
    </main>
  );
}

export default withAuth(BarsAndModal(Search));
