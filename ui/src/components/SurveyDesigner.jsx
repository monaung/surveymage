import { useState } from 'react';
import QuestionDesigner from './QuestionDesigner';
import QuestionPreview from './QuestionPreview';
import { saveSurvey } from '../utils/serverComm';

function SurveyDesigner() {
  const [questions, setQuestions] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  const handleAddQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
  };

  const handleSaveSurvey = async () => {
    try {
      setIsSaving(true);
      await saveSurvey({ questions });
      alert('Survey saved successfully!');
    } catch (error) {
      alert('Failed to save survey. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Survey Designer</h2>
        <button
          onClick={handleSaveSurvey}
          disabled={isSaving}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md disabled:bg-blue-300"
        >
          {isSaving ? 'Saving...' : 'Save Survey'}
        </button>
      </div>
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