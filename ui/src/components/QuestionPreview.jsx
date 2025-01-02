import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { StrictModeDroppable } from './StrictModeDroppable';
import { GripVertical, Trash2 } from 'lucide-react';

function QuestionPreview({ questions, setQuestions }) {
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(questions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setQuestions(items);
  };

  const handleDeleteQuestion = (questionId) => {
    setQuestions(questions.filter(q => q.id !== questionId));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-6 text-gray-800">Survey Preview</h3>
      {questions.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No questions added yet</p>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <StrictModeDroppable droppableId="droppable-questions">
            {(provided) => (
              <div 
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-6"
              >
                {questions.map((question, index) => (
                  <Draggable 
                    key={question.id.toString()} 
                    draggableId={question.id.toString()} 
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`border border-gray-200 rounded-lg p-4 ${
                          snapshot.isDragging ? 'bg-gray-50' : 'bg-white'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <div 
                            {...provided.dragHandleProps}
                            className="mt-1 cursor-grab hover:text-indigo-600"
                          >
                            <GripVertical size={20} />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-4">
                              <p className="font-medium text-gray-800">{question.text}</p>
                              <button
                                onClick={() => handleDeleteQuestion(question.id)}
                                className="text-red-500 hover:text-red-700 p-1"
                                title="Delete question"
                              >
                                <Trash2 size={20} />
                              </button>
                            </div>
                            
                            {question.type === 'multiple-choice' && (
                              <div className="space-y-2">
                                {question.options.map((option, idx) => (
                                  <div key={idx} className="flex items-center gap-2">
                                    <input 
                                      type="radio" 
                                      name={`question-${question.id}`}
                                      className="text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label className="text-gray-700">{option}</label>
                                  </div>
                                ))}
                              </div>
                            )}

                            {question.type === 'checkbox-list' && (
                              <div className="space-y-2">
                                {question.options.map((option, idx) => (
                                  <div key={idx} className="flex items-center gap-2">
                                    <input 
                                      type="checkbox"
                                      className="text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label className="text-gray-700">{option}</label>
                                  </div>
                                ))}
                              </div>
                            )}

                            {question.type === 'short-text' && (
                              <input 
                                type="text" 
                                placeholder="Enter your answer"
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                              />
                            )}

                            {question.type === 'long-text' && (
                              <textarea 
                                placeholder="Enter your answer" 
                                rows="4"
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </StrictModeDroppable>
        </DragDropContext>
      )}
    </div>
  );
}

export default QuestionPreview; 