/* ============================= */
/* KALAMANDIRA CINEMATIC INTRO */
/* ============================= */

const cinemaWords = [
    "Movie",
    "సినిమా",
    "फ़िल्म",
    "திரைப்படம்",
    "ಸಿನಿಮಾ",
    "മലയാളം സിനിമ",
    "JAI TFI",
    "🦖🐺🐅🐆🦁🐈‍⬛",
    "UNITED TFI"
];

const wordElement = document.getElementById("cinema-word");
const titleElement = document.getElementById("intro-title");

let wordIndex = 0;

function showNextWord() {
    if (!wordElement) return;

    if (wordIndex < cinemaWords.length) {
        wordElement.textContent = cinemaWords[wordIndex++];
        setTimeout(showNextWord, 1400);
    } else {
        revealTitle();
    }
}

function revealTitle() {
    if (wordElement) wordElement.style.opacity = "0";
    if (titleElement) titleElement.classList.add("show-title");

    setTimeout(() => {
        const intro = document.getElementById("intro");
        const appElement = document.getElementById("app");

        if (!intro || !appElement) return;

        intro.style.transition = "opacity 1.5s ease";
        intro.style.opacity = "0";

        setTimeout(() => {
            intro.style.display = "none";
            appElement.classList.remove("hidden");
        }, 1500);
    }, 3000);
}

setTimeout(showNextWord, 1800);


/* ============================= */
/* DASHBOARD */
/* ============================= */

const app = document.getElementById("app");
const languageButton = document.getElementById("language-toggle");
const themeButton = document.getElementById("theme-toggle");
const pageContent = document.getElementById("page-content");

let currentLanguage = "original";
let currentTheme = "original";
let editMovieId = null;


/* ============================= */
/* TRANSLATIONS */
/* ============================= */

const translations = {
    original: {
        dashboard: "Rangam",
        movies: "Chitra",
        add: "Srijan",
        genres: "Rasa",
        settings: "Ayojana",
        archive: "THE ARCHIVE",
        collection: "Your Chitra",
        addMovie: "+ Add Chitra",
        search: "Search title, actor or director...",
        allGenres: "All Genres",
        welcome: "Namaskaram.",
        description: "Every film has a story. Every collection has a soul.",
        emptyTitle: "Your cinema journey begins here.",
        emptyDescription: "Add your first movie to build your collection.",
        totalMovies: "TOTAL CHITRA",
        totalGenres: "RASA",
        latest: "COLLECTION",
        noteMovies: "Movies in your collection",
        noteGenres: "Genres explored",
        noteLatest: "Latest release year",
        kicker: "YOUR CINEMA UNIVERSE"
    },

    english: {
        dashboard: "Dashboard",
        movies: "Movies",
        add: "Add Movie",
        genres: "Genres",
        settings: "Settings",
        archive: "YOUR COLLECTION",
        collection: "Your Movies",
        addMovie: "+ Add Movie",
        search: "Search title, actor or director...",
        allGenres: "All Genres",
        welcome: "Welcome to Kalamandira.",
        description: "Every film has a story. Every collection has a soul.",
        emptyTitle: "Your cinema journey begins here.",
        emptyDescription: "Add your first movie to build your collection.",
        totalMovies: "TOTAL MOVIES",
        totalGenres: "GENRES",
        latest: "COLLECTION",
        noteMovies: "Movies in your collection",
        noteGenres: "Genres explored",
        noteLatest: "Latest release year",
        kicker: "YOUR CINEMA UNIVERSE"
    }
};


/* ============================= */
/* LANGUAGE */
/* ============================= */

function updateLanguage() {

    const t = translations[currentLanguage];

    document.querySelectorAll(".menu-item[data-page]").forEach(button => {

        const page = button.dataset.page;
        const label = button.querySelector(".menu-text");

        if (label && t[page]) {
            label.textContent = t[page];
        }

    });

    const welcomeHeading = document.querySelector(".welcome-section h1");

    const welcomeDescription = document.querySelector(
        ".welcome-section .welcome-description"
    );

    const collectionKicker = document.querySelector(
        ".collection-section .section-kicker"
    );

    const collectionHeading = document.querySelector(
        ".collection-section h2"
    );

    const addMovieButton = document.querySelector(".add-movie-button");

    const searchInput = document.getElementById("search-input");

    const genreFilter = document.getElementById("genre-filter");

    const emptyTitle = document.querySelector(".empty-state h3");

    const emptyDescription = document.querySelector(".empty-state p");

    if (welcomeHeading) welcomeHeading.textContent = t.welcome;

    if (welcomeDescription) {
        welcomeDescription.textContent = t.description;
    }

    if (collectionKicker) collectionKicker.textContent = t.archive;

    if (collectionHeading) collectionHeading.textContent = t.collection;

    if (addMovieButton) addMovieButton.textContent = t.addMovie;

    if (searchInput) searchInput.placeholder = t.search;

    if (genreFilter) {

        const allOption = genreFilter.querySelector(
            'option[value="all"]'
        );

        if (allOption) allOption.textContent = t.allGenres;

    }

    if (emptyTitle) emptyTitle.textContent = t.emptyTitle;

    if (emptyDescription) {
        emptyDescription.textContent = t.emptyDescription;
    }

    const statLabels = document.querySelectorAll(".stat-label");

    const statNotes = document.querySelectorAll(".stat-note");

    if (statLabels.length >= 3) {

        statLabels[0].textContent = t.totalMovies;
        statLabels[1].textContent = t.totalGenres;
        statLabels[2].textContent = t.latest;

    }

    if (statNotes.length >= 3) {

        statNotes[0].textContent = t.noteMovies;
        statNotes[1].textContent = t.noteGenres;
        statNotes[2].textContent = t.noteLatest;

    }

    if (languageButton) {

        languageButton.textContent =
            currentLanguage === "original" ? "EN" : "OR";

    }

}

