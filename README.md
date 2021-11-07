# The Modern React Bootcamp (Hooks, Context, NextJS, Router) - by Colt Steele

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

- In HTML, form elements such as <input>, <textarea>, and <select> typically maintain their own state and update it based on user input.
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

This section and the next consist of two exercises

Part 1 - Color Box Maker
Create a new React app with the following Components:

- App: Should render the Boxlist Component
- BoxList: Place your state that contains all of the boxes here. This Component should render all of the Box Components along with the NewBoxForm Component
- Box: This Component should display a div with a background color, width and height based on the props passed to it
- NewBoxForm: This Comopnent should render a form that when submitted creates a new Box. You should be able to specify the Box's width, height and background color. When then form is submitted, clear the input values
- When each Box Component is displayed, add a button with the text of "X" next to each Box. When this button is clicked, remove that specific Box. This will require you to pass a function down as props - the button should not be a seperate Component, it should be included in the Box Component

**I did it!!!** My solution works -- with 0 outside help! I missed a minor quirk here and there, but nothing that wasn't solved within a few minutes.

## Section 15 - Forms Exercise - Todo List Project

This section consist of the second form exercise.

Part 2 - Todo App - List, Add, Remove Todos

## Section 16 - Building Yahtzee

## Section 17 - React Lifecycle Methods

## Section 18 - Lifecycle Methods and API Exercise

## Section 19 - Building the Dad Jokes App

## Section 20 - React Router

## Section 21 - Vending Machien Exercise

## Section 22 - React Router Patterns

## Section 23 - Router Exercises Part 2

## Section 24 - The Massive Color Project Part 1

## Section 25 - The Massive Color Project Part 2

## Section 26 - JSS and withStyles (Color App)

## Section 27 - The Massive Color Project Part 3

## Section 28 - The Massive Color Project Part 4

## Section 29 - The Massive Color Project Part 5

## Section 30 - The Massive Color Project Part 6

## Section 31 - The Massive Color Project Part 7

## Section 32 - React Hooks Project

## Section 33 - Introducing the Context API

## Section 34 - Using Context with Hooks

## Section 35 - State Management with useReducer and useContext

## Section 36 - Next JS

## Section 37 - Next: Fetching and Server API

## Section 38 - Bonus: Webpack Mini Course - Your Own Simple Version of Create React App
