// Sample user data array
let usersData = [
    { id: 1, name: "John Doe", email: "john@example.com", phone: "123456789", username: "johndoe", password: "password123", userType: "student" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "987654321", username: "janesmith", password: "password456", userType: "teacher" },
    { id: 3, name: "Admin User", email: "admin@example.com", phone: "555555555", username: "adminuser", password: "password789", userType: "admin" },
    // ... add more users as needed
];

// Modal elements
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const usernameInput = document.getElementById("username-input");
const emailInput = document.getElementById("email-input");
const phoneInput = document.getElementById("phone-input");
const nameInput = document.getElementById("name-input");
const surnameInput = document.getElementById("surname-input");
const passwordInput = document.getElementById("password-input");
const userTypeSelect = document.getElementById("user-type-select");
const saveBtn = document.getElementById("save-btn");
const deleteBtn = document.getElementById("delete-btn");
const addUserBtn = document.getElementById("add-user-btn");

// User object to store the currently edited user
let currentUser = null;

// Function to open the modal for editing user details
function openModal(user) {
    currentUser = user;

    if (user) {
        modalTitle.textContent = `Edit User - ${user.name}`;
        usernameInput.value = user.username;
        emailInput.value = user.email;
        phoneInput.value = user.phone;
        nameInput.value = user.name;
        surnameInput.value = user.surname;
        passwordInput.value = user.password;
        userTypeSelect.value = user.userType;

        deleteBtn.style.display = "block";
    } else {
        modalTitle.textContent = "Add New User";
        usernameInput.value = "";
        emailInput.value = "";
        phoneInput.value = "";
        nameInput.value = "";
        surnameInput.value = "";
        passwordInput.value = "";
        userTypeSelect.value = "student";

        deleteBtn.style.display = "none";
    }
    modal.style.display = "block";
}

// Function to close the modal
function closeModal() {
    modal.style.display = "none";
}

// Function to handle saving the user details
function saveUser() {
    const username = usernameInput.value;
    const email = emailInput.value;
    const phone = phoneInput.value;
    const name = nameInput.value;
    const surname = surnameInput.value;
    const password = passwordInput.value;
    const userType = userTypeSelect.value;

    if (currentUser) {
        // Editing existing user
        currentUser.username = username;
        currentUser.email = email;
        currentUser.phone = phone;
        currentUser.name = name;
        currentUser.surname = surname;
        currentUser.password = password;
        currentUser.userType = userType;
    } else {
        // Adding new user
        const newUser = {
            id: Date.now(), // Generate a unique ID for the new user
            username,
            email,
            phone,
            name,
            surname,
            password,
            userType
        };
        usersData.push(newUser);
    }
    displayUsers(usersData);
    closeModal();
}

// Function to handle deleting a user
function deleteUser(currentUser) {
    if (currentUser) {
        // Confirm with the admin before deleting the user
        const confirmDelete = confirm(`Are you sure you want to delete the user "${currentUser.name}"?`);
        if (confirmDelete) {
            // Remove the user from the data array
            usersData = usersData.filter(item => item.id !== currentUser.id);
            displayUsers(usersData);
            closeModal();
        }
    }
}

// Function to filter users based on selected user type
function filterUsers(userType) {
    const filteredUsers = usersData.filter(user => userType === "all" || user.userType === userType);
    displayUsers(filteredUsers);
}

// Function to display users in the table
function displayUsers(users) {
    const usersBody = document.getElementById("users-body");
    usersBody.innerHTML = "";

    users.forEach(user => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.name}</td>
        <td>${user.surname}</td>
        <td>${user.userType}</td>
        <td>
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete user</button>
        </td>
      `;
        usersBody.appendChild(row);

        // Event listeners for edit and delete buttons
        const editBtn = row.querySelector(".edit-btn");
        const deleteBtn = row.querySelector(".delete-btn");

        editBtn.addEventListener("click", () => {
            openModal(user);
        });

        deleteBtn.addEventListener("click", () => {
            deleteUser(user);
            console.log('User is Deleting ...')
        });
    });
}

// Event listener for save and delete buttons in the modal
saveBtn.addEventListener("click", saveUser);
deleteBtn.addEventListener("click", deleteUser);

// Event listener for user type filter
// const userTypeSelect = document.getElementById("user-type-select");
userTypeSelect.addEventListener("change", function() {
    const selectedUserType = this.value;
    filterUsers(selectedUserType);
});

// Event listener for add user button
addUserBtn.addEventListener("click", () => {
    openModal(null);
});

// Initial display of users using the default data array
displayUsers(usersData);