# 4.1.2 Props

- The same component can work with **different data**
- Similar to attributes on HTML elements (consider `<img>`)

---

### Designing props

Here's part of the Spotify desktop app:

<img src='./assets/spotify-artists.png' style='max-height:100vh;max-width:100vw' />

---

Our "output" HTML might look like this:

```html
<div>
  <img src="skrillex.jpg" />
  <h3>Skrillex</h3>
  <p>9 SONGS</p>
</div>
```

What are the pieces of dynamic data?

---

Our component might look like this:

```jsx
function RecommendedArtist(props) {
  return (
    <div>
      <img src={props.imageUrl} />
      <h3>{props.artistName}</h3>
      <p>{props.numOfSongs} SONGS</p>
    </div>
  );
}
```

---

We can use it like this:

//gets packaged as object with keyvalue pairs. 

```jsx
<RecommendedArtist
  imageUrl="skrillex.jpg"
  artistName="Skrillex"
  //when passing a num, needs to be squigglies. 
  numOfSongs={9}
/>
<RecommendedArtist
  imageUrl="helmet-thing.jpg"
  artistName="Disciple Round Table"
  numOfSongs={1}
/>
<RecommendedArtist
  imageUrl="geoxor.jpg"
  artistName="Geoxor"
  numOfSongs={1}
/>

```

---

### Deconstructed props

A common paradigm:

```jsx
const UserProfile = ({ username, email, bio }) => {
  return (
    <div>
      Username: {username}
      Email: {email}
      Biography: {bio}
    </div>
  )
}
```

---

# Exercise

Make the components reusable by using props.

```jsx
function VideoPlayer({videoUrl, width, height, description}) {
  return (
    <div>
      <video
        src={videoUrl}
        width={width}
        height={height}
      />
      <p>{description}</p>
    </div>
  );
}
```

---

```jsx
//this is username:username  as object
function Tweet({src, username, handle, date, desc, Reply, Retweet, Like, Share}) {
  return (
    <div>
      <Avatar src ={src} />
      <div>
        <p>
          <span className="user-name">{username}</span>
          <span className="handle">{handle}</span>
          <span className="date">{date}</span>
        </p>
        <p>{desc}</p>
        <div>
          <button>Reply</button>
          <button>Retweet</button>
          <button>Like</button>
          <button>Share</button>
        </div>
      </div>
    </div>
  );
}
// other way
function Tweet(props) {
  return (
    <div>
      <Avatar src ={props.src} />
      <div>
        <p>
          <span className="user-name">{props.username}</span>
          <span className="handle">{props.handle}</span>
          <span className="date">{props.date}</span>
        </p>
        <p>{props.desc}</p>
        <div>
          <button>Reply</button>
          <button>Retweet</button>
          <button>Like</button>
          <button>Share</button>
        </div>
      </div>
    </div>
  );
}
```

---

```jsx
function Header(props) {
  return (
    <header>
      <h1>{props.title}</h1>

      <nav>
        <a href={props.nav.first.url}>{props.nav.first.label}>About</a>
        <a href="/contact">Contact</a>
      </nav>
    </header>
  );
}
```

---

### Mapping over items

Say we have some data:

```js
const storeItems = [
  { id: 'a', price: 19.99, name: 'Monocle' },
  { id: 'b', price: 209.99, name: 'Cane' },
  { id: 'c', price: 44.99, name: 'Top Hat' },
];
```

---

We want to turn it into this HTML:

```html
<div>
  <div class="item">
    <h3>Monocle</h3>
    <p>Price: $19.99</p>
    <button>Add to cart</button>
  </div>

  <div class="item">
    <h3>Cane</h3>
    <p>Price: $209.99</p>
    <button>Add to cart</button>
  </div>

  <div class="item">
    <h3>Top Hat</h3>
    <p>Price: $44.99</p>
    <button>Add to cart</button>
  </div>
</div>
```

---

First, create a component:

```jsx
function StoreItem(props) {
  return (
    <div className="item">
      <h3>{props.name}</h3>
      <p>Price: ${props.price}</p>
      <button>Add to cart</button>
    </div>
  );
}
```

---

Next, **map over our data**, using the component once per item:

```jsx
const storeItems = [
  { id: 'a', price: 19.99, name: 'Monocle' },
  { id: 'b', price: 209.99, name: 'Cane' },
  { id: 'c', price: 44.99, name: 'Top Hat' },
];

function App(props) {
  return (
    <div>
      {storeItems.map(item => (
        <StoreItem name={item.name} price={item.price} />
      ))}
    </div>
  );
}
```

---

# Exercises

Use `map` in the following snippets.



---

```jsx
const pets = [
  /* omitted */
];

<div>
  <h1 className="title">My pets:</h1>
  <ul>
{pets.map(pet => (

  <PetInfo
      name={pet.name}
      age={pet.age}
      species={pet.species}
      breed={pet.breed}
    />

    //could also.

    // <PetInfo pet={pet}/> and deconstruct where its called
))}

  </ul>
</div>;
```
---
```jsx
const forecasts = [4, -3, 1, 9, 4, 2, -6];

<div>
  <h1>Weather forecast for the week ahead:</h1>

  <Day>4 degrees</Day>
  <Day>-3 degrees</Day>
  <Day>1 degrees</Day>
  <Day>9 degrees</Day>
  <Day>4 degrees</Day>
  <Day>2 degrees</Day>
  <Day>-6 degrees</Day>
</div>;
```
---

```jsx
const pizzaToppings = [
  { name: 'pepperoni', isVegetarian: false },
  { name: 'green pepper', isVegetarian: true },
  { name: 'broccoli', isVegetarian: true },
  { name: 'sausage', isVegetarian: false },
]

<Pizza>
{pizzaToppings
.filter(topping => topping.isVegetarian)
.map(topping => <Topping name={topping.name} />)
}
  // <Topping name="green pepper" />
  // <Topping name="broccoli" />
</Pizza>


))}
// <Pizza>
//   <Topping name="green pepper" />
//   <Topping name="broccoli" />
// </Pizza>
```

Hint: You'll need `filter` as well as `map`

---
