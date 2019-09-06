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
+ return withRouter(ABC);