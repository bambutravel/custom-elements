// ─── Bali Itinerary Custom Element ───
class BaliItinerary extends HTMLElement {
    // ─── INJECT PRINT STYLES INTO THE PARENT PAGE ───
    injectPrintStyles() {
        if (document.getElementById('bali-print-styles')) return;

        const style = document.createElement('style');
        style.id = 'bali-print-styles';
        style.textContent = `
            @media print {
                /* ─── HIDE WIX FOOTER, HEADER, AND ADS ─── */
                #SITE_FOOTER,
                #SITE_HEADER,
                .wix-ads {
                    display: none !important;
                }

                /* ─── MAKE SURE THE ITINERARY WRAPPER IS VISIBLE ─── */
                .itinerary-wrapper {
                    display: block !important;
                    margin: 0 auto !important;
                    padding: 1.5rem !important;
                    box-shadow: none !important;
                    border: 1px solid #AE9A64 !important;
                    max-height: none !important;
                    overflow-y: visible !important;
                    background: #ffffff !important;
                    border-radius: 8px !important;
                    width: 100% !important;
                    max-width: 100% !important;
                }

                /* ─── HIDE THE PRINT BUTTON ─── */
                .print-btn-container {
                    display: none !important;
                }

                /* ─── FORCE ALL ACCORDION CONTENT TO BE VISIBLE ─── */
                .accordion-item .content {
                    max-height: none !important;
                    padding: 0.2rem 1.4rem 1.4rem !important;
                    overflow: visible !important;
                }

                .accordion-item input[type="radio"]:checked ~ .content {
                    max-height: none !important;
                }

                /* ─── ENSURE BODY HAS WHITE BACKGROUND ─── */
                body {
                    background: white !important;
                    margin: 0 !important;
                    padding: 0 !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    connectedCallback() {
        // Inject print styles globally
        this.injectPrintStyles();

        // ─── RENDER THE ITINERARY ───
        this.innerHTML = `
            <style>
                /* ─── RESET ─── */
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                /* ─── CONTAINER ─── */
                .itinerary-wrapper {
                    max-width: 880px;
                    width: 100%;
                    margin: 80px auto 2rem;
                    background: #ffffff;
                    border-radius: 8px;
                    border: 1px solid #AE9A64;
                    box-shadow:
                        0 20px 60px rgba(42, 90, 94, 0.15),
                        0 8px 24px rgba(0, 0, 0, 0.08);
                    padding: 2.5rem 3rem 2.8rem;
                    position: relative;
                    font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
                   
                }

                .itinerary-wrapper::-webkit-scrollbar {
                    width: 4px;
                }
                .itinerary-wrapper::-webkit-scrollbar-track {
                    background: #f5f0ea;
                    border-radius: 4px;
                }
                .itinerary-wrapper::-webkit-scrollbar-thumb {
                    background: #AE9A64;
                    border-radius: 4px;
                }
                .itinerary-wrapper::-webkit-scrollbar-thumb:hover {
                    background: #2A5A5E;
                }

                /* ─── HEADER ─── */
                .header {
                    text-align: center;
                    margin-bottom: 2rem;
                    position: relative;
                    padding-top: 0.2rem;
                }

                .header .badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.4rem;
                    background: #2A5A5E;
                    color: #F4DEC9;
                    font-size: 0.6rem;
                    font-weight: 600;
                    letter-spacing: 3px;
                    text-transform: uppercase;
                    padding: 0.35rem 1.6rem;
                    border-radius: 50px;
                    font-family: 'Inter', sans-serif;
                    margin-bottom: 0.6rem;
                }

                .header .badge .diamond {
                    color: #AE9A64;
                    font-size: 0.4rem;
                }

                .header h1 {
                    font-family: 'Playfair Display', Georgia, serif;
                    font-size: 2.6rem;
                    font-weight: 400;
                    color: #2A5A5E;
                    letter-spacing: 0.5px;
                    line-height: 1.2;
                }

                .header h1 span {
                    color: #AE9A64;
                    font-weight: 700;
                }

                .header .sub {
                    font-family: 'Inter', sans-serif;
                    color: #6f8185;
                    font-size: 1rem;
                    font-weight: 300;
                    max-width: 560px;
                    margin: 0.3rem auto 0;
                    line-height: 1.5;
                    letter-spacing: 0.2px;
                }

                .header .divider {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.8rem;
                    margin: 0.8rem auto 0;
                }

                .header .divider .line {
                    width: 40px;
                    height: 1px;
                    background: #AE9A64;
                    opacity: 0.4;
                }