if (languageButton) {

    languageButton.addEventListener("click", () => {

        currentLanguage =
            currentLanguage === "original" ? "english" : "original";

        updateLanguage();

    });

}


/* ============================= */
/* THEME */
/* ============================= */

function applyTheme() {

    if (!app || !themeButton) return;

    app.classList.remove(
        "theme-original",
        "theme-light",
        "theme-dark"
    );

    app.classList.add("theme-" + currentTheme);

    if (currentTheme === "original") {

        themeButton.textContent = "◐";

    } else if (currentTheme === "light") {

        themeButton.textContent = "☀";

    } else {

        themeButton.textContent = "☾";

    }

}

if (themeButton) {

    themeButton.addEventListener("click", () => {

        if (currentTheme === "original") {

            currentTheme = "light";

        } else if (currentTheme === "light") {

            currentTheme = "dark";

        } else {

            currentTheme = "original";

        }

        applyTheme();

    });

}

function toggleHeroVideo(page) {

    const heroTrailer = document.getElementById("hero-trailer");
    const heroVideoContainer = document.querySelector(".hero-video-container");

    if (!heroTrailer || !heroVideoContainer) return;

    if (page !== "dashboard") {

        // Stop video completely
        heroTrailer.src = "";
        heroVideoContainer.style.display = "none";

    } else if (featuredMovie) {

        // Resume dashboard trailer
        const trailerURL = getHeroTrailerURL(featuredMovie.trailer);

        heroTrailer.src = trailerURL;
        heroVideoContainer.style.display = trailerURL ? "block" : "none";

    }
}



/* ============================= */
/* PAGE NAVIGATION */
/* ============================= */

const originalDashboard = pageContent
    ? pageContent.innerHTML
    : "";

