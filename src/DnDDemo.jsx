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

  const dragStart = ( e, params ) => {
    console.log('drag start', params)
    dragItem.current = params
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

  const dragEnter = ( e, params ) => {
    console.log('drag enter', params)
    const currentItem = dragItem.current;
    if (dragNode.current !== e.target) {
      console.log('targetable')
      setColors( oldlist => {
        let newList = JSON.parse(JSON.stringify(oldlist));
          newList[params.group_i].colors.splice(params.item_i, 0, newList[currentItem.group_i].colors.splice(currentItem.item_i, 1)[0])
          dragItem.current = params
        return newList
      })
    }
  }

  const dragOver = () => {
    console.log('drag over')
  }

  const dragLeave = () => {
    console.log('drag leave')
  }

  const drop = () => {
    console.log('drop')
  }

  const getStyles = (group, item) => {
    const currentItem = dragItem.current;
    if (currentItem.group_i === group && currentItem.item_i === item) return 'current dnd-item';
    return 'dnd-item';
  }

  const colorGroups = colors.map((colorGroup, group_i) => 
    <div className="dnd-group" key={ colorGroup.title } onDragEnter={ dragging && !colorGroup.colors.length ? e => dragEnter( e, { group_i, item_i: 0 }) : null }>
      <h2 className="group-title">{ colorGroup.title }</h2>
      {
        colorGroup.colors.map(( color, item_i ) =>
          <button key={ item_i } data-id={ item_i } style={{ backgroundColor: color }} 
            className={ dragging ? getStyles( group_i, item_i ) : "dnd-item" } 
            draggable
            onDragStart={ e => dragStart( e, { group_i, item_i })}
            onDragEnter= { dragging ? e => dragEnter( e, { group_i, item_i }) : null }
            onDragOver= { dragOver }
            onDragLeave= { dragLeave }
            onDrop={ drop }
            >{ color }
          </button>
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