**ReactJS NOTE**

> STATE CHANGE : reload component !!!!
+ Pass method to element by adding props reference to the parent method: with parameter: 2 ways:
  -   () => {method(abc)}
  -   {this.method.bind(this, param)}
  
+ using arrow function to avoid "this" misunderstanding
  
+ with array and object: reactjs using pointer reference, so you should copy them then change later:
  - using array.slice()
  - using [...array]
  - same with object: {...object}

+ Traverse a list inside JSX by using map() method, you should add key props to help compiler find the element faster.
+ Using ? to do the if else statement inside JSX

+ Update object:
  > const index = array.findIndex(p => {
  >  return p.id == id;
  > })
  > const person = {...array[index]}
  > copy > change > assign

+ Change react component dynamicly by add style to variable and set a state change: (if(state)) -> change variable -> reload component.
+ Using style inside react file *RADIUM*
  > Import Radium then export Radium(App)
  > The variable contain pseudo style code
  > const style = {
  >   color: 'red',
  >   ':hover': {}
  >}
  > You can change hover by: style[':hover'] = {}

+ Using css module: *npm run eject* to import all configuration.
> import "./style.css": webpack bundle it
> 
 ===============================================================================
### Default function REACT (Lifecycle)

> Load when the component is CREATING !!!!
## 1. constructor(props)
    Initial and pass all props, can init state.
    when call -> super(props)
    => don't cause side-effect
## 2. componentWillMount()
    Not exist anymore !
## 3. Render()
    structure JSX code
        3.5 render child element !!!
## 4. componentDidMount()
    component was successful loaded
    => can cause side-effect
    => don't change state here (re-render)

>> Load when the component Update (triggered by parent, STATE CHANGE(setState) )

## 1. ComponentWillReceiveProps(nextProps) by parent
    Do: sync local state to props
    Don't: cause side-effect
## 2. shouldComponentUpdate(nextProps, nextState)
>> can be omit by using PureComponent: only use if the update not required
    -> may cancel updating process, return true -> update | return false -> not
    CHECK if the input change valid or not -> optimizing the code
    Don't: cause side-effect
## 3. componentWillUpdate(nextProps, nextState) -> better
    Do: sync local state to props
    Don't: cause side-effect
## 4. render()
        4.5 update child component props
## 5. componentDidUpdate()
    cause side-effects.

============================================================
ADD PROPS TYPE


=================================================================
+ setState working asynchronously, so sometime not working right
this.setState( (prevState, props) => {
    return {
        toggleClicked: prevState.toggleClicked + 1
    }
} );

+ check for props type: npm install --save prop-types
> import PropTypes from 'prop-types'
// below the definement of your class
> Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
};

> Reference to HTML tag !!!
+ ref !!!! ref = {(input) => {this.inputElement = input}}
+ this.inputElement.focus();

> global state react: THE MEMO METHOD slide 
+ export const AuthContext = React.createContext({false});
+ <AuthContext.Provider value={this.state.authenticated}>{persons}</  
+ AuthContext.Provider>

+ import {AuthContext} from ""
+ <AuthContext.Consumer>
    {auth => auth.xyz ? "Authenticated": null}
+ </ AuthContext.Consumer>

=======================================================================
+ Aux = React.Fragment
+ Lazy Loading with condition component like (if ... else ...) or with different route loading 
> import { Suspense } from 'react';
> const Posts = React.lazy(() => import('../component/posts'));
> <Route
>   path ='/'
>   render={() => (
>   <Suspense fallback={<div>Loading ... </div>}>
>     <Posts/>
>   </Suspense>
>   )}
> />

+ set base path when deploy to server: in <BrowserRouter basename='/my-app'>
+ import { withRouter } from 'react-router-dom';
+ return withRouter(ABC);=sdfds
+ ============================================
  Interesting !
>   let transformedIngredients = Object.keys(props.ingredients)
>   .map(igKey => {
>     return [...Array(props.ingredients[igKey])].map((_, i)=>{
>       return <BurgerIngredient type={igKey} key={igKey + i}/>;
>     });
>   })
>   .reduce((arr, el)=>{
>     return arr.concat(el)
>   }, [])
> ;
===================================================================
How to pass parameter through url request !!!!!!!!!!!!!!!!!!!!!!!!!!!!
> C1:
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParams.push("price=" + this.props.price);

    const queryString = queryParams.join("&");

    console.log(this.props);
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString
    });
