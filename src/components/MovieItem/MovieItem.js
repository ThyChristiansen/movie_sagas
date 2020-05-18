import React, { Component } from 'react';
import { Link, HashRouter, Switch, Route, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Details from '../Details/Details';

class MovieItem extends Component {

    state = {
        genres: '',
    }

    //Use sendDetail function to send the title, description and genres to index by dispatch
    sendDetail = () => {
        this.props.dispatch({
            type: 'FETCH_DETAIL', // action type FETCH_DETAIL to send title and description
            payload: {
                title: this.props.movieData.title,
                description: this.props.movieData.description
            }
        })
        // create another dispatch to fetching the genres of the selected movie and send it to index to reduce    
        this.props.dispatch({
            type: 'FETCH_GENRES',// action type FETCH_GENRES to send genres
            payload: this.props.movieData.genres,
        })
    }



    render() {

        return (
            <div className="movie_item">
                <HashRouter>
                    {/* create an Link to bring the user to the Detail page
                 when the user click on this poster  */}
                    <Link to={`/details/${this.props.movieData.id}`}>
                        <img
                            src={this.props.movieData.poster}
                            alt={this.props.movieData.title}
                            onClick={this.sendDetail}
                        />
                    </Link><br />
                    {/* <Switch>
                        <Route path="/details/:id" component={<Details />} />
                    </Switch> */}


                    <p>{this.props.movieData.title}</p>

                    {/* Display genres  */}
                    <div className="genres_list"  >Genres:
                    {/* //mapping through genres array that we got from reducer genres */}
                        {this.props.movieData.genres.map(genres => {
                            return (
                                <span key={genres}> {genres}</span>
                            )
                        })
                        }
                    </div>
                    {/* Display description  */}
                    <p>{this.props.movieData.description}</p>
                </HashRouter>
            </div >
        )

    }

}
// put the reduxState on property to able to 
//call the data from index.js in this component
// const putReduxStateOnProps = (reduxState) => ({ reduxState })
export default connect()(MovieItem);

// function Details() {
//     // We can use the `useParams` hook here to access
//     // the dynamic pieces of the URL.
//     let {id} = useParams(this.props.movieData.id);

//     return (
//       <div>
//         <h3>ID: {id}</h3>
//       </div>
//     );
//   }
