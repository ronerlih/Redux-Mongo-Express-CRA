import React, { useEffect } from "react";
import { ListItem, List } from "../components/List";
import DeleteBtn from "../components/DeleteBtn";
import { Link } from "react-router-dom";
import { selectFavorites, removeFavorite } from "../features/favorites/favoritesSlice";
import { useDispatch, useSelector } from 'react-redux';

const FavoritesList = () => {

  const dispatch = useDispatch();
  
  // read from store
  const favoritesState = useSelector(selectFavorites);
  
  const getFavorites = () => favoritesState;

  const removeFromFavorites = id => {
    dispatch(removeFavorite(id));
  };

  useEffect(() => {
    getFavorites();
  });

  return (
    <div className="container mb-5 mt-5">
      <h1 className="text-center">Here's All of Your Favorite Posts</h1>
      {favoritesState.length ? (
        <List>
          <h3 className="mb-5 mt-5">Click on a post to view in detail</h3>
          {favoritesState.map(post => (
            <ListItem key={post._id}>
              <Link to={"/posts/" + post._id}>
                <strong>
                  {post.title} by {post.author}
                </strong>
              </Link>
              <DeleteBtn onClick={() => removeFromFavorites(post._id)} />
            </ListItem>
          ))}
        </List>
      ) : (
        <h3>You haven't added any favorites yet!</h3>
      )}
      <div className="mt-5">
        <Link to="home">Back to home</Link>
      </div>
    </div>
  );
};

export default FavoritesList;
