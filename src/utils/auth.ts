
export const generateStudentEmail = (username: string): string => {
    // Normalize username: lowercase, remove spaces/special chars
    const normalized = username.toLowerCase().replace(/[^a-z0-9]/g, '');
    return `${normalized}@maths-en-ligne.local`;
};

export const generateStudentUsername = (email: string): string => {
    return email.split('@')[0];
};
