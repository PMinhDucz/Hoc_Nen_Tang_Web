const api = {
    baseURL: "https://jsonplaceholder.typicode.com",
    
    async getUsers() {
        const response = await fetch(`${this.baseURL}/users`);
        if (!response.ok) throw new Error("Không thể tải danh sách người dùng");
        return await response.json();
    }
};

const ui = {
    grid: document.getElementById("usersGrid"),
    toastContainer: document.getElementById("toastContainer"),
    
    showLoading() {
        this.grid.innerHTML = "";
        for (let i = 0; i < 6; i++) {
            const skel = document.createElement("div");
            skel.className = "skeleton-card skeleton";
            skel.innerHTML = `
                <div class="skeleton-avatar"></div>
                <div class="skeleton-line"></div>
                <div class="skeleton-line short"></div>
                <div style="margin-top:2rem;" class="skeleton-line"></div>
            `;
            this.grid.appendChild(skel);
        }
    },
    
    renderUsers(users) {
        this.grid.innerHTML = "";
        if (users.length === 0) {
            this.grid.innerHTML = "<p style='grid-column: 1/-1; text-align: center; color: #64748b;'>Không tìm thấy người dùng nào.</p>";
            return;
        }

        users.forEach(user => {
            const card = document.createElement("div");
            card.className = "user-card";
            
            const initials = user.name.split(" ").map(n => n[0]).join("").substring(0, 2);

            card.innerHTML = `
                <div class="user-header">
                    <div class="user-avatar">${initials}</div>
                    <div>
                        <div class="user-name">${user.name}</div>
                        <div class="user-username">@${user.username}</div>
                    </div>
                </div>
                <div class="user-details">
                    <div class="detail-row">📧 ${user.email}</div>
                    <div class="detail-row">📱 ${user.phone}</div>
                    <div class="detail-row">🏢 ${user.company ? user.company.name : 'N/A'}</div>
                </div>
                <div class="card-actions">
                    <button class="action-btn edit-btn" data-id="${user.id}">Edit</button>
                    <button class="action-btn delete-btn" data-id="${user.id}">Delete</button>
                </div>
            `;
            this.grid.appendChild(card);
        });
    },

    showToast(message, type = "success") {
        const toast = document.createElement("div");
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <span>${type === 'error' ? '❌' : '✅'}</span>
            <span>${message}</span>
        `;
        this.toastContainer.appendChild(toast);
        
        setTimeout(() => toast.classList.add("show"), 10);
        
        setTimeout(() => {
            toast.classList.remove("show");
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
};

let usersList = [];

async function init() {
    ui.showLoading();
    try {
        usersList = await api.getUsers();
        ui.renderUsers(usersList);
        ui.showToast("Tải dữ liệu thành công!");
    } catch (error) {
        ui.grid.innerHTML = "";
        ui.showToast(error.message, "error");
    }
}

document.getElementById("searchInput").addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = usersList.filter(u => 
        u.name.toLowerCase().includes(query) || 
        u.email.toLowerCase().includes(query)
    );
    ui.renderUsers(filtered);
});

init();
