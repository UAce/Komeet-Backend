import crypto from 'crypto';

export const getHash = async (message: string): Promise<string> => {
    const hash = crypto.createHash('sha256').update(message).digest('base64');
    return hash;
};

export const validatePassword = async (storedHashedPassword: string, password: string): Promise<boolean> => {
    const hashedPassword = await getHash(password);
    return storedHashedPassword === hashedPassword;
};
