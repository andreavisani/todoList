/**Declare basic constants */
const button = document.querySelector('button');
const inputField = document.querySelector('input');
const todoList = document.querySelector('.todo-list');
const emptyListMessage = document.querySelector('.empty-list-message')
const reset = document.querySelector('.reset-button');

//create a constant for local storage
const STORAGE_KEY = '__todo_list__';
//check for previous activities
const storage = localStorage.getItem(STORAGE_KEY);

//declare the array of activities
let activities = [];
// you can use .push() to add elements
// you can use .splice() to remove elements

if (storage){
    activities = JSON.parse(storage);
}

//show the initial content
showContent();

//react to the add activity button
button.addEventListener('click', function(){
    addActivity();
});

//react to the reset button
reset.addEventListener('click', function(){
    
    //prompt the user for confirmation
    let confirm = window.confirm("Are you sure you want to delete the list?");
    // if the user confirms, delete the whole list
    if(confirm){
        //clear the activities array
        activities.splice(0, activities.length);
        //clear the local storage
        localStorage.clear();
        //display the content
        showContent();
    }
});

/** Function declaration for showing the content*/
function showContent(){

    //clear the list
    todoList.innerText = '';
    emptyListMessage.innerText = '';

    /* if there is an activity, show the activities*/
    if (activities.length > 0){

        activities.forEach(function (activity){
            //create an HTML template
            const template = createActivityTemplate(activity);

            //insert it on the page
            todoList.innerHTML += template;
        })
        //make checks clickable
        makeCheckClickable();
    }
    /*or show the message*/
    else {
        emptyListMessage.innerText = 'You\'re on track :)';
    }
}

//Function to make checks clickable and DELETE an item
function makeCheckClickable(){
    //check all the checks and make them clickable
    const checks = document.querySelectorAll('.todo-check');
    //for each check
    checks.forEach(function(check, index) {
        //add a reaction to the click
        check.addEventListener('click', function(){

            //remove the element from the list
            activities.splice(index, 1);

            //update the local storage
            localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));

            // refresh the list
            showContent();

            
        });
    })
}

//add an activity to the array of lists
function addActivity(){
    //get the text and make sure it is actual text, no blank spaces
    const newActivity = inputField.value.trim();

    //if the fiels is not empty
    if (newActivity.length > 0){
            //add the activity to the array
        activities.push(newActivity);

        //update the storage with the new activity
        localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));

        //show the content
        showContent();

        //empty the field
        inputField.value = '';
    }
    
}

// creates an html template 
function createActivityTemplate(activity){
    //return the html
    return `
            <li class="todo-item">
                <div class="todo-check">
                    <img src="images/check.svg" alt="Check Icon">
                </div>
                <p class="todo-text">${activity}</p>
            </li>`;
}

