import './output.css'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    <div class="flex justify-center align-center border-2">
    
    <h1>Contact Us</h1>
    
    <p>
    <label>
    Name
    <input type="text" placeholder="Enter your name">
</label>
</p>

<p>
    <label>
    Email
    <input type="text" placeholder="Enter your email">
</label>
</p>

<p>
    <label>
    Message
    <input type="text" placeholder="Enter your message">
</label>
</p>
</div>
  </div>
  
`

setupCounter(document.querySelector('#counter'))