function openPage(page) {

    const heroSection = document.getElementById("featured-hero");
    const heroVideoContainer = document.querySelector(".hero-video-container");

    if (heroSection) {
        heroSection.style.display = page === "dashboard" ? "" : "none";
    }

    toggleHeroVideo(page);

    const t = translations[currentLanguage];

    document.querySelectorAll(".menu-item").forEach(item => {
        item.classList.remove("active");
    });

    const selectedMenu = document.querySelector(
        `.menu-item[data-page="${page}"]`
    );

    if (selectedMenu) {
        selectedMenu.classList.add("active");
    }

    const breadcrumb = document.getElementById("breadcrumb");

    if (breadcrumb) {
        breadcrumb.textContent = (t[page] || page).toUpperCase();
    }


    /* DASHBOARD + MOVIES */

    if (page === "dashboard" || page === "movies") {

        pageContent.innerHTML = originalDashboard;

        updateLanguage();

        loadMovies();

        return;

    }


    /* ============================= */
    /* ADD / EDIT MOVIE */
    /* ============================= */

    if (page === "add") {

        const isEditing = Boolean(editMovieId);

        pageContent.innerHTML = `

            <section class="form-page">

                <div class="form-heading">

                    <p class="section-kicker">
                        THE CINEMA ARCHIVE
                    </p>

                    <h1>
                        ${isEditing ? "Edit Chitra" : "New Chitra"}
                    </h1>

                    <p class="welcome-description">
                        ${isEditing
                            ? "Update your preserved film."
                            : "Preserve a film in your collection."}
                    </p>

                </div>

                <form id="movie-form" class="movie-form">

                    <div class="form-field full-width">

                        <label for="title">
                            Movie Title
                        </label>

                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Enter movie title"
                            required>

                    </div>

                    <div class="form-field">

                        <label for="genre">
                            Genre
                        </label>

                        <input
                            type="text"
                            id="genre"
                            name="genre"
                            placeholder="e.g. Drama, Action"
                            required>

                    </div>

                    <div class="form-field">

                        <label for="year">
                            Release Year
                        </label>

                        <input
                            type="number"
                            id="year"
                            name="year"
                            placeholder="e.g. 2024"
                            min="1888"
                            max="2100"
                            required>

                    </div>

                    <div class="form-field">

                        <label for="rating">
                            Rating (0 - 10)
                        </label>

                        <input
                            type="number"
                            id="rating"
                            name="rating"
                            placeholder="e.g. 8.5"
                            min="0"
                            max="10"
                            step="0.1"
                            required>

                    </div>

                    <div class="form-field">

                        <label for="director">
                            Director
                        </label>

                        <input
                            type="text"
                            id="director"
                            name="director"
                            placeholder="Director name"
                            required>

                    </div>

                    <div class="form-group">

                        <label for="actors">
                            Actors
                        </label>

                        <input
                            type="text"
                            id="actors"
                            name="actors"
                            placeholder="Separate actor names with commas">

                    </div>

                    <div class="form-group">

                        <label for="poster">
                            Movie Poster URL
                        </label>

                        <input
                            type="url"
                            id="poster"
                            name="poster"
                            placeholder="Paste movie poster URL">

                    </div>

                    <div class="poster-preview-container">

                        <img
                            id="poster-preview"
                            src=""
                            alt="Movie Poster Preview"
                            style="display:none;">

                    </div>

                    <div class="form-group full-width">

                        <label for="trailer">
                            Trailer / Glimpse YouTube URL
                        </label>

                        <input
                            type="url"
                            id="trailer"
                            name="trailer"
                            placeholder="Paste YouTube trailer or glimpse link">

                    </div>

                    <div class="form-group">

                        <label for="ottPlatform">
                            OTT Platform
                        </label>

                        <input
                            type="text"
                            id="ottPlatform"
                            name="ottPlatform"
                            placeholder="e.g. Netflix, Prime Video, aha">

                    </div>

                    <div class="form-group">

                        <label for="ottStatus">
                            OTT Status
                        </label>

                        <select id="ottStatus" name="ottStatus">

                            <option value="">
                                Select Status
                            </option>

                            <option value="Available">
                                Available
                            </option>

                            <option value="Upcoming">
                                Upcoming
                            </option>

                            <option value="Not Available">
                                Not Available
                            </option>

                        </select>

                    </div>

                    <div class="form-group full-width">

                        <label for="ottLink">
                            OTT Watch URL
                        </label>

                        <input
                            type="url"
                            id="ottLink"
                            name="ottLink"
                            placeholder="Paste direct OTT movie link">

                    </div>

                    <div class="form-actions full-width">

                        <button
                            type="button"
                            class="cancel-button"
                            data-page="dashboard">

                            Cancel

                        </button>

                        <button
                            type="submit"
                            class="submit-movie-button">

                            ${isEditing
                                ? "Update Chitra"
                                : "Preserve Chitra"}

                        </button>

                    </div>

                </form>

            </section>

        `;

        return;

    }


    /* ============================= */
    /* GENRES */
    /* ============================= */

    if (page === "genres") {

        loadGenresPage();

        return;

    }


    /* ============================= */
    /* SETTINGS */
    /* ============================= */

    if (page === "settings") {

        pageContent.innerHTML = `

            <section class="settings-page">

                <div class="settings-hero">

                    <p class="section-kicker">
                        KALAMANDIRA / PREFERENCES
                    </p>

                    <h1>Settings</h1>

                    <p>
                        Customize your cinema experience.
                    </p>

                </div>

                <div class="settings-grid">

                    <article class="settings-card">

                        <div class="settings-icon">
                            ◐
                        </div>

                        <div class="settings-card-content">

                            <p class="section-kicker">
                                APPEARANCE
                            </p>

                            <h2>
                                Display Theme
                            </h2>

                            <p>
                                Switch between original, light and dark themes.
                            </p>

                            <button
                                class="settings-action"
                                id="settings-theme-button">

                                Change Theme

                            </button>

                            <span
                                class="settings-current"
                                id="settings-theme-status">

                                Current theme: Original

                            </span>

                        </div>

                    </article>

                    <article class="settings-card">

                        <div class="settings-icon">
                            文
                        </div>

                        <div class="settings-card-content">

                            <p class="section-kicker">
                                LANGUAGE
                            </p>

                            <h2>
                                Interface Language
                            </h2>

                            <p>
                                Switch the interface between original and English.
                            </p>

                            <button
                                class="settings-action"
                                id="settings-language-button">

                                Change Language

                            </button>

                            <span
                                class="settings-current"
                                id="settings-language-status">

                                Current language:
                                ${currentLanguage === "original"
                                    ? "Original"
                                    : "English"}

                            </span>

                        </div>

                    </article>

                    <article class="settings-card">

                        <div class="settings-icon">
                            🎞
                        </div>

                        <div class="settings-card-content">

                            <p class="section-kicker">
                                YOUR ARCHIVE
                            </p>

                            <h2>
                                Movie Collection
                            </h2>

                            <p>
                                Your films are preserved in your connected cinema database.
                            </p>

                            <button
                                class="settings-action"
                                data-page="movies">

                                Explore Collection

                            </button>

                        </div>

                    </article>

                    <article class="settings-card">

                        <div class="settings-icon">
                            ✦
                        </div>

                        <div class="settings-card-content">

                            <p class="section-kicker">
                                ABOUT
                            </p>

                            <h2>
                                KALAMANDIRA
                            </h2>

                            <p>
                                The House of Cinema. A personal archive
                                built to preserve, explore and celebrate films.
                            </p>

                            <span class="settings-current">

                                Your cinema.
                                Your collection.
                                Your archive.

                            </span>

                        </div>

                    </article>

                </div>

            </section>

        `;


        /* THEME CONTROL */

        const settingsThemeButton = document.getElementById(
            "settings-theme-button"
        );

        const settingsThemeStatus = document.getElementById(
            "settings-theme-status"
        );

        function refreshSettingsTheme() {

            if (settingsThemeStatus) {

                const themeNames = {
                    original: "Original",
                    light: "Light",
                    dark: "Dark"
                };

                settingsThemeStatus.textContent =
                    "Current theme: " + themeNames[currentTheme];

            }

        }

        refreshSettingsTheme();

        if (settingsThemeButton) {

            settingsThemeButton.addEventListener("click", () => {

                if (themeButton) {
                    themeButton.click();
                }

                refreshSettingsTheme();

            });

        }


        /* LANGUAGE CONTROL */

        const settingsLanguageButton = document.getElementById(
            "settings-language-button"
        );

        const settingsLanguageStatus = document.getElementById(
            "settings-language-status"
        );

        function refreshSettingsLanguage() {

            if (settingsLanguageStatus) {

                settingsLanguageStatus.textContent =
                    "Current language: " +
                    (currentLanguage === "original"
                        ? "Original"
                        : "English");

            }

        }

        refreshSettingsLanguage();

        if (settingsLanguageButton) {

            settingsLanguageButton.addEventListener("click", () => {

                if (languageButton) {
                    languageButton.click();
                }

                refreshSettingsLanguage();

            });

        }

        return;

    }

}

/* ============================= */
/* GENRES LIBRARY */
/* ============================= */

