import React, { Component } from 'react'
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {readAllPost, deletePost} from "../actions/index"
import PostListItem  from "../components/post-list-item"
import ReactCSSTransittionGroup from 'react-transition-group/CSSTransitionGroup'
import {Link} from "react-router"
class PostList extends Component {

    constructor(props){
        super(props)
        this.state = {displayOnlyMine: false}
    }

    componentWillMount(){
        this.props.readAllPost()
    }

    renderPosts(){
        const {posts} = this.props
        let arrayPosts;
        if(posts){
            if(this.state.displayOnlyMine){
                arrayPosts = this.filterMyPosts(posts);
            } else {
                arrayPosts = posts;
            }
            return arrayPosts.map((post) => {
                return <PostListItem key={post.id} post={post} deletePostCallBack={(post) => this.deletePostCallBack(post)}/>
            })
        }
    }

    deletePostCallBack(post){
        this.props.deletePost(post.id);
    }

    filterMyPosts(postList){
        return postList.filter((post) => {
            if(post.author == "Moi"){
                return true
            } else {
                return false
            }
        })
    }

    render () {
        
        return (
            <div>
                <h1>Liste des postes</h1>
                <input type="checkbox" onChange={(e) => this.setState({displayOnlyMine: e.target.checked})} /> Afficher mes postes
                <div className="button_add">
                    <Link to={'create-post'} ><button className="btn btn-primary btn-circle btn-lg">+</button></Link>
                </div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>
                                titre
                            </th>
                            <th>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <ReactCSSTransittionGroup component="tbody" transitionEntertimeout={500} transitionLeaveTimeout={300} transitionName="fade">
                        { this.renderPosts() }
                    </ReactCSSTransittionGroup>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({readAllPost, deletePost},dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostList)