# The Modern React Bootcamp (Hooks, Context, NextJS, Router) - by Colt Steele

<!--
|                                                         Project                                                          | Demo                                                                                                |
| :----------------------------------------------------------------------------------------------------------------------: | --------------------------------------------------------------------------------------------------- |
| [Expanding Cards](https://github.com/Epitome87/Modern-React-Bootcamp-Journey/tree/main/Day%2001%20-%20Expanding%20Cards) | [Demo](https://epitome87.github.io/Modern-React-Bootcamp-Journey/Day%2001%20-%20Expanding%20Cards/) |
|  [Progress Steps](https://github.com/Epitome87/Modern-React-Bootcamp-Journey/tree/main/Day%2002%20-%20Progress%20Steps)  | [Demo](https://epitome87.github.io/Modern-React-Bootcamp-Journey/Day%2002%20-%20Progress%20Steps/)  | -->

## Table of Contents

[Section 01 - A Taste of React](#section-01-a-taste-of-react)
[Section 05 - Pokedex Project](#section-05-pokedex-project)
[Section 17 - React Lifecycle Methods](#section-17-react-lifecycle-methods)
[Section 36 - Next JS](#section-36-next-js)

Section 01 - A Taste of React
Section 02 - Introducing JSX
Section 03 - Props and More
Section 04 - Introducing Create React App
Section 05 - Pokedex Project
Section 06 - Introducing State
Section 07 - React State Dice Exercise
Section 08 - React State Patterns
Section 09 - State Exercises
Section 10 - The World of React Events
Section 11 - Hangman Exercise
Section 12 - Lights Out Game
Section 13 - Forms in React
Section 14 - Forms Exercise
Section 15 - Todo List Project
Section 16 - Building Yahtzee
Section 17 - React Lifecycle Methods
Section 18 - Lifecycle Methods and API Exercise
Section 19 - Building the Dad Jokes App
Section 20 - React Router
Section 21 - Vending Machien Exercise
Section 22 - React Router Patterns
Section 23 - Router Exercises Part 2
Section 24 - The Massive Color Project Part 1
Section 25 - The Massive Color Project Part 2
Section 26 - JSS and withStyles (Color App)
Section 27 - The Massive Color Project Part 3
Section 28 - The Massive Color Project Part 4
Section 29 - The Massive Color Project Part 5
Section 30 - The Massive Color Project Part 6
Section 31 - The Massive Color Project Part 7
Section 32 - React Hooks Project
Section 33 - Introducing the Context API
Section 34 - Using Context with Hooks
Section 35 - State Management with useReducer and useContext
Section 36 - Next JS
Section 37 - Next: Fetching and Server API
Section 38 - Bonus: Webpack Mini Course - Your Own Simple Version of Create React App

## Section 01 - A Taste of React

## Section 02 - Introducing JSX

## Section 03 - Props and More

## Section 04 - Introducing Create React App

## Section 05 - Pokedex Project

## Section 06 - Introducing State

- Props are immutable; a component cannot change its own prop. We cannot say this.props.color = red, for instance!

- State is different: This is internal data specific to a component, and this data can (and will) change over time!

- In React, state is an instance attribute on a component. It's always an object (POJO -- plain-old javascript object), since you'll want to keep track of several keys/values.

- State should be initialized as soon as the component is created. So we set it in the construction function: this.state = { }

- Props don't need to be initialized, State does.

- If your component is stateless, you can omit the constructor function. If you are building a component w/state, you need a standard React constructor.

- With newer JS we can drop the constructor, drop the super, and drop the "this"! At the time of Colt's course, this was experimental. But now it is common for Babel to convert this to older, compatible JS.

- If we need to access "props" in a Component's constructor, we have to make a call to "super(props)" first! Then we can use "this.props".

- If we need to access "this" in a Component's constructor, you have to at least call super() -- with or without the props passed into it.

- DO NOT change this.state directly! Use React's interface for doing so -- "this.setState()" Cannot call setState in the constructor (it has not yet been mounted by this point). Try not to set state in your render either.

- Changing State: 1) Can call in any instance method except the constructor. 2) Takes an object describing the state changes. 3) Patches state object -- keys that you didn't specify don't change. 4) Asynchronous! -The component state will eventually update. -React controls when the state will actually change, for performance reasons.

- setState can receive a function or an object. It can receive an optional callback as well.

- React will determine when the actual best time to apply the state changes is.

- "State as Props": A common pattern we will see over and over again is a stateful ("smart") parent component passing down its state values as props to stateless ("dumb") child components. This idea is generalized in React as "downward data flow". It means that components get simpler as you go down the component hierarchy, and parents tend to be more stateful than their children.

## Section 07 - React State Dice Exercise

### `Originally Started: 11/05/2021`

Just created a rather simple dice-rolling app! Did it without any assistance, although I did end up using Colt's "wiggle" animation.

## Section 08 - React State Patterns

### `Originally Started: 11/05/2021`

### Updating Existing State

Goals in Section 08:

- Learn how to update state based off of existing state
- Properly manage state updates for mutable data structures (arrays, objects, nested arrays/objects)
- Discuss best practices for modeling state and designing components

How to set state using existing state?

- Firstly, never update a state that depends on a previous state using the method below:

```js
this.state = { score: 0 };

singleKill() {
    this.setState( { score: this.state.score + });
}
```

Why is the above not ideal? It seems to work, after all, at least in this scenario. But consider the next scenario:

```js
tripleKill() {
    this.setState( { score: this.state.score + });
    this.setState( { score: this.state.score + });
    this.setState( { score: this.state.score + });
}
```

Calling `tripleKill()` actually only adds one to the score count each time. Why?

- We've established that `setState()` is asynchronous... So it's risky to assume previous call has finished when you call it. Also, React will sometimes batch calls to `setState()` together into one big call for performance reasons.

- With the way React works, it is taking only our _last_ call to setState above and calling it, as it assumes the calls above are unnecessary. After all, if our score changes once, and then again, and then a third time, shouldn't we only care about what its value was set to that third time?

- _So!_ If a call to `setState()` depends on current state, the safest thing is to use the alternate "callback form": `this.setState(callback)`

- Instead of passing an object, pass it a callback with the current state as a parameter.
- The callback should return and object representing the new state.

```js
tripleKill() {
    this.setState((curState) => ({ score: curState.score + 1 }));
    this.setState((curState) => ({ score: curState.score + 1 }));
    this.setState((curState) => ({ score: curState.score + 1 }));
}
```

Abstracting State Updates

- The fact that you can pass a function to `this.setState` lends itself nicely to a more advanced pattern called _functional setState_
- Basically, you can describe your state updates abstractly as separate functions.

```js
// Elsewhere in the code
function incrementCounter(prevState) {
  return { count: prevState.count + 1 };
}
// Somewhere in the Component
this.setState(incrementCounter);
```

But why would you do this?

- It's nicer to read!
- This pattern also comes up all the time in Redux!
- Because testing your state changes is as simple as testing a plain function: `expect(incrementCounter({count: 0})).toEqual({count: 1});`

Using this _functional setState_ approach, our kill example can be written as:

```js
incrementScore(currentState) {
    return { score: currentState.score + 1 };
}

tripleKill() {
    this.setState(this.incrementScore);
    this.setState(this.incrementScore);
    this.setState(this.incrementScore);
}
```

### Mutating State the Safe Way

Until now, we've been setting state to primitives: mainly numbers and strings.
But component state also commonly includes objects, arrays, and arrays of objects.

You have to be extra careful modifying your array of objects! Do not do the following:

```js
completeTodo(id) {
    const theTodo = this.state.todos.find(t => t.id === id);
    theTodo.done = true; // NO!

    this.setState({ todos: this.state.todos }); // Bad!
}
```

Sometimes you _can_ get away with this. But it is _not_ the _React way!_

A much better way is to make a new copy of the data structure in question. We can use any _pure function_ to do this. And then reset the whole thing in the state.

```js
completeTodo(id) {
    // Array.prototyp.map returns a new array
    const newTodos = this.state.todos.map(todo => {
        if (todo.id === id) {
            // Make a copy of the todo object with done -> true
            return { ...todo, done: true };
        }
        return todo; // Old todos can pass through
    });

    this.setState({
        // setState to the new array
        todos: newTodos
        });
}
```

This approach of is used throughout React and Redux, so it's best to get accustomed. Pure functions such as .map, .filter, and .reduce are your friends! So is the ...spread operator!

So, the pattern is: Take existing state, if we want to update a small part of it, we make a copy of it, in our copy make that change, and then set state to that copy.

For arrays where we want to simply add a new element, this isn't so bad:

```js
this.state = { names: ['Matthew', 'Daniel'] };
let newElement = 'Caitlin';
this.setState({ icons: [...this.state.names, newElement] });
```

There is a slight efficiency cost due to the O(N) space/tiem required to make a copy, but it's almost always worth it to ensure that your app doesn't have extremely difficult to detect bugs due to side effects.

Immutable State Summary

- While it sounds like an oxymoron, immutable state just means that there is an old state object and a new state object that are both snapshots in time.
- The safest way to update state is to make a copy of it, and then call this.setState with the new copy.

### Designing State: Minimizing State

Designing State

- Designing the state of a React application (or any modern web app) is a challenging skill! It takes time and practice.
- However, there are some easy best-practices that we can talk about in this section to give you a jump-start.

1. Minimize Your State

- In React, you watn to try to put as little data in state as possible.
- Litmus test:
  - Does x change? If not, x should not be part of the state; it should be a prop (if even).
  - Is x already captured by some other value y in state or props? Derive it from there instead.
  - Example: If we're modelling a Person, their name and date of birth are not going to change; don't make those part of state!
  - Even age doesn't need to be state -- derive it from the birthday prop!

### Designing State: Downward Data Flow

2. git sState Should Live on the Parent

- As previously mentioned, we want to support the "downward data flow" philosophy of React.
- In general, it makes more sense for a parent component to manage state and have a bunch of "dumb" stateless child display components.
- This makes debugging easier, because the state is centralized. It's easier to predit where to find state:

  - Is the current component stateless? Find out what is rendering it. There's the state.

- Todo Example:
  - Todo list manages all the state, and the individual Todos are "dumb"

### State Design Example: Lottery

For a simple Lottery app, we need the following.

1. Lottery Component

   - Props:
     - title: title of the lottery
     - numBalls: number of balls to display
     - maxNumber: max value of each ball
   - State:
     - nums: array of [num, num, num, ...] for balls
   - Events
     - onClick: rengenerate nums in state

2. LottoBall Component
   - Props:
     - num: value on this ball
   - State:
     - None!
   - Events:
     - None!

The rest of this section is spent coding this example. It is rather simple and straightforward, so not many notes to be written!

### Old Notes For Section 8

- If a call to setSTate() depends on current state, the safest thing is to use the alternate "callback form". A good example of why is if we were to call setState() on the same value multiple times in a row (for some reason). Only the final call to setState() would be used, since React will notice the previous calls and assume that the final one holds the correct state. Callback form: setState( (prevState) => return { count: prevState.count + 1}. This is for Class-Components

- It's good to define a callback function elsewhere in the code for the above purposes. It looks nicer and lends itself for use in Redux. Example: function incrementCounter(prevState) { <stuff> }; And then below: this.setState(incrementCounter). Easier for testing too: expect(incrementCounter({ count: 0 })).toEqual({ count: 1});

- Mutating nested data structures in your state can cause problems w/React. Do immutable state updates: A much better way is to make a new copy of the data structure in question and then add new data / update it. We can use any "pure function" to do this, like array.map, .filter, .reduce, and the spreado perator. **IS THIS STILL VALID, OR IS COLT OUTDATED**

- To solve the above, make use of the spread operator: this.setState({ icons: [...this.state.icons, newIcon]})

- Minimize Your State: In React, you want to try to put as little data in state as possible. Litmus test: Does x change? If not, x should not be part of state. Should be a prop. Is x already captured by some other value y in state or props? Derive it from there instead.

- Examples of Bad State Design: this.state = { first: "Matt", last: "McGrath", birthday: <some data>, age: 34, mood: "irate". 1) Does Matt's first name or last name ever change? No! 2) Does his birthday ever change? Nope! 3) Matt's age DOES change, however if we had this.props.birthday we could easily derive it from that. 4) Mood is a valid candidate for state.

- State should live on the Parent: We want to support the downward data flow philosphy of React. It makes more sense for a parent component to manage state and have a bunch of dumb stateless child display components. Makes debugging easier because the state is centralized. Easier to predict where to find state: \* Is current component stateless? Find out what is rendering it. There's the state.

## Section 09 - State Exercises

### `Originally Started: 11/06/2021`

In this section, we work on two small projects to reinforce our React state knowledge: A Coin-Flipper and a Random Colored Boxes app.

Nothing major or new took place, so not really any notes to make! For the Color Boxes app, we have a parent component keep track of all its children component's current color, and the children have no state. While this works, the problem is each box has its own click handler, and how can we figure out which box was clicked on and update the parent state? We'll learn that next section!

## Section 10 - The World of React Events

### `Originally Started: 11/06/2021`

### Commonly Used React Events

Goals

- Attach event handlers to Components in React
- Use method binding to preserve the _this_ context with event handlers
- Pass event handlers down as props to child Components
- Understand the _key_ prop that React asks for when mapping over data

React Events Review

- React Events

  - You can attach event handlers to HTML elements in React via special reserved attributes. (You can do this in vanilla JS too, though the syntax is a bit different.)

- Event Attributes

  - Any event you can listen for in JS, you can listen for in React!
    - Mouse events: `onClick`, `onMouseOver`, etc
    - Form events: `onSubmit`, etc
    - Keyboard events: `onKeyDown`, `onKeyUp`, `onKeyPress`
    - Much, much more!
  - You can access the `event` object in your event callback method, like with Javascript event listeners
    - Note that this is a `Synthetic event` object that React creates -- more on this later! It is a wrapper that provides us with the standard event properties

  ```
  handleCopy() {
    alert("Stop copying me!");
  }

  // In render method
  <section onCopy={this.handleCopy}>A bunch of text here!</section>
  ```

### The Joys of Method Binding

The keyword _this_

- When your event handlers reference the keyword _this_, watch out!
- You will lose the _this_ context when you pass a funciton as a handler

Fixing Our Binding

- There are three ways to fix this:

1. Use `bind` inline
2. Use an arrow function
3. Method bind in the constructor

Inline:

```
<div onMouseEnter={this.mouseEnterHandler.bind(this)}>Stuff inside here</div>
```

- Pros:
  - Very explicit
- Cons:
  - If we need to pass `mouseEventHandler` to multiple Components, we have to bind it multiple times!
  - New function created on every render! Bind creates a new function every time we call it, and since we are calling bind in the render method...we create a new function every render! (Realistically, the performance implications are very minimal, but we should try to avoid anyways)

Arrow Function

```
<div onMouseEnter={() => this.mouseEnterHandler()}>Stuff inside here</div>
```

- Pros:
  - No mention of bind
- Coins:
  - Intention less clear
  - Again, what if you need to pass the function to multiple Components?
  - New function created on every render

Method Bind In Constructor

```
class LazyPerson extends React.Component {
  constructor(props) {
    super(props);
    <!-- Do other stuff -->
    this.sleep = this.sleep.bind(this);
  }

  sleep() {
    <!-- Sleep logic -->
  }
}
```

- Pros:
  - relatively explicit
  - Only have to bind once
  - More performant
- Cons:
  - Syntax is ugly AF
    - Like, unbelievably ugly

Alternative coming up in next section...

- Experimental
- Should you use it?

### Alternative Binding with Class Properties

If calling `bind` annoys you, you can also use the experimental _public class fields syntax_, and use class fields to correctly bind callbacks

```
class LoggingButton extends React.Component {
  <!-- This syntax ensures 'this' is bound within handleClick -->
  handleClick = () => { console.log("This is:", this); }

  render() {
    return (
      <button onClick={this.handleClick}>Click Me!</button>
    )
  }
}
```

- Basically, we are just using an arrow function when defining our class method! Nowadays, this is probably the ideal solution

_Important Note!_ This is probably not "experimental" anymore; Colt's course is a little outdated.

### Binding with Arguments

So far, we've been looking at examples where our class methods don't take any arguments.
But what if we need to pass arguments to an event handler? We can't do the following:

```
<button onClick={this.changeColor(color)}>Click Me!</button>
```

The `changeColor(color)` code would immediately call our function, which is not what we want!

We could solve this with:

```
<button onClick={this.changeColor.bind(this, color)}>Click Me!</button>
```

But it's not ideal, since we are creating a new function every re-render.
We could also use an arrow function, but it will also create a new function every re-render

```
<button onClick={() => this.changeColor(color)}>Click Me!</button>
```

Next, we'll see how to pass a function from a parent to a child, and we won't have to `bind` in render

### Passing Methods to Child Components

- Very common pattern in React
- The idea: children are often not stateful, but need to tell parents to change state
- How we send data "back up" to a parent component

How Data Flows

- A parent component defines a function
- The function is passed as a prop to a child component
- The child component invokes the prop
- The parent function is called, usually setting new state
- The parent component is re-rendered along with its children

```
// In NumberList
class NumberList extends Component {
  constructor(props) {
    super(props);
    this.state = { nums: [1, 2, 3, 4, 5] };
    this.remove = this.remove.bind(this);
  }
  remove(num) {
    console.log("Removing: ", num)
    this.setState(prevState > ({
      nums: prevState.nums.filter(n => n !== num)
    }));
  }

  render() {
    let nums = this.state.nums.map(n => (
      <NumberItem value={n} remove={this.remove} />
    ))
  }

// In NumberItem
<button onClick={this.props.remove}>Stuff</butt>
}
```

However, we need to pass the argument for which number we are removing in! Without passing in an argument to the remove function, what value for num is being printed by console? The event object! So, when we set up an event handler, the default value that is passed into the handler is the event object itself. So instead of calling `this.props.remove` directly, we need to add in an extra layer of abstraction.

```
handleRemove(event) {
  this.props.remove(this.props.value);
}

// in render()
<button onClick={this.handleRemove}>X</button>
```

Not quite there! `this` inside handleRemove is not defined. Bind it inside our constructor:

```
class NumberItem extends Component {
  constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
  }
}
```

Whew! (Arrow functions and function-based Components make this a lot simpler)

Where to Bind?

- The higher the better! Don't bind in the child component if not needed
- If you need a parameter, pass it down to the child as a prop, then bind in parent and child
- Avoid inline arrow functions / binding if possible
- No need to bind in the constructor **and** make an inline function
  - Only do one or the other!
- If you get stuck, don't worry about performance; just try to get the communication work
  - You can always refactor later!
- At the end of the day, the only bad way to Bind is the way that doesn't work at all!

### Parent-Child Method Naming

**Note** This is just Colt's personal preference

- You can call these handlers whatever you want -- React does not care
- For consistency, try to follow the action / handleAction pattern:
  - In the parent, give the function a name corresponding to the behavior (remove, add, open, toggle, etc)
  - In the child, use the name of the action along with "handle" to name the event handler (handleRemove, handleAdd, handleOpen, handleToggle, etc)

### Quick Detour - React Keys

What's with this pesky warning we keep getting? `Warning: Each child in an array or iterator should have a unique "key" prop`

In React, _keys_ help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identify

Each key must be unique! Duplicate keys can cause odd unintended behavior

Assigning a key is easy:

```
<OurComponent key={uniqueValue} />
```

Picking a Key

- Best way: use string that uniquely identifies item among siblings
- Most often you would use IDs from your data as keys:

```js
let todoItems = this.state.todos.map((todo) => {
  <li key={todo.id}>{todo.text}</li>;
});
```

- Last Resort
  - When you don't have stable IDs for rendered items, you may use the iteration index as a key as a last resort
  - **BUT** don't use indices for keys if item order may change or items can be deleted
    - This can cause performance probelms or bugs with component state

We can use third party libraries to help with IDs also

- shortid
- uuid

## Section 11 - Hangman Exercise

### Introducing the Hangman Exercise

In this section, we will build upon a Hangman game that Colt provides the starter code for. We have a few things to add to the Hangman project: 0. Install Colt's starter code

1. Add a Key prop to the buttons
2. Number of wrong guesses
3. End game on loss
4. Alt text for images, saying current state in game
5. Use a random word
6. Add "Restart" button
7. Additional Ideas - better styling, game-won message, refactor by adding an AlphaButtons component (renders a sequence of buttons corresponding to letters, Hangman component should keep track of which letters have been guessed)

### Starter Code Walkthrough

**TODO** Come back to this? It's not essential, though.

### Adding Keys

Short and sweet:

```js
<button key={letter}>..Etc</button>
```

We can just use the letter that corresponds to the button since we only use each letter once, so they'll be unique. They never change, so we could also use the index of the array.

### Tracking Incorrect Guesses

Also short and sweet:

```js
<p>Guessed Wrong: {this.state.nWrong}</p>
```

We already keep track of number of wrong guesses in state, so we simply access this information and display it in the returned JSX.

### Adding Game Over

First, we can display a loss-state message with a conditional:

```js
<p className='Hangman-btns'>
  {this.state.nWrong < this.props.maxWrong
    ? this.generateButtons()
    : `You Lose! Answer was: ${this.state.answer}`}
</p>
```

We can also hide the user's guessed word and replace it with the answer upon game over:

```js
render() {
    const isGameOver = this.state.nWrong >= this.props.maxWrong;
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img
          src={this.props.images[this.state.nWrong]}
        />
        <p>Guessed Wrong: {this.state.nWrong}</p>
        <p className='Hangman-word'>
          {!isGameOver ? this.guessedWord() : this.state.answer}
        </p>
        <p className='Hangman-btns'>
          {!isGameOver ? this.generateButtons() : 'You Lose!'}
        </p>
        <button onClick={this.handleClick}>Reset</button>
      </div>
    );
  }
```

### Adding Alt Text

Another short and sweet challenge:

```js
const altText = `Hangman with ${this.state.nWrong} wrong out of ${this.props.maxWrong}`;

// In returned JSX
<img src={this.props.images[this.state.nWrong]} alt={altText} />;
```

### Randomizing Words

Simple, since Colt provides us a file with a list of words and a method that returns a random one. We simply import this function into our Hangman file:

```js
import { randomWord } from './words';
this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
```

### Adding a Reset Button

```js
resetHangman() {
  const resetState = { nWrong: 0, guessed: new Set(), answer: randomWord() };
  this.setState(resetState);
}

handleClick() {
  this.resetHangman();
}

// JSX render
<button onClick={this.handleClick}>Reset</button>
```

### Making the Game Winnable and Styling

A bit of work, but essentially here is our final JSX:

```js
const isWinner = this.guessedWord().join('') === this.state.answer;

// JSX
return (
  <div className='Hangman'>
    <h1>Hangman</h1>
    <img src={this.props.images[this.state.nWrong]} alt={altText} />
    <p>Guessed Wrong: {this.state.nWrong}</p>
    <p className='Hangman-word'>
      {!isGameOver ? this.guessedWord() : this.state.answer}
    </p>
    <p className='Hangman-btns'>{gameState}</p>
    <button id='reset' onClick={this.handleClick}>
      {isWinner ? 'Play Again' : 'Reset'}
    </button>
  </div>
);
```

## Section 12 - Lights Out Game

### `Originally Started: 11/06/2021`

### Introducing Lights Out

Lights Out is a game in which there is a grid of lights which you must turn off. The game begins with some lights already turned on. When you click a square in the grid, all surrounding grids have the state of their light togged: If the light was on, it is now off; if it was off, it is now on. This happens in a "+" shape, with the center being the grid you click on. The goal is to turn all the lights off!

### Exploring the Starter Code

What Components might we need to do this?

- 1 App (of course!)
- 2 Board
  - The most sophisticated component. It will hold the state that represents the in-memory grid of true/false for lights-on/off. Since the state for the board lives here, this is also where the setState() calls will need to go -- and therefore all the functions that call setState()
- 3 Cell
  - A simpler component. This will simply render a <div> where the CSS classes will indicate whether this cell is lit or unlit. This is waht the user clicks on -- but it will need to call a function from the Board, since that will need to udpate the state.

### Displaying the Game Board

Added logic for displaying the game board.

### Flipping Cells

Adding logic to toggle the lights for the cell clicked and those around it.

### Winning the Game

Added logic for when the player wins.

### Styling the Game

Styled the game, thus completing the Lights Out project!

## Section 13 - Forms in React

### `Originally Started: 11/06/2021`

### Intro to React Forms

Goals

- Build forms with React
- Understand what **controlled components** are

Forms

- HTML form elements work differently than other DOM elements in React
  - Form elements naturally keep some internal state. They have data that the form knows about that the rest of the app might not know about until the form is submitted.

Thinking About State

- It's convenient to have a Javascript function that
  - Handles the submission of the form _and_
  - Has access to the data the user entered
- The technique to get this is **controlled components**

Controlled Components

- In HTML, form elements such as `<input>`, `<textarea>`, and `<select>` typically maintain their own state and update it based on user input.
- In React, mutable state is kept in the _state_ of components, and only updated with setState().
- So, how do we use React to control form input state?
  - Example, we want username in state to be 100% in sync with the form input, instead of waiting for user to click submit on the form

One Source of Truth

- We make the React state be the "single source of truth"
- React controls:
  - What is _shown_ (the value of the component)
  - What happens when the user types (_this_ gets kept in state)
- Input elements controlled in this way are **controlled components**

Example Form Component

```js
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ username: event.target.value });
  }

  render() {
    return (
      <div>
        <form>
          <input
            type='text'
            value={this.state.username}
            onChange={this.handleChange}
          />
        </form>
      </div>
    );
  }
}
```

How the Controlled Form Works

- Since _value_ attribute is set on element, displayed value will always be this.state.fullName -- making the React state _the_ source of truth!
- Since handleChagne runs on every keystroke to update the React state, the displayed value will update as the user types.
- With a controlled component, every state mutation will have an associated handler function. This makes it easy to modify or validate user input.
- The annoying part: Forms get pretty long and lots of handle change methods!

```js
class NameForm extends Component {
  // ...

  handleChange(event) {
    // Runs on every keystroke
    this.setState({
      fullName: event.target.value,
    });
  }
  // ...
}
```

If we want to do something when the form is submitted, we can do it via a button, or when the form is submitted

```js
handleSubmit(event) {
  event.preventDefault();
  console.log(`You typed: ${this.state.username}`);
  // It's typical to then reset the form state!
  this.setState({username: ""});
}

<form onSubmit={this.handleSubmit} >
  <button>Submit!</button>
</form>
```

### Writing Forms with Multiple Inputs

- If we want multiple inputs, do we have to create a new onChange handler for each one, and bind _this_? That's a lot of work! Although we could do this, we fortunately have a better solution!

ES2015 Review

- ES2015 introduced a few object enhancements...
- This includes the ability to create objects with dynamic keys based on JavaScript expressions
- The feature is called _computed property names_

ES5:

```js
var catData = {};
var microchip = 14827938;
catData[microchip] = 'Blue Steele';
```

ES2015:

```js
let microchip = 14827938;
let catData = {
  // Property computed inside the object literal
  [microchip]: 'Blue Steele',
};
```

The output in both will be:

```js
catData = { 14827938: 'Blue Steele' };
```

Application to React Form Components

- Why does the above ES2015 enhancement matter?
  - Instead of making a separate onChange handler for every single input, we can make one generic function for multiple inputs!

```js
class YourComponent extends React.Component {
  // ...

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  <input type="text" name="username" value={this.state.username} onChange={this.handleChange}>
  <input type="email" name="email" value={this.state.email} onChange={this.handleChange}>
  <input type="password" name="password" value={this.state.password} onChange={this.handleChange}>
}
```

- To handle multiple controlled inputs, add the HTML `name` attribute to each JSX input element and
- Let handler function decide the appropriate key in state to uddate based on `event.target.naem`
- So we have to have a name attribute that matches the name we used in the state!

### The htmlFor Attribute

How do we do labels in React?

- We typically use a `for` attribute on a label that matches an `id` attribute on the input
- In React, we use `htmlFor` instead, since `for` is a reserved word already

### Design Pattern Passing Data Upwards

- In React we generally have downward data flow. "Smart" parent components with simpler child components.
- For Forms, we typically need to pass data upward to the parent.

(This was a rather lengthy lecture that didn't seem to be of anything new. We are just passing data upwards in the same manner as before, except utilizing a form's onSubmit event instead, and making that form a child Component.)

### Using the UUID Library

- We've seen that using an iteration index as a key prop is a bad idea
- No natural unique key? Use a library to create a uuid
- Install it using `npm install uuid`

```js
import uuid from 'uuid/v4';

<li key={uuid()}>Item</li>;
```

This will generate a long, unique ID. It's incredibly easy!

## Section 14 - Forms Exercise - Box Maker

### `Originally Started: 11/06/2021`

This section and the next consist of two exercises

Part 1 - Color Box Maker
Create a new React app with the following Components:

- App: Should render the Boxlist Component
- BoxList: Place your state that contains all of the boxes here. This Component should render all of the Box Components along with the NewBoxForm Component
- Box: This Component should display a div with a background color, width and height based on the props passed to it
- NewBoxForm: This Comopnent should render a form that when submitted creates a new Box. You should be able to specify the Box's width, height and background color. When then form is submitted, clear the input values
- When each Box Component is displayed, add a button with the text of "X" next to each Box. When this button is clicked, remove that specific Box. This will require you to pass a function down as props - the button should not be a seperate Component, it should be included in the Box Component

**I did it!!!** My solution works -- with 0 outside help! I missed a minor quirk here and there, but nothing that wasn't solved within a few minutes.
**Update** Watch Colt's solution the next morning, and it was nearly word-for-word what I arrived at! Although I spent time styling the app a little bit.

## Section 15 - Forms Exercise - Todo List Project

### `Originally Started: 11/07/2021`

This section consist of the second form exercise.

Part 2 - Todo App - List, Add, Remove Todos

- Create a Todo App that allows users to see, add, edit, and remove todos. It should contain the following Components:
- App - This Component should render the _TodoList_ component
- TodoList - This component should render the NewTodoForm component and should render the list of Todo components. Place your state that contains all of the todos in this component.
- NewTodoForm - This component should render a form with one text input for the task to be created. When this form is submitted, a new _Todo_ component should be created.
- Todo - This component should display a div with the task of the todo
- For each Todo component, there should also be a button with the text "X" that - when clicked - removes the todo.

Part 3 - Todo App - Editing

- Each _Todo_ Component should also display a button with the text "edit" that when clicked displays a _form_ with the task of the todo as an input and a button to submit the form. When the form is submitted, the task of the text should be updated and the form should be hidden.

**I did it, again!!!** Without watching Colt's solution, I was able to finish the Todo List. After watching Colt's solution, I noticed we did it very similiar. However, when handling the ability to toggle if a Todo is "complete" or not, he does a rather tedious way by having the TodoList control almost entirely, and passing Todo a prop key of "isCompleted". However, my solution simply gives the Todo component a new state key of "isCompleted", and the logic becomes much simpler. I can't think of why Colt approaches this functionality the way he did; we already have multiple pieces of state in our Todo component, so it's not like adding another would conflict with any design philosophy, as the Todo component is already note "stateless".

## Section 16 - Building Yahtzee

### `Originally Started: 11/07/2021`

(Skipping this section for now, as it is a rather lengthy project for a game I do not know. It's also the **third** form practice project, so I'd rather revisit it in a week to see if I still remember how to do React forms)

## Section 17 - React Lifecycle Methods

### `Originally Started: 11/07/2021`

Goals

- Describe what component lifecycle is
- Contrast methods for mounting, updating and unmounting
- Overview the less commonly used lifecycle methods

React Component Lifecycle

- Every component comes with methods that allow devs to update application state and reflect the changes to the UI before/after key React "events"
- There are 3 main phases to know about:
  - Mounting
  - Updating
  - Unmounting

### Introducing ComponentDidMount

Mounting Phase of React Lifecycle

- constructor()
  - Often used for initializing state or binding event handlers to class instance
- render()
  - After the constructor, React calls render(). It tells React what should be displayed. React updates the DOM to match the output of render()
- componentDidMount()
  - This method runs after the component is mounted
  - "Mounting" is the first time the component is rendered to DOM
  - This is a good place to load any data via AJAX or set up subscriptions / timers
  - Calling `setState()` here will trigger re-render, so be cautious
  - Only runs once

componentDidMount() Example

- Let's start a timer when a Clock instance is first rendered to DOM
- componentDidMount() method runs after the component has been rendered

```js
class Timer extends Component {
  constructor(props) {
    super(props) {
      console.log("CONSTRUCTOR");
      this.state = { time: new Date() };
    }

    componentDidMount() {
      console.log("IN COMP MOUNT");
      this.timerID = setInterval(() => {
        this.setState({time: newDate() });
      }, 1000);)
    }

    render () {
      console.log("IN RENDER");
      return <h1>{this.state.time.getSeconds()}</h1>
    }
  }
}
```

Why put code like this in componentDidMount() instead of a constructor? Next lesson covers that!

### Loading Data Via AJAX

componentDidMount() AJAX Example

- componentDidMount is also quite useful for making AJAX requests when the component is mounted
- We'll use `npm install axios` to make easier AJAX requests

```js
// Note we don't need "./" in directory because it is a node module in this directory
import axios from 'axios';

class ZenQuote extends Component {
  constructor(props) {
    super(props);
    this.state = { quote: '' };
  }

  componentDidMount() {
    // Load data
    axios.get('https://api.github.com/zen').then((response) => {
      this.setState({ quote: response.data });
    });

    // Set state with that data
  }

  render() {
    return (
      <div>
        <h1>{this.state.quote}</h1>
      </div>
    );
  }
}
```

Why not just call `axios.get()` in the constructor? It seems to work...

- Convention not to set state inside of constructor
- Could be problematic in future React, so prepare for it now

### Adding Animated Loaders

- If we're making requests _after_ component renders the first time, aren't we going to have a gap where info is loading and not yet displayed?
  - Yes!
- So having some type of loading animation might be nice!

Loading Process

- Add state for when loading is occuring
- Use conditional logic based on that state to determine what is rendered
- Set loading state to represent not loading when the request / whatever has finished
- The loading animation can simply be a class that is given to a div element that is shown when is loading

### Loading Data with Async Functions

```js
constructor(props) {
  super(props);
  this.state = { imgUrl: "", name: "" };
}

async componentDidMount() {
  let response = await axios.get(`https://api.github/users/${this.props.username}`);
  // Code that occurs after response has been returned
  this.setState({ imgUrl: response.data.avatar_url, name: response.data.name });
}
render() {
  return (
    <div>
      <h1>Github User: {this.state.name} </h1>
      <img src={this.state.imgUrl} />
    </div>
  )
}
```

Not good practice to render empty HTML elements (the h1 and img above before a user is fetched), but it works.

### Introducing cmponentDidUpdate

Multiple things can cause an update / re-render

- New props (can't change them, but can pass them in from parent with new values)
- setState()
- forceUpdate()

After these re-renders / updates occur, `componentDidUpdate` gets called

- But **not** until after componentDidMount! Updates before that point aren't followed by a componentDidUpdate
  - Constructor -> Render -> componentDidMount -> Render -> componentDidUpdate

This is a suitable place to implement any side effect operations

- Syncing up with `localStorage`
- Auto-saving
- Updating DOM for uncontrolled components

### PrevProps and PrevState in ComponentDidUpdate

componentDidUpdate()

- This method is called after every render occurs.
- You can do a comparison between the previous and current props and state:

```js
componentDidUpdate(prevProps, prevState) {
  // You can call setState here as well if you need!
}
```

### Introducing componentWillUnmount

componentWillUnmount()

- Pretty straightforward: called right before a component is destroyed or unmounted (removed from page)
- Perform any necessary cleanup in this method:
  - iInvalidating timers
  - Canceling network request
  - Removing event handlers directly put on DOM
  - Cleaning up subscriptions
- Calling `setState` here is useless -- there will be no re-rendering after this!

In our previous Clock example, this is the perfect place to clear that setInterval timer!

```js
componentWillUnmount() {
  clearInterval(this.timerID);
}
```

## Section 18 - Lifecycle Methods and API Exercise

### `Originally Started: 11/07/2021`

In this section, I built a card-dealer app! It's a simple page where you can press a button to be dealt a new card from a deck. I did it mostly without consulting Colt's videos, but I did use his styling entirely. Not many lifecycle methods were used, so it was mostly just a project to work with an API (one for dealing cards).

## Section 19 - Building the Dad Jokes App

### `Originally Started: 11/07/2021`

An app that displays dad jokes! They are grabbed from an API and displayed in a list. The user can upvote / downvote jokes. A lot of nice styling going on! I will attempt the logic myself, but most likely just use the same styling Colt will show.

Random tidbits I learned while working on this project:

- `window.localStorage.clear()` will clear your local storage.

## Section 20 - React Router

### `Originally Started: 11/08/2021`

### Intro to Client-Side Routing

Goals

- Describe what client-side routing is and why it's useful
- Compare client-side routing to server-side routing
- Implement basic client-side routing with React Router

Server-Side Routing

- The term "routing" used to only refer to server-side, but now there's client-side
- Traditional routing is "Server-side routing"
- Server decides what HTML to return based on URL requested, entire page refreshes
- We basically fake that type of behavior in client-side routing, since we don't actually leave the page

Client-Side Routing

- We could fake client-side routing...just render various Components based on a current state, but that has limitations:
  - We don't get different URL as we move around "pages"
  - We can't go back and forth in our browser to follow the history of our clicks
  - A way to bookmark a "page" on the site
  - More complex route/pattern matching
  - A lot more features we don't have access to with this setup
- React Router lets us handle this more gracefully!

### Adding Our First Route

Real Client-Side Routing!

- Client-side routing handles mapping between URL bar and the content a user sees via _browser_ rather than via _server_
- Sites that exclusively use client-side routing are single-page applications
- We use JavaScript to manipulate the URL bar with a Web API called History

React Router

- Many tools we can use for client-side routing
- Not part of React; its own tool, different developers

Including the Router

- Install with `npm install react-router-dom` or `npm install --save react-router-dom`
- (There are different types of routers, but we'll be using BrowserRouter for now)

```js
// src/index.js
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  document.getElemetnById("root");
);
```

- Next we need to define routes

```js
// Dog and Cat component created and imported
// ...
import {Route} from "react-router-dom";

// Some component's render method
render() {
  return (
    <div className="App">
      <Route path="/" component={Home} />
      <Route path="/dog" component={Dog} />
      <Route path="/cat" component={Cat} />
    <div>
  )
}
```

### Using Switch and Exact

In our last example, there is one small issue

- When we are on the /dog route, the home route also displays.
- When are are on the /cat route, the home route also displays.

Why is this happening?

- React Router wants to match as many paths as possible.
- So "/dog" is matching "/" since it includes the "/" as part of it

We can fix this by importing `Switch`!
`import { Route, Switch } from "react-router-dom";`

- We wrap it around the Route tags
- It's like a Switch-statement: compare one thing to multiple conditions, and only one can be true
  - Whichever path is matched first is returned
- Still not fixed! "/dog" now just shows us the "/" route, instead of "/" and "/dog". So still have issues!
- We _could_ order the routes in an order that avoids this
  - A little tedious though
- Pass in an `exact` property to the Route tag to fix this!
  - The route has to match the entire string
    - But "/dog" and "dog/hater" would still get both be matched. The Switch ensures only the first is used

```js
<Route exact path="/dog">
```

### Intro to the Link Component

So far we can only visit our Routes by typing them directly into the URL. But this is a horrible user experience. Howe can we have links control the URL we go to?

- We do not use anchor tag. This will refresh the entire page, but it does take us to the correct URL (via a Get request)
  - But we don't want to make requsts or refresh page!
- Solution?

Link Component

- The `<Link>` component acts as a replacement for `<a>` tags
- Instead of an **href** attribute, `<Link>` uses a **to** prop
- Click on `<Link>` does _not_ issue a GET request
  - JavaScript intercepts click and does client-side routing

```js
import { Link } from "react-router-dom"

<Link to="/">Home</Link>
<Link to="/dog">Dog</Link>
<Link to="/cat">Cat</Link>
```

### Adding in NavLinks

NavLink Component

- `<NavLink> is just like `<Link>`, but with one additional feature
  - If at page that link would go to, the `<a>` gets a CSS class of _active_
  - You can style the anchor tags selectively based on which ones are active
  - This lets you stylize links to "page you are already at" using the `activeStyle` (in-line) or `activeClassName` props

```js
import { NavLik } from "react-router-dom";

<NavLink exact to="/" activeClassName="active-link">Home</NavLink>
<NavLink exact to="/dog" activeClassName="active-link">Dog</NavLink>
<NavLink exact to="/cat" activeClassName="active-link">Cat</NavLink>

// In a CSS file
.active-link { // Can be named anything
  color: pink;
  border-bottom: 1px solid white;
}
```

### Render Props vs Component Props in Routes

We don't have to just render `component` as a prop in a Route. We can specify `render` too

With our current setup, we have an issue. What if we want to pass a prop into Dog? How can we right now with:

```js
// In App.js
<Route exact path='/dog' component={Dog} />
```

There's no spot to pass a prop from App to Dog! We could do this:

```js
<Route exact path="/dog" component={() => <Dog name="Leon" />}>
```

Works, but a little clunky. But there is an even bigger issue:

- We aren't reusing an old Component, we are creating a new Dog component each time the route is visited

There is a better alternative! We use `render` instead of `component`

```js
<Route exact path="/dog" render={() => <Dog name="Leon" />}>
```

Now the Dog component won't keep getting mounted / unmounted each time you are on the Dog route and visit the Dog route from the same page. (Note the typical mount / unmount will happen if you visit, say, Cat Route and then Dog Route again.)

In the React source code, we can see what is happening:

```js
if (component) return match ? React.createElement(component, props) : null;

if (render) match ? render(props) : null;
```

You can think of `component=` as doing:

```js
<Route exact path='/dog'>
  <Dog name='Leon' />
</Route>
```

...And `render=` as doing:

```js
<Route exact path='/dog'>
  {Dog()}
</Route>
```

Colt will stick to `render` whenever passing props in, and `component` otherwise.

A StackOverflow post notes that:

> There is not a performance difference between component and render prop if you are using component={AppComponent} directly. If you want to assign some props to AppComponent, use render={() => <AppComponent { ...props } />} instead of component={() => <AppComponent { ...props }>}

### Well, Dang!!!

After staring to do the project in Section 21 without any assistance, it became very clear that the way Colt taught React Router is quite outdated! So here are some quick things I learned:

- To install it, we seem to need to do the following if project created in create-react-app: `npm add react-router-dom@6 history@5`
- We still wrap everything in a `BrowserRouter` tag
- There doesn't seem to be a `Switch` tag
- We wrap every `Route` element inside a `Routes` tag
- Instead of a `component` or `render` prop on a `Route`, we use `element`:

```js
    <Route path='/vm' element={<VendingMachine />}>
```

- In the above, note how we use the actual tags for VendingMachine. In Colt's outdated way we just passed the Component name in, making it harder to pass props in. Now we just pass it inside the tag as normal!
- Don't seem to need the `exact` attribute? Not sure though!
- We can nest routes. Doing so will automatically append the parent URL to the front of the child. Example:

```js
<Routes>
  <Route path='/vm' element={<VendingMachine />}>
    <Route exact path='chips' element={<Chips />}>
      <Route exact path=':chipsType' element={<Doritos />} />
  </Route>
  <Route path='soda' element={<Soda />} />
</Routes>
```

- In the above, the Chips component is called at the URL "/vm/chips". So notice how the parent's URL is prepended to it.
- Also in the above, Doritos is called at the URL "/vm/chips/anyInputHere"
- We can use ":<anythingHere>" as a path to specify a URL param
  - Inside the component called in that Route, we can access the param passed in like so:

```js
import { useParams } from 'react-router-dom';
function Doritos() {
  let params = useParams();

  return <div>Doritos type: {params.chipsType}</div>;
}
```

- To preserve the layout of nested Routes, we give the parent Route(s) an `<Outlet />` tag at the end of their render.
  - Still a bit confused on this!

## Section 21 - Vending Machine Exercise

This section will be a relatively quick (and pointless!) project that uses some React Router concepts. The app should consist of the following:

- A **VendingMachine** component, which shows a page with a list of snacks you can get from the machine.
- At least three different snack components, each one corresponding to a vending machine snack
- By clicking on an item in the **VendingMachine** you can view one of the things inside of it. Clicking should update the URL and show the snack that you've clicked on.
- From each snack component, you should be able to go back to the main **VendingMachine** component
- Add a second copy of the links to a site-wide navigation bar. This should show at the top of each page and should have some style to highlight the active link

## Section 22 - React Router Patterns

### `Originally Started: 11/11/2021`

### Working with URL Params

- URL parameters are done with "/:id" as a path name, with "id" being any identifier you want
- Example: `path = "/food/:name"

But how do we access what was typed into the URL, so we can use that information dynamically?

- All three render methods (render, component, and children) on a Route are passed the same three route props
  - match, location, and history

```js
<Route path="/food/:name" render={(routeProps) => <Food name="egg" stuff={routeProps}/> >}>
```

`stuff` will be an object with history, location, and match. For now, we're concerned with match -- it contains information about this path and the route that was matched. In particular, we care about the `params` property! It will contain what's in place of "/:name".

Ideally we deconstruct the route props as we pass it into our components:

```js
render={routeProps => <Food {...routeProps } />}

// In Food.js
// We have access to: history, location, match
const name = this.props.match.params.name;

render() {
  return <h1>Food is {name}</h2>
}
```

Now visiting `localhost:3000/food/beans will return an h1 with "Food is beans"

You can't use `component` type syntax if your Component has props; for that you have to use the `render` syntax. But if there are no props, you can -- and you don't need to explicitely specify the route props to have access to them!
`<Route path="/food/:name" component=({Food} />`

But also can't forget to leave out the route props if you use the `render` syntax:
`render={() => <Food />` won't work! `render={(routeProps) => <Food {...routeProps}>}`

**UPDATE**

As of the newest React update, we do not pass a routes prop object into our Route component. And inside the Component that needs access to the URL params, we simply:

```js
import { useParams } from 'react-router-dom';
const params = useParams();

// If we have a param called "name"
const name = params.name;

// Or destructure from the get-go!
const { name } = useParams();
```

### Multiple Route Params

We can use multiple Route Params: `/food/:foodName/drink/:drinkName`

Be sure to use the `exact` attribute in the Route tag, otherwise `/food/:foodName/` and `/food/:foodName/drink/:drinkName` will both match and have their content rendered.

Now in a Component we can grab both our URL Params (using updated 2021 method):

```js
const { foodName, drinkName } = useParams();
```

You can have as many route params as you'd like, but try to keep them minimal and re-think your route structure if you need more.

### Adding a 404 Not Found Route

If no valid Routes are detected, we can simply define a route without a path as the **final** route in the list:

```js
<Switch>
  <Route exact path='/about' render={() => <About />} />
  <Route exact path='/contact' render={() => <Contact />} />
  <Route render={() => <NotFound />} />
</Switch>
```

Note that it **must** be in a Switch tag, otherwise it will alwys be called, since it is always matched!

**Updated** Note we no longer need the Switch tag, and the order of Routes doesn't matter as much any more.

### Writing a Simple Search Form

```js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FoodSearch = (props) => {
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className='FoodSearch'>
      <h1>Search for a Food!</h1>
      <input
        type='text'
        placeholder='Search for a food'
        value={query}
        onChange={handleChange}
      />
      <Link to={`/food/${query}`}>Go!</Link>
    </div>
  );
};

export default FoodSearch;
```

### The Redirect Component

**NOTE** This is a lot different in newer versions of React Router

Client-Side Redirects

- With React Router we can mimic the behavior of server-side redirects
- Useful after certain actions (e.g. submitting a form)
- Can be used in lieu of having a catch-all 404 component

How to Redirect

- In React Router, there are two ways to redirect:
  - Using the `<Redirect>` component
    - Useful for "you shouldn't have gotten here, go here instead"

```js
import { Redirect } from "react-router-dom";

// Check if name contains a number, if it does redirect, if not continue normally
{/\d/.test(name) ? <Redirect to="/" /> : <h1>I love to eat {name}!</h1>
```

**UPTDATED** Here is how you do Redirects in latest React Router!

Redirect Component no longer exists. Instead, use `Navigate`:

```js
<Navigate to='/home' />
```

This just pushes a navigation to this page onto the navigation stack. If we truly want to redirect (replace current page with new page) we have to add the replace prop:

```js
<Navigate replace to='/home' />
```

### Pushing onto the History Prop

How to Redirect (continuned)

- In React Router, there are two ways to redirect:

  - Using the `<Redirect>` component
    - Useful for "you shouldn't have gotten here, go here instead"
  - Calling `.push` method in `history` route prop

- With Redirect, we are taken directly when we click
- With `this.props.history.push` we can do a bunch of actions first, and then redirect at the end

**UPDATED** What is the new React Router version of this?

### Comparing History and Redirect

Very important difference around how the Back / Forward navigation works.

- Pressing "back" on a Redirect (when used in a Component that immediately redirects due to error) will take you back from the current error page directly to the page you were at _before_ the path the Component was rendered at.
- Example: We are on home, we choose to go to "/food/7up" but our food route does not allow numbers, so in that Food component we Redirect to "/notfound". Now on "/notfound" we press Back button and immediately go back to our home page, skipping "/food/7up" entirely.
- Using history.push will have the "Back" button send us back to the 7up route.

Typically preferrable to use Redirect in "Oh shoot, you shouldn't see this" type situations, and `history.push` when you are trying to _successfully_ send someone somewhere (e.g. something happened, you saved, a user did some action)

### withRouter High Order Component

What if we have, say a Navbar Component that we always want rendered, so we don't place it inside a Route element. But in that Navbar, we want to use the `this.props.history.push` functionality. Well, we can't yet, since we do not have access to such a property without being given route props. How can we fix this? Simple!

```js
import { withRouter } from 'react-router-dom';
// Component code
export default withRouter(Navbar);
```

This connects components that know nothing about React Router to one another. We now have access to things like the history object.

**UPDATED**

- In newer React Router, this was depracated. You would have to use the hook version (and thus on a functional component):

```js
import { useHistory } from 'react-router-dom';
const Navbar = (props) => {
  const history = useHistory();
};
export default Navbar;
```

And was shortly again updated to be be:

```js
import { useNavigate } from 'react-router-dom';
const Navbar = (props) => {
  const history = useNavigate();
  navigate('/home');
};
export default Navbar;
```

### Implementing a Back Button

What if you want a button or link that takes the user back? Usually you just let the user use the browser's forward and back button, but we could also implement this ourself. The history object provides us with the ability to do so.

```js
<button onClick={this.props.history.goBack}>Go Back</button>>
<button onClick={this.props.history.goForward}>Go Forward</button>>
```

## Section 23 - Router Exercises Part 2

### `Originally Started: 11/11/2021`

This section was a hands-on exercise to practice the concepts taught on React Router.

## Section 24 - The Massive Color Project Part 1

### `Originally Started: 11/12/2021`