async function loadGenresPage() {

    try {
const response = await fetch("https://kalamandira.onrender.com/api/movies");

        if (!response.ok) {
            throw new Error("Genres API failed");
        }

        const movies = await response.json();

        const groupedMovies = {};

        movies.forEach(movie => {

           const genre = (Array.isArray(movie.genre)
    ? movie.genre.join(", ")
    : String(movie.genre ?? "")).trim() || "Uncategorized";

if (!groupedMovies[genre]) {
    groupedMovies[genre] = [];
}

groupedMovies[genre].push(movie);

});

        const genreNames = Object.keys(groupedMovies).sort();

        const escapeHTML = value => String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");


        /* GENRES PAGE */

        pageContent.innerHTML = `

            <section class="genres-library">

                <div class="genres-hero">

                    <p class="section-kicker">
                        KALAMANDIRA / THE GENRE COLLECTION
                    </p>

                    <h1>
                        Genres Library
                    </h1>

                    <p>
                        Every genre opens a different world of cinema.
                        Explore the stories preserved in your collection.
                    </p>

                    <div class="genres-hero-meta">

                        <span>
                            ${genreNames.length} Genres
                        </span>

                        <span>
                            ${movies.length} Films
                        </span>

                    </div>

                </div>


                <section class="genre-discovery">

                    <div class="section-heading">

                        <div>

                            <p class="section-kicker">
                                EXPLORE
                            </p>

                            <h2>
                                Choose Your Rasa
                            </h2>

                        </div>

                    </div>


                    <div class="genre-library-grid">

                        ${genreNames.map((genre, index) => `

                            <button
                                class="genre-library-card"
                                data-open-genre="${escapeHTML(genre)}">

                                <span class="genre-card-number">

                                    ${String(index + 1).padStart(2, "0")}

                                </span>

                                <div class="genre-card-content">

                                    <h3>
                                        ${escapeHTML(genre)}
                                    </h3>

                                    <p>

                                        ${groupedMovies[genre].length}

                                        ${groupedMovies[genre].length === 1
                                            ? "Film"
                                            : "Films"}

                                    </p>

                                </div>

                                <span class="genre-card-arrow">
                                    ↗
                                </span>

                            </button>

                        `).join("")}

                    </div>

                </section>


                <section
                    id="genre-selected-section"
                    class="genre-selected-section">

                    <div class="genre-selected-empty">

                        <span>
                            🎞
                        </span>

                        <h2>
                            Explore a genre
                        </h2>

                        <p>
                            Select a genre above to discover
                            its films in your collection.
                        </p>

                    </div>

                </section>

            </section>

        `;


        /* GENRE CLICK */

        pageContent.querySelectorAll("[data-open-genre]")
            .forEach(button => {

                button.addEventListener("click", () => {

                    const selectedGenre = button.dataset.openGenre;

                    const selectedMovies = groupedMovies[selectedGenre];

                    const selectedSection = document.getElementById(
                        "genre-selected-section"
                    );

                    if (!selectedSection) return;


                    /* ACTIVE CARD */

                    pageContent.querySelectorAll(
                        ".genre-library-card"
                    ).forEach(card => {

                        card.classList.remove("selected");

                    });

                    button.classList.add("selected");


                    /* SELECTED MOVIES */

                    selectedSection.innerHTML = `

                        <div class="genre-selected-heading">

                            <div>

                                <p class="section-kicker">
                                    SELECTED COLLECTION
                                </p>

                                <h2>
                                    ${escapeHTML(selectedGenre)}
                                </h2>

                                <p>
                                    ${selectedMovies.length} films
                                    in this genre
                                </p>

                            </div>

                        </div>


                        <div class="cinema-row genre-selected-row">

                            ${selectedMovies.map(movie =>
                                createMovieCard(movie, escapeHTML)
                            ).join("")}

                        </div>

                    `;


                    /* SCROLL */

                    selectedSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                });

            });


    } catch (error) {

        console.error("Genres Library error:", error);

        pageContent.innerHTML = `

            <section class="page-placeholder">

                <h2>
                    Genres could not be loaded.
                </h2>

                <p>
                    Please check the server connection.
                </p>

            </section>

        `;

    }

}


/* ============================= */
/* NAVIGATION + EDIT + DELETE */
/* ============================= */

document.addEventListener("click", async (event) => {


    /* NAVIGATION */

    const pageButton = event.target.closest("[data-page]");

    if (pageButton) {

        editMovieId = null;

        openPage(pageButton.dataset.page);

        return;

    }


    /* ============================= */
    /* EDIT MOVIE */
    /* ============================= */

    const editButton = event.target.closest("[data-edit]");

    if (editButton) {

        editMovieId = editButton.dataset.edit;

        try {

       const response = await fetch(
    `https://kalamandira.onrender.com/api/movies/${editMovieId}`
);

            const movie = await response.json();

            if (!response.ok) {

                alert("Movie details could not be loaded.");

                editMovieId = null;

                return;

            }


            /* OPEN FORM */

            openPage("add");


            /* BASIC FIELDS */

            document.getElementById("title").value =
                movie.title || "";

            document.getElementById("genre").value =
                movie.genre || "";

            document.getElementById("year").value =
                movie.year || "";

            document.getElementById("rating").value =
                movie.rating ?? "";

            document.getElementById("director").value =
                movie.director || "";

            document.getElementById("actors").value =
                (movie.actors || []).join(", ");

            document.getElementById("poster").value =
                movie.poster || "";


            /* TRAILER + OTT FIELDS */

            document.getElementById("trailer").value =
                movie.trailer || "";

            document.getElementById("ottPlatform").value =
                movie.ottPlatform || "";

            document.getElementById("ottLink").value =
                movie.ottLink || "";

            document.getElementById("ottStatus").value =
                movie.ottStatus || "";


            /* POSTER PREVIEW */

            const preview = document.getElementById(
                "poster-preview"
            );

            if (movie.poster && preview) {

                preview.src = movie.poster;

                preview.style.display = "block";

            }


        } catch (error) {

            console.error(error);

            alert("Could not load movie for editing.");

            editMovieId = null;

        }

        return;

    }


    /* ============================= */
    /* DELETE MOVIE */
    /* ============================= */

    const deleteButton = event.target.closest("[data-delete]");

    if (deleteButton) {

        const movieId = deleteButton.dataset.delete;

        const confirmed = confirm(
            "Are you sure you want to remove this movie from KALAMANDIRA?"
        );

        if (!confirmed) return;

        try {

       const response = await fetch(
    `https://kalamandira.onrender.com/api/movies/${movieId}`,
    {
        method: "DELETE"
    }
);
            const result = await response.json();

            if (!response.ok) {

                alert(result.message || "Movie deletion failed.");

                return;

            }

            alert("Movie removed from your collection.");

            loadMovies();


        } catch (error) {

            console.error(error);

            alert("Server connection failed.");

        }

    }

});


