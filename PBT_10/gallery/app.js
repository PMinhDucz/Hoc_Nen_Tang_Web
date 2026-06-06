const grid = document.getElementById("galleryGrid");
const loadingIndicator = document.getElementById("loadingIndicator");
const loadTrigger = document.getElementById("loadTrigger");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxAuthor = document.getElementById("lightboxAuthor");
const closeLightbox = document.getElementById("closeLightbox");

let currentPage = 1;
const limit = 20;
let isFetching = false;
let hasMore = true;

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.onload = () => img.classList.add("loaded");
            observer.unobserve(img);
        }
    });
}, { rootMargin: "0px 0px 50px 0px" });

async function fetchPhotos() {
    if (isFetching || !hasMore) return;
    isFetching = true;
    loadingIndicator.classList.add("active");

    try {
        const response = await fetch(`https://picsum.photos/v2/list?page=${currentPage}&limit=${limit}`);
        if (!response.ok) throw new Error("API call failed");
        
        const photos = await response.json();
        if (photos.length === 0) {
            hasMore = false;
            loadingIndicator.innerHTML = "<span>Đã tải hết ảnh!</span>";
            return;
        }

        photos.forEach(photo => {
            const lowResUrl = `https://picsum.photos/id/${photo.id}/400/300`;
            const highResUrl = `https://picsum.photos/id/${photo.id}/1200/900`;
            
            const card = document.createElement("div");
            card.className = "gallery-item";
            
            const img = document.createElement("img");
            img.className = "gallery-image";
            img.dataset.src = lowResUrl;
            img.alt = photo.author;
            
            const overlay = document.createElement("div");
            overlay.className = "item-overlay";
            overlay.innerHTML = `<span class="author-name">${photo.author}</span>`;
            
            card.appendChild(img);
            card.appendChild(overlay);
            grid.appendChild(card);
            
            imageObserver.observe(img);
            
            card.addEventListener("click", () => openLightbox(highResUrl, photo.author));
        });

        currentPage++;
    } catch (error) {
        loadingIndicator.innerHTML = "<span style='color: #ef4444'>Lỗi kết nối! Vui lòng tải lại trang.</span>";
    } finally {
        if (hasMore) {
            isFetching = false;
            loadingIndicator.classList.remove("active");
        }
    }
}

const scrollObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        fetchPhotos();
    }
}, { rootMargin: "0px 0px 200px 0px" });

scrollObserver.observe(loadTrigger);

function openLightbox(url, author) {
    lightboxImage.src = url;
    lightboxAuthor.textContent = author;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
}

closeLightbox.addEventListener("click", () => {
    lightbox.classList.remove("active");
    document.body.style.overflow = "auto";
    setTimeout(() => { lightboxImage.src = ""; }, 300);
});

lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        closeLightbox.click();
    }
});
