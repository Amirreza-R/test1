document.addEventListener("alpine:init", () => {
    Alpine.data("usersData", function () {
        return {
            users: [],
            mainUsers: [],
            pageUsers: [],
            isLoading: false,
            showAddModal: false,
            pageCount: 1,
            itemsCount: 4,
            currentPage: 1,
            searchChar: "",
            newUserInfo: {
                name: "",
                username: "",
                email: "",
            },
            userIdToEdit: null,
            getUsers() {
                (this.isLoading = true),
                    axios
                        .get("https://jsonplaceholder.typicode.com/users")
                        .then((res) => {
                            this.users = res.data;
                            this.mainUsers = res.data;
                            this.pagination();
                        })
                        .catch((error) => {
                            console.log(error.message);
                        })
                        .finally(() => {
                            this.isLoading = false;
                        });
            },
            pagination() {
                this.pageCount = Math.ceil(this.users.length / this.itemsCount); // 10 / 4 = 3
                let start =
                    this.currentPage * this.itemsCount - this.itemsCount;
                let end = this.currentPage * this.itemsCount;
                this.pageUsers = this.users.slice(start, end);
            },
            nextPage() {
                this.currentPage++;
                if (this.currentPage > this.pageCount)
                    this.currentPage = this.pageCount;
                this.pagination();
            },
            previousPage() {
                this.currentPage--;
                if (this.currentPage < 1) this.currentPage = 1;
                this.pagination();
            },
            handleChangeItemsCount(value) {
                this.currentPage = 1;
                if (value < 1) this.itemsCount = 1;
                if (value > this.users.length)
                    this.itemsCount = this.users.length;
                this.pagination();
            },
            handleSearch(value) {
                this.users = this.mainUsers.filter(
                    (user) =>
                        user.name.includes(value) ||
                        user.username.includes(value) ||
                        user.email.includes(value)
                );
                (this.currentPage = 1), this.pagination();
            },
            addNewUser() {
                this.isLoading = true;
                axios
                    .post(
                        "https://jsonplaceholder.typicode.com/users",
                        this.newUserInfo
                    )
                    .then((res) => {
                        if (res.status === 201) {
                            this.mainUsers.push(res.data);
                            this.showAddModal = false;
                            this.clearForm();
                            this.pagination();
                            M.toast({
                                html: "User added successfuly",
                                classes: "rounded green",
                            });
                        }
                    })
                    .catch((error) => {
                        console.log(error.message);
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
            clearForm() {
                this.newUserInfo = {
                    name: "",
                    username: "",
                    email: "",
                };
            },
            deleteUser(userId) {
                var toastHTML =
                    "<span>Are you sure to delete user " +
                    userId +
                    '</span><button class="btn-flat toast-action" x-on:click="confirmDeleteUser(' +
                    userId +
                    ')">Delete</button>';
                M.toast({ html: toastHTML });
            },
            confirmDeleteUser(userId) {
                this.isLoading = true;
                axios
                    .delete(
                        "https://jsonplaceholder.typicode.com/users/" + userId
                    )
                    .then((res) => {
                        if (res.status === 200) {
                            this.mainUsers = this.mainUsers.filter(
                                (user) => user.id != userId
                            );
                            this.users = this.users.filter(
                                (user) => user.id != userId
                            );
                            this.pagination();
                            M.toast({
                                html: "User Deleted successfuly",
                                classes: "green",
                            });
                        }
                    })
                    .catch((error) => {
                        console.log(error.message);
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
                alert(userId);
            },
            updateUserInfo(user) {
                axios
                    .get(
                        "https://jsonplaceholder.typicode.com/users/" + user.id
                    )
                    .then((res) => {
                        if (res.status === 200) {
                            this.newUserInfo = {
                                name: res.data.name,
                                username: res.data.username,
                                email: res.data.email,
                            };
                            this.userIdToEdit = res.data.id;
                        }
                    });
                this.showAddModal = true;
            },
            confirmUpdateUserInfo(){
                this.isLoading = true
                axios
                    .put(
                        "https://jsonplaceholder.typicode.com/users/" + this.userIdToEdit, this.newUserInfo)
                    .then((res) => {
                        if (res.status === 200) {
                            const userIndex = this.mainUsers.findIndex(user=>user.id === this.userIdToEdit)
                            this.mainUsers[userIndex] = res.data;
                            this.showAddModal = false;
                            this.clearForm()
                            this.userIdToEdit = null;
                            this.pagination()
                            M.toast({html: 'User info updated !', classes : 'green'})
                        }
                    })
                    .catch((error) => {
                        console.log(error.message);
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            }
        };
    });
});