/* ============================= */
/* INITIAL SETTINGS */
/* ============================= */

updateLanguage();

applyTheme();


/* ============================= */
/* POSTER PREVIEW */
/* ============================= */

document.addEventListener("input", event => {

    if (event.target.id === "poster") {

        const preview = document.getElementById(
            "poster-preview"
        );

        if (preview) {

            preview.src = event.target.value;

            preview.style.display =
                event.target.value ? "block" : "none";

        }

    }

});


/* ============================= */
/* ADD + UPDATE MOVIE */
/* ============================= */

document.addEventListener("submit", async event => {

    if (event.target.id !== "movie-form") return;

    event.preventDefault();

    const form = event.target;


    /* MOVIE DATA */

    const movieData = {

        title: form.querySelector("#title").value.trim(),

        genre: form.querySelector("#genre").value.trim(),

        year: Number(form.querySelector("#year").value),

        rating: Number(form.querySelector("#rating").value),

        director: form.querySelector("#director").value.trim(),

        actors: form.querySelector("#actors").value
            .split(",")
            .map(actor => actor.trim())
            .filter(Boolean),

        poster: form.querySelector("#poster").value.trim(),

        trailer: form.querySelector("#trailer").value.trim(),

        ottPlatform: form.querySelector("#ottPlatform").value.trim(),

        ottLink: form.querySelector("#ottLink").value.trim(),

        ottStatus: form.querySelector("#ottStatus").value

    };


    /* SAVE */

    console.log("MOVIE DATA SENT:", movieData);

    try {

const url = editMovieId
    ? `https://kalamandira.onrender.com/api/movies/${editMovieId}`
    : "https://kalamandira.onrender.com/api/movies";

        const method = editMovieId
            ? "PUT"
            : "POST";

        console.log("EDIT MOVIE ID:", editMovieId);
console.log("REQUEST METHOD:", method);


        const response = await fetch(url, {

            method,

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(movieData)

        });


        const result = await response.json();


        if (!response.ok) {

            alert(result.message || "Movie could not be saved.");

            return;

        }


        /* SUCCESS */

        alert(

            editMovieId
                ? "Movie successfully updated!"
                : "Movie successfully preserved in KALAMANDIRA!"

        );


        editMovieId = null;

        openPage("dashboard");


    } catch (error) {

        console.error(error);

        alert("Server connection failed!");

    }

});


/* ============================= */
/* LOAD MOVIES FROM DATABASE */
/* ============================= */

async function loadMovies() {

    try {

        const response = await fetch("https://kalamandira.onrender.com/api/movies");

        if (!response.ok) {

            throw new Error(
                "Movies API failed: " + response.status
            );

        }

        const movies = await response.json();

        const movieGrid = document.getElementById(
            "movie-grid"
        );

        const emptyState = document.getElementById(
            "empty-state"
        );


        if (!movieGrid) {

            console.error("movie-grid element not found!");

            return;

        }


        /* EMPTY COLLECTION */

        if (!movies.length) {

            movieGrid.innerHTML = "";

            if (emptyState) {
                emptyState.style.display = "block";
            }

            updateMovieStats([]);

            populateGenreFilter([]);

            return;

        }


        if (emptyState) {
            emptyState.style.display = "none";
        }


        /* ESCAPE HTML */

        const escapeHTML = value => String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");


      /* GROUP BY GENRE */

const groupedMovies = {};

movies.forEach(movie => {

    const genre = (Array.isArray(movie.genre)
        ? movie.genre.join(", ")
        : String(movie.genre ?? "")).trim() || "Uncategorized";

    if (!groupedMovies[genre]) {
        groupedMovies[genre] = [];
    }

    groupedMovies[genre].push(movie);

});

        /* ALL MOVIES ROW */

        let rowsHTML = `

            <section class="cinema-row-section">

                <div class="cinema-row-heading">

                    <h2>
                        All Movies
                    </h2>

                    <span>
                        ${movies.length} Films
                    </span>

                </div>


                <div class="cinema-row">

                    ${movies.map(movie =>
                        createMovieCard(movie, escapeHTML)
                    ).join("")}

                </div>

            </section>

        `;


        /* GENRE ROWS */

        Object.keys(groupedMovies).sort().forEach(genre => {

            const genreMovies = groupedMovies[genre];

            rowsHTML += `

                <section class="cinema-row-section genre-row">

                    <div class="cinema-row-heading">

                        <h2>
                            ${escapeHTML(genre)}
                        </h2>

                        <span>
                            ${genreMovies.length} Films
                        </span>

                    </div>


                    <div class="cinema-row">

                        ${genreMovies.map(movie =>
                            createMovieCard(movie, escapeHTML)
                        ).join("")}

                    </div>

                </section>

            `;

        });


        /* DASHBOARD */

        movieGrid.innerHTML = `

            <div class="cinema-archive">

                <div class="archive-heading">

                    <p class="section-kicker">
                        THE COLLECTION
                    </p>

                    <h2>
                        Explore Your Cinema
                    </h2>

                </div>

                ${rowsHTML}

            </div>

        `;


        /* STATISTICS */

        updateMovieStats(movies);


        /* FILTER */

        populateGenreFilter(movies);

        applyMovieFilters();


    } catch (error) {

        console.error("Movie loading error:", error);

    }

}


/* ============================= */
/* CREATE POSTER CARD */
/* ============================= */

