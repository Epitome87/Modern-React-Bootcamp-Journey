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

### State Design Example: LotoBall

### State Design Example:

## Section 09 - State Exercises

## Section 10 - The World of React Events

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
