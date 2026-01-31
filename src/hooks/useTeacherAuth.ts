// Mot de passe enseignant
const TEACHER_PASSWORD = 'YNN2026';
const STUDENT_PASSWORD = 'CW2026';

export const useTeacherAuth = () => {
  // Validation du mot de passe enseignant (pour login simplifié)
  const validateTeacherPassword = (password: string): boolean => {
    return password === TEACHER_PASSWORD;
  };

  // Validation du mot de passe élève
  const validateStudentPassword = (password: string): boolean => {
    return password === STUDENT_PASSWORD;
  };

  return {
    validateTeacherPassword,
    validateStudentPassword,
    TEACHER_PASSWORD,
    STUDENT_PASSWORD,
  };
};

export { TEACHER_PASSWORD, STUDENT_PASSWORD };
export const TEACHER_PASSWORD_CONST = 'YNN2026';
export const STUDENT_PASSWORD_CONST = 'CW2026';