function createMovieCard(movie, escapeHTML) {

    return `

        <article

            class="cinema-card"

            data-id="${escapeHTML(movie._id)}"

            data-search="${escapeHTML(

                `${movie.title} ${movie.genre} ${movie.director} ${(movie.actors || []).join(" ")}`

            ).toLowerCase()}"

            data-genre="${escapeHTML(movie.genre || "").toLowerCase()}"

        >


            <div class="cinema-poster">


                ${
                    movie.poster

                    ? `

                        <img

                            src="${escapeHTML(movie.poster)}"

                            alt="${escapeHTML(movie.title)}"

                            loading="lazy"

                            onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"

                        >

                        <div

                            class="poster-fallback"

                            style="display:none;">

                            🎞

                        </div>

                    `

                    : `

                        <div class="poster-fallback">
                            🎞
                        </div>

                    `

                }


                <div class="poster-overlay">


                    <div class="poster-top">

                        <span class="poster-rating">

                            ★ ${escapeHTML(movie.rating)}

                        </span>

                    </div>


                    <div class="poster-details">


                        <h3>

                            ${escapeHTML(movie.title)}

                        </h3>


                        <p>

                            ${escapeHTML(movie.year)}
                            ·
                            ${escapeHTML(movie.genre)}

                        </p>


                        <p class="poster-director">

                            Director:
                            ${escapeHTML(movie.director)}

                        </p>


                        <p class="poster-actors">

                            ${(movie.actors || []).map(escapeHTML).join(", ")}

                        </p>


                        <div class="poster-actions">


                            <button

                                class="edit-movie"

                                data-edit="${escapeHTML(movie._id)}">

                                ✎ Edit

                            </button>


                            <button

                                class="delete-movie"

                                data-delete="${escapeHTML(movie._id)}">

                                × Delete

                            </button>


                        </div>


                    </div>


                </div>


            </div>


            <div class="card-caption">

                <h4>
                    ${escapeHTML(movie.title)}
                </h4>

                <p>

                    ${escapeHTML(movie.year)}
                    ·
                    ${escapeHTML(movie.genre)}

                </p>

            </div>


        </article>

    `;

}


/* ============================= */
/* STATISTICS */
/* ============================= */

function updateMovieStats(movies) {

    const totalMovies = document.getElementById("total-movies");

    const totalGenres = document.getElementById("total-genres");

    const latestYear = document.getElementById("latest-year");


    if (totalMovies) {
        totalMovies.textContent = movies.length;
    }


    /* COUNT UNIQUE GENRES */

    const allGenres = movies.flatMap(movie => {

        const genreList = Array.isArray(movie.genre)
            ? movie.genre
            : String(movie.genre ?? "").split(",");

        return genreList
            .map(genre => String(genre).trim().toLowerCase())
            .filter(Boolean);

    });

    const uniqueGenres = new Set(allGenres);


    if (totalGenres) {
        totalGenres.textContent = uniqueGenres.size;
    }


    /* LATEST YEAR */

    const years = movies
        .map(movie => Number(movie.year))
        .filter(year => Number.isFinite(year) && year > 0);


    if (latestYear) {

        latestYear.textContent = years.length
            ? Math.max(...years)
            : "—";

    }

}

/* ============================= */
/* GENRE FILTER */
/* ============================= */

function populateGenreFilter(movies) {

    const genreFilter = document.getElementById(
        "genre-filter"
    );

    if (!genreFilter) return;

    const selectedValue = genreFilter.value;

    const genres = [...new Set(

        movies.flatMap(movie => {

            const genreList = Array.isArray(movie.genre)
                ? movie.genre
                : String(movie.genre ?? "").split(",");

            return genreList
                .map(genre => String(genre).trim())
                .filter(Boolean);

        })

    )].sort();


    genreFilter.innerHTML = `

        <option value="all">
            All Genres
        </option>

        ${genres.map(genre => `

            <option value="${genre.replace(/"/g, "&quot;")}">

                ${genre}

            </option>

        `).join("")}

    `;


    if (genres.some(

        genre => genre.toLowerCase() === selectedValue.toLowerCase()

    )) {

        genreFilter.value = selectedValue;

    }

}


/* ============================= */
/* SEARCH + FILTER */
/* ============================= */

function applyMovieFilters() {

    const searchInput = document.getElementById(
        "search-input"
    );

    const genreFilter = document.getElementById(
        "genre-filter"
    );


    const searchTerm = searchInput?.value.trim().toLowerCase() || "";

    const selectedGenre = genreFilter?.value.toLowerCase() || "all";


    document.querySelectorAll(".cinema-card").forEach(card => {

        const matchesSearch = card.dataset.search.includes(searchTerm);


        const matchesGenre =

            selectedGenre === "all" ||

            card.dataset.genre === selectedGenre;


        card.style.display =

            matchesSearch && matchesGenre

                ? ""

                : "none";

    });


    /* HIDE EMPTY GENRE ROWS */

    document.querySelectorAll(".genre-row").forEach(row => {

        const visibleCards = row.querySelectorAll(

            '.cinema-card:not([style*="display: none"])'

        );


        row.style.display = visibleCards.length

            ? ""

            : "none";

    });

}


document.addEventListener("input", event => {

    if (event.target.id === "search-input") {

        applyMovieFilters();

    }

});


document.addEventListener("change", event => {

    if (event.target.id === "genre-filter") {

        applyMovieFilters();

    }

});


/* ============================= */
/* MOVIE DETAILS MODAL */
/* ============================= */

const movieModal = document.getElementById(
    "movie-modal"
);

const movieModalBackdrop = document.getElementById(
    "movie-modal-backdrop"
);

const movieModalClose = document.getElementById(
    "movie-modal-close"
);


const modalPoster = document.getElementById(
    "modal-movie-poster"
);

const modalTitle = document.getElementById(
    "modal-movie-title"
);

