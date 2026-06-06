const images = Array.from({ length: 9 }, (_, i) => `https://placehold.co/800x400?text=Image+${i + 1}`);
let currentIndex = 0;
let isPlaying = false;
let slideInterval;

const mainImage = document.getElementById("mainImage");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const counter = document.getElementById("counter");
const thumbnailsContainer = document.querySelector(".thumbnails");
const statusBadge = document.getElementById("slideshowStatus");

const paletteOverlay = document.getElementById("commandPalette");
const paletteInput = document.getElementById("paletteInput");
const commandList = document.getElementById("commandList");

const commands = [
    { name: "Toggle Slideshow", action: toggleSlideshow },
    { name: "Next Image", action: nextImage },
    { name: "Previous Image", action: prevImage },
    { name: "Jump to First Image", action: () => goToImage(0) },
    { name: "Jump to Last Image", action: () => goToImage(8) },
    { name: "Close Command Palette", action: closePalette }
];

let filteredCommands = [...commands];
let selectedCommandIndex = 0;

images.forEach((src, idx) => {
    const img = document.createElement("img");
    img.src = src;
    img.className = `thumb ${idx === 0 ? "active" : ""}`;
    img.alt = `Thumbnail ${idx + 1}`;
    img.tabIndex = 0;
    img.addEventListener("click", () => goToImage(idx));
    img.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            goToImage(idx);
        }
    });
    thumbnailsContainer.appendChild(img);
});

function updateGallery() {
    mainImage.src = images[currentIndex];
    mainImage.alt = `Gallery image ${currentIndex + 1}`;
    counter.textContent = `${currentIndex + 1} / 9`;

    const thumbs = document.querySelectorAll(".thumb");
    thumbs.forEach(t => t.classList.remove("active"));
    thumbs[currentIndex].classList.add("active");
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateGallery();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateGallery();
}

function goToImage(index) {
    if (index >= 0 && index < images.length) {
        currentIndex = index;
        updateGallery();
    }
}

function toggleSlideshow() {
    isPlaying = !isPlaying;
    if (isPlaying) {
        statusBadge.classList.add("playing");
        statusBadge.textContent = "Playing";
        slideInterval = setInterval(nextImage, 2000);
    } else {
        statusBadge.classList.remove("playing");
        statusBadge.textContent = "Paused";
        clearInterval(slideInterval);
    }
}

prevBtn.addEventListener("click", prevImage);
nextBtn.addEventListener("click", nextImage);

document.addEventListener("keydown", e => {
    if (paletteOverlay.classList.contains("active")) return;

    if (e.key === "ArrowRight") {
        nextImage();
    } else if (e.key === "ArrowLeft") {
        prevImage();
    } else if (e.key === " ") {
        if (document.activeElement.tagName === "BUTTON") return;
        e.preventDefault();
        toggleSlideshow();
    } else if (e.key >= "1" && e.key <= "9") {
        goToImage(parseInt(e.key) - 1);
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openPalette();
    }
});

function openPalette() {
    paletteOverlay.classList.add("active");
    paletteOverlay.setAttribute("aria-hidden", "false");
    paletteInput.value = "";
    filteredCommands = [...commands];
    selectedCommandIndex = 0;
    renderCommands();
    paletteInput.focus();
}

function closePalette() {
    paletteOverlay.classList.remove("active");
    paletteOverlay.setAttribute("aria-hidden", "true");
    mainImage.focus();
}

function renderCommands() {
    commandList.innerHTML = "";
    if (filteredCommands.length === 0) {
        const li = document.createElement("li");
        li.className = "command-item";
        li.textContent = "No commands found";
        commandList.appendChild(li);
        return;
    }

    filteredCommands.forEach((cmd, idx) => {
        const li = document.createElement("li");
        li.className = `command-item ${idx === selectedCommandIndex ? "selected" : ""}`;
        li.textContent = cmd.name;
        li.addEventListener("click", () => {
            cmd.action();
            if (cmd.name !== "Close Command Palette") closePalette();
        });
        li.addEventListener("mouseenter", () => {
            selectedCommandIndex = idx;
            renderCommands();
        });
        commandList.appendChild(li);
    });
}

paletteInput.addEventListener("input", e => {
    const query = e.target.value.toLowerCase();
    filteredCommands = commands.filter(c => c.name.toLowerCase().includes(query));
    selectedCommandIndex = 0;
    renderCommands();
});

paletteInput.addEventListener("keydown", e => {
    if (filteredCommands.length === 0) return;

    if (e.key === "ArrowDown") {
        e.preventDefault();
        selectedCommandIndex = (selectedCommandIndex + 1) % filteredCommands.length;
        renderCommands();
    } else if (e.key === "ArrowUp") {
        e.preventDefault();
        selectedCommandIndex = (selectedCommandIndex - 1 + filteredCommands.length) % filteredCommands.length;
        renderCommands();
    } else if (e.key === "Enter") {
        e.preventDefault();
        filteredCommands[selectedCommandIndex].action();
        if (filteredCommands[selectedCommandIndex].name !== "Close Command Palette") closePalette();
    } else if (e.key === "Escape") {
        closePalette();
    }
});

paletteOverlay.addEventListener("click", e => {
    if (e.target === paletteOverlay) {
        closePalette();
    }
});
