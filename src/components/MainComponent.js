import Menu from './MenuComponents';
import { Component } from 'react/cjs/react.production.min';
import { render } from '@testing-library/react';
import DishDetails from "./DishDetail";
import Header from "./Header";
import Footer from "./Footer";
import { Redirect, Route, Switch } from "react-router";
import Home from "./Home";
import Contact from './Contact';
import About from './Aboutus';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { postComment, fetchComments, fetchDishes, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';




const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}
const mapDispatchToProps = dispatch => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes())},
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => {dispatch(fetchLeaders())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  
});


class Main extends Component {
  constructor(props){
    super(props);
   
  }
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }


  render(){
    const HomePage =()=>{
      return(
        <Home 
        dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
        dishesLoading={this.props.dishes.isLoading}
        dishErrMess={this.props.dishes.errMess}
        promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
        promoLoading={this.props.promotions.isLoading}
        promoErrMess={this.props.promotions.errMess}
        leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
        leadersLoading={this.props.leaders.isLoading}
        leadersErrMess={this.props.leaders.errMess}
    />
      )
    }

const DishWithId =({match}) =>{
  return(
    <DishDetails dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
            comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
            commentsErrMess={this.props.comments.errMess}
            postComment={this.props.postComment}
          />

  )
}


  return (
    <div>
      <Header/>
      <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
               <Switch>
                  <Route path="/home" component={HomePage}/>
                  <Route exact path="/aboutus" component={()=><About leaders={this.props.leaders}/>}/>
                  <Route exact path="/menu" component={()=><Menu dishes ={this.props.dishes}/>}/>
                  <Route path="/menu/:dishId" component={DishWithId}/>
                  <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
                  <Redirect to="/home"/>
                </Switch>
            </CSSTransition>
          </TransitionGroup>
       <Footer/>
    </div>
  );
}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

//json-server --watch db.json -p 3001 -d 2000