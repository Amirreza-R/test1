document.addEventListener("DOMContentLoaded", function () {
    var elems = document.querySelectorAll(".collapsible");
    var instances = M.Collapsible.init(elems, {});

    const addBtn = document.getElementById("add-user-btn");

    addBtn.addEventListener("click", () => {
        document
            .querySelector(".add-user-modal-back")
            .classList.remove("dis-none");
        document.querySelector(".add-user-modal").classList.add("show");
    });

    document
        .querySelector(".add-user-modal-back")
        .addEventListener("click", (e) => {
            document.querySelector(".add-user-modal").classList.remove("show");
            e.target.classList.add("dis-none");
        });

    setTimeout(() => {
        console.log("Start..");
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((json) => {
                console.log("End...");
                console.log(json);
                let html =""

            for (const user of json) {
                html = html + `<tr>
                                    <td>${user.id}</td>
                                    <td>${user.name}</td>
                                    <td>${user.username}</td>
                                    <td>${user.email}</td>
                                    <td>${user.address.city}</td>
                                    <td>
                                        <i class="material-icons orange-text text-darken-3 m-l-5 m-r-5 hov-pointer">edit</i>
                                        <i class="material-icons red-text m-l-5 m-r-5 hov-pointer">delete_forever</i>
                                    </td>
                                </tr>`
            }

            document.querySelector(".desktop-table-body").innerHTML = html

            });
        }, 1000);
});
