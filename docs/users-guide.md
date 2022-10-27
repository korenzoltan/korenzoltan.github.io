# Használati útmutató

## Mappa struktúra

- `_data`: Ebben vannak a különböző nyelvű alkönyvtárak, ahol hozzáadhatjuk a listához a youtube videó linkeket az oldalhoz kapcsolódó, megegyező nevű fájlban.
- `{{ nyelv }}`: Például `en`, `es`, `hu`. Ebben vannak a különböző nyelvű alkönyvtárak és fájlok. A különböző nyelvű alkönyvtárakban lehet új oldalt létrehozni `.md` (Markdown) formátumban. A `_posts` könyvtárakban pedig a Főoldalt lehet kiegészíteni. Itt találhatók például a Promobike és a Promovan rész-oldalak (section). Ha új rész-oldalt szeretnél a Főoldalra tenni (pl.: Citylight), akkor mindenképpen a `_posts` könyvtárba kell beletenni, pl.: `2020-06-09-citylight.md` néven. A különböző nyelvű fájlokban (`hu.yml`, `en.yml`, `es.yml`) találhatók a változók, ahol a szövegeket lehet lefordítani globálisan az angol kulcsszóval.
- `_includes`: Tartalmazza a `.html` fájlokat, amik megfelelnek az egyes komponenseknek.
- `_layouts`: A sablonokat tartalmazza.
- `_sass`: A `.scss` fájlokat tartalmazza, amik a weboldal stílusát határozzák meg.
- `assets`: Itt tároljuk a Bootstrap CSS-eket, JS-eket, fonts-okat, favicon-okat, és képeket. Az utóbbi könyvtárban (images) vannak különböző mappák, amik kapcsolódnak az oldal megfelelő részeihez. Pl.: A `home/slider` mappa a Főoldalon lévő slider-hez tartozik, a `references/agency-references` mappa a Referenciákban az Ügynökségi referenciákhoz, a `references/our-clients` mappa pedig a Referenciákhoz.
- `pages`: Oldalak. Ha új oldalt szeretnél létrehozni pl.: Privacy Policy néven, először a pages könyvtárban kell létrehozni, majd include-olni kell a `{{ nyelv }}/privacy-policy.md`-ot, amit a `{{ nyelv }}/` mappában is létre kell hozni.

## `_config.yml`

Szerkeszteni lehet bármilyen értéket, ha szeretnél változtatni, kivéve `theme`, `plugins`, `sass`, `exclude` értékét.

## A Főoldalon lévő Eszköztár (Promobike, Promovan, vagy bármilyen) képek feltöltése, módosítása

Az `assets/images/home/tools`-ban vannak a különböző eszköztárak, pl.: Promobike, Promovan, amiben a képek vannak tárolva. Ha új oldal-részt hoznál létre (pl.: Citylight), akkor új mappát kell létrehozni citylight néven (természetesen kisbetűvel), és ide feltöltheted a képeket és a `{{ nyelv }}/_posts`-ba kell új pl.: `2020-06-09-citylight.md` nevű fájlt hozzáadni, majd a fájlban a slug változóba kell ugyanazt a nevét hozzáadni. (pl.: `slug: citylight`). Lásd a `promobike` és a `promovan` fájlokban.

## "Fő" kép módosítása

Pl.: Ha a Négykerekű hirdetésben a "fő" képet le szeretnéd cserélni, akkor az `{{ nyelv }}/four-wheel-ad.md`-ben az első sorban a `src` értékét kell módosítani.

## Videó galéria feltöltése, módosítása

Pl.: Ha a Négykerekű hirdetésben a videó galériát le szeretnéd cserélni, akkor az `pages/four-wheel-ad.md`-ben a front matter-ben lévő filename értékét keresd, ami kapcsolódik a `_data/{{ nyelv }}/four-wheel-ad.yml`-hez, amelyhez adhatsz új linke(ke)t vagy módosíthatod azokat.

## Oldal szerkesztése

Az `{{ nyelv }}/` mappában találhatóak a fájlok, amelyekben a szövegeket tudod szerkeszteni az adott nyelven.

## Referencia képek feltöltése, módosítása

Az `{{ nyelv }}/references.md`-ben látható az album értéke, ami kapcsolódik az `assets/images/` könyvtárban lévő `references` mappához, ahova feltöltheted a képeket vagy módosíthatod.
