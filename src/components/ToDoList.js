import React from 'react';
import './ToDoList.css';

class ToDoList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newItem: "",
            indexCounter: 0,
            listArr: [],
        }
        this.addItem = this.addItem.bind(this);
    }

    //Adding item to the TO DO LIST
    addItem(event) {
        const newValue = document.getElementById("newItemValue").value;
        const addedItem = { index: this.state.indexCounter, value: newValue, done: false };
        this.setState({ listArr: this.state.listArr.concat(addedItem), indexCounter: this.state.indexCounter + 1 })
        document.getElementById("newItemValue").value = '';

    }


    //check item as "done" by checking the checkbox
    checkedItem = (index) => {
        this.setState({
            listArr: this.state.listArr.map((item) => {
                if (item.index == index) { item.done = !item.done }
                return item;
            })
        });
    }


    //removes item from the list
    //checking firt if the item is done or not
    // NOT WORKING!
    handleRemove = (id) => {
        //  if (this.state.listContent[id].done=== false){
        //  alert("Are you sure you want to delete this item?")
        //  }
        console.log(id)
        this.setState({
            listArr: this.state.listArr.splice(id, 1)
        });
    }

    //filter only the items that marked as done
    // doneItems(){

    //  this.setState({
    //       listArr: this.state.listArr.filter(this.state.listArr.done==true).map()
    //   });
    //  }




    render() {
        const fullList = [];
        let trueCounter = 0;  //counts how many items is undone

        // loop that insert the array of list in the list. checking the counter of undone items
        for (let i = 0; i < this.state.listArr.length; i++) {
            const listContent = (
                <li>     <input type="checkbox" checkedDefault={this.state.listArr[i].done} onChange={() => this.checkedItem(this.state.listArr[i].index)} />
                    <span>{this.state.listArr[i].value} </span>
                    <span>    </span>
                    <button type="button" onClick={() => this.handleRemove(i)}>x</button>

                </li>
            )
            fullList.push(listContent);
            if (this.state.listArr[i].done == false) {
                trueCounter++;
            }
        }

        // if all items done- congratulate the user
        let counterContent;
        if (trueCounter === 0) {
            counterContent = "Well done! you finished all of your tasks!";

        }
        else {
            counterContent = trueCounter + " more tasks to do! you can do it!";
        }




        return (
            <div>
                <h1>To Do List</h1>

                <input id="newItemValue" placeholder="Enter task">
                </input>
                <button onClick={this.addItem}>Add</button>
                <ul>
                    {fullList}
                </ul>

                <h3>{counterContent}</h3>
                <button>All</button>
                <button>Done</button>
                <button>Undone</button>
            </div>
        );
    }


}



export default ToDoList;

