import React, {
	Component,
	PropTypes
} from 'react';

import PostItem from './PostItem';
import Spinner from '../Spinner'
import ErrorContent from '../ErrorContent'

class PostsList extends Component {
	shouldComponentUpdate(nextProps) {
		return (nextProps.posts.status !== this.props.posts.status) ||
			(nextProps.posts.list[0] !== this.props.posts.list[0]) ||
			(nextProps.posts.filterTitle != this.props.filterTitle)
	}
	render() {
		const {
			posts
		} = this.props

		let renderStatus = {
			loading: function() {
				return <Spinner />
			},
			success: function() {
				const filterTitle = posts.filterTitle.toLowerCase()
				const postsNode = posts.list.map(post => { //use key avoid Each child in an array or iterator should have a unique "key" prop
					if (post.title.toLowerCase().includes(filterTitle)) {
						return <PostItem key={post.key} id={post.key} title={post.title} postDate={post.postDate}></PostItem>
					}
				})
				return (
					<div>
						{postsNode}
					</div>
				)
			},
			error: function() {
				return <ErrorContent message={posts.error}/>
			}
		}
		if (renderStatus.hasOwnProperty(posts.status)) return renderStatus[posts.status]()
		return <div></div>
	}
}

PostsList.propTypes = {
	posts: PropTypes.object
}

export default PostsList