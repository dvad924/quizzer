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
