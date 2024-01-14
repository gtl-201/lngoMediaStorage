import { render } from 'react-dom'
import React, { useState } from 'react'
import { useSprings, animated, interpolate } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import './cardAnimation.css'
import BG1 from '../Image/1.jpg'
// import BG2 from '../Image/2.JPG'
import BG3 from '../Image/3.png'
import BG4 from '../Image/5.jpg'
// import BG5 from '../Image/6.jpg'
import BG6 from '../Image/7.jpg'
import BG7 from '../Image/8.jpg'
// import BG8 from '../Image/9.JPG'
import BG9 from '../Image/10.jpg'
import BG10 from '../Image/11.jpg'
import BG11 from '../Image/12.jpg'
// import BG14 from '../Image/13.jpg'
// import BG15 from '../Image/14.jpg'
import BG16 from '../Image/15.jpg'
import BG17 from '../Image/16.jpg'
import BG18 from '../Image/17.jpg'
import BG19 from '../Image/18.jpg'
// import BG20 from '../Image/19.jpg'
// import BG21 from '../Image/20.jpg'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
// import GridGallery from './Component/GridGallery/index'

const unsortedCards = [
  BG1,
  // BG2, 
  BG3,
  BG4,
  // BG5, 
  BG6,
  BG7,
  // BG8,
  BG9,
  BG10,
  BG11,
  // BG14,
  // BG15,
  BG16,
  BG17,
  BG18,
  BG19,
  // BG20,
  // BG21,
];

const cards = unsortedCards
  .map((a) => ({ sort: Math.random(), value: a }))
  .sort((a, b) => a.sort - b.sort)
  .map((a) => a.value)

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = i => ({ x: 0, y: i * -4, scale: 1, rot: -10 + Math.random() * 20, delay: i * 100 })
const from = i => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r, s) => `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`

export default function Deck() {
  const [gone] = useState(() => new Set()) // The set flags all the cards that are flicked out
  const [props, set] = useSprings(cards.length, i => ({ ...to(i), from: from(i) })) // Create a bunch of springs using the helpers above
  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useGesture(({ args: [index], down, delta: [xDelta], distance, direction: [xDir], velocity }) => {
    const trigger = velocity > 0.2 // If you flick hard enough it should trigger the card to fly out
    const dir = xDir < 0 ? -1 : 1 // Direction should either point left or right
    if (!down && trigger) gone.add(index) // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
    set(i => {
      if (index !== i) return // We're only interested in changing spring-data for the current spring
      const isGone = gone.has(index)
      const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
      const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0) // How much the card tilts, flicking it harder makes it rotate faster
      const scale = down ? 1.1 : 1 // Active cards lift up a bit
      return { x, rot, scale, delay: undefined, config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 } }
    })
    // if (!down && gone.size === cards.length) setTimeout(() => gone.clear() || set(i => to(i)), 600)
  })
  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  const cardClick = (cardURL) => {
    console.log(cardURL);
  }

  console.log(props);

  return (
    <div class='rootis'>
      <div class='container' style={{ height: '20vh', fontSize: '20px' }}>
        <div class="Title">CHÚNG MÌNH BÊN NHAU HƠN I NĂM RỒI ĐÓ</div>
        <div class="loveThuy">ᰔᩚ 🐉 LONG 💖 THỦY 🌊 ᰔᩚ</div>
      </div>
      <div>
        <div class='Subtitle' onClick={() => gone.clear() || set(i => to(i))}>Đi Cùng Nhau Qua Thật Nhiều Kỷ Niệm Nữa Nhé</div>
      </div>
      {
        props.map(({ x, y, rot, scale }, i) => (
          <animated.div onClick={() => cardClick(cards[i])} class='out1' key={i} style={{ transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`) }}>
            {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
            <animated.div class='out2' {...bind(i)} style={{ transform: interpolate([rot, scale], trans), borderWidth: '5px', backgroundImage: `url(${cards[i]})` }} />
          </animated.div>
        ))
      }
    </div>
  )

}