                .header .divider .diamond-icon {
                    color: #AE9A64;
                    font-size: 0.5rem;
                }

                /* ─── META BAR ─── */
                .meta-bar {
                    display: flex;
                    justify-content: center;
                    gap: 2rem;
                    flex-wrap: wrap;
                    padding: 0.6rem 0 1.2rem;
                    border-bottom: 1px solid rgba(42, 90, 94, 0.06);
                    margin-bottom: 1.8rem;
                }

                .meta-bar .item {
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                    color: #5a6f73;
                    font-size: 0.75rem;
                    font-weight: 400;
                    letter-spacing: 0.3px;
                    font-family: 'Inter', sans-serif;
                }

                .meta-bar .item .icon {
                    color: #AE9A64;
                    font-size: 0.8rem;
                    font-weight: 300;
                }

                .meta-bar .item strong {
                    color: #2A5A5E;
                    font-weight: 600;
                }

                /* ─── ACCORDION ─── */
                .accordion {
                    display: flex;
                    flex-direction: column;
                    gap: 0.6rem;
                }

                .accordion-item {
                    border: 1px solid #eee8e0;
                    border-radius: 12px;
                    overflow: hidden;
                    transition: border-color 0.3s ease, box-shadow 0.3s ease;
                    background: #fdfcfa;
                }

                .accordion-item:hover {
                    border-color: #AE9A64;
                    box-shadow: 0 2px 8px rgba(174, 154, 100, 0.06);
                }

                .accordion-item input[type="radio"] {
                    display: none;
                }

                .accordion-item label {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 0.9rem 1.4rem;
                    cursor: pointer;
                    transition: background 0.25s ease;
                    font-family: 'Inter', sans-serif;
                    user-select: none;
                }

                .accordion-item label:hover {
                    background: #faf6f0;
                }

                .accordion-item label .day-num {
                    font-family: 'Playfair Display', Georgia, serif;
                    font-size: 1.4rem;
                    font-weight: 700;
                    color: #AE9A64;
                    line-height: 1;
                    min-width: 28px;
                    letter-spacing: 0.5px;
                }

                .accordion-item label .day-title {
                    flex: 1;
                    font-size: 1rem;
                    font-weight: 500;
                    color: #2A5A5E;
                    letter-spacing: 0.2px;
                }

                .accordion-item label .day-title .subtitle {
                    font-weight: 300;
                    color: #8a7a6a;
                    font-size: 0.7rem;
                    display: block;
                    margin-top: 0.05rem;
                }

                .accordion-item label .arrow {
                    color: #AE9A64;
                    font-size: 0.85rem;
                    transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
                    opacity: 0.6;
                }

                .accordion-item input[type="radio"]:checked + label .arrow {
                    transform: rotate(180deg);
                    opacity: 1;
                }

                .accordion-item .content {
                    max-height: 0;
                    overflow: hidden;
                    padding: 0 1.4rem;
                    background: #ffffff;
                    transition: max-height 0.45s ease, padding 0.4s ease;
                }

                .accordion-item input[type="radio"]:checked ~ .content {
                    max-height: 1000px;
                    padding: 0.2rem 1.4rem 1.4rem;
                }

                .accordion-item .content .location {
                    font-family: 'Inter', sans-serif;
                    font-size: 0.75rem;
                    color: #8a7a6a;
                    margin-bottom: 0.4rem;
                    letter-spacing: 0.3px;
                }

                .accordion-item .content .location .pin {
                    color: #AE9A64;
                    margin-right: 0.3rem;
                }

                .accordion-item .content p {
                    font-family: 'Inter', sans-serif;
                    color: #3d4f52;
                    font-size: 0.88rem;
                    line-height: 1.8;
                    font-weight: 300;
                    margin-bottom: 0.4rem;
                }

                .accordion-item .content p:last-of-type {
                    margin-bottom: 0;
                }

                .accordion-item .content p strong {
                    color: #2A5A5E;
                    font-weight: 500;
                }

                .accordion-item .content .highlight {
                    background: #F4DEC9;
                    padding: 0.4rem 1rem;
                    border-radius: 8px;
                    color: #2A5A5E;
                    font-size: 0.8rem;
                    font-weight: 500;
                    margin: 0.5rem 0;
                    border-left: 3px solid #AE9A64;
                }