const modalYear = document.getElementById(
    "modal-movie-year"
);

const modalRating = document.getElementById(
    "modal-movie-rating"
);

const modalGenre = document.getElementById(
    "modal-movie-genre"
);

const modalDirector = document.getElementById(
    "modal-movie-director"
);

const modalActors = document.getElementById(
    "modal-movie-actors"
);

const modalDescription = document.getElementById(
    "modal-movie-description"
);


/* TRAILER + OTT ELEMENTS */

const modalTrailer = document.getElementById(
    "modal-movie-trailer"
);

const modalOttPlatform = document.getElementById(
    "modal-ott-platform"
);

const modalOttStatus = document.getElementById(
    "modal-ott-status"
);

const modalOttLink = document.getElementById(
    "modal-ott-link"
);


/* ============================= */
/* YOUTUBE EMBED CONVERTER */
/* ============================= */

function getYouTubeEmbedURL(url) {

    if (!url) return "";

    try {

        const parsedURL = new URL(url);

        let videoId = "";


        /* YOUTU.BE */

        if (parsedURL.hostname.includes("youtu.be")) {

            videoId = parsedURL.pathname.slice(1);

        }


        /* YOUTUBE */

        else if (

            parsedURL.hostname.includes("youtube.com") ||

            parsedURL.hostname.includes("youtube-nocookie.com")

        ) {


            videoId = parsedURL.searchParams.get("v") || "";


            if (!videoId) {

                const match = parsedURL.pathname.match(

                    /\/(?:embed|shorts|live)\/([^/?]+)/

                );


                if (match) {

                    videoId = match[1];

                }

            }

        }


        /* VALIDATE VIDEO ID */

        if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {

            return "";

        }


        return `https://www.youtube-nocookie.com/embed/${videoId}`;


    } catch (error) {

        return "";

    }

}


/* ============================= */
/* OPEN MOVIE DETAILS */
/* ============================= */

function openMovieModal(movie) {

    if (!movieModal) return;


    /* POSTER */

    if (modalPoster) {

        modalPoster.src = movie.poster || "";

        modalPoster.alt = movie.title || "Movie poster";

        modalPoster.style.display = movie.poster
            ? "block"
            : "none";


        modalPoster.onerror = function () {

            this.style.display = "none";

        };

    }


    /* BASIC INFORMATION */

    if (modalTitle) {

        modalTitle.textContent =
            movie.title || "Untitled Movie";

    }


    if (modalYear) {

        modalYear.textContent =
            movie.year || "Year unknown";

    }


    if (modalRating) {

        modalRating.textContent =

            movie.rating != null

                ? "★ " + movie.rating + " / 10"

                : "Rating unavailable";

    }


    if (modalGenre) {

        modalGenre.textContent =
            movie.genre || "Not specified";

    }


    if (modalDirector) {

        modalDirector.textContent =
            movie.director || "Not specified";

    }


    if (modalActors) {

        modalActors.textContent =

            Array.isArray(movie.actors)

                ? movie.actors.join(", ")

                : "Not specified";

    }


    if (modalDescription) {

        modalDescription.textContent =

            movie.description ||

            `${movie.title || "This film"} is part of your KALAMANDIRA cinema archive.`;

    }


    /* ============================= */
    /* TRAILER */
    /* ============================= */

    if (modalTrailer) {

        const embedURL = getYouTubeEmbedURL(
            movie.trailer
        );


        modalTrailer.src = embedURL;


        const trailerSection = modalTrailer.closest(
            ".trailer-section"
        );


        if (trailerSection) {

            trailerSection.style.display = embedURL

                ? "block"

                : "none";

        }

    }


    /* ============================= */
    /* OTT PLATFORM */
    /* ============================= */

    if (modalOttPlatform) {

        modalOttPlatform.textContent =

            movie.ottPlatform ||

            "Platform not specified";

    }


    /* OTT STATUS */

    if (modalOttStatus) {

        modalOttStatus.textContent =

            movie.ottStatus ||

            "";

    }


    /* ============================= */
    /* OTT LINK */
    /* ============================= */

    if (modalOttLink) {


        let validOTTLink = false;


        try {

            const parsedOTTURL = new URL(
                movie.ottLink || ""
            );


            validOTTLink = [

                "http:",

                "https:"

            ].includes(parsedOTTURL.protocol);


        } catch (error) {

            validOTTLink = false;

        }


        if (validOTTLink) {


            modalOttLink.href = movie.ottLink;


            modalOttLink.style.display = "inline-flex";


        } else {


            modalOttLink.removeAttribute("href");


            modalOttLink.style.display = "none";

        }

    }


    /* SHOW MODAL */

    movieModal.classList.remove("hidden");

    movieModal.classList.add("active");

    document.body.classList.add("modal-open");

}


/* ============================= */
/* CLOSE MOVIE DETAILS */
/* ============================= */

function closeMovieModal() {

    if (!movieModal) return;


    movieModal.classList.remove("active");

    movieModal.classList.add("hidden");

    document.body.classList.remove("modal-open");


    /* STOP TRAILER */

    if (modalTrailer) {

        modalTrailer.src = "";

    }

}


/* CLOSE BUTTON */

if (movieModalClose) {

    movieModalClose.addEventListener(
        "click",
        closeMovieModal
    );

}


/* BACKDROP */

if (movieModalBackdrop) {

    movieModalBackdrop.addEventListener(
        "click",
        closeMovieModal
    );

}


/* ESCAPE KEY */

document.addEventListener("keydown", event => {

    if (

        event.key === "Escape" &&

        movieModal?.classList.contains("active")

    ) {

        closeMovieModal();

    }

});


/* ============================= */
/* POSTER CLICK */
/* ============================= */

