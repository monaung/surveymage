function QuestionPreview({ questions }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-6 text-gray-800">Survey Preview</h3>
      {questions.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No questions added yet</p>
      ) : (
        <div className="space-y-6">
          {questions.map(question => (
            <div key={question.id} className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium mb-4 text-gray-800">{question.text}</p>
              
              {question.type === 'multiple-choice' && (
                <div className="space-y-2">
                  {question.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
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
                  {question.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
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
          ))}
        </div>
      )}
    </div>
  );
}

export default QuestionPreview; 