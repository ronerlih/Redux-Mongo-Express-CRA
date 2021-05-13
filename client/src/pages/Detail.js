import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { setCurrentPost, selectCurrentPost } from "../features/currentPost/currentPostSlice";
import { addFavorite as addToFavorites, selectFavorites, removeFavorite as removeFromFavorites } from "../features/favorites/favoritesSlice";
import { useSelector, useDispatch } from "react-redux";
import { isInFavorites } from "../utils/methods";

const Detail = props => {
  const currentPostState = useSelector(selectCurrentPost)
  const favoritesState = useSelector(selectFavorites)
  const dispatch = useDispatch();

  useEffect(() => {
    API.getPost(props.match.params.id)
      .then(res => dispatch(setCurrentPost( res.data )))
      .catch(err => console.log(err));
  },[dispatch, props.match.params.id]);

  const addFavorite = () => {
    dispatch(addToFavorites(currentPostState));
  };

  const removeFavorite = () => {
    dispatch(removeFromFavorites(currentPostState._id));
  };

  return (
    <>
    { currentPostState ? (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                {currentPostState.title} by {currentPostState.author}
              </h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            <article>
              <h1>Content:</h1>
              <p>{currentPostState.body}</p>
            </article>
          </Col>
          {isInFavorites(favoritesState, currentPostState._id) ? (
            <button className="btn btn-danger" onClick={removeFavorite}>
                Remove from Favorites!
            </button>
          ) : (
            <button className="btn" onClick={addFavorite}>
                <span role="img" aria-label="heart">❤️</span> Add to Favorites
            </button>
          )}
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/">← Back to Posts</Link>
          </Col>
        </Row>
      </Container>
    ) : (
      <div>loading...</div>
    )}</>
  );
};

export default Detail;