document.addEventListener("click", async (event) => {


    /* IGNORE EDIT + DELETE */

    if (

        event.target.closest("[data-edit]") ||

        event.target.closest("[data-delete]")

    ) {

        return;

    }


    const movieCard = event.target.closest(
        ".cinema-card"
    );


    if (!movieCard) return;


    const movieId = movieCard.dataset.id;


    if (!movieId) {

        console.error("Movie ID missing from card");

        return;

    }


    try {


       const response = await fetch(
    `https://kalamandira.onrender.com/api/movies/${movieId}`
);


        const movie = await response.json();


        if (!response.ok) {

            console.error("API response:", movie);

            alert("Movie could not be found.");

            return;

        }


        openMovieModal(movie);


    } catch (error) {

        console.error("Movie modal error:", error);

        alert("Movie details could not be opened.");

    }

});


/* ============================= */
/* FULLSCREEN */
/* ============================= */

const fullscreenBtn = document.getElementById(
    "fullscreen-toggle"
);


if (fullscreenBtn) {


    fullscreenBtn.addEventListener("click", async () => {


        try {


            if (!document.fullscreenElement) {

                await document.documentElement.requestFullscreen();

            } else {

                await document.exitFullscreen();

            }


        } catch (error) {

            console.error("Fullscreen error:", error);

        }

    });


    fullscreenBtn.style.display = "flex";


    document.addEventListener("fullscreenchange", () => {


        const isFullscreen = !!document.fullscreenElement;


        fullscreenBtn.style.display = isFullscreen

            ? "none"

            : "flex";


    });

}


/* ============================= */
/* INITIAL DATABASE LOAD */
/* ============================= */

loadMovies();

/* ========================================== */
/* KALAMANDIRA - CINEMATIC FEATURED HERO */
/* ========================================== */

let featuredMovie = null;

const heroTitle = document.getElementById("hero-title");
const heroYear = document.getElementById("hero-year");
const heroRating = document.getElementById("hero-rating");
const heroGenre = document.getElementById("hero-genre");
const heroDescription = document.getElementById("hero-description");

const heroBackdropImage = document.getElementById(
    "hero-backdrop-image"
);

const heroTrailer = document.getElementById(
    "hero-trailer"
);

const heroPlayButton = document.getElementById(
    "hero-play-button"
);

const heroInfoButton = document.getElementById(
    "hero-info-button"
);


/* ========================================== */
/* HERO TRAILER URL */
/* ========================================== */

function getHeroTrailerURL(url) {

    const videoURL = getYouTubeEmbedURL(url);

    if (!videoURL) return "";

    return videoURL +
        "?autoplay=1&mute=1&controls=0&loop=1&playlist=" +
        videoURL.split("/").pop() +
        "&playsinline=1&rel=0";

}


/* ========================================== */
/* LOAD FEATURED MOVIE */
/* ========================================== */

async function loadFeaturedMovie() {

    try {

       const response = await fetch("https://kalamandira.onrender.com/api/movies");

        if (!response.ok) {

            throw new Error("Featured movie API failed");

        }

        const movies = await response.json();

        if (!movies.length) {

            if (heroTitle) {
                heroTitle.textContent = "Your Cinema Awaits";
            }

            if (heroDescription) {

                heroDescription.textContent =
                    "Preserve your favourite films in KALAMANDIRA.";

            }

            if (heroTrailer) {
                heroTrailer.src = "";
            }

            return;

        }


        /* SELECT FEATURED MOVIE */

        const sortedMovies = [...movies].sort((a, b) => {

            return (Number(b.year) || 0) -
                (Number(a.year) || 0);

        });

        featuredMovie = sortedMovies[0];


        /* TITLE */

        if (heroTitle) {

            heroTitle.textContent =
                featuredMovie.title || "Untitled Movie";

        }


        /* YEAR */

        if (heroYear) {

            heroYear.textContent =
                featuredMovie.year || "";

        }


        /* RATING */

        if (heroRating) {

            heroRating.textContent =

                featuredMovie.rating != null

                    ? "★ " + featuredMovie.rating

                    : "";

        }


        /* GENRE */

        if (heroGenre) {

            heroGenre.textContent =
                featuredMovie.genre || "";

        }


        /* DESCRIPTION */

        if (heroDescription) {

            heroDescription.textContent =

                featuredMovie.description ||

                `${featuredMovie.title} is preserved in your KALAMANDIRA collection.`;

        }


        /* BACKDROP */

        if (heroBackdropImage) {

            if (featuredMovie.poster) {

                heroBackdropImage.src =
                    featuredMovie.poster;

                heroBackdropImage.style.display = "block";

                heroBackdropImage.onerror = function () {

                    this.style.display = "none";

                };

            } else {

                heroBackdropImage.removeAttribute("src");

            }

        }


        /* AUTOPLAY TRAILER */

        if (heroTrailer) {

            const trailerURL = getHeroTrailerURL(
                featuredMovie.trailer
            );

            heroTrailer.src = trailerURL;

            const videoContainer = heroTrailer.closest(
                ".hero-video-container"
            );

            if (videoContainer) {

                videoContainer.style.display =
                    trailerURL ? "block" : "none";

            }

        }


    } catch (error) {

        console.error(
            "Featured hero loading error:",
            error
        );

    }

}


/* ========================================== */
/* HERO PLAY TRAILER */
/* ========================================== */

if (heroPlayButton) {

    heroPlayButton.addEventListener("click", () => {

        if (!featuredMovie) {

            alert("No featured movie available.");

            return;

        }

        openMovieModal(featuredMovie);

    });

}


/* ========================================== */
/* HERO MORE INFO */
/* ========================================== */

if (heroInfoButton) {

    heroInfoButton.addEventListener("click", () => {

        if (!featuredMovie) {

            alert("No featured movie available.");

            return;

        }

        openMovieModal(featuredMovie);

    });

}


/* ========================================== */
/* HERO INITIALIZATION */
/* ========================================== */

loadFeaturedMovie();
