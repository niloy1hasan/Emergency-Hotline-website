### Answer the following questions:

1. What is the difference between **getElementById, getElementsByClassName, and querySelector / querySelectorAll**?

#### Answer:

**getElementById:** 

It selects only a single and unique element from html by its id.

**getElementsByClassName:**

It selects multiple elements with a specific class name and returns an array like object.

**querySelector:**

It selects only the first element that matches a css selector from html.

**example:** document.querySelector('.first .second');

**querySelectorAll:**

It selects all elements that match a css selector from html and returns an array like object.

**example:** document.querySelectorAll('.first .second');



2. How do you **create and insert a new element into the DOM**?

**Answer:**

**Create:**

The createElement() function is used to create an html element and pass the element's tag name as a string.
const element = document.createElement('div');

**Insert:**

The appendChild() function is used to insert the created element into the DOM and pass the created element as a parameter.
first.appendChild(element);


3. What is **Event Bubbling** and how does it work?

**Answer:**

Event Bubbling is when an event (click, mouseover, keydown) happens on a child element, the event is first handled by the child element, then it passes to its parent, and this continues until it reaches the root element.

**example:**  If a button is inside a div, and the div is inside the body. When the button is clicked, the event is handled by the button first, then it bubbles up to the div, and finally to the body.



4. What is **Event Delegation** in JavaScript? Why is it useful?

**Answer:**

Event Delegation is used when need to handle events for a large number of similar elements, instead of adding event listener to each element separately, add the event listener to their parent and use event bubbling to handle the event from desired element.

Event Delegation makes the code smaller, cleaner, and easier to debug.


5. What is the difference between **preventDefault() and stopPropagation()** methods?


**Answer:**

**preventDefault():**
it stops the default action. For example, after submitting a form, it prevents the page from refreshing or going to a different page.

**stopPropagation():**
it stops the event from bubbling up to parent elements. The event is handled only by the child element where it occurred.