const isInFavorites = (favoritesState, id) => 
    favoritesState.map((fav) => fav._id).indexOf(id) >= 0 
        ? true 
        : false ;

export { isInFavorites };
