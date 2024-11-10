import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const useQuizStore = create((
    persist(
      immer((set) => ({
        currentQuestionIndex: 0,
        timeLeft: 300,
        selectedAnswers: [],
        setCurrentQuestionIndex: (index: Number) => {
          set({ currentQuestionIndex: index });
        },
        setTimeLeft:(time: Number)=> {
          set({timeLeft: time})
        },
        setSelectedAnswers:(answers)=> {
            set({ selectedAnswers: answers})
        },
      })),
      {
        name: 'quiz-app',
      }
    )
  )
);

export default useQuizStore;
