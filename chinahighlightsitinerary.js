class ChinaItinerary extends HTMLElement {

    injectPrintStyles() {
        if (document.getElementById('china-print-styles')) return;

        const style = document.createElement('style');
        style.id = 'china-print-styles';
        style.textContent = `
            @media print {
                #SITE_FOOTER,
                #SITE_HEADER,
                .wix-ads {
                    display: none !important;
                }

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

                .print-btn-container {
                    display: none !important;
                }

                .accordion-item .content {
                    max-height: none !important;
                    padding: 0.2rem 1.4rem 1.4rem !important;
                    overflow: visible !important;
                }

                .accordion-item input[type="radio"]:checked ~ .content {
                    max-height: none !important;
                }

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
        this.injectPrintStyles();

        this.innerHTML = `
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }

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
                
                    -webkit-overflow-scrolling: touch;
                    overscroll-behavior: contain;
                }

                .itinerary-wrapper::-webkit-scrollbar { width: 4px; }
                .itinerary-wrapper::-webkit-scrollbar-track { background: #f5f0ea; border-radius: 4px; }
                .itinerary-wrapper::-webkit-scrollbar-thumb { background: #AE9A64; border-radius: 4px; }
                .itinerary-wrapper::-webkit-scrollbar-thumb:hover { background: #2A5A5E; }

                .header { text-align: center; margin-bottom: 2rem; padding-top: 0.2rem; }
                .header .badge {
                    display: inline-flex; align-items: center; gap: 0.4rem;
                    background: #2A5A5E; color: #F4DEC9;
                    font-size: 0.6rem; font-weight: 600; letter-spacing: 3px;
                    padding: 0.35rem 1.6rem; border-radius: 50px;
                    margin-bottom: 0.6rem;
                }
                .header .badge .diamond { color: #AE9A64; font-size: 0.4rem; }

                .header h1 {
                    font-family: 'Playfair Display', Georgia, serif;
                    font-size: 2.6rem; font-weight: 400;
                    color: #2A5A5E; letter-spacing: 0.5px;
                }
                .header h1 span { color: #AE9A64; font-weight: 700; }

                .header .sub {
                    font-family: 'Inter', sans-serif;
                    color: #6f8185; font-size: 1rem; font-weight: 300;
                    max-width: 560px; margin: 0.3rem auto 0;
                    line-height: 1.5;
                }

                .header .divider {
                    display: flex; justify-content: center; align-items: center;
                    gap: 0.8rem; margin-top: 0.8rem;
                }
                .header .divider .line {
                    width: 40px; height: 1px; background: #AE9A64; opacity: 0.4;
                }
                .header .divider .diamond-icon { color: #AE9A64; font-size: 0.5rem; }

                .meta-bar {
                    display: flex; justify-content: center; gap: 2rem;
                    flex-wrap: wrap; padding: 0.6rem 0 1.2rem;
                    border-bottom: 1px solid rgba(42, 90, 94, 0.06);
                    margin-bottom: 1.8rem;
                }
                .meta-bar .item {
                    display: flex; align-items: center; gap: 0.4rem;
                    color: #5a6f73; font-size: 0.75rem;
                }
                .meta-bar .item .icon { color: #AE9A64; font-size: 0.8rem; }

                .accordion { display: flex; flex-direction: column; gap: 0.6rem; }

                .accordion-item {
                    border: 1px solid #eee8e0; border-radius: 12px;
                    background: #fdfcfa; overflow: hidden;
                    transition: border-color 0.3s ease, box-shadow 0.3s ease;
                }
                .accordion-item:hover {
                    border-color: #AE9A64;
                    box-shadow: 0 2px 8px rgba(174, 154, 100, 0.06);
                }

                .accordion-item input[type="radio"] { display: none; }

                .accordion-item label {
                    display: flex; align-items: center; gap: 1rem;
                    padding: 0.9rem 1.4rem; cursor: pointer;
                    transition: background 0.25s ease;
                }
                .accordion-item label:hover { background: #faf6f0; }

                .day-num {
                    font-family: 'Playfair Display', serif;
                    font-size: 1.4rem; font-weight: 700;
                    color: #AE9A64; min-width: 28px;
                }

                .day-title { flex: 1; font-size: 1rem; color: #2A5A5E; }
                .day-title .subtitle { font-size: 0.7rem; color: #8a7a6a; display: block; }

                .arrow {
                    color: #AE9A64; font-size: 0.85rem;
                    transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
                    opacity: 0.6;
                }
                input[type="radio"]:checked + label .arrow {
                    transform: rotate(180deg); opacity: 1;
                }

                .content {
                    max-height: 0; overflow: hidden;
                    padding: 0 1.4rem; background: #ffffff;
                    transition: max-height 0.45s ease, padding 0.4s ease;
                }
                input[type="radio"]:checked ~ .content {
                    max-height: 1000px; padding: 0.2rem 1.4rem 1.4rem;
                }

                .location { font-size: 0.75rem; color: #8a7a6a; margin-bottom: 0.4rem; }
                .location .pin { color: #AE9A64; margin-right: 0.3rem; }

                .content p {
                    color: #3d4f52; font-size: 0.88rem;
                    line-height: 1.8; margin-bottom: 0.4rem;
                }

                .highlight {
                    background: #F4DEC9; padding: 0.4rem 1rem;
                    border-radius: 8px; color: #2A5A5E;
                    font-size: 0.8rem; font-weight: 500;
                    border-left: 3px solid #AE9A64;
                    margin: 0.5rem 0;
                }

                .tags { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.6rem; }
                .tag {
                    background: #F4DEC9; color: #2A5A5E;
                    font-size: 0.5rem; padding: 0.2rem 0.9rem;
                    border-radius: 50px; text-transform: uppercase;
                }
                .tag.gold { background: #AE9A64; color: #fff; }

                .footer {
                    margin-top: 1.8rem; padding-top: 1.2rem;
                    border-top: 1px solid rgba(42, 90, 94, 0.06);
                    display: flex; justify-content: space-between;
                    align-items: center; flex-wrap: wrap; gap: 1rem;
                }

                .footer .meta {
                    display: flex; gap: 0.6rem; flex-wrap: wrap;
                    font-size: 0.7rem; color: #8a7a6a;
                }
                .pill {
                    background: #f5f0ea; padding: 0.2rem 0.8rem;
                    border-radius: 50px; font-size: 0.6rem;
                    color: #2A5A5E; font-weight: 500;
                }

                .btn-gold {
                    display: inline-flex; align-items: center; gap: 0.5rem;
                    background: #AE9A64; color: #fff;
                    padding: 0.5rem 2rem; border-radius: 50px;
                    text-decoration: none; font-weight: 500;
                    border: 2px solid #AE9A64;
                    transition: all 0.3s ease;
                }
                .btn-gold:hover {
                    background: transparent; color: #AE9A64;
                }

                .print-btn-container {
                    text-align: center; margin-top: 1.5rem;
                    padding-top: 1.2rem; border-top: 1px solid rgba(42, 90, 94, 0.06);
                }
                .print-btn {
                    background: #2A5A5E; color: #fff;
                    padding: 0.6rem 2.5rem; border-radius: 50px;
                    cursor: pointer; font-weight: 500;
                    transition: all 0.3s ease;
                }
                .print-btn:hover {
                    background: #AE9A64;
                }
            </style>

            <div class="itinerary-wrapper">

                <div class="header">
                    <div class="badge">
                        <span class="diamond">◆</span> BambuTravel <span class="diamond">◆</span>
                    </div>
                    <h1>China <span>Highlights</span></h1>
                    <p class="sub">Eight days exploring imperial capitals, ancient wonders, and Chengdu’s iconic pandas.</p>
                    <div class="divider">
                        <span class="line"></span>
                        <span class="diamond-icon">◆</span>
                        <span class="line"></span>
                    </div>
                </div>

                <div class="meta-bar">
                    <span class="item"><span class="icon">—</span><strong>8 Days</strong></span>
                    <span class="item"><span class="icon">—</span>Culture & Heritage</span>
                    <span class="item"><span class="icon">—</span>Ancient Wonders</span>
                    <span class="item"><span class="icon">—</span>Giant Pandas</span>
                </div>

                <div class="accordion">

                    <!-- DAY I -->
                    <div class="accordion-item">
                        <input type="radio" name="accordion" id="day1" />
                        <label for="day1">
                            <span class="day-num">I</span>
                            <span class="day-title">
                                Arrival in Beijing
                                <span class="subtitle">6 Oct 2027</span>
                            </span>
                            <span class="arrow">▾</span>
                        </label>
                        <div class="content">
                            <div class="location"><span class="pin">—</span> Beijing</div>
                            <p>Your guide meets you at the airport and escorts you to your hotel. The rest of the day is free to relax and settle in.</p>
                            <div class="highlight">🏨 Overnight: Beijing</div>
                            <div class="tags">
                                <span class="tag">Private Transfer</span>
                                <span class="tag gold">Arrival Day</span>
                            </div>
                        </div>
                    </div>

                    <!-- DAY II -->
                    <div class="accordion-item">
                        <input type="radio" name="accordion" id="day2" />
                        <label for="day2">
                            <span class="day-num">II</span>
                            <span class="day-title">
                                Imperial Beijing
                                <span class="subtitle">7 Oct 2027</span>
                            </span>
                            <span class="arrow">▾</span>
                        </label>
                        <div class="content">
                            <div class="location"><span class="pin">—</span> Beijing</div>
                            <p>Begin your exploration at Tiananmen Square, the symbolic heart of modern China and one of the largest public squares in the world. From here, pass through the iconic Tiananmen Gate into the Forbidden City, the vast palace complex that housed 24 emperors. Wander through its grand halls, quiet courtyards, and intricate chambers as your guide reveals stories of imperial life and power.

Continue to the Beijing Olympic Park for an exterior view of two architectural icons: the Bird’s Nest Stadium and the shimmering Water Cube, both legacies of the 2008 Olympics.

In the afternoon, step into the city’s traditional soul with a Hutong walking tour in the Dongcheng District. Navigate narrow alleys lined with courtyard homes, visit a local family, and—if you wish—ascend the Bell Tower for a panoramic view of the old neighbourhood.

End the day at the Lama Temple, Beijing’s most important Tibetan Buddhist sanctuary, filled with incense, vibrant halls, and the towering statue of the Maitreya Buddha.
</p>
                            <div class="highlight">🏨 Overnight: Beijing</div>
                            <div class="tags">
                                <span class="tag">Forbidden City</span>
                                <span class="tag">Hutong Tour</span>
                                <span class="tag gold">Lama Temple</span>
                            </div>
                        </div>
                    </div>

                    <!-- DAY III -->
                    <div class="accordion-item">
                        <input type="radio" name="accordion" id="day3" />
                        <label for="day3">
                            <span class="day-num">III</span>
                            <span class="day-title">
                                Great Wall & Temple of Heaven
                                <span class="subtitle">8 Oct 2027</span>
                            </span>
                            <span class="arrow">▾</span>
                        </label>
                        <div class="content">
                            <div class="location"><span class="pin">—</span> Beijing</div>
                            <p>Travel to the Mutianyu Great Wall, one of the most scenic and best preserved sections of this ancient defence system. Ascend by cable car to the ramparts and enjoy time to walk along the “golden route” between the watchtowers, surrounded by sweeping mountain landscapes.

Return to the city to visit the Temple of Heaven, a masterpiece of Ming era architecture where emperors once prayed for good harvests. The surrounding park is alive with local residents practicing tai chi, singing, and playing traditional games—a lively window into daily Beijing life.
</p>
                            <div class="highlight">🏨 Overnight: Beijing</div>
                            <div class="tags">
                                <span class="tag">Great Wall</span>
                                <span class="tag">Temple of Heaven</span>
                                <span class="tag gold">Scenic Views</span>
                            </div>
                        </div>
                    </div>

                    <!-- DAY IV -->
                    <div class="accordion-item">
                        <input type="radio" name="accordion" id="day4" />
                        <label for="day4">
                            <span class="day-num">IV</span>
                            <span class="day-title">
                                Summer Palace & Train to Xi’an
                                <span class="subtitle">9 Oct 2027</span>
                            </span>
                            <span class="arrow">▾</span>
                        </label>
                        <div class="content">
                            <div class="location"><span class="pin">—</span> Beijing → Xi’an</div>
                            <p>Stroll through the Summer Palace, China’s largest imperial garden, with shimmering Kunming Lake and Longevity Hill. Admire its pavilions, bridges, and corridors, designed as a retreat for emperors. In the afternoon, board a high-speed train to Xi’an, experiencing China’s cutting-edge rail system. Upon arrival, transfer to your hotel. </p>
                            <div class="highlight">🏨 Overnight: Xi’an</div>
                            <div class="tags">
                                <span class="tag">Summer Palace</span>
                                <span class="tag">High-Speed Train</span>
                                <span class="tag gold">Imperial Garden</span>
                            </div>
                        </div>
                    </div>

                    <!-- DAY V -->
                    <div class="accordion-item">
                        <input type="radio" name="accordion" id="day5" />
                        <label for="day5">
                            <span class="day-num">V</span>
                            <span class="day-title">
                                Terracotta Army & Xi’an Culture
                                <span class="subtitle">10 Oct 2027</span>
                            </span>
                            <span class="arrow">▾</span>
                        </label>
                        <div class="content">
                            <div class="location"><span class="pin">—</span> Xi’an</div>
                            <p>Begin your day at the awe inspiring Terracotta Warriors and Horses Museum, where thousands of life sized soldiers, horses, and chariots stand guard over the tomb of China’s first emperor. Explore the vast excavation pits and learn about the extraordinary craftsmanship behind this archaeological wonder.

Continue to a countryside workshop to learn how terracotta warriors were traditionally made, guided by local artisans who preserve these ancient techniques.
In the afternoon, visit the Big Wild Goose Pagoda, an elegant Buddhist landmark built to house scriptures brought from India by the monk Xuanzang.

As evening falls, immerse yourself in the illuminated splendour of the Great Tang All Day Mall, a lively pedestrian avenue celebrating the grandeur of the Tang Dynasty with sculptures, performances, and vibrant night lights.
</p>
                            <div class="highlight">🏨 Overnight: Xi’an</div>
                            <div class="tags">
                                <span class="tag">Terracotta Army</span>
                                <span class="tag">Pagoda</span>
                                <span class="tag gold">Tang Dynasty</span>
                            </div>
                        </div>
                    </div>
<!-- DAY VI -->
                    <div class="accordion-item">
                        <input type="radio" name="accordion" id="day6" />
                        <label for="day6">
                            <span class="day-num">VI</span>
                            <span class="day-title">
                                Xi’an City Wall & Train to Chengdu
                                <span class="subtitle">11 Oct 2027</span>
                            </span>
                            <span class="arrow">▾</span>
                        </label>
                        <div class="content">
                            <div class="location"><span class="pin">—</span> Xi’an → Chengdu</div>
                            <p>Start your morning atop the Xi’an City Wall, one of the oldest and best preserved fortifications in China. Cycle along its broad ramparts for panoramic views of the city, or enjoy a leisurely walk if you prefer.

Continue to the Great Mosque, a unique blend of Islamic and Chinese architectural styles, before wandering through the bustling Muslim Quarter, famous for its lively food stalls, traditional snacks, and colourful shops.

Later, take a fast speed train to Chengdu, last stop of your adventure.
</p>
                            <div class="highlight">🏨 Overnight: Chengdu</div>
                            <div class="tags">
                                <span class="tag">City Wall</span>
                                <span class="tag">Muslim Quarter</span>
                                <span class="tag gold">High-Speed Train</span>
                            </div>
                        </div>
                    </div>

                    <!-- DAY VII -->
                    <div class="accordion-item">
                        <input type="radio" name="accordion" id="day7" />
                        <label for="day7">
                            <span class="day-num">VII</span>
                            <span class="day-title">
                                Giant Pandas & Chengdu Life
                                <span class="subtitle">12 Oct 2027</span>
                            </span>
                            <span class="arrow">▾</span>
                        </label>
                        <div class="content">
                            <div class="location"><span class="pin">—</span> Chengdu</div>
                            <p>This morning begins with a visit to the Chengdu Research Base of Giant Panda Breeding, where China’s national treasure thrives. Pandas are most active early in the day, giving you the best chance to watch them munching bamboo, climbing trees, and playfully interacting in semi natural enclosures.

Continue to People’s Park, a lively oasis where locals sip tea, play mahjong, and practice tai chi. Join them for a pot of tea and soak in Chengdu’s relaxed rhythm of life.

Finally, wander the Wide and Narrow Alleys, historic Qing era streets now filled with boutique shops, teahouses, and eateries. Discover Sichuan traditions such as opera and tea ceremonies, and sample local snacks, before returning comfortably to your hotel.
</p>
                            <div class="highlight">🏨 Overnight: Chengdu</div>
                            <div class="tags">
                                <span class="tag">Pandas</span>
                                <span class="tag">Tea House</span>
                                <span class="tag gold">Sichuan Culture</span>
                            </div>
                        </div>
                    </div>

                    <!-- DAY VIII -->
                    <div class="accordion-item">
                        <input type="radio" name="accordion" id="day8" />
                        <label for="day8">
                            <span class="day-num">VIII</span>
                            <span class="day-title">
                                Departure
                                <span class="subtitle">13 Oct 2027</span>
                            </span>
                            <span class="arrow">▾</span>
                        </label>
                        <div class="content">
                            <div class="location"><span class="pin">—</span> Chengdu → Airport</div>
                            <p>Your guide transfers you to the airport for your onward flight.</p>
                            <div class="tags">
                                <span class="tag">Private Transfer</span>
                                <span class="tag gold">Safe Travels</span>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="footer">
                    <div class="meta">
                        <span class="pill">◆ 8 Days / 7 Nights</span>
                        <span class="pill">◆ Culture & Heritage</span>
                        <span class="pill">◆ Beijing · Xi’an · Chengdu</span>
                    </div>
                    <a href="#" class="btn-gold">
                        Download Full Itinerary
                        <span class="arrow-icon">→</span>
                    </a>
                </div>

                <div class="print-btn-container">
                    <button class="print-btn" id="printBtn">
                        📄 Expand All & Print PDF
                    </button>
                </div>

            </div>
        `;

        const printBtn = this.querySelector('#printBtn');
        if (printBtn) {
            printBtn.addEventListener('click', () => {
                const items = this.querySelectorAll('.accordion-item input[type="radio"]');
                items.forEach(input => { input.checked = true; });
                 print();
            });
        }
    }
}
// ─── REGISTER THE CUSTOM ELEMENT ───
customElements.define('bambu-itinerary', ChinaItinerary);

