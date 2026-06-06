const api = {
    baseURL: "https://jsonplaceholder.typicode.com",
    
    async getUsers() {
        const response = await fetch(`${this.baseURL}/users`);
        if (!response.ok) throw new Error("Không thể tải danh sách");
        return await response.json();
    },
    
    async createUser(data) {
        const response = await fetch(`${this.baseURL}/users`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-type': 'application/json' }
        });
        if (!response.ok) throw new Error("Lỗi khi tạo user mới");
        return await response.json();
    },
    
    async updateUser(id, data) {
        const response = await fetch(`${this.baseURL}/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: { 'Content-type': 'application/json' }
        });
        if (!response.ok) throw new Error("Lỗi khi cập nhật user");
        return await response.json();
    },
    
    async deleteUser(id) {
        const response = await fetch(`${this.baseURL}/users/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error("Lỗi khi xóa user");
        return true;
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
            card.dataset.id = user.id;
            
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
                    <button class="action-btn edit-btn" onclick="openEditModal(${user.id})">Edit</button>
                    <button class="action-btn delete-btn" onclick="openDeleteModal(${user.id})">Delete</button>
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
let deleteId = null;

const userModal = document.getElementById("userModal");
const deleteModal = document.getElementById("deleteModal");
const userForm = document.getElementById("userForm");
const modalTitle = document.getElementById("modalTitle");

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

document.getElementById("addUserBtn").addEventListener("click", () => {
    modalTitle.textContent = "Thêm User Mới";
    userForm.reset();
    document.getElementById("userId").value = "";
    userModal.classList.add("active");
});

document.getElementById("cancelBtn").addEventListener("click", () => {
    userModal.classList.remove("active");
});

window.openEditModal = (id) => {
    const user = usersList.find(u => u.id === id);
    if (!user) return;
    
    modalTitle.textContent = "Cập Nhật User";
    document.getElementById("userId").value = user.id;
    document.getElementById("userName").value = user.name;
    document.getElementById("userUsername").value = user.username;
    document.getElementById("userEmail").value = user.email;
    document.getElementById("userPhone").value = user.phone;
    
    userModal.classList.add("active");
};

userForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const saveBtn = document.getElementById("saveBtn");
    saveBtn.disabled = true;
    saveBtn.textContent = "Đang lưu...";
    
    const id = document.getElementById("userId").value;
    const userData = {
        name: document.getElementById("userName").value,
        username: document.getElementById("userUsername").value,
        email: document.getElementById("userEmail").value,
        phone: document.getElementById("userPhone").value,
        company: { name: "N/A" }
    };

    try {
        if (id) {
            const updated = await api.updateUser(id, userData);
            const index = usersList.findIndex(u => u.id == id);
            if (index !== -1) {
                usersList[index] = { ...usersList[index], ...updated };
            }
            ui.showToast("Cập nhật thành công!");
        } else {
            const created = await api.createUser(userData);
            created.id = Date.now(); 
            usersList.unshift(created);
            ui.showToast("Thêm mới thành công!");
        }
        ui.renderUsers(usersList);
        userModal.classList.remove("active");
    } catch (error) {
        ui.showToast(error.message, "error");
    } finally {
        saveBtn.disabled = false;
        saveBtn.textContent = "Save";
    }
});

window.openDeleteModal = (id) => {
    deleteId = id;
    deleteModal.classList.add("active");
};

document.getElementById("cancelDeleteBtn").addEventListener("click", () => {
    deleteModal.classList.remove("active");
    deleteId = null;
});

document.getElementById("confirmDeleteBtn").addEventListener("click", async () => {
    if (!deleteId) return;
    
    const confirmBtn = document.getElementById("confirmDeleteBtn");
    confirmBtn.disabled = true;
    confirmBtn.textContent = "Đang xóa...";
    
    try {
        await api.deleteUser(deleteId);
        usersList = usersList.filter(u => u.id !== deleteId);
        ui.renderUsers(usersList);
        ui.showToast("Xóa user thành công!");
        deleteModal.classList.remove("active");
    } catch (error) {
        ui.showToast(error.message, "error");
    } finally {
        confirmBtn.disabled = false;
        confirmBtn.textContent = "Delete";
        deleteId = null;
    }
});

init();
