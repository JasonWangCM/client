// import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useState } from "react";
import { SortableItem } from "./SortableItem";

function App() {
    const [languages, setLanguages] = useState(["JavaScript", "Python", "TypeScript"]);
    const show = () => {
        console.log("The current state is: ", languages);
    };
    return (
        <DndContext collistionDetection={closestCenter} onDragEnd={handleDragEnd}>
            {/* wrap in DndContext allow use dnd-kitr funcs */}
            {/*  onDragEnd => event: finish drag and drop */}
            <Container className="p-3" style={{ width: "50%" }} align="center">
                <h3>The best programming languages!</h3>
                <button onClick={show}> show current</button>
                <SortableContext items={languages} strategy={verticalListSortingStrategy}>
                    {/* we need components that use the useSortable hook,which allows to be interacted with by this sortableContext; drag and drop within this context*/}
                    {/* SortableContext allows to use SortableItem; */}
                    {/* items: requires the items to you want to show;*/}
                    {/*strategy: how to sort the data;*/}
                    {languages.map((language) => (
                        <SortableItem key={language} id={language} />
                    ))}
                </SortableContext>
            </Container>
        </DndContext>
    );
    function handleDragEnd(event) {
        // console.log("Drag end called");
        const { active, over } = event;
        // todo :: active: item being draged; over item being passed
        // console.log("ACTIVE: " + active.id);
        // console.log("OVER: " + over.id);
        // todo :: update the state
        if (active.id !== over.id) {
            // check over happened
            setLanguages((items) => {
                const activeIndex = items.indexOf(active.id);
                const overIndex = items.indexOf(over.id);
                // console.log(arrayMove(items, activeIndex, overIndex));
                //!! arrayMove (3 params: array, oldIndex, newIndex)
                return arrayMove(items, activeIndex, overIndex);
                // items:[1,2,3] => [2,3,1] ===> index:0 -> index:2
                // [1,2,3]  oldIndex: 0  newIndex: 2 -> [2,3,1] (params for arrayMove)
            });
        }
    }
}

export default App;