>    -------------------------
  componentWillMount() {
    const query= new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;

    for(let param of query.entries()) {
      // ['salad', '1']
      if(param[0] === 'price') {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ingredients: ingredients, totalPrice: price});
  }
> C2: Using REDUX
===================================================================
> render route
> render = {(props) => (<ContactData 
            ingredients={this.props.ings} 
            totalPrice={this.props.price}
            {...props} />)}
> component = {ContactData}

===================================================================
**REDUX**

Global state store, having clear flow state change
0. install redux
1. create store at index.js
   import {createStore} from 'redux';
   import reducer from '';
   import { Provider } from 'react-redux';

   const store = createStore(reducer);

   <Provider store={store}></App><Provider>

2. create store folder: reducer.js
   initialState ={
     counter: 0
   }

> alway working in imuatable way !!!!!!
   const reducer = (state = initialState, action) => {
     if (action.type === 'INCREMENT') {
       return {
         ...state,
         counter: state.counter + 1
       }
     }
     else if (action.type === 'DECREMENT'){
       return ...
     }
     return state;
   }
   export default reducer;

3. install react-redux
4. import { connect } from 'react-redux'; in Counter.js

// after class
const mapStateToProps = state => {
  return {
    count: state.counter
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onIncrementCounter: () => dispatch({type: 'INCREMENT'})
    onDecrementCounter: () => dispatch({type: 'DECREMENT'})
    onAdd: () => dispatch({type: 'ADD', val: 10})
  }
}

// Thay vi su dung state.counter thi su dung this.props.count
// clicked = {this.props.onIncrementCounter}
// clicked = {this.props.onDecrementCounter}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);

> "IMMUTABLE way" object/array change:
> object: {...state}
> array: state.results.concat(state.counter) : create new array and add
> array: state.results.filter(res => res.id !== action.id): create new and delete
> newarray = [...array];

5. in store folder: create actions.js to export identifier
   export const INCREMENT = 'INCREMENT';
   export const DECREMENT = 'DECREMENT';
   export const ADD = 'ADD';
then:
  import * as actionTypes from './actions.js';
  actionTypes.INCREMENT

6. Use multiple reducers: Combine many into one.
separate into many reducer by state
> in store folder: create reducers folder
> counter.js and result.js inside

in the index.js file: 
import {createStore, combineReducers} from 'redux';
import counterReducer
import resultReducer

const rootReducer = combineReducer({
  ctr: counterReducer,
  res: resultReducer
});
 
 const store = createStore(rootReducer);
 ------------------------
 access global state by name define
 ex: in mapStateToProps: ctr: state.ctr.counter
                      state.res.result;

> neu reducer nay su dung state o reducer khac
> phai thong qua thuoc tinh moi cua action
> luc goi o noi su dung
> sau do pass tham so vao ham thuc thi. (chu ko dung global duoc vi chua combine.)

??? When should use REDUX !
--> client state: (isAuthen, ) which has been used by many other component !
===================================================================================
+ in index.js
  import { applyMiddleware, compose } from 'redux';

+ MIDDLEWARE
// add redux debug
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

> const logger = store => {
>   return nextFunc => {
>     return action => {
>       console.log('[Middleware] dispatching ...', action);
>       const result = nextFunc(action);
>       console.log('['Middleware'] next sate', store.getState());
>       return result;
>     }
>   }
> };

+ add middleware, connect to store
  const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger)));
=========================================================================
*** Action creator**: in actions.js file
> Allow run asynchronous code while 
> reducer only for synchronous code

export const increment = () => {
  return  {
    type: INCREMENT
  };
}

export const add = (value) => {
  return {
    type: ADD,
    val: value
  }
}

+ Using: import * as actionCreators from '../actions.js';
note: pass increment va thuc thi luon

>const mapDispatchToProps = dispatch => {
  return {
    onIncrementCounter: () => dispatch(actionCreators.increment())
    onDecrementCounter: () => dispatch(actionCreators.decrement())
    onAdd: () => dispatch(actionCreators.add(10))
  }
}
=========================================================================
> Inplement reduce asychronous code: REDUX_THUNK
import thunk from 'redux-thunk';
> const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thuck)));

export const saveResult = (res) => {
  return {
    type: STORE_RESULT,
    result: res
  }
}

export const storeResult = (res) => {
  return dispatch, getState => {
    setTimeout( () => {
      const oldCounter = getState().ctr.counter;
      dispatch(saveResult(res));
    }, 2000);
  }
}






