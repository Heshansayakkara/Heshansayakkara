(function () {
  function init() {
    // ─── INJECT GOOGLE FONTS ───────────────────────────────────────────────────
    var gfLink = document.createElement("link");
    gfLink.rel = "stylesheet";
    gfLink.href =
      "https://fonts.googleapis.com/css2?family=Noto+Sans+Sinhala:wght@400;600;700;800&family=Noto+Serif+Sinhala:wght@400;600;700&family=Abhaya+Libre:wght@400;600;700&family=Gemunu+Libre:wght@400;600;700&family=Yaldevi:wght@400;600;700&family=Poppins:wght@400;600;700;800&family=Montserrat:wght@400;600;700;800&family=Roboto:wght@400;500;700&family=Open+Sans:wght@400;600;700&family=Lato:wght@400;700&family=Oswald:wght@400;600;700&family=Raleway:wght@400;600;700&family=Nunito:wght@400;700;800&family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@400;600;700&display=swap";
    document.head.appendChild(gfLink);

    // ─── INJECT CSS ────────────────────────────────────────────────────────────
    var style = document.createElement("style");
    style.textContent = `
      .hs-converter-btn{
        position:fixed;right:22px;bottom:22px;width:58px;height:58px;border-radius:18px;
        background:linear-gradient(135deg,#667eea,#f093fb,#764ba2);color:#fff;display:flex;
        align-items:center;justify-content:center;font-size:20px;font-weight:800;cursor:pointer;
        z-index:999999;border:none;
        box-shadow:0 14px 35px rgba(240,147,251,.35),0 0 22px rgba(102,126,234,.35);
        transition:.3s ease;
        font-family:'Noto Sans Sinhala',Arial,sans-serif;
      }
      .hs-converter-btn:hover{transform:translateY(-5px) scale(1.04)}

      .hs-converter-box{
        position:fixed;right:22px;bottom:95px;width:360px;max-width:calc(100% - 30px);
        background:rgba(16,18,32,.96);border:1px solid rgba(240,147,251,.28);
        border-radius:18px;overflow:hidden;z-index:999999;backdrop-filter:blur(18px);
        box-shadow:0 25px 60px rgba(0,0,0,.45);display:none;
        font-family:'Poppins',Arial,sans-serif;
      }
      .hs-converter-header{
        background:linear-gradient(135deg,#667eea,#764ba2);padding:14px 18px;color:#fff;
        font-weight:800;display:flex;justify-content:space-between;align-items:center;
        font-size:15px;
      }
      .hs-converter-close{cursor:pointer;font-size:22px;line-height:1;user-select:none}
      .hs-converter-content{padding:18px}
      .hs-converter-label{
        color:#b8b8d0;font-size:12px;font-weight:800;
        margin-bottom:7px;letter-spacing:.06em;text-transform:uppercase;
      }
      .hs-converter-textarea{
        width:100%;min-height:82px;border-radius:14px;
        border:1px solid rgba(240,147,251,.38);
        background:rgba(255,255,255,.06);color:#fff;
        padding:12px;outline:none;resize:none;
        font-size:16px;font-family:'Noto Sans Sinhala',Arial,sans-serif;
        transition:border-color .2s;line-height:1.7;box-sizing:border-box;
      }
      .hs-converter-textarea:focus{border-color:rgba(240,147,251,.65)}
      .hs-converter-textarea::placeholder{color:rgba(180,180,210,.4);font-size:14px}
      #hsOutput{
        cursor:default;
        background:rgba(102,126,234,.08);
        border-color:rgba(102,126,234,.3);
      }
      .hs-mode-row{
        display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:14px 0;
        background:rgba(255,255,255,.06);padding:5px;border-radius:14px;
      }
      .hs-mode-btn{
        border:none;border-radius:11px;padding:10px;cursor:pointer;
        background:transparent;color:#b8b8d0;font-weight:800;
        transition:.25s;font-family:'Noto Sans Sinhala','Poppins',Arial,sans-serif;
        font-size:13px;
      }
      .hs-mode-btn.active{
        background:linear-gradient(135deg,#667eea,#f093fb,#764ba2);color:#fff;
        box-shadow:0 8px 20px rgba(240,147,251,.28),0 0 16px rgba(102,126,234,.25);
      }
      .hs-font-picker{display:none;margin-top:-4px;margin-bottom:14px}
      .hs-font-select{
        width:100%;padding:11px;border-radius:12px;
        border:1px solid rgba(240,147,251,.38);
        background:rgba(255,255,255,.08);color:#fff;
        outline:none;font-weight:800;box-sizing:border-box;
        font-family:'Poppins',Arial,sans-serif;font-size:13px;cursor:pointer;
      }
      .hs-font-select option{background:#111320;color:#fff}
      .hs-action-row{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px}
      .hs-action-btn{
        border:none;border-radius:12px;padding:11px;cursor:pointer;
        font-weight:800;color:#fff;font-size:13px;
        background:linear-gradient(135deg,#667eea,#764ba2);
        font-family:'Poppins',Arial,sans-serif;transition:.2s;
      }
      .hs-action-btn:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(102,126,234,.4)}
      .hs-clear-btn{background:rgba(255,255,255,.1)!important;color:#c8c8d8!important}
      .hs-clear-btn:hover{background:rgba(255,255,255,.15)!important;transform:none!important;box-shadow:none!important}
      .hs-credit{text-align:center;color:#8e94b8;font-size:11px;margin-top:14px}
      .hs-credit span{color:#f093fb;font-weight:800}
      .hs-toast{
        position:fixed;bottom:28px;left:50%;
        transform:translateX(-50%) translateY(70px);
        background:linear-gradient(135deg,#667eea,#764ba2);
        color:#fff;padding:10px 22px;border-radius:30px;
        font-size:13px;font-weight:700;opacity:0;
        transition:all .3s ease;pointer-events:none;
        z-index:9999999;white-space:nowrap;
        box-shadow:0 8px 25px rgba(102,126,234,.4);
        font-family:'Poppins',Arial,sans-serif;
      }
      .hs-toast.hs-toast-show{opacity:1;transform:translateX(-50%) translateY(0)}
      @media(max-width:480px){
        .hs-converter-box{width:calc(100% - 30px);right:15px;bottom:90px}
        .hs-converter-btn{right:18px;bottom:18px}
      }
    `;
    document.head.appendChild(style);

    // ─── INJECT HTML ───────────────────────────────────────────────────────────
    var wrapper = document.createElement("div");
    wrapper.innerHTML = `
      <div class="hs-converter-box" id="hsConverterBox">
        <div class="hs-converter-header">
          <span>HS Sinhala Converter</span>
          <span class="hs-converter-close" id="hsConverterClose">&#x00D7;</span>
        </div>
        <div class="hs-converter-content">
          <div class="hs-converter-label">INPUT</div>
          <textarea id="hsInput" class="hs-converter-textarea" placeholder="Singlish හෝ Sinhala type කරන්න..."></textarea>

          <div class="hs-mode-row">
            <button id="hsUnicodeBtn" class="hs-mode-btn active">සිංහල</button>
            <button id="hsFontBtn"    class="hs-mode-btn">Font Style</button>
          </div>

          <div class="hs-font-picker" id="hsFontPicker">
            <div class="hs-converter-label">SELECT FONT STYLE</div>
            <select id="hsFontSelect" class="hs-font-select"></select>
          </div>

          <div class="hs-converter-label">OUTPUT</div>
          <textarea id="hsOutput" class="hs-converter-textarea" placeholder="Result..." readonly></textarea>

          <div class="hs-action-row">
            <button class="hs-action-btn" id="hsCopyBtn">📋 Copy</button>
            <button class="hs-action-btn hs-clear-btn" id="hsClearBtn">🗑 Clear</button>
          </div>

          <div class="hs-credit">⚡ by <span>Heshan Sayakkara</span></div>
        </div>
      </div>

      <button class="hs-converter-btn" id="hsConverterBtn" title="Sinhala Converter">සිං</button>
      <div class="hs-toast" id="hsToast">✅ Copied!</div>
    `;
    document.body.appendChild(wrapper);

    // ─── FONT LIST ─────────────────────────────────────────────────────────────
    var hsFontList = [
      {name:"01. FM Bindumathi",  family:"'FM Bindumathi','FMBindumathi','Bindumathi','Noto Sans Sinhala',sans-serif"},
      {name:"02. FM Abhaya",      family:"'FM Abhaya','FMAbhaya','Abhaya Libre','Noto Serif Sinhala',serif"},
      {name:"03. FM Arjunn",      family:"'FM Arjunn','FMArjunn','Noto Sans Sinhala',sans-serif"},
      {name:"04. FM Basuru",      family:"'FM Basuru','FMBasuru','Noto Sans Sinhala',sans-serif"},
      {name:"05. FM Derana",      family:"'FM Derana','FMDerana','Noto Sans Sinhala',sans-serif"},
      {name:"06. FM Emanee",      family:"'FM Emanee','FMEmanee','Noto Sans Sinhala',sans-serif"},
      {name:"07. FM Ganganee",    family:"'FM Ganganee','FMGanganee','Noto Sans Sinhala',sans-serif"},
      {name:"08. FM Gemunu",      family:"'FM Gemunu','FMGemunu','Gemunu Libre','Noto Sans Sinhala',sans-serif"},
      {name:"09. FM Malithi",     family:"'FM Malithi','FMMalithi','Malithi Web','Noto Sans Sinhala',sans-serif"},
      {name:"10. FM Samantha",    family:"'FM Samantha','FMSamantha','Noto Sans Sinhala',sans-serif"},
      {name:"11. Noto Sans Sinhala",  family:"'Noto Sans Sinhala',sans-serif"},
      {name:"12. Noto Serif Sinhala", family:"'Noto Serif Sinhala',serif"},
      {name:"13. Iskoola Pota",   family:"'Iskoola Pota','Noto Sans Sinhala',sans-serif"},
      {name:"14. Malithi Web",    family:"'Malithi Web','Noto Sans Sinhala',sans-serif"},
      {name:"15. Yaldevi",        family:"Yaldevi,'Noto Sans Sinhala',sans-serif"},
      {name:"16. Poppins Sinhala",    family:"Poppins,'Noto Sans Sinhala',sans-serif"},
      {name:"17. Montserrat Sinhala", family:"Montserrat,'Noto Sans Sinhala',sans-serif"},
      {name:"18. Roboto Sinhala",     family:"Roboto,'Noto Sans Sinhala',sans-serif"},
      {name:"19. Open Sans Sinhala",  family:"'Open Sans','Noto Sans Sinhala',sans-serif"},
      {name:"20. Lato Sinhala",       family:"Lato,'Noto Sans Sinhala',sans-serif"},
      {name:"21. Oswald Sinhala",     family:"Oswald,'Noto Sans Sinhala',sans-serif"},
      {name:"22. Raleway Sinhala",    family:"Raleway,'Noto Sans Sinhala',sans-serif"},
      {name:"23. Abhaya Libre",       family:"'Abhaya Libre','Noto Serif Sinhala',serif"},
      {name:"24. Gemunu Libre",       family:"'Gemunu Libre','Noto Sans Sinhala',sans-serif"},
      {name:"25. Noto Sans Bold",     family:"'Noto Sans Sinhala',sans-serif"},
      {name:"26. Noto Serif Bold",    family:"'Noto Serif Sinhala',serif"},
      {name:"27. Nunito Sinhala",     family:"Nunito,'Noto Sans Sinhala',sans-serif"},
      {name:"28. Playfair Sinhala",   family:"'Playfair Display','Noto Serif Sinhala',serif"},
      {name:"29. DM Sans Sinhala",    family:"'DM Sans','Noto Sans Sinhala',sans-serif"},
      {name:"30. Arial Sinhala",      family:"Arial,'Noto Sans Sinhala',sans-serif"},
      {name:"31. Verdana Sinhala",    family:"Verdana,'Noto Sans Sinhala',sans-serif"},
      {name:"32. Tahoma Sinhala",     family:"Tahoma,'Noto Sans Sinhala',sans-serif"},
      {name:"33. Georgia Sinhala",    family:"Georgia,'Noto Serif Sinhala',serif"},
      {name:"34. Times Sinhala",      family:"'Times New Roman','Noto Serif Sinhala',serif"},
      {name:"35. Courier Sinhala",    family:"'Courier New','Noto Sans Sinhala',monospace"},
      {name:"36. Impact Sinhala",     family:"Impact,'Noto Sans Sinhala',sans-serif"},
      {name:"37. Classic Serif",      family:"serif"},
      {name:"38. Modern Sans",        family:"sans-serif"},
      {name:"39. Monospace",          family:"monospace"},
      {name:"40. Cursive",            family:"cursive"},
      {name:"41. Fantasy",            family:"fantasy"},
      {name:"42. Bold Style",         family:"Arial Black,'Noto Sans Sinhala',sans-serif"},
      {name:"43. Light Style",        family:"Arial Narrow,'Noto Sans Sinhala',sans-serif"},
      {name:"44. Elegant Style",      family:"Georgia,'Noto Serif Sinhala',serif"},
      {name:"45. Poster Style",       family:"Impact,'Noto Sans Sinhala',sans-serif"},
      {name:"46. Serif Pro",          family:"'Noto Serif Sinhala',Georgia,serif"},
      {name:"47. Sans Pro",           family:"'Noto Sans Sinhala',Verdana,sans-serif"},
      {name:"48. Heading Pro",        family:"Montserrat,'Noto Sans Sinhala',sans-serif"},
      {name:"49. Creative Pro",       family:"Raleway,'Noto Sans Sinhala',sans-serif"},
      {name:"50. Clean Pro",          family:"DM Sans,'Noto Sans Sinhala',sans-serif"}
    ];

  const VOWELS = {
    "aa": "ආ", "a": "අ", "Ae": "ඇ", "Aee": "ඈ",
    "ii": "ඊ", "i": "ඉ", "uu": "ඌ", "u": "උ",
    "R": "ඍ", "RR": "ඎ", "Lu": "ඏ", "Luu": "ඐ",
    "ee": "ඒ", "e": "එ", "ai": "ඓ",
    "oo": "ඕ", "o": "ඔ", "au": "ඖ",
  };

  const VOWEL_SIGNS = {
    "a": "",
    "aa": "ා", "Ae": "ැ", "Aee": "ෑ",
    "i": "ි", "ii": "ී", "u": "ු", "uu": "ූ",
    "R": "ෘ", "RR": "ෲ", "Lu": "ෟ", "Luu": "ෳ",
    "e": "ෙ", "ee": "ේ", "ai": "ෛ",
    "o": "ො", "oo": "ෝ", "au": "ෞ",
  };

  const CONSONANTS = {
    "kh": "ඛ", "k": "ක", "gh": "ඝ", "g": "ග",
    "nng": "ඟ", "ng": "ඞ",
    "chh": "ඡ", "ch": "ච", "jh": "ඣ", "j": "ජ", "ny": "ඤ",
    "th": "ඨ", "t": "ට", "dh": "ඪ", "d": "ඩ", "nd": "ඬ", "N": "ණ",
    "Th": "ථ", "T": "ත", "dha": "ධ", "q": "ද", "ndha": "ඳ", "n": "න",
    "ph": "ඵ", "p": "ප", "bh": "භ", "b": "බ", "B": "ඹ", "m": "ම",
    "y": "ය", "r": "ර", "l": "ල", "w": "ව", "v": "ව",
    "sh": "ශ", "ss": "ෂ", "s": "ස", "h": "හ",
    "L": "ළ", "f": "ෆ",
  };

  const SPECIAL_CONJUNCTS = {
    "shriimathu": "ශ්‍රීමතු", "shriimathee": "ශ්‍රීමතී", "shriiman": "ශ්‍රීමාන්",
    "shrii": "ශ්‍රී", "shri": "ශ්‍රී", "srii": "ශ්‍රී", "sri": "ශ්‍රී",
    "kshAee": "ක්‍ෂෑ", "kshAe": "ක්‍ෂැ", "kshau": "ක්‍ෂෞ", "kshoo": "ක්‍ෂෝ",
    "kshai": "ක්‍ෂෛ", "kshee": "ක්‍ෂේ", "kshaa": "ක්‍ෂා", "ksho": "ක්‍ෂො",
    "kshuu": "ක්‍ෂූ", "kshii": "ක්‍ෂී", "kshe": "ක්‍ෂෙ", "kshu": "ක්‍ෂු",
    "kshi": "ක්‍ෂි", "ksha": "ක්‍ෂ",
    "gnAee": "ඥෑ", "gnAe": "ඥැ", "gnau": "ඥෞ", "gnoo": "ඥෝ",
    "gnai": "ඥෛ", "gnee": "ඥේ", "gnaa": "ඥා", "gnuu": "ඥූ",
    "gnii": "ඥී", "gno": "ඥො", "gne": "ඥෙ", "gnu": "ඥු",
    "gni": "ඥි", "gna": "ඥ",
    "krAee": "ක්‍රෑ", "krAe": "ක්‍රැ", "krau": "ක්‍රෞ", "kroo": "ක්‍රෝ",
    "krai": "ක්‍රෛ", "kree": "ක්‍රේ", "kraa": "ක්‍රා", "kruu": "ක්‍රූ",
    "krii": "ක්‍රී", "kro": "ක්‍රො", "kre": "ක්‍රෙ", "kru": "ක්‍රු",
    "kri": "ක්‍රි", "kra": "ක්‍ර",
    "grAee": "ග්‍රෑ", "grAe": "ග්‍රැ", "grau": "ග්‍රෞ", "groo": "ග්‍රෝ",
    "grai": "ග්‍රෛ", "gree": "ග්‍රේ", "graa": "ග්‍රා", "gruu": "ග්‍රූ",
    "grii": "ග්‍රී", "gro": "ග්‍රො", "gre": "ග්‍රෙ", "gru": "ග්‍රු",
    "gri": "ග්‍රි", "gra": "ග්‍ර",
    "prAee": "ප්‍රෑ", "prAe": "ප්‍රැ", "prau": "ප්‍රෞ", "proo": "ප්‍රෝ",
    "prai": "ප්‍රෛ", "pree": "ප්‍රේ", "praa": "ප්‍රා", "pruu": "ප්‍රූ",
    "prii": "ප්‍රී", "pro": "ප්‍රො", "pre": "ප්‍රෙ", "pru": "ප්‍රු",
    "pri": "ප්‍රි", "pra": "ප්‍ර",
    "brAee": "බ්‍රෑ", "brAe": "බ්‍රැ", "brau": "බ්‍රෞ", "broo": "බ්‍රෝ",
    "brai": "බ්‍රෛ", "bree": "බ්‍රේ", "braa": "බ්‍රා", "bruu": "බ්‍රූ",
    "brii": "බ්‍රී", "bro": "බ්‍රො", "bre": "බ්‍රෙ", "bru": "බ්‍රු",
    "bri": "බ්‍රි", "bra": "බ්‍ර",
    "trAee": "ත්‍රෑ", "trAe": "ත්‍රැ", "trau": "ත්‍රෞ", "troo": "ත්‍රෝ",
    "trai": "ත්‍රෛ", "tree": "ත්‍රේ", "traa": "ත්‍රා", "truu": "ත්‍රූ",
    "trii": "ත්‍රී", "tro": "ත්‍රො", "tre": "ත්‍රෙ", "tru": "ත්‍රු",
    "tri": "ත්‍රි", "tra": "ත්‍ර",
    "drAee": "ද්‍රෑ", "drAe": "ද්‍රැ", "drau": "ද්‍රෞ", "droo": "ද්‍රෝ",
    "drai": "ද්‍රෛ", "dree": "ද්‍රේ", "draa": "ද්‍රා", "druu": "ද්‍රූ",
    "drii": "ද්‍රී", "dro": "ද්‍රො", "dre": "ද්‍රෙ", "dru": "ද්‍රු",
    "dri": "ද්‍රි", "dra": "ද්‍ර",
    "shrAee": "ශ්‍රෑ", "shrAe": "ශ්‍රැ", "shrau": "ශ්‍රෞ", "shroo": "ශ්‍රෝ",
    "shrai": "ශ්‍රෛ", "shree": "ශ්‍රේ", "shraa": "ශ්‍රා", "shruu": "ශ්‍රූ",
    "shro": "ශ්‍රො", "shre": "ශ්‍රෙ", "shru": "ශ්‍රු", "shra": "ශ්‍ර",
    "kyAee": "ක්‍යෑ", "kyAe": "ක්‍යැ", "kyau": "ක්‍යෞ", "kyoo": "ක්‍යෝ",
    "kyai": "ක්‍යෛ", "kyee": "ක්‍යේ", "kyaa": "ක්‍යා", "kyuu": "ක්‍යූ",
    "kyii": "ක්‍යී", "kyo": "ක්‍යො", "kye": "ක්‍යෙ", "kyu": "ක්‍යු",
    "kyi": "ක්‍යි", "kya": "ක්‍ය",
    "gyaa": "ග්‍යා", "gya": "ග්‍ය",
    "pyaa": "ප්‍යා", "pya": "ප්‍ය",
    "byaa": "බ්‍යා", "bya": "බ්‍ය",
    "kkAee": "ක්කෑ", "kkAe": "ක්කැ", "kkau": "ක්කෞ", "kkoo": "ක්කෝ",
    "kkai": "ක්කෛ", "kkee": "ක්කේ", "kkaa": "ක්කා", "kkuu": "ක්කූ",
    "kkii": "ක්කී", "kko": "ක්කො", "kke": "ක්කෙ", "kku": "ක්කු",
    "kki": "ක්කි", "kka": "ක්ක",
    "ssAee": "ස්සෑ", "ssAe": "ස්සැ", "ssau": "ස්සෞ", "ssoo": "ස්සෝ",
    "ssai": "ස්සෛ", "ssee": "ස්සේ", "ssaa": "ස්සා", "ssuu": "ස්සූ",
    "ssii": "ස්සී", "sso": "ස්සො", "sse": "ස්සෙ", "ssu": "ස්සු",
    "ssi": "ස්සි", "ssa": "ස්ස",
    "ttAee": "ත්තෑ", "ttAe": "ත්තැ", "ttau": "ත්තෞ", "ttoo": "ත්තෝ",
    "ttai": "ත්තෛ", "ttee": "ත්තේ", "ttaa": "ත්තා", "ttuu": "ත්තූ",
    "ttii": "ත්තී", "tto": "ත්තො", "tte": "ත්තෙ", "ttu": "ත්තු",
    "tti": "ත්ති", "tta": "ත්ත",
    "ddaa": "ද්දා", "ddii": "ද්දී", "ddi": "ද්දි", "dda": "ද්ද",
    "ppaa": "ප්පා", "ppii": "ප්පී", "ppi": "ප්පි", "ppa": "ප්ප",
    "mmaa": "ම්මා", "mmii": "ම්මී", "mmi": "ම්මි", "mma": "ම්ම",
    "nnaa": "න්නා", "nnii": "න්නී", "nni": "න්ති", "nna": "න්න",
    "llaa": "ල්ලා", "llii": "ල්ලී", "lli": "ල්ලි", "lla": "ල්ල",
    "ndAee": "න්දෑ", "ndAe": "න්දැ", "ndau": "න්දෞ", "ndoo": "න්දෝ",
    "ndai": "න්දෛ",h "ndee": "න්දේ", "ndaa": "න්දා", "nduu": "න්දූ",
    "ndii": "න්දී", "ndo": "න්දො", "nde": "න්දෙ", "ndu": "න්දු",
    "ndi": "න්දි", "nda": "න්ද",
    "ntAee": "න්තෑ", "ntAe": "න්තැ", "ntau": "න්තෞ", "ntoo": "න්තෝ",
    "ntai": "න්තෛ", "ntee": "න්තේ", "ntaa": "න්තා", "ntuu": "න්තූ",
    "ntii": "න්තී", "nto": "න්තො", "nte": "න්තෙ", "ntu": "න්තු",
    "nti": "න්ති", "nta": "න්ත",
    "ngaa": "ඞා", "ngii": "ඞී", "ngi": "ඞි", "nga": "ඞ",
    "Baa": "ම්බා", "Bii": "ම්බී", "Bi": "ම්බි", "Bba": "ම්බ",
    "mpaa": "ම්පා", "mpii": "ම්පී", "mpi": "ම්පි", "mpa": "ම්ප",
  };

  const SYMBOLS = {
    "x": "ං", "X": "ං", "H": "ඃ",
    ".": ".", ",": ",", "!": "!", "?": "?",
    ";": ";", ":": ":", "'": "'", '"': '"',
    "(": "(", ")": ")", "[": "[", "]": "]",
    "{": "{", "}": "}", "-": "-", "_": "_",
    "/": "/", "\\": "\\", " ": " ", "\n": "\n", "\t": "\t",
  };


  

    // ─── STATE ─────────────────────────────────────────────────────────────────
    var hsMode = "unicode";
    var currentHsFont = hsFontList[0].family;

    // ─── BUILD FONT DROPDOWN ───────────────────────────────────────────────────
    var sel = document.getElementById("hsFontSelect");
    hsFontList.forEach(function (f) {
      var opt = document.createElement("option");
      opt.value = f.family;
      opt.textContent = f.name;
      opt.style.fontFamily = f.family;
      sel.appendChild(opt);
    });

    // ─── HELPERS ───────────────────────────────────────────────────────────────
    function hasSinhala(text) { return /[\u0D80-\u0DFF]/.test(text); }

    function convertWord(word) {
      var out = "", i = 0;
      while (i < word.length) {
        var matched = false;
        // Check for special conjuncts first (longest to shortest)
        for (var sclen = 10; sclen >= 3; sclen--) {
          var sc = word.substr(i, sclen);
          if (SPECIAL_CONJUNCTS[sc]) {
            out += SPECIAL_CONJUNCTS[sc];
            i += sclen;
            matched = true;
            break;
          }
        }
        if (matched) continue;
        var clens = [2, 1];
        for (var ci = 0; ci < clens.length; ci++) {
          var clen = clens[ci];
          var c = word.substr(i, clen);
          if (CONSONANTS[c]) {
            var next = i + clen, usedVowel = false;
            var vlens = [3, 2, 1];
            for (var vi = 0; vi < vlens.length; vi++) {
              var vlen = vlens[vi];
              var v = word.substr(next, vlen);
              if (VOWEL_SIGNS.hasOwnProperty(v)) {
                out += CONSONANTS[c] + VOWEL_SIGNS[v];
                i = next + vlen; usedVowel = true; matched = true; break;
              }
            }
            if (!usedVowel) { out += CONSONANTS[c] + "්"; i = next; matched = true; }
            break;
          }
        }
        if (matched) continue;
        var vlens2 = [3, 2, 1];
        for (var vi2 = 0; vi2 < vlens2.length; vi2++) {
          var vlen2 = vlens2[vi2];
          var v2 = word.substr(i, vlen2);
          if (VOWELS[v2]) { out += VOWELS[v2]; i += vlen2; matched = true; break; }
        }
        if (!matched) {
          // Check for symbols
          var sym = SYMBOLS[word[i]];
          if (sym !== undefined) {
            out += sym;
          } else {
            out += word[i];
          }
          i++;
        }
      }
      return out;
    }

    function singlishToSinhala(text) {
      return text.split(/(\s+)/).map(function (part) {
        return /\s+/.test(part) ? part : convertWord(part);
      }).join("");
    }

    function convertHsText() {
      var input = document.getElementById("hsInput").value;
      var output = document.getElementById("hsOutput");
      var answer = hasSinhala(input) ? input : singlishToSinhala(input);
      output.value = answer;
      output.style.fontFamily = hsMode === "font" ? currentHsFont : "'Noto Sans Sinhala', Arial, sans-serif";
    }

    function toggleHsConverter() {
      var box = document.getElementById("hsConverterBox");
      box.style.display = box.style.display === "block" ? "none" : "block";
    }

    function setHsMode(mode) {
      hsMode = mode;
      document.getElementById("hsUnicodeBtn").classList.toggle("active", mode === "unicode");
      document.getElementById("hsFontBtn").classList.toggle("active", mode === "font");
      document.getElementById("hsFontPicker").style.display = mode === "font" ? "block" : "none";
      convertHsText();
    }

    function changeHsFont() {
      currentHsFont = document.getElementById("hsFontSelect").value;
      convertHsText();
    }

    function copyHsOutput() {
      var output = document.getElementById("hsOutput");
      if (!output.value) return;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(output.value).catch(function () { fallbackCopy(output); });
      } else { fallbackCopy(output); }
      showHsToast();
    }

    function fallbackCopy(output) {
      output.select();
      output.setSelectionRange(0, 99999);
      document.execCommand("copy");
    }

    function showHsToast() {
      var t = document.getElementById("hsToast");
      t.classList.add("hs-toast-show");
      setTimeout(function () { t.classList.remove("hs-toast-show"); }, 2200);
    }

    function clearHsConverter() {
      document.getElementById("hsInput").value = "";
      document.getElementById("hsOutput").value = "";
    }

    // ─── BIND EVENTS ───────────────────────────────────────────────────────────
    document.getElementById("hsConverterBtn").addEventListener("click",  toggleHsConverter);
    document.getElementById("hsConverterClose").addEventListener("click", toggleHsConverter);
    document.getElementById("hsUnicodeBtn").addEventListener("click", function () { setHsMode("unicode"); });
    document.getElementById("hsFontBtn").addEventListener("click",    function () { setHsMode("font"); });
    document.getElementById("hsFontSelect").addEventListener("change", changeHsFont);
    document.getElementById("hsInput").addEventListener("input", convertHsText);
    document.getElementById("hsCopyBtn").addEventListener("click",  copyHsOutput);
    document.getElementById("hsClearBtn").addEventListener("click", clearHsConverter);
  }

  // ─── DOM READY GUARD ───────────────────────────────────────────────────────
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();