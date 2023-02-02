import { useState, useRef } from "react"
import "./DnDDemo.css"

function DnDDemo() {

  const [colors, setColors] = useState([ 
    { 
      title: 'rgb', 
      colors: ['red', 'green', 'blue'] 
    }, 
    { 
      title: 'cmyk', 
      colors: ['cyan', 'yellow', 'magenta', 'black'] 
    },
    {
      title: 'primary',
      colors: ['red', 'blue', 'yellow']
    }
  ]);

  const [dragging, setDragging] = useState(false);
  
  const dragItem = useRef();
  const dragNode = useRef();

  const dragStart = ( e, group, item ) => {
    console.log('drag start', group, item)
    dragItem.current = { group: group, item: item }
    dragNode.current = e.target
    dragNode.current.addEventListener('dragend', dragEnd)
    setTimeout(() => { // prevents modified styling from applying to drag element
      setDragging(true);
    }, 0)
  }
  
  const dragEnd = ( ) => {
    console.log('end drag')
    setDragging(false);
    dragNode.current.removeEventListener('dragend', dragEnd)
    dragItem.current = null;
    dragNode.current = null;
  }

  const dragEnter = ( e, group, item ) => {
    console.log('drag enter', group, item)
    const currentItem = dragItem.current;
    if (dragNode.current !== e.target) {
      console.log('current item', currentItem)
      setColors( oldlist => {
        let newList = JSON.parse(JSON.stringify(oldlist));
          const something =  newList[currentItem.group].colors.splice(currentItem.item, 1)[0]
          console.log('something', something)
          newList[group].colors.splice(item, 0, something)
          dragItem.current = { group: group, item: item }
        return newList
      })
    }
  }

  const getStyles = (group, item) => {
    const currentItem = dragItem.current;
    if (currentItem.group === group && currentItem.item === item) return 'current dnd-item';
    return 'dnd-item';
  }

  const colorGroups = colors.map((colorGroup, group) => 
    <div className="dnd-group" key={ colorGroup.title } onDragEnter={ dragging && !colorGroup.colors.length ? e => dragEnter( e, group, 0 ) : null }>
      <h2 className="group-title">{ colorGroup.title }</h2>
      {
        colorGroup.colors.map(( color, item ) =>
          <button key={ item } style={{ backgroundColor: color }} 
            className={ dragging ? getStyles( group, item ) : "dnd-item" } 
            draggable
            onDragStart={ e => dragStart( e, group, item )}
            onDragEnter={ dragging ? e => dragEnter( e, group, item) : null }
          >{ color }</button>
        )
      }
    </div>
  )

  return (
    <div className="drag-n-drop">
      {colorGroups}
    </div>
  )
}

export default DnDDemo;