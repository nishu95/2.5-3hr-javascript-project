var form=document.getElementById('form')

form.addEventListener('submit',operations);
function operations(e){
    e.preventDefault();
    var ex=document.getElementById('exp').value;
    console.log(ex);
    var de=document.getElementById('desc').value;
    var cate=document.getElementById('cat').value;

    let obj={
        expense:ex,
        description:de,
        category:cate
    }

    localStorage.setItem(obj.expense,JSON.stringify(obj));
    //addToList(obj)
    AddToList(obj);
    document.getElementById('exp').value="";
    document.getElementById('desc').value="";
    document.getElementById('cat').value="";

    
}

function AddToList(obj){

    if(localStorage.getItem(obj.expense)!==null){
        var ul=document.getElementById('list');
        var li=document.getElementById(obj.expense);
        if(li){        ul.removeChild(li);
        }
        
    }

    var li=document.createElement('li');
    li.className='txt';
    li.id=obj.expense;
    li.innerText=obj.expense+' '+obj.description+' '+obj.category;


    var del=document.createElement('button');
    del.className='delete';
    del.id=obj.expense;
    del.innerText="delete";

    del.addEventListener('click',()=>{
        localStorage.removeItem(obj.expense);
        li.remove();
    });

    var edit=document.createElement('button');
    edit.className='edit';
    edit.id=obj.expense;
    edit.innerText='EDIT';
    edit.addEventListener('click',()=>{
        document.getElementById('exp').value=obj.expense;
        document.getElementById('desc').value=obj.description;
        document.getElementById('cat').value=obj.category;
        li.remove();
    });

    var ul=document.getElementById('list');

    li.appendChild(del);
    li.appendChild(edit);
    ul.appendChild(li);
}

document.addEventListener('DOMContentLoaded',refresh);
function refresh(e){
    e.preventDefault();

    Object.keys(localStorage).forEach(function(key){
        var obj_deserialized=JSON.parse(localStorage.getItem(key));
        AddToList(obj_deserialized);
    });
}



