import { useRef, useState } from "react"

function SortableList( { data }) {

  const [list, setList] = useState(data);

  const [dragging, setDragging] = useState(false);

  const dragItem = useRef();
  const dragNode = useRef();

  const getClassName = ( index ) => {
    const currentItem = dragItem.current;
    if (currentItem.index === index ) return 'current dnd-item';
    return 'dnd-item';
  }

  const dragStart = ( e, index ) => {
    // console.log("start drag", index )
    dragItem.current = index
    dragNode.current = e.target
    dragNode.current.addEventListener("dragend", dragEnd)
    setTimeout(() => {
      setDragging(true);
    }, 0)
  }

  const dragEnd = () => {
    // console.log("end drag")
    setDragging(false)
    dragNode.current.removeEventListener("dragEnd", dragEnd)
    dragItem.current = null;
    dragNode.current = null;
  }

  const dragEnter = ( e, index ) => {
    console.log("drag enter", index)
    const currentItem = dragItem.current;

    if ( dragNode.current !== e.target ) {

      console.log('current item', currentItem)

      setList ( oldList => {
        const newList = [...oldList] 
        const dropItem = newList.splice(currentItem, 1)[0]
        newList.splice(index, 0, dropItem)
        dragItem.current = index
        return newList
      })
    }
  }

  const listItems = list.map(( item, index ) => 
    <div key={ index } 
      className={ dragging ? getClassName( index ) : "dnd-item" }
      draggable
      onDragStart={ e => dragStart( e, index )}
      onDragEnter={ dragging ? e => dragEnter( e, index ) : null }
    >{ item }</div>
  )

  return (
    <div className="drag-n-drop">
      { listItems }
    </div>
  )
}

export default SortableList;