import React, { useEffect } from "react";
import { ListItem, List } from "../../components/List";
import DeleteBtn from "../../components/DeleteBtn";
import FavBtn from "../../components/FavBtn";
import { Link } from "react-router-dom";
import { deletePost, updatePosts, selectPosts } from "../../features/post/postSlice";
import { addFavorite, selectFavorites, removeFavorite } from "../../features/favorites/favoritesSlice";
import API from "../../utils/API";
import { useDispatch, useSelector } from "react-redux";
import { loading, notLoading } from "../../features/loading/loadingSlice";
import { isInFavorites } from "../../utils/methods";

function PostsList() {
	// removed, using useDispatch hook from redux
	// const [state, dispatch] = useStoreContext();
	const dispatch = useDispatch();
	const postsState = useSelector(selectPosts);
	const favoritesState = useSelector(selectFavorites);

	const removePost = (id) => {
		API.deletePost(id)
			.then(() => {
				dispatch(notLoading());
				dispatch(deletePost(id));
			})
			.catch((err) => console.log(err));
	};

	const addFav = (e, post) => {
		e.target.blur();
		dispatch(addFavorite(post));
	};
	const removeFav = (e, id) => {
		e.target.blur();
		dispatch(removeFavorite(id));
	};

	useEffect(() => {
		const getPosts = () => {
			dispatch(loading());
			API.getPosts()
				.then((results) => {
					dispatch(updatePosts(results.data));
					dispatch(notLoading());
				})
				.catch((err) => console.log(err));
		};
		getPosts();
	}, [dispatch]);

	return (
		<div>
			<h1>All Blog Posts</h1>
			<h3 className="mb-5 mt-5">Click on a post to view</h3>
			{postsState.length ? (
				<List>
					{postsState.map((post) => (
						<ListItem key={post._id}>
							<Link to={"/posts/" + post._id}>
								<strong>
									{post.title} by {post.author}
								</strong>
							</Link>

							<DeleteBtn onClick={() => removePost(post._id)} />
							{isInFavorites(favoritesState, post._id)
								? <FavBtn style={{opacity:1}} onClick={ e => removeFav(e, post._id)} />
								: <FavBtn style={{opacity:0.5}} onClick={ e => addFav(e,post)} />
							}
							
						</ListItem>
					))}
				</List>
			) : (
				<h3>You haven't added any posts yet!</h3>
			)}
			<div className="mt-5">
				<Link to="favorites">View favorites</Link>
			</div>
		</div>
	);
}

export default PostsList;
