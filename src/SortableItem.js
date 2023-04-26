import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities"; // allow create some transform
import Card from "react-bootstrap/Card";

export function SortableItem(props) {
    // props.id
    // JavaScript

    // properties from useSortable
    // attributes:
    // listeners: onDrag, onDrop
    // setNodeRef: tell sortable exactly which node to attach to
    // transform, transition: help us to create picking up a card and move around the card
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    return (
        // ref: define the the target of dragable as this <div>
        // style: will affect how things render during the drag and drop
        // anything within attributes object will become the property of this div
        // anything within listeners object will become the property of this div
        //
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <Card body className="m-3">
                {props.id}
            </Card>
        </div>
    );
}
