

var submit = document.getElementById('submit');
submit.addEventListener('click', (e) => {
    e.preventDefault();
    var product = document.getElementById('product').value;
    var price = document.getElementById('price').value;
    var obj = { product, price };

    //post data in backend
    function postData() {
        axios.post('https://crudcrud.com/api/6ccc4babcd6343eb8d47def935128bb1/userDeatils', obj
        ).then((res) => {
            showUserDataOnScreen(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }
    postData();
})
//show data on screen
function showUserDataOnScreen(user) {

    document.getElementById('product').value = '';
    document.getElementById('price').value = '';

    let parent = document.getElementById('allUserData')
    let childhtml = `<li id=${user._id}>${user.product}-${user.price}
    <button onclick= deleteUser('${user._id}')>Delete user
     <button onclick= editUser('${user.product}','${user.price}','${user._id}')>Edit user</li>`
    parent.innerHTML = parent.innerHTML + childhtml;
}
// Edit user funcnilty
function editUser(product, price, user_id) {
    console.log('this edit function is working')
    document.getElementById('product').value = product;
    document.getElementById('price').value = price;
    deleteUser(user_id)
}
//delete userfuncton

function deleteUser(user_id) {
    axios.delete(`https://crudcrud.com/api/6ccc4babcd6343eb8d47def935128bb1/userDeatils/${user_id}`).then((res) => {
        console.log(res);
        removeUserFromScreen(user_id);
    }).catch((err) => {
        console.log(err);
    })
}
function removeUserFromScreen(user_id) {
    let parent = document.getElementById('allUserData');
    let child = document.getElementById(user_id);
    parent.removeChild(child);
}
/// show data when page is refresh
window.addEventListener('DOMContentLoaded', () => {
    axios.get('https://crudcrud.com/api/6ccc4babcd6343eb8d47def935128bb1/userDeatils').then((response) => {

        for (var i = 0; i < response.data.length; i++) {
            showUserDataOnScreen(response.data[ i ]);
        }

    }).catch((err) => {
        console.log(err)
    })
})
