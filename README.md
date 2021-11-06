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

## Section 12 - Lights Out Game

## Section 13 - Forms in React

## Section 14 - Forms Exercise

## Section 15 - Todo List Project

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
