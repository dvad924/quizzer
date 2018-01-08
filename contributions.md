# Basic Code organization
A particular URL endpoint (disregarding paramaters) will have its own directory for UI components and transition logic

E.g. QuizView would be the view for the page when it is displaying a quiz, it has its own directory under src/routes/QuizView

Here we're using the react-redux data flow, where the store holds the state of the app, containers map portions of the state
to a component taking only the data it needs, and finally the presentational components that simply display the data
in the disired format.

A View is organized into components, containers and optionally modules and actions.

Components should be simple React components with as little state logic as possible (preferebly none)
Complex components should be composed of a number of simpler components reducing its complexity 
leaving details to the subcomponents. Preference is toward the use of JSX markup
to give the familiar html readability

Containers should map the required pieces of data from the state into the presentation components
simple example being we have a score of 35 stored as a number in the state but we wish to display it in html
we take the value 35 force its representation to a string and send it to the component to be displayed in markup

modules/slices of the state can be created when necessary (usually when a view is sufficiently complex).
Actions should then affect only that slice of the state. Actions can be passed to the dislay components
as interactive actions usually in the form of an 'onClick' or 'onChange'

In the case of actions the use of Promises are prefered in order to allow clean, readable, and chainable actions
which can then easily create more complex actions or action sequences.

# App Flow
React Redux pattern works as follows:

` STORE( APP STATE CHANGE) ==> CONTAINER(process effect of store change on a component) ==> DISPLAY (Render new component based on change) ==> ACTION (from component[click ...] or other[time, init ...]) => STORE ...`

## STORE --
  The store contains the state of the entire application. So any data for quizzes/multiple quizzes will be in the store.
  individual questions, User Interface Variables ( e.g. something hidden or not ) will all be there in plain JSON 
  ({key:'an example'})
  Here the main piece of app state that will hold quizzes and their questions is in src/stores/modules/quizzes.js
  
  
## COMPONENT/DISPLAY --
  component is a visual object that is rendered to the screen could be as simple as a <div> or a paragraph of text
  simple display only components can be created with a simple function that just renders content e.g
  ```javascript
  const mySimpleParagraphFunction = (inheritedProperties) => (<p>{inheritedProperties.nameOfTextVariable}</p>)
  ```
  
  This is the component definition and can best be used as modified JSX markup e.g.
  ```javascript
  const simpleParagraph = (props) => (<mySimpleParagraphFunction nameOfTextVariable={"HELLO WORLD"} />)
  ```
  which will generate the final html of `<p>HELLO WORLD</p>`
  
## CONTAINER --
  a convenient way of tying the STORE to a component without tons of parameter passing.
  this is accomplished via the `connect` function from react-redux.
  
  `connect` takes upto 3 functions and the resulting wrapper will take a COMPONENT
  the three functions are 
  mapStateToProps -- which takes the state of the app, pulls things from it, and stuffs them into the component
  
  mapDispatchToProps -- more on this later
  
  mergeProps -- use only if trying to be tricky (use discouraged)
  
  e.g.
  ``` javascript
  
    //NOTE for example state == {vars:{greeting:"Hello World"}}
    import {connect} from 'react-redux'
    import {mySimpleParagraphFunction} from './some_local_file_containing_the_definition_of_mySimpleParagraphFunction.js'
    const mapStateToProps = (state) => {
       return { //Explicit JSON
          nameOfTextVariable:state.vars.greeting,
       }
    }
    export default connect(mapStateToProps)(mySimpleParagraphFunction)
  ```
  we could now use the component as
  ```javascript
    import MySimpleParagraphFunction from './paragraphContainer.js'
    export const aSimpleParagraphNoExplicitParams = (props) => (<MySimpleParagraphFunction />)
  ```
  and it will render `<p>Hello World</p>`
## ACTION
  This is the more complicated (but only slightly more so that previous) part.
  
  Actions should be something that has a cause and effect. 
  
  e.g. click a choice in a multiple choice question will result in the state of the appliction
  changing to reflect that choice.
  
  The execution of these actions are done by what we will call DISPATCHING AN EVENT.
  An event has a name, and will take a variable containing data. That data is sent to 
  the correct function in the system which takes the data and changes the state accordingly.
  Much like someone receiving a letter addressed to them and then taking an action based on
  the contents of the letter. 
  
  This is where the `mapDispatchToProps` comes into play it takes functions and wraps them 
  with a dispatcher. The internals of this will not be explained here but you don't need to dig 
  very deep to see how this will work.
  
  Lets show an example using or example paragraph component.
  
  Suppose when we click our paragraph we want it to change its content from "Hello World" to
  "I'm ready to take you on."
  
  We could achieve this as follows: 
  
  Add a click event to our paragraph
  
  ```javascript
  const mySimpleParagraphFunction = (inheritedProperties) => (
  <div onClick={inheritedProperties.click} >
    <p>{inheritedProperties.nameOfTextVariable}</p>
  </div>
  )
  ```
  Change components connection by adding a click function
  
  ``` javascript
  
    //NOTE for example state == {vars:{greeting:"Hello World"}}
    import {connect} from 'react-redux'
    import {mySimpleParagraphFunction} from './some_local_file_containing_the_definition_of_mySimpleParagraphFunction.js'
     const mapDispatchToProps = {
        click:function() {
          return (dispatch) => dispatch({type:'PARAGRAPH_CLICK',payload:null})
        }
     }
     const mapStateToProps = (state) => {
       return { //Explicit JSON
          nameOfTextVariable:state.vars.greeting,
       }
    }
    export default connect(mapStateToProps, mapDispatchToProps)(mySimpleParagraphFunction)
  ```
  NOTE dispatched is added to the function by the connect function
  The by dispatching the object `{type:'PARAGRAPH_CLICK', payload:null}`

  The system will go find the PARAGRAPH_CLICK function and give it 
  the object `{type:'PARAGRAPH_CLICK', payload:null}`
  
  We can define the function PARAGRAPH_CLICK for the dispatching system as follows:
  ```javascript
  (state, action) => { //State is the state or slice of state in the store
                       //Action in this case will be `{type:'PARAGRAPH_CLICK', payload:null}`
     let nstate = Object.assign({},nstate) //guarantee state will be a new object
     let greeting = nstate.vars.greeting;
     nstate.vars.greeting = (greeting==='Hello World') ? "I'm ready to take you on." : "Hello World"
     return nstate
  }
  ```
  Once this function returns it will change the state and the mapStateToProps function will be called again
  which will update the contents of the component
  
  If this function is correctly added to the react redux store as a REDUCER when we click the 
  paragraph it will toggle between the phrases "I'm ready to take you on." and "Hello World".
  
  The subtleties of how this is correctly added I will not go into here but can be found in the file src/stores/reducers.js
  
# Full Example
  In terms of actions I have written a small wrapper around a lot of code that is used for the pipe line to make connections
  slightly more readable (IMO at least)
  
  Action: src/stores/modules/AnswerAction.js (this will probably be moved at some point)
  Display Component: src/routes/QuizView/Components/QuestionCounter.js
  Container: src/routes/QuizView/Containers/QuizContainer.js
  
  In Quiz Container I was trying to be clever and made it simple but possibly hard to read
  the mapStateToProps is just taking the current state and setting the appropriate variables
  It sets the action of when an answer is selected it executes a chain of actions.
  
  It first answers the question, waits almost a 1/2 sec before attempting to finish the quiz
  if it didn't it goes onto the next question.