This section marks the start of the massive Colors project! It will be a project extremely similar to Flat UI Colors. As it is so big in scope, it may be hard to attempt a lot of it on my own without following along (as I don't want to invest so much time in an approach that 10 hours later into the project ends up conflicting with featurs Colt adds).

Although most of it is just coding and using prior knowledge, there will be some new topics. I will try my best to document these in my notes!

### Copying to Clipboard

Although adding copying / clipboard functionality from scratch isn't too difficult, we are using a package to help us: "react-copy-to-clipboard" from NPM.

Installation: `npm install --save react-copy-to-clipboard`

Usage:

```js
import { CopyToClipboard } from 'react-copy-to-clipboard';
```

And then wrap the JSX you want to receive easy clipboard functionality around a `CopyToClipboard` element:

```js
<CopyToClipboard text={background}>
  <div className='ColorBox' style={{ background }}>
    <div className='copy-container'>
      <div className='box-content'>
        <span>{name}</span>
      </div>
      <button className='copy-button'>Copy</button>
    </div>
    <span className='see-more'>More</span>
  </div>
</CopyToClipboard>
```

Now upon receiving a click, any of the divs inside `CopyToClipboard` will cause the `background` prop value to be stored in the clipboard.

### Copy Overlay Animation

In this section, we utilized the callback aspect of the `CopyToClipboard` component:

```js
<CopyToClipboard text={background} onCopy={changeCopyState}>
```

This gives us the ability to pass in a function that is triggered when the copy to the clipboard is made.

### Generating Shades of Colors

Because we need multiple "levels" for each color, and the complexity that is associated with doing so, we will be using a library to help us with our color handling! The library is **chroma.js**

chroma.js

- Can find it here: https://gka.github.io/chroma.js/
- Relatively small, zero-dependency Javascript library -- coming in at only 13.5kB!
- Used for all kinds of color conversions and color scales

Some Features

- Read colors from a wide range of formats
- Analyze and manipulate colors
- Convert colors into wide range of formats
- Linear and bezier interpolation in different color spaces
- E.g: `chroma("pink").darken().saturate(2).hex()`
- Can also generate nice colors using various methods
  - E.g. used in color palette for maps or data visualization: `chroma.scale([#fafa6e", "#2A4858"]).mode("lch").colors(6)`
- So much more!

We will make use of its `scale()` method

### Adding Color Slider

Instead of creating a slider component from scratch, we will use a library called rc-slider (React Component Slider)

We install it with: `npm install rc-slider`

It is very straightforward to use:

```js
<Slider />
```

And for our purposes, we need to add a few props:

```js
const [level, setLevel] = useState(500);

const handleSliderChange = (value) => {
  setLevel(value);
};

const colorBoxes = props.palette.colors[level].map((color) => (
  <ColorBox background={color.hex} name={color.name} />
));

<Slider
  defaultValue={500}
  min={100}
  max={900}
  ste={100}
  onChangeAfter={handleSliderChange}
/>;
```

In the above code, we declare a state to represent the "Level" of the color palette we wish to view. This level is based on the position the Slider is currently in.

## Section 25 - The Massive Color Project Part 2

## Section 26 - JSS and withStyles (Color App)

## Section 27 - The Massive Color Project Part 3

## Section 28 - The Massive Color Project Part 4

## Section 29 - The Massive Color Project Part 5

## Section 30 - The Massive Color Project Part 6

## Section 31 - The Massive Color Project Part 7

## Section 32 - Introducing React Hooks

### `Originally Started: 11/12/2021`

### Intro to Hooks & useState

What are Hooks?

- They allow you to hook into the internal workings of React
- Allow you to write functional components that have all of the features of a class component
- Can write code that is shorter and easier to understand
- Reusable!

One of the hooks we will use most often is `useState`

- Allows us to write a functional component but still have stateful logic!
- `useState()` returns two pieces of information via an array:
  - A reference to the piece of state
  - Function to update that piece of state
- So we grab the information with array destructuring: `const [count, setCount] = useState(0);`
  - Convention to name the method with a "set" prefix.
  - The argument of useState() is the initial value

```js
import { useState } from "react";

function MyComponent {
  const [count, setCount] = useState(0);

  handleClick = (event) => {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>The count is: {count}</h1>
      <button onClick={handleClick}>Increment!</button>
    </div>
  );
}
```

### Building a Custom Hook useToggleState

We will make our own toggle hook, which will store true / false and be able to flip it, and be able to share it between components!

Consider an app where we have multiple pieces in a component that have the basic behavior of receiving a click and toggling between two values as a response. Currently, we would have to declare two pieces of state, two toggle helper functions, etc:

```js
const [isHappy, setIsHappy] = useState(true);
const [isHeartbroken, setIsHeartbroken] = useState(false);

const toggleIsHappy = () => {
  setIsHappy(!isHappy);
};

const toggleIsHeartbroken = () => {
  setIsHeartroken(!isHeartbroken);
};

return (
  <div>
    <p onClick={toggleIsHappy}>{isHappy ? ':)' : ':('}</p>
    <p onClick={toggleIsHeartbroken}>{isHeartbroken ? '</3' : '<3'}</p>
  </div>
);
```

In the above, there is a lot of redundant code! We can create our own hook to simplify this.

```js
// Convention to put in a hooks folder and in its own file
// In hooks/useToggle.js
import { useState } from "react";

// Takes an init value. Good to set a default value if none provided
function useToggle(initialValue = false) {
  // Call useState, "reserve piece of state"
  const [ourState, setOurState] useState(initialValue);
  const toggle = () => {
    setState(!state);
  }

  // Return the piece of state, and our method that calls upon setSTate
  return [state, toggle];
}

export default useToggle;

// In App.js or other Component
import { useToggle } from "./hooks/useToggle";

const [isHappy, toggleIsHappy] = useToggle(true);
const [isHeartbroken, toggleIsHeartbroken] = useToggle(false);

return (
  <div>
    <p onClick={toggleIsHappy}>{isHappy ? ':)' : ':('}</p>
    <p onClick={toggleIsHeartbroken}>{isHeartbroken ? '</3' : '<3'}</p>
  </div>
)
```

Using our useToggle hook, we saved ourselves from having to create a unique onClick method for each state that toggles a value when clicked.

### Building a Custom Hook useInputState

Building forms with controlled inputs is rather tedious and complex in React. We can simplify this by creating our own custom hook! We're going to extract the common stateful logic required in forms (piece of state, onChange handler, a way to reset an input, etc) so we can quickly and succinctly create new inputs.

```js
// In hooks/useInputState.js
import { useState } from 'react';

// Exporting annoynmous function
export default (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue('');
  };

  // Can return an array OR object
  return [value, handleChange, reset];
};

// E.g usage
import useInputState from './hooks/useInputState';

const [age, updateAge, resetAge] = useInputState('');
const [email, updateEmail, resetEmail] = useInputState('');

return (
  <div>
    <h1>The value is... {email}</h1>
    <input type='text' value={email} onChange={updateEmail} />
    <input type='text' value={age} onChange={updateAge} />
    <button
      onClick={(event) => {
        resetEmail(event);
        resetAge(event);
      }}
    >
      Submit
    </button>
  </div>
);
```

Much simpler! Instantly create new inputs with one line for the state and another line for the JSX input tags.

### The useEffect Hook

Another very commonly-used built-in hook -- useEffect

- Since we do not have access to the React class lifecycle methods inside of functional components, we use useHook() instead.
- Dealing with React class lifecycle methods, useEffect() is essentially componentDidMount, componentDidUpdate, and componentWIllUnmount combined!
- By default, useEffect runs after every render.
  - Instead of thinking in terms of "mounting" and "updating", it might be easier to think that effects happen "after render"
  - React guarantees the DOM has been updated by teh time it runs the effect.

Example Usage

- Say we want to have a side effect occur after an update to a state.
- With hooks and specifically useState, we do not have the second argument as a callback to put code in that we want to happen _after_ that state change. So we _cannot_ do something like:

```js
setState({count: count+1}, () => { Do stuff after state update })
```

In fact, with functional components, React will give us a Warning message:
`State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect()`

So we make use of useEffect:

```js
import { useEffect } from 'react';

function ClickerComponent() {
  const [count, setCount] = useState(0);

  // Pass in a function
  useEffect(() => {
    alert('Something changed!');
    document.title = `You clicked ${count} times`;
  });
}
```

The above happens _every single_ time the Component renders -- even when the page first loads.

### Fetching Data with the useEffect Hook

```js
import { useState, useEffect } from 'react';
import axios from 'axios';

function StarWarsMovies() {
  const [number, setNumber] = useState(1);
  const [movie, setMovie] = useState('');

  // Not allowed! "An effect function must not return anything besides a function, which is used for clean-up
  // It looks like you wrote useEffect(async () => ...) or returned a Promise.
  // Instead, write the async function inside your effect and call it immediately:
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`https://swapi.co/api/films/${number}`);
      setMovie(response.data);
    }

    fetchData();
  }, [number]); // Important to add this second argument!

  // useEffect(async () => {
  //   const response = await axios.get(`https://swapi.co/api/films/${number}`);
  //   console.log('Alert');
  // });

  return (
    <div>
      <h1>Pick a Movie</h1>
      <h4>You chose: {movie.title}</h4>
      <select
        value={number}
        onChange={(event) => setNumber(event.target.value)}
      >
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
      </select>
    </div>
  );
}
```

In the above, we set a state (setMovie) inside our useEffect. But this is bad -- it causes a re-render each time! So we will re-render, which triggers useEffect, which calls upon setMovie, which triggers useEffect again, etc. We fix this by passing in a second argument to useEffect, which takes the form of an array. It represents which things in the state that we want to trigger useEffect when they change. If anything else changes, useEffect won't re-run.

We can also have multiple useEffects! One that runs when one state changes, and another that runs when some other state changes.

## Section 33 - React Hooks Project

### `Originally Started: 11/11/2021`

Another section where I will be creating a project! It will be another full-CRUD Todo App. This one will use Material UI and be primarily a mobile version.

(I am skipping this section for now, as going from a class-based Todo List to a functional / hook-based one is not substantial enough)

## Section 34 - Introducing the Context API

### `Originally Started: 11/11/2021`

### Where We Are Heading

This section will cover:

- Using Context without hooks (class-based component)
- Using Context with hooks (useContext)
- Using Context with hooks and reducers (Redux-like functionality)
  - How's it compare to Redux?

### What Even Is Context

What's the point?

- Solution to a common pain-point: Gets messy to share data with one component high up the tree to another many levels down

Context

- Context provides a way to pass data through the Component tree without having to pass props down manually at every level.
- Can be used with or without Hooks

When to Use Context

- Context is designed to share data that can be considered "global" for a tree of React components, such as the current authenticated user, theme, or preferred language.

Before You Use Context

- Context is primarily used when some data needs to be accessible by _many_ components at different nesting levels. Apply it sparingly because it makes component reuse more difficult.
- If you only want to avoid passing some props through many levels, component composition is often a simpler solution than context.

Even though the React documentation warns against using Context too much, you can use useContext and useReducer to replace Redux. So there is some debate whether or not to use it sparingly or not!

### Adding a Responsive Navbar to Our Context App

(As this lesson and the project it builds throughout the rest of the section rely on information taught in the Colors project, I am taking a small detour away from the Context API)

## Section 35 - Using Context with Hooks

## Section 36 - State Management with useReducer and useContext

## Section 37 - Next JS

## Section 38 - Next: Fetching and Server API

## Section 39 - Bonus: Webpack Mini Course - Your Own Simple Version of Create React App
