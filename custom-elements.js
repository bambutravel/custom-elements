// Register Bali Itinerary Custom Element
import BaliItinerary from './BaliItinerary.js';

// Register China Highlights Itinerary Custom Element
import ChinaItinerary from './chinahighlightsitinerary.js';

// Define custom elements so Wix can use them
customElements.define('bali-itinerary', BaliItinerary);
customElements.define('chinahighlights-itinerary', ChinaItinerary);

// Optional: Log to confirm loading
console.log("✅ Custom elements loaded from external Server URL");
