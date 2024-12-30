import { useState } from 'react';
import QuestionDesigner from './QuestionDesigner';
import QuestionPreview from './QuestionPreview';

function SurveyDesigner() {
  const [questions, setQuestions] = useState([]);

  const handleAddQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Survey Designer</h2>
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-4">
          <QuestionDesigner onAddQuestion={handleAddQuestion} />
        </div>
        <div className="col-span-8">
          <QuestionPreview 
            questions={questions} 
            setQuestions={setQuestions} 
          />
        </div>
      </div>
    </div>
  );
}

export default SurveyDesigner; 