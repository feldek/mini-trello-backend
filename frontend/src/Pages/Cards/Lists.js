import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { uuid } from 'uuidv4';
import { Card } from 'antd';
import classNames from 'classnames';
import NewList from './List/NewList';
import List from './List/List';
import NewTask from './Tasks/NewTask';
import Tasks from './Tasks/Tasks';
import DeleteIcon from '../../ExtraComponents/DeleteIcon';
import s from './Cards.module.css';

const Lists = ({
  onDragEnd, currentLists, currentTasks, getListStyle, handleDelete,
}) => (
  <>
    <DragDropContext onDragEnd={onDragEnd}>
      {currentLists.map(
        (el, ind) => el.visibility && (
          <Card.Grid key={`boxList${el.id}`} className={s.card}>
            <Card
              className={classNames(`${s.tasksHeader}`, 'tasksHeader')}
              key={`listone${el.id}`}
              title={(
                <div>
                  <List listId={el.id} />
                  <NewTask listId={el.id} uuid={uuid()} />
                </div>
                  )}
            >
              <Droppable droppableId={`${ind}`} key={`droppable${el.id}`}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={(getListStyle(snapshot.isDraggingOver), { width: '100%' })}
                    {...provided.droppableProps}
                  >
                    <Tasks currentTask={currentTasks[ind]} />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Card>

            <DeleteIcon
              size="l"
              handleDelete={() => handleDelete(el.id)}
              styleParams={{ margin: '8px' }}
            />
          </Card.Grid>
        ),
      )}

      <Card.Grid className={`${s.card} ${s.cardNewList}`}>
        <NewList />
      </Card.Grid>
    </DragDropContext>
  </>
);

export default Lists;
