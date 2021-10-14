var list = document.getElementById('list')

// add button for input value get 

firebase.database().ref('todo').on('child_added',function(data){

    var todo = document.getElementById('todo_item')
    
    // list me data show k liye

    var li = document.createElement('li')
    var liText = document.createTextNode(data.val().value)
    li.appendChild(liText)
    list.appendChild(li)

    // delete button for every li 

    var delbtn = document.createElement('button')
    var delText = document.createTextNode('Delete')
    delbtn.setAttribute('class','btn btn-danger del')
    delbtn.setAttribute('id',data.val().key)
    delbtn.setAttribute('onclick','Dltli(this)')
    delbtn.appendChild(delText)
    li.appendChild(delbtn)

     // edit button for every li
 
     var Editbtn = document.createElement('button')
     var EditText = document.createTextNode('Edit')
     Editbtn.setAttribute('class','btn btn-success edit')
     Editbtn.setAttribute('onclick','Edit(this)')
     Editbtn.setAttribute('id',data.val().key)
     Editbtn.appendChild(EditText)
     li.appendChild(Editbtn)

     todo.value=''

})
function Add(){
    var todo = document.getElementById('todo_item')
    // console.log(todo.value) 
    var key = firebase.database().ref('todo').push().key
    
    var todo = {
        value: todo.value,
        key: key,
    }
    firebase.database().ref('todo').child(key).set(todo)
    todo.value=''
}
// li delete function

function Dltli(e){
    firebase.database().ref('todo').child(e.id).remove()
    // console.log(e.id)
    e.parentNode.remove()
}
// delete all function
function DeleteAll(){
    firebase.database().ref('todo').remove()
    list.innerHTML=''
}
// edit value get in data base to doc
function Edit(f){
    var val = prompt('edit todo',f.parentNode.firstChild.nodeValue)
    f.parentNode.firstChild.nodeValue =  val

    var editd = {
        value : val,
        key : f.id
    }
    firebase.database().ref('todo').child(f.id).set(editd)
    console.log(editd)
}