                .accordion-item .content .tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.4rem;
                    margin-top: 0.6rem;
                }

                .accordion-item .content .tags .tag {
                    display: inline-block;
                    background: #F4DEC9;
                    color: #2A5A5E;
                    font-size: 0.5rem;
                    font-weight: 500;
                    text-transform: uppercase;
                    letter-spacing: 0.8px;
                    padding: 0.2rem 0.9rem;
                    border-radius: 50px;
                    font-family: 'Inter', sans-serif;
                }

                .accordion-item .content .tags .tag.gold {
                    background: #AE9A64;
                    color: #ffffff;
                }

                /* ─── FOOTER ─── */
                .footer {
                    margin-top: 1.8rem;
                    padding-top: 1.2rem;
                    border-top: 1px solid rgba(42, 90, 94, 0.06);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 1rem;
                }

                .footer .meta {
                    display: flex;
                    align-items: center;
                    gap: 0.6rem;
                    flex-wrap: wrap;
                    font-family: 'Inter', sans-serif;
                    font-size: 0.7rem;
                    color: #8a7a6a;
                }

                .footer .meta .pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.2rem;
                    background: #f5f0ea;
                    padding: 0.2rem 0.8rem;
                    border-radius: 50px;
                    color: #2A5A5E;
                    font-weight: 500;
                    font-size: 0.6rem;
                }

                .btn-gold {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: #AE9A64;
                    color: #ffffff;
                    padding: 0.5rem 2rem;
                    border-radius: 50px;
                    text-decoration: none;
                    font-family: 'Inter', sans-serif;
                    font-weight: 500;
                    font-size: 0.8rem;
                    letter-spacing: 0.5px;
                    transition: all 0.3s ease;
                    border: 2px solid #AE9A64;
                    box-shadow: 0 2px 12px rgba(174, 154, 100, 0.15);
                }

                .btn-gold:hover {
                    background: transparent;
                    color: #AE9A64;
                    box-shadow: 0 4px 16px rgba(174, 154, 100, 0.08);
                    transform: translateY(-1px);
                }

                .btn-gold .arrow-icon {
                    font-size: 0.7rem;
                    transition: transform 0.2s ease;
                }

                .btn-gold:hover .arrow-icon {
                    transform: translateX(4px);
                }

                /* ─── PRINT BUTTON ─── */
                .print-btn-container {
                    text-align: center;
                    margin-top: 1.5rem;
                    padding-top: 1.2rem;
                    border-top: 1px solid rgba(42, 90, 94, 0.06);
                }

                .print-btn {
                    background: #2A5A5E;
                    color: #ffffff;
                    padding: 0.6rem 2.5rem;
                    border: none;
                    border-radius: 50px;
                    font-family: 'Inter', sans-serif;
                    font-weight: 500;
                    font-size: 0.85rem;
                    letter-spacing: 0.5px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 2px 12px rgba(42, 90, 94, 0.20);
                }

                .print-btn:hover {
                    background: #AE9A64;
                    box-shadow: 0 4px 20px rgba(174, 154, 100, 0.25);
                    transform: translateY(-2px);
                }

                /* ─── RESPONSIVE ─── */
                @media (max-width: 700px) {
                    .itinerary-wrapper {
                        padding: 1.5rem 1.2rem 1.8rem;
                        margin-top: 60px;
                        max-height: 850px;
                    }
                    .header h1 { font-size: 2rem; }
                    .header .sub { font-size: 0.85rem; }
                    .meta-bar { gap: 1rem; padding: 0.3rem 0 0.8rem; }
                    .meta-bar .item { font-size: 0.65rem; }
                    .accordion-item label { padding: 0.7rem 1rem; gap: 0.6rem; }
                    .accordion-item label .day-num { font-size: 1.2rem; min-width: 22px; }
                    .accordion-item label .day-title { font-size: 0.85rem; }
                    .accordion-item label .day-title .subtitle { font-size: 0.6rem; }
                    .accordion-item .content { padding: 0 1rem; }
                    .accordion-item input[type="radio"]:checked ~ .content { padding: 0.2rem 1rem 1.2rem; }
                    .accordion-item .content p { font-size: 0.78rem; }
                    .footer { flex-direction: column; align-items: stretch; text-align: center; }
                    .footer .meta { justify-content: center; gap: 0.3rem; }
                    .btn-gold { justify-content: center; }
                }

                @media (max-width: 420px) {
                    .itinerary-wrapper { padding: 1rem 0.8rem 1.2rem; margin-top: 40px; max-height: 650px; }
                    .header h1 { font-size: 1.5rem; }
                    .meta-bar { flex-direction: column; align-items: center; gap: 0.2rem; }
                    .accordion-item label .day-title .subtitle { font-size: 0.55rem; }
                }
            </style>

            <!-- ─── ITINERARY CONTENT ─── -->
            <div class="itinerary-wrapper">

                <!-- HEADER -->
                <div class="header">
                    <div class="badge">
                        <span class="diamond">◆</span> BambuTravel <span class="diamond">◆</span>
                    </div>
                    <h1>Bali <span>Rainforest</span> Journey</h1>
                    <p class="sub">Four days of birdwatching, jungle treks, and sacred temple trails — an intimate immersion in Bali's wild heart.</p>
                    <div class="divider">
                        <span class="line"></span>
                        <span class="diamond-icon">◆</span>
                        <span class="line"></span>
                    </div>
                </div>

                <!-- META BAR -->
                <div class="meta-bar">
                    <span class="item"><span class="icon">—</span><strong>4 Days</strong></span>
                    <span class="item"><span class="icon">—</span>Nature &amp; Culture</span>
                    <span class="item"><span class="icon">—</span>Birdwatching</span>
                    <span class="item"><span class="icon">—</span>Eco Lodge Stay</span>
                </div>

                <!-- ACCORDION -->
                <div class="accordion">

                    <!-- Day 1 -->
                    <div class="accordion-item">
                        <input type="radio" name="accordion" id="day1" />
                        <label for="day1">
                            <span class="day-num">I</span>
                            <span class="day-title">
                                Arrival &amp; Transfer In
                                <span class="subtitle">Denpasar → Sarinbuana Eco Lodge</span>
                            </span>
                            <span class="arrow">▾</span>
                        </label>
                        <div class="content">
                            <div class="location"><span class="pin">—</span> Denpasar International Airport → Sarinbuana Eco Lodge</div>
                            <p>A private transfer has been arranged for your convenience upon arrival at Denpasar International Airport (DPS). You will be met at the terminal by your driver who will be waiting with a personalized sign to assist you with your luggage and ensure a smooth, comfortable journey to your destination. We wish you a pleasant arrival and a wonderful stay!</p>
                            <div class="highlight">🏨 Overnight: Sarinbuana Eco Lodge Bali</div>
                            <div class="tags">
                                <span class="tag">Private Transfer</span>
                                <span class="tag gold">Eco Lodge Stay</span>
                            </div>
                        </div>
                    </div>

                    <!-- Day 2 -->
                    <div class="accordion-item">
                        <input type="radio" name="accordion" id="day2" />
                        <label for="day2">
                            <span class="day-num">II</span>
                            <span class="day-title">
                                Rainforest Trek &amp; Night Walk
                                <span class="subtitle">Batukaru Reserve</span>
                            </span>
                            <span class="arrow">▾</span>
                        </label>
                        <div class="content">
                            <div class="location"><span class="pin">—</span> Batukaru Reserve</div>
                            <p><strong>5:45am</strong> — Sunrise birdwatching around the lodge grounds and Sanctuary. The lodge has become a recognized hotspot on eBird, with <strong>131 species</strong> recorded by the end of 2025, making it a paradise for bird enthusiasts. From colorful kingfishers to rare forest dwellers, each sighting adds to the magic of the morning. Guests are encouraged to log their discoveries on eBird, contributing to the growing record of this remarkable sanctuary. It's a tranquil and inspiring way to start the day, immersed in nature's rhythm.</p>
                            <p><strong>9am – 2pm</strong> — Rainforest trek through Batukaru Reserve, one of the island's most biodiverse ecosystems. Covered by the towering tree canopy, you'll journey for 3–5 hours through lush wetlands alive with rare and endangered species. Keep an eye out for the elusive leopard cat, the tiny kijang deer, and the critically endangered mountain chorus frog. Marvel at the giant kupu kupu barong moth, pangolins, porcupines, and even the reticulated python — all part of this thriving ecosystem. Along the way, you'll witness the harmony of flora and fauna while immersing yourself in the healing tranquility of the rainforest. Guided and supported with drinking water, this trek offers a rare chance to connect deeply with Bali's natural heritage and discover its hidden wonders.</p>
                            <p><strong>8pm</strong> — Nocturnal Spotlight Walk. Join the guided torchlight walk and discover the lodge's nocturnal world as the forest comes alive after dusk. This 1–1.5 hour walk reveals the hidden magic of Bali's rainforest. As darkness settles, you may encounter fireflies twinkling in the canopy, owls calling in the night, and rare creatures such as the keeled slug-eating snake, civet cat, and the elusive lubak along the trails. It's a quiet, enchanting experience that connects you with nature's rhythms and offers a rare glimpse into the secret lives of the forest's nocturnal inhabitants.</p>
                            <div class="highlight">🏨 Overnight: Sarinbuana Eco Lodge Bali</div>
                            <div class="tags">
                                <span class="tag">131 Bird Species</span>
                                <span class="tag">Night Safari</span>
                                <span class="tag gold">Guided Trek</span>
                            </div>
                        </div>
                    </div>

                    <!-- Day 3 -->
                    <div class="accordion-item">
                        <input type="radio" name="accordion" id="day3" />
                        <label for="day3">
                            <span class="day-num">III</span>
                            <span class="day-title">
                                Batukaru Temple Trek
                                <span class="subtitle">Mount Batukaru · Pura Luhur Batukaru</span>
                            </span>
                            <span class="arrow">▾</span>
                        </label>
                        <div class="content">
                            <div class="location"><span class="pin">—</span> Mount Batukaru · Pura Luhur Batukaru</div>
                            <p>Wake up early this morning for another birdwatching walk around the lodge grounds, where the rainforest awakens in a chorus of calls.</p>
                            <p>After breakfast at the lodge, embark on a scenic overland trek to Batukaru Temple (Pura Luhur Batukaru), one of Bali's most sacred sanctuaries dating back to the 11th century. Nestled on the slopes of Mount Batukaru, this temple is part of the island's revered Sad Kahyangan (six holiest temples) and is dedicated to Lord Mahadewa, the guardian of the mountain. The <strong>4–5 hour trek</strong> takes you through rice paddies, farmlands, and towering bamboo groves, offering glimpses of local village life and Bali's rich flora and fauna. As you approach the temple, breathtaking mountain views unfold, leading to tranquil courtyards, multi-tiered shrines, and lush gardens that embody traditional Balinese architecture.</p>
                            <p>This journey blends cultural discovery, natural beauty, and spiritual serenity — an unforgettable way to connect with Bali's soul.</p>
                            <p>This afternoon, after coming back to the lodge, you will be joined by your guide who will take you for another birdwatching walk.</p>
                            <div class="highlight">🏨 Overnight: Sarinbuana Eco Lodge Bali</div>
                            <div class="tags">
                                <span class="tag">Sacred Temple</span>
                                <span class="tag">Rice Paddies</span>
                                <span class="tag gold">Cultural Immersion</span>
                            </div>
                        </div>
                    </div>

                    <!-- Day 4 -->
                    <div class="accordion-item">
                        <input type="radio" name="accordion" id="day4" />
                        <label for="day4">
                            <span class="day-num">IV</span>
                            <span class="day-title">
                                Departure
                                <span class="subtitle">Sarinbuana Eco Lodge → Denpasar Airport</span>
                            </span>
                            <span class="arrow">▾</span>
                        </label>
                        <div class="content">
                            <div class="location"><span class="pin">—</span> Sarinbuana Eco Lodge → Denpasar International Airport</div>
                            <p>A transfer to the airport will be arranged for you at the appropriate time.</p>
                            <p><em style="color: #5a6f73; font-weight: 300;">We hope you enjoyed your travels and wish you many more adventures ahead!</em></p>
                            <div class="tags">
                                <span class="tag">Private Transfer</span>
                                <span class="tag gold">Safe Travels</span>
                            </div>
                        </div>
                    </div>

                </div>

                <!-- FOOTER -->
                <div class="footer">
                    <div class="meta">
                        <span class="pill">◆ 4 Days / 3 Nights</span>
                        <span class="pill">◆ Nature &amp; Culture</span>
                        <span class="pill">◆ Birdwatching</span>
                    </div>
                    <a href="#" class="btn-gold">
                        Download Full Itinerary
                        <span class="arrow-icon">→</span>
                    </a>
                </div>

                <!-- ─── PRINT BUTTON ─── -->
                <div class="print-btn-container">
                    <button class="print-btn" id="printBtn">
                        📄 Expand All & Print PDF
                    </button>
                </div>

            </div> <!-- end itinerary-wrapper -->
        `;

        // ─── ATTACH EVENT LISTENERS ───
        const printBtn = this.querySelector('#printBtn');
        if (printBtn) {
            printBtn.addEventListener('click', () => {
                // Expand all accordion items
                const items = this.querySelectorAll('.accordion-item input[type="radio"]');
                items.forEach(input => {
                    input.checked = true;
                });

                // Wait for DOM update, then print
                setTimeout(() => {
                    window.print();
                }, 400);
            });
        }
    }
}
// ─── REGISTER THE CUSTOM ELEMENT ───
customElements.define('bali-itinerary', BaliItinerary);

