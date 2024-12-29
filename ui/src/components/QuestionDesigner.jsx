import { useState } from 'react';
import { Plus, Minus, PlusCircle } from 'lucide-react';

function QuestionDesigner({ onAddQuestion }) {
  const [questionType, setQuestionType] = useState('multiple-choice');
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['']);

  const questionTypes = [
    { id: 'multiple-choice', label: 'Multiple Choice' },
    { id: 'checkbox-list', label: 'Checkbox List' },
    { id: 'short-text', label: 'Short Text' },
    { id: 'long-text', label: 'Long Text' }
  ];

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleRemoveOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuestion = {
      id: Date.now(),
      type: questionType,
      text: questionText,
      options: questionType === 'multiple-choice' || questionType === 'checkbox-list' ? options : []
    };
    onAddQuestion(newQuestion);
    setQuestionText('');
    setOptions(['']);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-6 text-gray-800">Design New Question</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Question Type:</label>
          <select 
            value={questionType} 
            onChange={(e) => setQuestionType(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {questionTypes.map(type => (
              <option key={type.id} value={type.id}>{type.label}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Question Text:</label>
          <input
            type="text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            required
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        {(questionType === 'multiple-choice' || questionType === 'checkbox-list') && (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Options:</label>
            {options.map((option, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  required
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <button 
                  type="button" 
                  onClick={() => handleRemoveOption(index)}
                  className="p-2 text-red-600 hover:text-red-800"
                >
                  <Minus size={20} />
                </button>
              </div>
            ))}
            <button 
              type="button" 
              onClick={handleAddOption}
              className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800"
            >
              <Plus size={20} />
              <span>Add Option</span>
            </button>
          </div>
        )}

        <button 
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 flex items-center justify-center gap-2"
        >
          <PlusCircle size={20} />
          <span>Add Question</span>
        </button>
      </form>
    </div>
  );
}

export default QuestionDesigner; 