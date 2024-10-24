document.addEventListener("alpine:init",()=>{Alpine.data("usersData",function(){return{users:[],mainUsers:[],pageUsers:[],isLoading:!1,showAddModal:!1,pageCount:1,itemsCount:4,currentPage:1,searchChar:"",newUserInfo:{name:"",username:"",email:""},userIdToEdit:null,getUsers(){this.isLoading=!0,axios.get("https://jsonplaceholder.typicode.com/users").then(s=>{this.users=s.data,this.mainUsers=s.data,this.pagination()}).catch(s=>{console.log(s.message)}).finally(()=>{this.isLoading=!1})},pagination(){this.pageCount=Math.ceil(this.users.length/this.itemsCount);let s=this.currentPage*this.itemsCount-this.itemsCount,e=this.currentPage*this.itemsCount;this.pageUsers=this.users.slice(s,e)},nextPage(){this.currentPage++,this.currentPage>this.pageCount&&(this.currentPage=this.pageCount),this.pagination()},previousPage(){this.currentPage--,this.currentPage<1&&(this.currentPage=1),this.pagination()},handleChangeItemsCount(s){this.currentPage=1,s<1&&(this.itemsCount=1),s>this.users.length&&(this.itemsCount=this.users.length),this.pagination()},handleSearch(s){this.users=this.mainUsers.filter(e=>e.name.includes(s)||e.username.includes(s)||e.email.includes(s)),this.currentPage=1,this.pagination()},addNewUser(){this.isLoading=!0,axios.post("https://jsonplaceholder.typicode.com/users",this.newUserInfo).then(s=>{201===s.status&&(this.mainUsers.push(s.data),this.showAddModal=!1,this.clearForm(),this.pagination(),M.toast({html:"User added successfuly",classes:"rounded green"}))}).catch(s=>{console.log(s.message)}).finally(()=>{this.isLoading=!1})},clearForm(){this.newUserInfo={name:"",username:"",email:""}},deleteUser(s){M.toast({html:"<span>Are you sure to delete user "+s+'</span><button class="btn-flat toast-action" x-on:click="confirmDeleteUser('+s+')">Delete</button>'})},confirmDeleteUser(s){this.isLoading=!0,axios.delete("https://jsonplaceholder.typicode.com/users/"+s).then(e=>{200===e.status&&(this.mainUsers=this.mainUsers.filter(e=>e.id!=s),this.users=this.users.filter(e=>e.id!=s),this.pagination(),M.toast({html:"User Deleted successfuly",classes:"green"}))}).catch(s=>{console.log(s.message)}).finally(()=>{this.isLoading=!1}),alert(s)},updateUserInfo(s){axios.get("https://jsonplaceholder.typicode.com/users/"+s.id).then(s=>{200===s.status&&(this.newUserInfo={name:s.data.name,username:s.data.username,email:s.data.email},this.userIdToEdit=s.data.id)}),this.showAddModal=!0},confirmUpdateUserInfo(){this.isLoading=!0,axios.put("https://jsonplaceholder.typicode.com/users/"+this.userIdToEdit,this.newUserInfo).then(s=>{if(200===s.status){let e=this.mainUsers.findIndex(s=>s.id===this.userIdToEdit);this.mainUsers[e]=s.data,this.showAddModal=!1,this.clearForm(),this.userIdToEdit=null,this.pagination(),M.toast({html:"User info updated !",classes:"green"})}}).catch(s=>{console.log(s.message)}).finally(()=>{this.isLoading=!1})}}})});